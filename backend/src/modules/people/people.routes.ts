import { RouterInterface } from "../../shared/interfaces/routes.interface";
import { Router } from "express";

export class PeopleRoutes implements  RouterInterface {
  constructor(private router: Router) {
    this.router.get("/people", (req, res) => console.log("/people"));
    this.router.get("/people/:id", (req, res) => console.log("/people/:id"));
    this.router.post("/people", (req, res) => console.log("POST /people/:id"));
    this.router.patch("/people/:id", (req, res) => console.log("PATCH /people/:id"));
    this.router.delete("/people/:id", (req, res) => console.log("DELETE /people/:id"));
  }

  get routes() {
    return this.router;
  }
}