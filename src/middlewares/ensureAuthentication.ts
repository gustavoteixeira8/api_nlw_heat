import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from 'jsonwebtoken';

export async function ensureAuthentication(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Missing authorization token');
    }

    const [, token] = authorization.split(' ');

    const payload = verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user_id = payload.sub as string;

    return next();
  } catch (error) {
    return next(error);
  }
}
