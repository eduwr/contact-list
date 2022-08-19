import { IPeopleService } from "./interfaces/people.service.interface";
import { Person } from "./person.entity";
import { CreatePersonDTO } from "./interfaces/createPerson.dto";

import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { CreateContactDTO } from "../contacts/interfaces/createContact.dto";
import { Contact } from "../contacts/contact.entity";

export class PeopleService implements IPeopleService {

  constructor(private readonly personRepository: Repository<Person>) {
  }

  private createContacts(contacts = [] as CreateContactDTO[]) {
    return contacts.map(contactDTO => {
      const contact = new Contact();
      contact.id = uuid();
      contact.type = contactDTO.type;
      contact.value = contactDTO.value;

      return contact;
    })

  }

  async createPerson(createPersonDto: CreatePersonDTO): Promise<Person> {
    if (!createPersonDto.name) {
      throw new Error("Bad Request");
    }

    const person = new Person();

    person.id = uuid();
    person.name = createPersonDto.name;
    person.contacts = this.createContacts(createPersonDto.contacts)

    try {
      return await this.personRepository.save(person);
    } catch (e) {
      throw new Error("Internal Server Error");
    }
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find({
      relations: {
        contacts: true
      }
    });
  }

  async findPersonById(id: string): Promise<Person> {
    if (!id) {
      throw new Error("Bad Request");
    }
    return await this.personRepository.findOneOrFail({
      where: { id },
      relations: {
        contacts: true
      }
    });
  }

  async updatePerson(id: string, updatePersonDTO: Partial<CreatePersonDTO>): Promise<Person> {
    if (!id || (!updatePersonDTO.name && !updatePersonDTO.contacts?.length)) {
      throw new Error("Bad Request");
    }

    let person: Person;
    try {
      person = await this.findPersonById(id);
    } catch (e) {
      throw new Error("Not Found");
    }

    try {
      person.name = updatePersonDTO.name || person.name;
      person = await this.personRepository.save(person);
    } catch (e) {
      throw new Error("Internal Server Error");
    }

    return person;
  }

  async deletePerson(id: string): Promise<void> {
    if (!id) {
      throw new Error("Bad Request");
    }

    let person = await this.findPersonById(id);


    if (!person) {
      new Error("Not Found");
    }

    await this.personRepository.remove(person);
  }
}