import { ControllerInterface } from "../../shared/interfaces/controller.interface";

import { Request, Response } from "express";
import { IContactsService } from "./interfaces/contacts.service.interface";

export class ContactsController implements ControllerInterface {
  constructor(private contactsService: IContactsService) {
  }

  async create(req: Request, res: Response): Promise<void> {
    const {personId} = req.params;
    const { type, value } = req.body
    try {
      const contact = await this.contactsService.createContact({ personId, type, value });
      res.status(201);
      res.send(contact);
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.contactsService.deleteContact(id);
      res.status(204);
      res.send();
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  }

  async index(req: Request, res: Response): Promise<void> {
    const { personId } = req.params;
    console.log({personId})
    try {
      const contacts = await this.contactsService.findAllByPersonId(personId);
      res.status(200);
      res.send(contacts);
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  }

  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const contact = await this.contactsService.findContactById(id);
      res.status(200);
      res.send(contact);
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const dto = req.body;
    try {
      const contact = await this.contactsService.updateContact(id, dto);
      res.status(200);
      res.send(contact);
    } catch (e) {
      res.status(400);
      res.send(e);
    }
  }
}