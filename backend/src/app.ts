import express from "express";
import dotenv from "dotenv";
import { RouterInterface } from "./shared/interfaces/routes.interface";
import { Container } from "./shared/Container/container";
import cors from "cors";

dotenv.config();

export interface AppInterface {
  start(port?: number): void;
}

export class App implements AppInterface {
  constructor(private routes: RouterInterface[]) {}

  start(port = 8000) {
    const app = express();

    app.use(cors());

    app.use(express.json());

    this.routes.forEach((route) => {
      app.use(route.routes);
    });

    app.listen(port, () => {
      console.log(`🚀 App listening on port ${port}!`);
    });
  }
}

export const appProvider = (c: Container) => {
  c.service("App", (c) => new App([c.PeopleRoutes, c.ContactsRoutes]));
};
