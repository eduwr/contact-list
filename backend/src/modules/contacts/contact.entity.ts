import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Person } from "../people/person.entity";

@Entity()
export class Contact {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  value: string;

  @ManyToOne(() => Person, (person) => person.contacts, { onDelete: "CASCADE" })
  person: Person;
}
