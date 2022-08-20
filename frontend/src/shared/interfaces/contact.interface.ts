import { Person } from "./person.interface";

export interface Contact {
  id: string;
  type: string;
  value: string
  person: Person
}
