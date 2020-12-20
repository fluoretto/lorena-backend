import getConfig from "@root/config";
import { getConnectionManager } from "typeorm";
import path from "path";

const config = getConfig();

const connectionManager = getConnectionManager();
connectionManager.create({
  type: "postgres",
  host: config.dbHost,
  port: parseInt(config.dbPort),
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  entities: [
    path.join(__dirname, "../entity/**/*.js"),
    path.join(__dirname, "../entity/**/*.ts"),
  ],
  migrations: [
    path.join(__dirname, "../migration/**/*.js"),
    path.join(__dirname, "../migration/**/*.ts"),
  ],
  migrationsRun: true,
});

export const getDatabase = () => connectionManager.get();

export const startDatabase = async () => {
  const db = getDatabase();

  try {
    await db.connect();
  } catch {
    await startDatabase();
    return;
  }
};

export const endDatabase = async () => {
  const db = getDatabase();
  await db.close();
};
