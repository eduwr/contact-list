import { RouterInterface } from "../../shared/interfaces/routes.interface";
import { Router } from "express";
import { ControllerInterface } from "../../shared/interfaces/controller.interface";

export class PeopleRoutes implements  RouterInterface {
  constructor(private router: Router, private peopleController: ControllerInterface) {
    this.router.get("/people", (req, res) => peopleController.index(req, res));
    this.router.get("/people/:id", (req, res) => peopleController.show(req, res));
    this.router.post("/people", (req, res) => peopleController.create(req, res));
    this.router.patch("/people/:id", (req, res) => peopleController.update(req, res));
    this.router.delete("/people/:id", (req, res) => peopleController.delete(req, res));
  }

  get routes() {
    return this.router;
  }
}