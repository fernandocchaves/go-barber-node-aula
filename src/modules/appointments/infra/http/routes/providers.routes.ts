import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderControllers from '../controllers/ProviderControllers';

const providersRouter = Router();
const providerControllers = new ProviderControllers();

providersRouter.use(ensureAuthenticated);
providersRouter.get('/', providerControllers.index);

export default providersRouter;
