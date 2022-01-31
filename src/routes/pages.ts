import { Router, Request, Response } from "express";

import { Page, pageValidationSchema } from "../models/pages";
import validate from "../middlewares/validate";
import sameTitleCheck from "../middlewares/sameTitleCheck";
import { ErrorEnum } from "../errors";

const router = Router();

router.post(
  "/",
  validate(pageValidationSchema),
  sameTitleCheck,
  async (req: Request, res: Response) => {
    let page: Page | void;
    try {
      page = await Page.create({title: req.body.title, content: req.body.content});
    }
    catch (error) {
      return res.status(500).send(ErrorEnum.SERVER_ERROR);
    }

    return res.status(201).json(page);
  }
);

router.get("/:pageTitle", async (req: Request, res: Response) => {
  let pages: Page[];
  try {
    pages = await Page.findAll({
    where: { title: req.params.pageTitle }
    });
  }
  catch (error) {
    return res.status(500).send(ErrorEnum.SERVER_ERROR);
  }

  if (pages.length < 1) {
    return res.status(404).send(ErrorEnum.PAGE_NOT_FOUND);
  }

  pages[0].increment('views');

  return res.status(200).json(pages[0]);
});

router.patch(
  "/:pageId",
  validate(pageValidationSchema),
  sameTitleCheck,
  async (req: Request, res: Response) => {
    let count: number;
    let pages: Page[];
    try {
      [count, pages] = await Page.update(
        { title: req.body.title, content: req.body.content },
        { where: { id: req.params.pageId }, returning: true }
      );
    }
    catch (error) {
      return res.status(500).send(ErrorEnum.SERVER_ERROR);
    }

    if (count < 1) {
      return res.status(404).send(ErrorEnum.PAGE_NOT_FOUND);
    }

    return res.status(200).json(pages[0]);
  }
);

export default router;