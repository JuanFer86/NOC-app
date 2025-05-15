import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const FsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const MongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const PostgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // Send Email

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "narvaezju1.secondary@gmail.com",
    // ]);

    // emailService.sendEmailWithFileSystemLogs([
    //   "narvaezju1.secondary@gmail.com",
    // ]);

    // const logs = await LogRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    CronService.createJob("*/5 * * * * *", () => {
      // new CheckService().execute("http://localhost:3000");
      const url = "http://google.com";
      new CheckServiceMultiple(
        [FsLogRepository, MongoLogRepository, PostgresLogRepository],
        () => console.log(` ${url} is ok`),
        (error: string) => console.log(`error: ${error}`)
      ).execute(url);
    });
  }
}
