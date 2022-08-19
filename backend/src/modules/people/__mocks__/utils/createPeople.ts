import { Person } from "../../person.entity";

export const createPeople = (n = 2): Person[] =>
  Array
    .from({ length: n }, () => new Person())
    .map((person, idx) => {
      person.id = idx.toString();
      person.name = `person-${idx}`;
      return person;
    });