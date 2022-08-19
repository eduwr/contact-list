import { Contact } from "../contacts/contact.entity";
import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Person {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}