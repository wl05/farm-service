import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg';
import user_code from "../app/common/user"

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
        enable: true,
        secret: "my.secret",
        ignore: (ctx)=> {
            if (ctx.request.url === "/login") {
                return true
            }
        }
    }
    config.onerror = {
        json(err, ctx) {
            // 在此处定义针对所有响应类型的错误处理方法
            // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
            if (err.code === "invalid_token") {// 处理jwt鉴权失败
                ctx.body = {
                    data: {
                        code: user_code['auth_001']['code'],
                        message: user_code['auth_001']['message']
                    }
                }
                ctx.status = 200
            }
            if (err.code === "credentials_bad_format") {
                ctx.body = {
                    data: {
                        code: user_code['auth_001']['code'],
                        message: user_code['auth_001']['message']
                    }
                }
                ctx.status = 200
            }
        },
    }

    return {
        ...config,
    };
};
