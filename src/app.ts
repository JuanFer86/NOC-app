import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { PrismaClient } from "./generated/prisma";
import { Server } from "./presentation/server";
import "dotenv/config";

(() => {
  main();
})();

async function main() {
  // console.log(envs);

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // create a colection = table, document = row
  // const newLog = await LogModel.create({
  //   message: "Test message from Mongo",
  //   origin: "App.ts",
  //   level: "low",
  // });

  // await newLog.save();

  // console.log(newLog);

  // Prisma, relational database, Postgres
  // const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "HIGH",
  //     message: "Test message",
  //     origin: "App.ts",
  //   },
  // });

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "HIGH",
  //   },
  // });

  // console.log(logs);

  // const logs = await LogModel.find();
  // console.log(logs);

  Server.start();
}
