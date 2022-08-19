import { IContactsService } from "./interfaces/contacts.service.interface";
import { CreateContactDTO } from "./interfaces/createContact.dto";
import { Contact } from "./contact.entity";

export class ContactsService implements IContactsService{
  createContact(createPersonDto: CreateContactDTO): Promise<Contact> {
    throw new Error("Method not implemented")
  }

  deleteContact(id: string): Promise<void> {
    throw new Error("Method not implemented")
  }

  findAllByPersonId(personId:string): Promise<Contact[]> {
    throw new Error("Method not implemented")
  }

  findContactById(id: string): Promise<Contact> {
    throw new Error("Method not implemented")
  }

  updateContact(id: string, updateContactDTO: Partial<CreateContactDTO>): Promise<Contact> {
    throw new Error("Method not implemented")
  }
}