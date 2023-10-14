import { Request, Response } from "express";
import httpStatus from "http-status";
import { BuildsService } from "../services/builds.services";
import { BuildRouteParams } from "protocols";

async function create(_req: Request, res: Response) {
  const id = await BuildsService.create();

  res.status(httpStatus.CREATED).send(id);
}

async function read(req: Request, res: Response) {
  const { id } = req.params as BuildRouteParams;

  const build = await BuildsService.read(parseInt(id));

  res.status(httpStatus.OK).send(build);
}

async function update(req: Request, res: Response) {
  const { id } = req.params as BuildRouteParams;

  await BuildsService.update(parseInt(id));

  res.sendStatus(httpStatus.NO_CONTENT);
}

async function del(req: Request, res: Response) {
  const { id } = req.params as BuildRouteParams;

  await BuildsService.del(parseInt(id));

  res.sendStatus(httpStatus.NO_CONTENT);
}

export const BuildsController = {
  create,
  read,
  update,
  del,
};
