import { DataSource } from "typeorm";
import "reflect-metadata";
import { Person } from "../people/person.entity";
import { Contact } from "../contacts/contact.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
  username: "postgres",
  password: "example",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [Person, Contact],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database Initialized");
  })
  .catch((error) => console.log(error));
