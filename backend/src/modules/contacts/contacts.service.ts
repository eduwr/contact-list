import { IContactsService } from "./interfaces/contacts.service.interface";
import { CreateContactDTO } from "./interfaces/createContact.dto";
import { Contact } from "./contact.entity";
import { Repository } from "typeorm";

export class ContactsService implements IContactsService{
  constructor(private contactsRepository: Repository<Contact>) {
  }
  createContact(createPersonDto: CreateContactDTO): Promise<Contact> {
    throw new Error("Method not implemented")
  }

  deleteContact(id: string): Promise<void> {
    throw new Error("Method not implemented")
  }

  async findAllByPersonId(personId:string): Promise<Contact[]> {
    if(!personId) {
      throw new Error("Bad Request")
    }

    return await this.contactsRepository.find()
  }

  findContactById(id: string): Promise<Contact> {
    throw new Error("Method not implemented")
  }

  updateContact(id: string, updateContactDTO: Partial<CreateContactDTO>): Promise<Contact> {
    throw new Error("Method not implemented")
  }
}