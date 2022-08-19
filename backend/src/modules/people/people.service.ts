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

  deletePerson(): Promise<void> {
    throw new Error("Method not implemented");
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find()
  }

  getPersonById(id: string): Promise<Person> {
    throw new Error("Method not implemented");
  }

  updatePerson(): Promise<Person> {
    throw new Error("Method not implemented");
  }
}