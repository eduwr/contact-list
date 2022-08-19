import { DataSource } from "typeorm";
import "reflect-metadata"
import { Person } from "../people/person.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "test",
  synchronize: true,
  logging: true,
  entities: [Person],
  subscribers: [],
  migrations: [],
})


AppDataSource.initialize()
  .then(() => {
    console.log("Database Initialized")
  })
  .catch((error) => console.log(error))
