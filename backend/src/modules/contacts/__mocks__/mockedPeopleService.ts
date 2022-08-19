import { IPeopleService } from "../../people/interfaces/people.service.interface";

export const mockedPeopleService = {
  findPersonById: jest.fn(),
} as jest.MockedObject<IPeopleService>;