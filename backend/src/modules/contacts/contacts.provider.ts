import { Container } from "../../shared/Container/container";
import express from "express";
import { ContactsRoutes } from "./contacts.routes";
import { ContactsService } from "./contacts.service";
import { ContactsController } from "./contacts.controller";
import { Contact } from "./contact.entity";

export const contactsProvider = (c: Container) => {
  c.service("ContactsRoutes", c => new ContactsRoutes(express.Router(), c.ContactsController));
  c.service("ContactsRepository", c => c.Database.getRepository(Contact));
  c.service("ContactsService", c => new ContactsService(c.ContactsRepository, c.PeopleService));
  c.service("ContactsController", c => new ContactsController(c.ContactsService));
};
