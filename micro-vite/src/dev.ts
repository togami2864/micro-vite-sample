import connect from "connect";
import historyApiFallback from "connect-history-api-fallback";
import sirv from "sirv";
import { transformMiddleware } from "./transformMiddleware";
import { createPluginContainer } from "./pluginContainer"; // 追加
import { getPlugins } from "./plugins";
import { setupReloadServer as setupWsServer } from "./reloadPlugin";
import { createFileWatcher } from "./fileWatcher";

export const startDev = () => {
  const server = connect();
  server.listen(3000, "localhost");
  const ws = setupWsServer();
  const plugins = getPlugins(true);
  const pluginContainer = createPluginContainer(plugins);
  server.use(transformMiddleware(pluginContainer));
  server.use(
    sirv(undefined, {
      dev: true,
      etag: true,
      setHeaders(res, pathname) {
        if (/\.[tj]s$/.test(pathname)) {
          res.setHeader("Content-Type", "application/javascript");
        }
      },
    })
  );
  server.use(historyApiFallback() as any);
  console.log("dev server running at http://localhost:3000");
  createFileWatcher((eventName, path) => {
    console.log(`Detected file change (${eventName}) reloading!: ${path}`);
    ws.send({ type: "reload" });
  });
};
