import { IPeopleService } from "./interfaces/people.service.interface";
import { Person } from "./person.entity";
import { CreatePersonDTO } from "./interfaces/createPerson.dto";

import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";

export class PeopleService implements IPeopleService {

  constructor(private readonly personRepository: Repository<Person>) {
  }


  async createPerson(createPersonDto: CreatePersonDTO): Promise<Person> {
    if (!createPersonDto.name) {
      throw new Error("Bad Request");
    }

    const person = new Person();
    person.name = createPersonDto.name;
    person.id = uuid();

    try {
      return await this.personRepository.save(person);
    } catch (e) {
      throw new Error("Internal Server Error");
    }
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find();
  }

  async findPersonById(id: string): Promise<Person> {
    if (!id) {
      throw new Error("Bad Request");
    }
    return await this.personRepository.findOneByOrFail({
      id,
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