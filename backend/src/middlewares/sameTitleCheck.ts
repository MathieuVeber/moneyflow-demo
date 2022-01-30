import { Request, Response, NextFunction } from "express";

import { Page } from "../models/pages";
import { ErrorEnum } from "../errors";

/**
 * Must be used after `validate` middleware
 */
const sameTitleCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let pages: Page[];
  try {
    pages = await Page.findAll({ where: { title: req.body.title } });
  } catch (error) {
    return res.status(500).send(ErrorEnum.SERVER_ERROR);
  }
  if ( pages.length !== 0
    && !pages.find(page => page.id.toString() === req.params.pageId)
  ) {
    return res.status(400).send(ErrorEnum.SAME_TITLE);
  }
  next();
};

export default sameTitleCheck;