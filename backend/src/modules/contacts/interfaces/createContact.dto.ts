import { Contact } from "../contact.entity";

export interface CreateContactDTO extends Omit<Contact, 'id'| 'person'> {

}