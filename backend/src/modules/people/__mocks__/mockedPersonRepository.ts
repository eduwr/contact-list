import { Repository } from "typeorm";
import { Person } from "../person.entity";

export const mockedPersonRepositoryInstance = {
  save: jest.fn(),
  find: jest.fn(),
  findOneByOrFail: jest.fn(),
  remove: jest.fn()
} as jest.MockedObject<Repository<Person>>
