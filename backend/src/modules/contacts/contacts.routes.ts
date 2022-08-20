import { Router } from "express";
import { ControllerInterface } from "../../shared/interfaces/controller.interface";
import { RouterInterface } from "../../shared/interfaces/routes.interface";

export class ContactsRoutes implements  RouterInterface {
  constructor(private router: Router, private contactsController: ControllerInterface) {
    this.router.get("/people/:personId/contacts", (req, res) => contactsController.index(req, res));
    this.router.get("/contacts/:id", (req, res) => contactsController.show(req, res));
    this.router.post("/people/:personId/contacts", (req, res) => contactsController.create(req, res));
    this.router.patch("/contacts/:id", (req, res) => contactsController.update(req, res));
    this.router.delete("/contacts/:id", (req, res) => contactsController.delete(req, res));
  }

  get routes() {
    return this.router;
  }
}