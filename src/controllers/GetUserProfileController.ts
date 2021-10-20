import { NextFunction, Request, Response } from 'express';
import { GetUserProfileService } from '../services/GetUserProfileService';

export class GetUserProfileController {
  public async execute(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { user_id } = req;

      const user = new GetUserProfileService();

      const result = await user.execute(user_id);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }

  }
}
