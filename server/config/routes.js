/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const questionnairesController = controllers && controllers.questionnaires;

export default (app) => {
  // user routes
  if (usersController) {
    app.get('/user', usersController.findAll);
    app.get('/user/:id', usersController.findOne);
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.get('/topic/:id', topicsController.findOne);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.put('/topic/content/:id', topicsController.updateContent);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }
    // questionnaire routes
  if (questionnairesController) {
    app.get('/questionnaire', questionnairesController.all);
    app.get('/questionnaire/:id', questionnairesController.findOne);
    app.post('/questionnaire', questionnairesController.add);
    app.put('/questionnaire/:id', questionnairesController.update);
    app.delete('/questionnaire/:id', questionnairesController.remove);
  } else {
    console.warn(unsupportedMessage('questionnaires routes'));
  }
};
