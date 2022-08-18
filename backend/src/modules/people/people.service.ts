import { IPeopleService } from "./interfaces/people.service.interface";
import { Person } from "./person.entity";
import { CreatePersonDTO } from "./interfaces/createPerson.dto";
import { EntityCreatedResponse } from "../../shared/types/EntityResponse";

export class PeopleService implements IPeopleService{

  async createPerson(createPersonDto: CreatePersonDTO): Promise<EntityCreatedResponse> {
    if(!createPersonDto.name) {
      throw new Error("Bad Request")
    }

    const person = new Person({
      name: createPersonDto.name,
    })
    return {
      id: person.id
    }
  }

  deletePerson(): void {
    throw new Error("Method not implemented")
  }

  findAll(): Person[] {
    return [];
  }

  getPersonById(id: string): Person {
    throw new Error("Method not implemented")
  }

  updatePerson(): Person {
    throw new Error("Method not implemented")
  }



}