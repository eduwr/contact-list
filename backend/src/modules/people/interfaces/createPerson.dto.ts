import { CreateContactDTO } from "../../contacts/interfaces/createContact.dto";

export interface CreatePersonDTO {
  name: string;
  contacts?: CreateContactDTO[]
}