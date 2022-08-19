import { CreateContactDTO } from "./createContact.dto";
import { Contact } from "../contact.entity";


export interface IContactsService {
  createContact(createPersonDto: CreateContactDTO): Promise<Contact>;
  findAllByPersonId(personId: string): Promise<Contact[]>;
  findContactById(id: string): Promise<Contact>;
  updateContact(id: string, updateContactDTO: Partial<CreateContactDTO>): Promise<Contact>;
  deleteContact(id: string): Promise<void>;
}