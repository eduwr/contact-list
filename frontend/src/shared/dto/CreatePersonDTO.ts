import { CreateContactDTO } from "./CreateContactDTO";

export interface CreatePersonDTO {
  name: string;
  contacts?: Omit<CreateContactDTO, "personId">[]
}
