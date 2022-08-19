import { Container } from "../../shared/Container/container";
import { Person } from "./person.entity";
import { PeopleService } from "./people.service";
import { PeopleRoutes } from "./people.routes";
import express from "express";

export const peopleProvider = (c: Container) => {
  c.service('PeopleRoutes', c => new PeopleRoutes(express.Router()))
  c.service('PeopleRepository', c => c.Database.getRepository(Person));
  c.service('PeopleService', c => new PeopleService(c.PeopleRepository));
}
