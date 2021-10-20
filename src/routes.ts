import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { AuthorizeGithubClientController } from './controllers/AuthorizeGithubClientController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { GetLastThreeMessagesController } from './controllers/GetLastThreeMessagesController';
import { GetUserProfileController } from './controllers/GetUserProfileController';
import { GithubCallbackController } from './controllers/GithubCallbackController';
import { ensureAuthentication } from './middlewares/ensureAuthentication';

const routes = Router();

routes.post('/auth', new AuthenticateUserController().execute);

routes.get('/auth/github', new AuthorizeGithubClientController().execute);

routes.get('/auth/github_callback', new GithubCallbackController().execute);

routes.post('/messages', ensureAuthentication, new CreateMessageController().execute);

routes.get('/messages/last_three', new GetLastThreeMessagesController().execute);

routes.get('/profile', ensureAuthentication, new GetUserProfileController().execute);


export { routes };
