import { Container } from "./container";
import { peopleProvider } from "../../modules/people/people.provider";
import { databaseProvider } from "../../modules/database/database.provider";
import { appProvider } from "../../app";
import { contactsProvider } from "../../modules/contacts/contacts.provider";

export const createContainer = () => {
  const c = new Container();
  appProvider(c);
  peopleProvider(c);
  databaseProvider(c);
  contactsProvider(c);

  return c;
};