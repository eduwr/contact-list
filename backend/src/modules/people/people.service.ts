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

  deletePerson(): void {
    throw new Error("Method not implemented");
  }

  findAll(): Person[] {
    return [];
  }

  getPersonById(id: string): Person {
    throw new Error("Method not implemented");
  }

  updatePerson(): Person {
    throw new Error("Method not implemented");
  }
}