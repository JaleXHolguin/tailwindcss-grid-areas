import type { Config } from "tailwindcss/types/config";

type TemplateWithBreakpoints = Record<"base", string[]> & Record<string, string[]>;
export type GridAreasOptions = Record<string, string[] | TemplateWithBreakpoints>;

export type Theme = <TDefaultValue = Config["theme"]>(
  path?: string,
  defaultValue?: TDefaultValue,
) => TDefaultValue;

export type StringObject = Record<string, string>;
