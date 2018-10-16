// import user_code from "../common/user"
module.exports = () => {
    return async(ctx, next) => {
        let id = ctx.id
        id
        // console.log('id', id, ctx)
        // 获取用户
        //
        //
        // ctx.body = {
        //     data: {
        //         code: user_code['auth_001']['code'],
        //         message: user_code['auth_001']['message']
        //     }
        // }
        // ctx.status = 200
        // return
        await next()
    };
};