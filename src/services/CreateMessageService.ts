import { prismaClient } from '../prisma';

export class CreateMessageService {
  public async execute(text: string, user_id: string) {
    if (!text || !user_id) throw new Error('Text and user id are required');

    const textConstraints = typeof text === 'string' && text.length > 5 && text.length < 255;

    if (!textConstraints) throw new Error('Text must be between 5 and 255 characters');

    const message = await prismaClient.message.create({
      data: { text, user_id },
      include: { user: true }
    });

    return message;
  }
}
