import { Contact } from "../../contact.entity";
import { Person } from "../../../people/person.entity";

export const createContacts = (n = 2): Contact[] =>
  Array
    .from({ length: n }, () => new Contact())
    .map((contact, idx) => {
      contact.id = idx.toString();
      contact.type = `contact-${idx}`;
      contact.value = `contact-${idx}`;
      contact.person = new Person()
      return contact;
    });