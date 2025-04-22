import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {
      // new CheckService().execute("http://localhost:3000");
      const url = "http://google.com";
      new CheckService(
        () => console.log(` ${url} is ok`),
        (error: string) => console.log(`error: ${error}`)
      ).execute(url);
    });
  }
}
