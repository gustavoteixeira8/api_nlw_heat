import { AppError } from '../errors/AppError';
import { prismaClient } from '../prisma';

export class CreateMessageService {
  public async execute(text: string, user_id: string) {
    if (!text || !user_id) throw new AppError('Text and user id are required', 400);

    const textConstraints = typeof text === 'string' && text.length > 5 && text.length < 255;

    if (!textConstraints) throw new AppError('Text must be between 5 and 255 characters', 400);

    const message = await prismaClient.message.create({
      data: { text, user_id },
      include: { user: true }
    });

    return message;
  }
}
