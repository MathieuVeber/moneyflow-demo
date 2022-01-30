import { Request, Response, NextFunction } from "express";
import Joi from "joi";

import { ErrorEnum } from "../errors";

const validate =
  (validationSchema: Joi.ObjectSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = validationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(ErrorEnum.BAD_REQUEST);
    }
    req.body = value;
    next();
  };

export default validate;