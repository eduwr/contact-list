import { IContactsService } from "../interfaces/contacts.service.interface";
import { ContactsService } from "../contacts.service";

describe("Contacts Service", () => {
  let contactsService: IContactsService;
  beforeEach(() => {
    contactsService = new ContactsService();
  })

  describe("findAllByPersonId()", () => {
    it("Should throw if called without personId", async () => {
      await expect(async () => {
        await contactsService.findAllByPersonId("");
      }).rejects.toThrow();
    })

    it("Should NOT throw if called with a valid personId", async () => {
      await expect(
        contactsService.findAllByPersonId("1"),
      ).resolves.not.toThrow();
    })
  })
})