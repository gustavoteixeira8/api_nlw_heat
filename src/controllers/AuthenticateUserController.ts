import { NextFunction, Request, Response } from 'express';
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthenticateUserController {
  public async execute(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { code } = req.body;

      const authUser = new AuthenticateUserService();

      const result = await authUser.execute(code as string);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }

  }
}
