import { processAreaMultiplier } from "./process-area-multiplier";

export const getAreas = (template: string) => {
  if (template === "") return "";

  const areas = template.split(",");
  const hasAreaMultiplier = areas.some((area) => area.includes("*"));

  const templates = hasAreaMultiplier ? areas.map(processAreaMultiplier) : areas;

  return templates.map((template) => `"${template}"`).join(" ");
};
