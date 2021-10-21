import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from 'jsonwebtoken';
import { AppError } from "../errors/AppError";

export async function ensureAuthentication(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError('Missing authorization token', 400);
    }

    const [, token] = authorization.split(' ');

    if (!token) throw new AppError('Missing authorization token', 400);

    const payload = verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user_id = payload.sub as string;

    return next();
  } catch (error) {
    return next(new AppError('Invalid token', 400));
  }
}
