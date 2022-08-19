import "reflect-metadata"
import { createContainer } from "./shared/Container";
import { AppInterface } from "./app";

const c = createContainer();

const app = c.App as AppInterface;

app.start()