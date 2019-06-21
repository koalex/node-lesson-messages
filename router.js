const Router    = require('koa-router');
const messages  = require('./controllers/messages');
const passport  = require('auth/middlewares/passport');

const router    = new Router();
const apiRouter = new Router({ prefix: '/api/v1' });

apiRouter.get('/messages',            passport.authenticate('jwt', {session: false}), messages.getAll);
apiRouter.get('/messages/:messageId', passport.authenticate('jwt', {session: false}), messages.getOne);
apiRouter.post('/messages',           passport.authenticate('jwt', {session: false}), messages.create);
apiRouter.put('/messages/:messageId', passport.authenticate('jwt', {session: false}), messages.update);
apiRouter.del('/messages/:messageId', passport.authenticate('jwt', {session: false}), messages.delete);

module.exports = [
    router,
    apiRouter
];
