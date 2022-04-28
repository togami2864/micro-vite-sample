import { resolve } from "./resolvePlugin";
import esbuild from "rollup-plugin-esbuild";
import { reload } from "./reloadPlugin";

export const getPlugins = () => [
  resolve(),
  reload(),
  esbuild({
    target: "esnext",
    minify: false,
  }),
];
