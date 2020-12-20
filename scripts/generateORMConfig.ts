import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: ".env.dev" });

const configContent = `{
  "type": "postgres",
  "host": "localhost",
  "port": ${process.env.POSTGRES_PORT},
  "username": "${process.env.POSTGRES_USER}",
  "password": "${process.env.POSTGRES_PASSWORD}",
  "database": "${process.env.POSTGRES_DB_NAME}",
  "migrationsTableName": "migrations",
  "entities": [
    "src/entity/**/*.ts"
  ],
  "migrations": [
    "src/migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ]
}`;

fs.writeFileSync("./ormconfig.json", configContent);
