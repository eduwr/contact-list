import { RouterInterface } from "../../shared/interfaces/routes.interface";
import { Router } from "express";
import { ControllerInterface } from "../../shared/interfaces/controller.interface";

export class PeopleRoutes implements  RouterInterface {
  constructor(private router: Router, private peopleController: ControllerInterface) {
    this.router.get("/people", (req, res) => peopleController.index(req, res));
    this.router.get("/people/:id", (req, res) => console.log("/people/:id"));
    this.router.post("/people", (req, res) => peopleController.create(req, res));
    this.router.patch("/people/:id", (req, res) => console.log("PATCH /people/:id"));
    this.router.delete("/people/:id", (req, res) => console.log("DELETE /people/:id"));
  }

  get routes() {
    return this.router;
  }
}