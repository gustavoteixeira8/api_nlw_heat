import axios from "axios";
import { prismaClient } from "../prisma";
import { sign } from 'jsonwebtoken';

export interface AccessTokenResponse {
  access_token: string;
}

export interface UserDataProtocol {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
}

export class AuthenticateUserService {
  public async execute(code: string) {
    if (!code) throw new Error('Code is required');

    const urlToAccessToken = 'https://github.com/login/oauth/access_token';

    const { data: accessTokenResponse } = await axios.post<AccessTokenResponse>(urlToAccessToken, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    });

    const urlToUserData = 'https://api.github.com/user';

    const response = await axios.get<UserDataProtocol>(urlToUserData, {
      headers: { authorization: `Bearer ${accessTokenResponse.access_token}` }
    });

    const { avatar_url, id, name, login } = response.data;

    let user = await prismaClient.user.findFirst({ where: { github_id: id } });

    if (!user) {
      user = await prismaClient.user.create({
        data: { github_id: id, login, name, avatar_url  }
      });
    }

    const jwtSecret = process.env.JWT_SECRET as string;

    const token = sign({}, jwtSecret, { subject: user.id, expiresIn: '1d' }
    );

    return { user, token };
  }
}
