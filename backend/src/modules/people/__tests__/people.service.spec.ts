import { PeopleService } from "../people.service";
import { IPeopleService } from "../interfaces/people.service.interface";
import { CreatePersonDTO } from "../interfaces/createPerson.dto";
import { mockedPersonRepositoryInstance } from "../__mocks__/mockedPersonRepository";
import { Repository } from "typeorm";
import { Person } from "../person.entity";

describe("People Service", () => {
  let peopleService: IPeopleService;
  let personRepository: jest.MockedObject<Repository<Person>>;
  let naruto: Person;
  let sasuke: Person;

  const createPeople = (n = 2): Person[] =>
    Array
      .from({ length: n }, () => new Person())
      .map((person, idx) => {
        person.id = idx.toString();
        person.name = `person-${idx}`;
        return person;
      });

  beforeEach(() => {
    personRepository = mockedPersonRepositoryInstance;
    peopleService = new PeopleService(personRepository);
  });

  describe("createPerson()", () => {

    beforeEach(() => {
      personRepository.save.mockClear();
    });

    let createPersonDTO: CreatePersonDTO = {
      contacts: [],
      name: "Eduardo",
    };

    it("Should throw if called with wrong parameters", async () => {
      await expect(async () => {
        await peopleService.createPerson({} as CreatePersonDTO);
      }).rejects.toThrow();
    });

    it("Should NOT throw if called with correct parameters", async () => {
      await expect(
        peopleService.createPerson(createPersonDTO),
      ).resolves.not.toThrow();
    });

    it("Should throw if repository rejects", async () => {
      personRepository.save.mockRejectedValueOnce(new Error("Internal Server Error"));
      await expect(
        async () => await peopleService.createPerson(createPersonDTO),
      ).rejects.toThrow();
    });


    it("Should call the user repository once", async () => {
      await peopleService.createPerson(createPersonDTO);
      expect(personRepository.save).toBeCalledTimes(1);
    });

    it("Should return a Person", async () => {
      const person = new Person();
      person.id = "defined";
      person.name = createPersonDTO.name;
      personRepository.save.mockResolvedValue(person);
      const response = await peopleService.createPerson(createPersonDTO);
      expect(response.id).toBe("defined");
      expect(response.name).toBe(createPersonDTO.name);
    });


  });

  describe("findAll()", () => {
    beforeEach(() => {
      personRepository.find.mockClear();
      [naruto, sasuke] = createPeople()
    });

    it("Should call the userRepository.find once", async () => {
      await peopleService.findAll();
      expect(
        personRepository.save,
      ).toBeCalledTimes(1);
    });

    it("Should throw if repository rejects", async () => {
      personRepository.find.mockRejectedValueOnce(new Error("Internal Server Error"));
      await expect(async () => await peopleService.findAll()).rejects.toThrow();
    });

    it("Should return a list of people from repository", async () => {
      const MOCKED_RESPONSE = [naruto, sasuke]
      personRepository.find.mockResolvedValueOnce(MOCKED_RESPONSE);
      const response = await peopleService.findAll();
      expect(response.length).toBe(2)
      response.forEach((person, idx) => {
        expect(person.name).toBe(MOCKED_RESPONSE[idx].name)
        expect(person.id).toBe(MOCKED_RESPONSE[idx].id)
      })
      expect(response.length).toBe(2)

    });
  });
});