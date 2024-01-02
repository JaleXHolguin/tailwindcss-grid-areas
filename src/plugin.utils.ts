import merge from "lodash.merge";
import postcss from "postcss";
import prettier from "prettier";
import tailwindcss, { type Config } from "tailwindcss";

import { gridAreas } from "./plugin";
import type { GridAreasOptions } from "./types";

export const format = (input: string) => {
  return prettier.format(input, {
    parser: "css",
    printWidth: 100,
  });
};

export const getPluginCss = async (config: Config, pluginOptions?: GridAreasOptions) => {
  const tailwindConfig = merge(config, {
    plugins: [gridAreas(pluginOptions)],
  });

  const { css } = await postcss(tailwindcss(tailwindConfig)).process("@tailwind utilities;", {
    from: undefined,
  });

  return format(css);
};
