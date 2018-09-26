import {Application} from 'egg';
export default (app:Application) => {
    const {controller, router} = app;
    const jwt = app.middleware.jwt()
    router.post('/user', controller.user.createUser)
    router.post('/login', controller.user.login)
    router.get('/auth', jwt, controller.user.auth)
};
