import { CronJob } from "cron";

type CrontTime = string | Date;
type OnTick = () => void;

export class CronService {
  static createJob(cronTime: CrontTime, onTick: OnTick): CronJob {
    const job = new CronJob(cronTime, onTick);

    job.start();

    return job;
  }
}
