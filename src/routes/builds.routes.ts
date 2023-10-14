import {
  RequestOptions,
  validateSchema,
} from "../middlewares/validateSchema.middleware";
import { BuildsController } from "../controllers/builds.controller";
import { Router } from "express";
import { BuildsSchemas } from "../schemas/Builds.schema";

const buildsRouter = Router();

buildsRouter.post("/build", BuildsController.create);

buildsRouter.get(
  "/build/:id",
  validateSchema(BuildsSchemas.locator, RequestOptions.params),
  BuildsController.read
);

buildsRouter.put(
  "/build/:id",
  validateSchema(BuildsSchemas.locator, RequestOptions.params),
  BuildsController.update
);

buildsRouter.delete(
  "/build/:id",
  validateSchema(BuildsSchemas.locator, RequestOptions.params),
  BuildsController.del
);

export { buildsRouter };
