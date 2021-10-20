import { NextFunction, Request, Response } from 'express';
import { GetLastThreeMessagesService } from '../services/GetLastThreeMessagesService';

export class GetLastThreeMessagesController {
  public async execute(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { code } = req.body;

      const messages = new GetLastThreeMessagesService();

      const result = await messages.execute();

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }

  }
}
