import {Application} from 'egg';
export default (app:Application) => {
    const {controller, router} = app;
    router.post('/user', controller.user.createUser)
    router.post('/login', controller.user.login)
    router.get('/auth', controller.user.auth)
};
