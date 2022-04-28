import { resolve } from "./resolvePlugin";
import esbuild from "rollup-plugin-esbuild";
import { reload } from "./reloadPlugin";

export const getPlugins = (isDev: boolean) => [
  ...(isDev ? [resolve(), reload()] : []),
  esbuild({
    target: isDev ? "esnext" : "es2019",
    minify: !isDev,
  }),
];
