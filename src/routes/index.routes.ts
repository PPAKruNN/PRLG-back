import { Router } from "express";
import { buildsRouter } from "./builds.routes";

const IndexRouter = Router();

IndexRouter.use(buildsRouter);

export { IndexRouter };
