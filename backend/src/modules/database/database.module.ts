import { DataSource } from "typeorm";
import "reflect-metadata"
import { Person } from "../people/person.entity";
import { Contact } from "../contacts/contact.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [Person, Contact],
  subscribers: [],
  migrations: [],
})


AppDataSource.initialize()
  .then(() => {
    console.log("Database Initialized")
  })
  .catch((error) => console.log(error))
