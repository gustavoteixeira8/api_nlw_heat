import { prismaClient } from "../prisma";

export class GetLastThreeMessagesService {
  public async execute() {
    const messages = prismaClient.message.findMany({
      take: 3,
      orderBy: { created_at: 'desc' },
      include: { user: true },
    });

    return messages;
  }
}
