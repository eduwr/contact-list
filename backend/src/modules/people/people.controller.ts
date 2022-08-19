import { Request, Response } from "express";
import { ControllerInterface } from "../../shared/interfaces/controller.interface";
import { IPeopleService } from "./interfaces/people.service.interface";
import { CreatePersonDTO } from "./interfaces/createPerson.dto";

export class PeopleController implements ControllerInterface {

  constructor(private peopleService: IPeopleService) {
  }

  async index(req: Request, res: Response): Promise<void> {
    const people = await this.peopleService.findAll();
    res.status(200);
    res.send(people);
  }

  async create(req: Request, res: Response): Promise<void> {
    const { name, contacts } = req.body as CreatePersonDTO;
    try {
      const person = await this.peopleService.createPerson({ name, contacts });
      res.status(201);
      res.send(person);
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.peopleService.deletePerson(id);
      res.status(204);
      res.send()
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  }

  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const person = await this.peopleService.findPersonById(id);
      res.status(200);
      res.send(person);
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, contacts } = req.body as CreatePersonDTO;
    try {
      const person = await this.peopleService.updatePerson(id, { name, contacts });
      res.status(200);
      res.send(person);
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  }
}