import type { ComponentType } from "react";
import { FFToday, FFAddTask, FFTaskDetail, FFRoutines, FFStats, FFEmpty } from "./focusflow";
import { DWToday, DWConfirm, DWAddMed, DWMedDetail, DWHistory, DWSettings } from "./dosewise";
import { SWOverview, SWAddExpense, SWTransactions, SWBudgetDetail, SWInsights, SWSearchEmpty } from "./spendwise";

export const screenRegistry: Record<string, ComponentType> = {
  "ff-today": FFToday,
  "ff-add": FFAddTask,
  "ff-detail": FFTaskDetail,
  "ff-routines": FFRoutines,
  "ff-stats": FFStats,
  "ff-empty": FFEmpty,
  "dw-today": DWToday,
  "dw-confirm": DWConfirm,
  "dw-add": DWAddMed,
  "dw-med": DWMedDetail,
  "dw-history": DWHistory,
  "dw-settings": DWSettings,
  "sw-home": SWOverview,
  "sw-add": SWAddExpense,
  "sw-list": SWTransactions,
  "sw-budget": SWBudgetDetail,
  "sw-insights": SWInsights,
  "sw-empty": SWSearchEmpty,
};
