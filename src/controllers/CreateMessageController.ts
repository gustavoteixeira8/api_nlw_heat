import { NextFunction, Request, Response } from "express";
import { io } from "../app";
import { CreateMessageService } from "../services/CreateMessageService";

export class CreateMessageController {
  public async execute(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { text } = req.body;
      const user_id = req.user_id;

      const createMessage = new CreateMessageService();
      const result = await createMessage.execute(text, user_id);

      const messageData = {
        message: { text: result.text, user_id: result.user_id },
        user: { name: result.user.name, avatar_url: result.user.avatar_url },
      }

      io.emit('new_message', messageData);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}
