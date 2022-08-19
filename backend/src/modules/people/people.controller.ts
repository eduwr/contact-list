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
      res.send(e)
    }
  }

  delete(req: Request, res: Response): Promise<void> {
    return Promise.resolve(undefined);
  }

  show(req: Request, res: Response): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(req: Request, res: Response): Promise<void> {
    return Promise.resolve(undefined);
  }
}