/// <reference types="vite/client" />

/**
 * Self-contained source download.
 * The entire project source is embedded at build time (raw strings) and a
 * valid ZIP is assembled in the browser on demand — so the download works
 * in any deployment, even single-file ones, and always matches the code
 * that is actually running.
 */

const raw = import.meta.glob(
  [
    "/index.html",
    "/package.json",
    "/tsconfig.json",
    "/vite.config.ts",
    "/DEPLOY.md",
    "/src/**/*.{ts,tsx,css}",
  ],
  { query: "?raw", import: "default", eager: true }
) as Record<string, string>;

/* ---------- CRC-32 ---------- */
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(u8: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < u8.length; i++) c = crcTable[(c ^ u8[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/* ---------- minimal ZIP writer (store method, UTF-8 names) ---------- */

function dosNow() {
  const d = new Date();
  return {
    time: (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1),
    date: ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate(),
  };
}

function buildZip(files: { name: string; data: Uint8Array }[]): Blob {
  const enc = new TextEncoder();
  const { time, date } = dosNow();
  const local: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  for (const f of files) {
    const nameB = enc.encode(f.name);
    const crc = crc32(f.data);

    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true);
    lh.setUint16(4, 20, true); // version needed
    lh.setUint16(6, 0x0800, true); // UTF-8 flag
    lh.setUint16(8, 0, true); // method: store
    lh.setUint16(10, time, true);
    lh.setUint16(12, date, true);
    lh.setUint32(14, crc, true);
    lh.setUint32(18, f.data.length, true);
    lh.setUint32(22, f.data.length, true);
    lh.setUint16(26, nameB.length, true);
    local.push(new Uint8Array(lh.buffer), nameB, f.data);

    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true);
    ch.setUint16(4, 20, true);
    ch.setUint16(6, 20, true);
    ch.setUint16(8, 0x0800, true);
    ch.setUint16(10, 0, true);
    ch.setUint16(12, time, true);
    ch.setUint16(14, date, true);
    ch.setUint32(16, crc, true);
    ch.setUint32(20, f.data.length, true);
    ch.setUint32(24, f.data.length, true);
    ch.setUint16(28, nameB.length, true);
    ch.setUint32(42, offset, true);
    central.push(new Uint8Array(ch.buffer), nameB);

    offset += 30 + nameB.length + f.data.length;
  }

  const centralSize = central.reduce((s, c) => s + c.length, 0);
  const eocd = new DataView(new ArrayBuffer(22));
  eocd.setUint32(0, 0x06054b50, true);
  eocd.setUint16(8, files.length, true);
  eocd.setUint16(10, files.length, true);
  eocd.setUint32(12, centralSize, true);
  eocd.setUint32(16, offset, true);

  const parts = [...local, ...central, new Uint8Array(eocd.buffer)] as unknown as BlobPart[];
  return new Blob(parts, { type: "application/zip" });
}

/* ---------- public API ---------- */

export function sourceFileCount(): number {
  return Object.keys(raw).length;
}

export function downloadSourceZip() {
  const enc = new TextEncoder();
  const files = Object.entries(raw)
    .map(([path, content]) => ({ name: path.replace(/^\//, ""), data: enc.encode(content) }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const blob = buildZip(files);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "yeabsira-portfolio-source.zip";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
