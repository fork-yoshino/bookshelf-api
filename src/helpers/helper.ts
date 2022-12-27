import { NextFunction, Request, Response } from 'express';

export function requestErrorHandler(controller: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
      return;
    } catch (err) {
      next(err);
    }
  };
}
