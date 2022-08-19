import { Contact } from "../contacts/contact.entity";
import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";

@Entity()
export class Person {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Contact, (contact) => contact.person, {
    cascade: ["insert", "update", "remove"],
  })
  @JoinColumn()
  contacts: Contact[]
}