import { Person } from "../person.entity";
import { CreatePersonDTO } from "./createPerson.dto";

export interface IPeopleService {
  createPerson(createPersonDto: CreatePersonDTO): Promise<Person>;

  findAll(): Promise<Person[]>;

  getPersonById(id: string): Promise<Person>;

  updatePerson(): Promise<Person>;
  deletePerson(): Promise<void>;
}