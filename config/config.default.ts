import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg';

export default (appInfo:EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1537283309743_7299';

    // config cors
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: false
        },
        domainWhiteList: ['*']
    }
    // config cors
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    }
    // mongoose
    config.mongoose = {
        client: {
            url: 'mongodb://127.0.0.1/farm', options: {
                useNewUrlParser: true
            },
        },
    }
    // jwt
    config.jwt = {
        secret: "my.secret"
    }

    return {
        ...config,
    };
};
