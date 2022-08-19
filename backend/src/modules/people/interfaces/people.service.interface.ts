import { Person } from "../person.entity";
import { CreatePersonDTO } from "./createPerson.dto";

export interface IPeopleService {
  createPerson(createPersonDto: CreatePersonDTO): Promise<Person>;
  findAll(): Promise<Person[]>;
  findPersonById(id: string): Promise<Person>;
  updatePerson(id: string, updatePersonDTO: Partial<CreatePersonDTO>): Promise<Person>;
  deletePerson(id: string): Promise<void>;
}