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
      name: "Kakashi",
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
      [ naruto, sasuke ] = createPeople();
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
      const MOCKED_RESPONSE = [ naruto, sasuke ];
      personRepository.find.mockResolvedValueOnce(MOCKED_RESPONSE);
      const response = await peopleService.findAll();
      expect(response.length).toBe(2);
      response.forEach((person, idx) => {
        expect(person.name).toBe(MOCKED_RESPONSE[idx].name);
        expect(person.id).toBe(MOCKED_RESPONSE[idx].id);
      });
      expect(response.length).toBe(2);
    });
  });

  describe("findPersonById()", () => {
    beforeEach(() => {
      personRepository.findOneByOrFail.mockClear();
      [ naruto ] = createPeople(1);

    });

    it("Should throw if called with wrong parameters", async () => {
      await expect(async () => {
        await peopleService.findPersonById("");
      }).rejects.toThrow();
    });

    it("Should throw if user not found", async () => {
      personRepository.findOneByOrFail.mockRejectedValueOnce(new Error("Not Found"));
      await expect(async () => {
        await peopleService.findPersonById("1234");
      }).rejects.toThrow();
    });

    it("Should NOT throw if user found", async () => {
      personRepository.findOneByOrFail.mockResolvedValueOnce(naruto);
      await expect(
        peopleService.findPersonById("1234"),
      ).resolves.not.toThrow();
    });

    it("Should call repository with correct parameters", async () => {
      await peopleService.findPersonById("1234");
      expect(
        personRepository.findOneByOrFail,
      ).toBeCalledWith({ id: "1234" });
    });
  });

  describe("updatePerson()", () => {
    let updatePersonDTO: Partial<CreatePersonDTO>;
    beforeEach(() => {
      personRepository.findOneByOrFail.mockClear();
      personRepository.save.mockClear();
      updatePersonDTO = {
        name: "Sakura",
      };
    });

    it("Should throw if called with wrong parameters", async () => {
      await expect(async () => {
        await peopleService.updatePerson("", {} as Partial<CreatePersonDTO>);
      }).rejects.toThrow();
    });

    it("Should NOT throw if called with correct parameters", async () => {
      personRepository.save.mockResolvedValueOnce({ ...naruto, name: "Sakura" });
      personRepository.findOneByOrFail.mockResolvedValueOnce(naruto);
      await expect(
        peopleService.updatePerson(naruto.id, updatePersonDTO),
      ).resolves.not.toThrow();
    });

    it("Should throw if person not found", async () => {
      personRepository.findOneByOrFail.mockRejectedValueOnce(new Error("Not Found"));
      await expect(async () => {
        await peopleService.updatePerson("1234", updatePersonDTO);
      }).rejects.toThrow();
    });
  });

  describe("deletePerson()", () => {
    beforeEach(() => {
      personRepository.remove.mockClear();
      [ naruto ] = createPeople(1);
    });

    it("Should throw if called with incorrect parameters", async () => {
      await expect(async () => {
        await peopleService.deletePerson("");
      }).rejects.toThrow();
    });

    it("Should NOT throw if called with correct parameters", async () => {
      await expect(
        peopleService.deletePerson(naruto.id),
      ).resolves.not.toThrow();
    });

    it("Should throw if person not found", async () => {
      personRepository.findOneByOrFail.mockRejectedValueOnce(new Error("Not Found"));
      await expect(async () => {
        await peopleService.deletePerson("1234");
      }).rejects.toThrow();
    });

    it("Should call repository with correct parameters", async () => {
      personRepository.findOneByOrFail.mockResolvedValueOnce(naruto);
      await peopleService.deletePerson(naruto.id);
      expect(
        personRepository.remove,
      ).toBeCalledWith(naruto);
    });
  });
});