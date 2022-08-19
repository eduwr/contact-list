import { Person } from "../person.entity";
import { CreatePersonDTO } from "./createPerson.dto";

export interface IPeopleService {
  createPerson(createPersonDto: CreatePersonDTO): Promise<Person>;

  findAll(): Person[];

  getPersonById(id: string): Person;

  updatePerson(): Person;
  deletePerson(): void;
}