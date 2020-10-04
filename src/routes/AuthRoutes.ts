import { Router } from 'express';

import passport from 'passport';

import AuthController from '../controllers/AuthController';

const routes = Router();

routes.post('', AuthController.authenticate);

routes.get("/google/redirect", passport.authenticate('google'),AuthController.socialAuthenticate);

routes.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

routes.get("/facebook/redirect", passport.authenticate('facebook'), AuthController.socialAuthenticate);

routes.get('/facebook', passport.authenticate('facebook', {
    scope: ['email']
}))

export default routes;