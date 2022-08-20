import { IContactsService } from "../interfaces/contacts.service.interface";
import { ContactsService } from "../contacts.service";
import { Repository } from "typeorm";
import { Contact } from "../contact.entity";
import { mockedContactsRepository } from "../__mocks__/mockedContactsRepository";
import { IPeopleService } from "../../people/interfaces/people.service.interface";
import { mockedPeopleService } from "../__mocks__/mockedPeopleService";
import { Person } from "../../people/person.entity";
import { createPeople } from "../../people/__mocks__/utils/createPeople";
import { createContacts } from "../__mocks__/utils/createContact";

describe("Contacts Service", () => {
  let contactsService: IContactsService;
  let contactsRepository: jest.MockedObject<Repository<Contact>>;
  let peopleServices: jest.MockedObject<IPeopleService>;
  let naruto: Person;
  let narutoPhone: Contact

  beforeEach(() => {
    peopleServices = mockedPeopleService;
    contactsRepository = mockedContactsRepository;
    contactsService = new ContactsService(contactsRepository, peopleServices);
    [narutoPhone] = createContacts(1)
  });

  describe("findAllByPersonId()", () => {
    beforeEach(() => {
      mockedContactsRepository.find.mockClear();
      peopleServices.findPersonById.mockClear();
      [ naruto ] = createPeople(1);
    });

    it("Should throw if called without personId", async () => {
      await expect(async () => {
        await contactsService.findAllByPersonId("");
      }).rejects.toThrow();
    });

    it("Should NOT throw if called with a valid personId", async () => {
      await expect(
        contactsService.findAllByPersonId("1"),
      ).resolves.not.toThrow();
    });

    it("Should call contactsRepository Once", async () => {
      await contactsService.findAllByPersonId("1");
      await expect(
        contactsRepository.find,
      ).toBeCalledTimes(1);
    });

    it("Should throw if contactsRepository throws", async () => {
      contactsRepository.find.mockRejectedValueOnce(new Error("Internal Server Error"));
      await expect(
        async () => await contactsService.findAllByPersonId("personId"),
      ).rejects.toThrow();
    });

    it("Should call peopleServices with correct parameters", async () => {
      const PERSON_ID = "personId";
      await contactsService.findAllByPersonId(PERSON_ID);

      await expect(
        peopleServices.findPersonById,
      ).toBeCalledWith(PERSON_ID);
    });

    it("Should throw if person not found", async () => {
      peopleServices.findPersonById.mockRejectedValueOnce(new Error("Not Found"));
      await expect(
        async () => await contactsService.findAllByPersonId("personId"),
      ).rejects.toThrow();
    });

    it("Should call contactsRepository.find with correct parameters", async () => {
      peopleServices.findPersonById.mockResolvedValueOnce(naruto);
      await contactsService.findAllByPersonId(naruto.id);
      await expect(
        contactsRepository.find,
      ).toBeCalledWith({
        where: {
          person: naruto,
        },
      });
    });
  });

  describe("deleteContact()", () => {

    beforeEach(() => {
      contactsRepository.findOneOrFail.mockClear();
      contactsRepository.remove.mockClear();
    });

    it("Should throw if called without id", async () => {
      await expect(async () => {
        await contactsService.deleteContact("");
      }).rejects.toThrow();
    });

    it("Should NOT throw if called with a valid id", async () => {
      await expect(contactsService.deleteContact("random_id"),
      ).resolves.not.toThrow();
    });


    it("Should call findContactById Once", async () => {
      await contactsService.deleteContact("1");
      await expect(
        contactsRepository.findOneOrFail,
      ).toBeCalledTimes(1);
    });

    it("Should throw if repository throws", async () => {
      contactsRepository.remove.mockRejectedValueOnce(new Error());
      await expect(
        async () => await contactsService.deleteContact("1"),
      ).rejects.toThrow();
    });

    it("Should not throw if repository resolves", async () => {
      contactsRepository.remove.mockResolvedValue({ id: "any", type: "any", person: naruto, value: "any" });
      await expect(
        contactsService.deleteContact("1"),
      ).resolves.not.toThrow();
    });
  });

  describe("findContactById()", () => {
    beforeEach(() => {
      contactsRepository.findOneOrFail.mockClear()
    })
    it("Should throw if called without id", async () => {
      await expect(async () => {
        await contactsService.findContactById("");
      }).rejects.toThrow();
    })

    it("Should NOT throw if called with a valid id", async () => {
      await expect(contactsService.findContactById("random_id"),
      ).resolves.not.toThrow();
    });

    it("Should call repository once", async () => {
      await contactsService.findContactById("1");
      await expect(
        contactsRepository.findOneOrFail,
      ).toBeCalledTimes(1);
    });

    it("Should return a contact if repository resolves", async () => {
       contactsRepository.findOneOrFail.mockResolvedValueOnce(narutoPhone);
       await expect(await contactsService.findContactById(narutoPhone.id)).toBe(narutoPhone)
    })

    it("Should throw an error if repository rejects to throw", async () => {
      contactsRepository.findOneOrFail.mockRejectedValueOnce(new Error());
      await expect(async () => await contactsService.findContactById(narutoPhone.id)).rejects.toThrow()
    })
  })
});