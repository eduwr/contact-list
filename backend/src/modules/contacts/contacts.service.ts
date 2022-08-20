import { IContactsService } from "./interfaces/contacts.service.interface";
import { CreateContactDTO } from "./interfaces/createContact.dto";
import { Contact } from "./contact.entity";
import { Repository } from "typeorm";
import { IPeopleService } from "../people/interfaces/people.service.interface";

export class ContactsService implements IContactsService {
  constructor(private contactsRepository: Repository<Contact>, private peopleServices: IPeopleService) {
  }

  createContact(createPersonDto: CreateContactDTO): Promise<Contact> {
    throw new Error("Method not implemented");
  }

  async deleteContact(id: string): Promise<void> {
    if (!id) {
      throw new Error("Bad Request");
    }

    const contract = await this.findContactById(id);
    await this.contactsRepository.remove(contract);
  }

  async findAllByPersonId(personId: string): Promise<Contact[]> {
    if (!personId) {
      throw new Error("Bad Request");
    }
    const person = await this.peopleServices.findPersonById(personId);

    return await this.contactsRepository.find({
      where: {
        person,
      },
    });
  }

  async findContactById(id: string): Promise<Contact> {
    if (!id) {
      throw new Error("Bad Request");
    }

    return await this.contactsRepository.findOneOrFail({
      where: {
        id
      }
    })
  }

  updateContact(id: string, updateContactDTO: Partial<CreateContactDTO>): Promise<Contact> {
    throw new Error("Method not implemented");
  }
}