import { Contact } from "./contact.interface";

export interface Person {
  id: string;
  name: string;
  contacts: Contact[]
}
