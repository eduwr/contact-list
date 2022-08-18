import { Contact } from "../contacts/contact.entity";

export class Person {
  id: string;
  name: string;
  contacts: Contact[];

  constructor({ name = "", contacts = [] }) {
    this.id = "1"
    this.name = name
    this.contacts = contacts
  }
}