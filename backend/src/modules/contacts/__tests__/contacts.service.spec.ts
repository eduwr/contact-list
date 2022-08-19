import { IContactsService } from "../interfaces/contacts.service.interface";
import { ContactsService } from "../contacts.service";
import { Repository } from "typeorm";
import { Contact } from "../contact.entity";
import { mockedContactsRepository } from "../__mocks__/mockedContactsRepository";

describe("Contacts Service", () => {
  let contactsService: IContactsService;
  let contactsRepository: jest.MockedObject<Repository<Contact>>;
  beforeEach(() => {

    contactsRepository = mockedContactsRepository;
    contactsService = new ContactsService(contactsRepository);
  });

  describe("findAllByPersonId()", () => {
    beforeEach(() => {
      mockedContactsRepository.find.mockClear();
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
      await contactsService.findAllByPersonId("1"),
      await expect(
       contactsRepository.find
      ).toBeCalledTimes(1);
    });
  });
});