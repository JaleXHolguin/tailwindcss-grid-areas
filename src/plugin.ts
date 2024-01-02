import plugin from "tailwindcss/plugin";
import { defaultGridTemplateAreas, defaultGridAreas } from "./default-utilities";
import type { GridAreasOptions, StringObject, Theme } from "./types";
import { getAreas } from "./utils";

const resolveGridTemplateAreas = (areas: GridAreasOptions, theme: Theme) => {
  const areaNames = new Set<string>();
  const gridTemplateAreas: Record<string, Record<string, string | StringObject>> = {};
  const gridAreas: Record<string, Record<string, string>> = {};

  const processValues = (values: string[]) => {
    const areaNamesArray = values.flatMap((value) => value.split(" "));

    for (const v of areaNamesArray) {
      if (!areaNames.has(v)) {
        areaNames.add(v);
        gridAreas[`.area-${v}`] = { "grid-area": v };
      }
    }

    return values.map((val) => `"${val}"`).join(" ");
  };

  for (const [area, values] of Object.entries(areas)) {
    const utilityName = `.grid-areas-${area}`;
    if (Array.isArray(values)) {
      gridTemplateAreas[utilityName] = {
        "grid-template-areas": processValues(values),
      };
    } else {
      const screens = theme("screens");

      for (const [screen, templates] of Object.entries(values)) {
        const processScreen = (media?: string) => {
          const template = { "grid-template-areas": processValues(templates) };

          gridTemplateAreas[utilityName] = {
            ...gridTemplateAreas[utilityName],
            ...(media ? { [media]: template } : template),
          };
        };

        if (screen === "base") {
          processScreen();
        } else if (screens && screen in screens) {
          const media = `@media (min-width: ${theme(`screens.${screen}`)})`;
          processScreen(media);
        } else {
          throw new Error(
            `The screen ${screen} not exist in your screens list of Tailwind Config, to solve add "${screen}" to screens list`,
          );
        }
      }
    }
  }

  return {
    gridTemplateAreas,
    gridAreas,
  };
};

export const gridAreas = plugin.withOptions(
  (areas?: GridAreasOptions) =>
    ({ addUtilities, matchUtilities, theme }) => {
      addUtilities({
        ...defaultGridTemplateAreas,
        ...defaultGridAreas,
      });

      if (areas) {
        const { gridTemplateAreas, gridAreas } = resolveGridTemplateAreas(areas, theme);
        addUtilities({
          ...gridTemplateAreas,
          ...gridAreas,
        });
      }

      matchUtilities({
        "grid-areas": (value) => {
          const templateAreas = getAreas(value);
          return {
            "grid-template-areas": templateAreas,
          };
        },
        area: (value) => ({
          "grid-area": value,
        }),
      });
    },
);
