import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";
import "dotenv/config";

(() => {
  main();
})();

function main() {
  // console.log(envs);
  Server.start();
}
