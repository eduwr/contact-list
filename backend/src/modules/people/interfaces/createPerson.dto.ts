import { Contact } from "../../contacts/contact.entity";

export interface CreatePersonDTO {
  name: string;
  contacts?: Omit<Contact, 'id'| 'personId'>[]
}