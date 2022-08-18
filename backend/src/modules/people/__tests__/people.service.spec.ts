import { PeopleService } from "../people.service";
import { IPeopleService } from "../interfaces/people.service.interface";
import { CreatePersonDTO } from "../interfaces/createPerson.dto";

describe("People Service", () => {
  let peopleService: IPeopleService;
  beforeEach(() => {
    peopleService = new PeopleService();
  });

  describe("createPerson", () => {

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

    it("Should return a Person", async () => {
      const person = await peopleService.createPerson(createPersonDTO);
      expect(person.id).toBeDefined();
    });

    it("Should return the id of the new Person", async () => {
      const response = await peopleService.createPerson(createPersonDTO);
      expect(response.id).toBeDefined();
    });
  });
});