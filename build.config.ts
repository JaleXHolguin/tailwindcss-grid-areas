import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  clean: true,
  declaration: "compatible",
  entries: ["src/index"],
  externals: ["vitest"],
  rollup: {
    esbuild: {
      minify: true,
    },
  },
});
