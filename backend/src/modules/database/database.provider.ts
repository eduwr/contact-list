import { Container } from "../../shared/Container/container";
import { AppDataSource } from "./database.module";

export const databaseProvider = (c: Container) => {
  c.service('Database', c => AppDataSource);
}