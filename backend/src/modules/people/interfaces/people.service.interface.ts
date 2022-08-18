import { Person } from "../person.entity";
import { CreatePersonDTO } from "./createPerson.dto";
import { EntityCreatedResponse } from "../../../shared/types/EntityResponse";

export interface IPeopleService {
  createPerson(createPersonDto: CreatePersonDTO): Promise<EntityCreatedResponse>;

  findAll(): Person[];

  getPersonById(id: string): Person;

  updatePerson(): Person;
  deletePerson(): void;
}