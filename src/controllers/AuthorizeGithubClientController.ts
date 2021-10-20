import { Request, Response } from "express";

export class AuthorizeGithubClientController {
  public async execute(req: Request, res: Response): Promise<void> {
    const urlToAuthorize = `https://github.com/login/oauth/authorize/?client_id=${process.env.GITHUB_CLIENT_ID}`;

    return res.redirect(urlToAuthorize);
  }
}
