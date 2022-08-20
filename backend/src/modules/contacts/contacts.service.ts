import { IContactsService } from "./interfaces/contacts.service.interface";
import { CreateContactDTO } from "./interfaces/createContact.dto";
import { Contact } from "./contact.entity";
import { Repository } from "typeorm";
import { IPeopleService } from "../people/interfaces/people.service.interface";
import { v4 as uuid } from "uuid";

export class ContactsService implements IContactsService {
  constructor(private contactsRepository: Repository<Contact>, private peopleServices: IPeopleService) {
  }

  async createContact({ personId, type, value }: CreateContactDTO): Promise<Contact> {
    if (!(personId && type && value)) {
      throw new Error("Bad Request");
    }

    const person = await this.peopleServices.findPersonById(personId);

    const contact = new Contact();
    contact.id = uuid();
    contact.value = value;
    contact.type = type;
    contact.person = person;

    return await this.contactsRepository.save(contact);
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
        id,
      },
    });
  }

  async updateContact(id: string, { personId, type, value }: Partial<CreateContactDTO>): Promise<Contact> {
    if (!id) {
      throw new Error("Bad Request");
    }

    if (!type && !value) {
      throw new Error("Bad Request");
    }

    console.log({value})

    const contact = await this.findContactById(id);

    contact.value = value || contact.value;
    contact.type = type || contact.type;

    return await this.contactsRepository.save(contact)
  }
}