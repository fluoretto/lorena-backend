import _ from "lodash";
import { Config, DefaultConfig, EnvConfig } from "@root/types";

import getDevConfig from "./dev";
import getProdConfig from "./prod";

function getDefaultConfig(env: string): DefaultConfig {
  return {
    dev: env === "development",
    network: process.env.NETWORK || "None",
    server: process.env.SERVER || "None",
    dbHost: process.env.POSTGRES_HOST,
    dbName: process.env.POSTGRES_DB_NAME,
    dbUser: process.env.POSTGRES_USER,
    dbPassword: process.env.POSTGRES_PASSWORD,
    dbPort: process.env.POSTGRES_PORT,
    redisHost: process.env.REDIS_HOST,
  };
}

function getEnvConfig(env: string): EnvConfig {
  switch (env) {
    case "development":
      return getDevConfig();

    default:
      return getProdConfig();
  }
}

function getConfig(): Config {
  const env = process.env.NODE_ENV || "development";

  const defaultConfig = getDefaultConfig(env);
  const envConfig = getEnvConfig(env);

  return _.merge<DefaultConfig, EnvConfig>(defaultConfig, envConfig);
}

export default getConfig;
module.exports = getConfig;
