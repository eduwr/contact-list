import { Repository } from "typeorm";
import { Contact } from "../contact.entity";

export const mockedContactsRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOneOrFail: jest.fn(),
  remove: jest.fn(),
} as jest.MockedObject<Repository<Contact>>;