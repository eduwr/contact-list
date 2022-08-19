import { Container } from "./container";
import {peopleProvider} from "../../modules/people/people.provider"
import { databaseProvider } from "../../modules/database/database.provider";
import { appProvider } from "../../app";

export const createContainer = () => {
  const c = new Container();
  appProvider(c)
  peopleProvider(c)
  databaseProvider(c)

  return c;
};