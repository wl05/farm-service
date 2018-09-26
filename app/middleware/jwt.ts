import user_code from "../common/user"
module.exports = () => {
    const jwt = require('jsonwebtoken')
    return async(ctx, next) => {
        let bearerToken = ctx.headers.authorization
        let token = bearerToken && bearerToken.replace("Bearer ", "")
        let decoded = null
        try {
            decoded = jwt.verify(token, ctx.app.config.jwt.secret)
            console.log('decoded', decoded)
        } catch (err) {
            ctx.body = {
                data: {
                    code: user_code['auth_001']['code'],
                    message: user_code['auth_001']['message']
                }
            }
            ctx.status = 200
            return
        }
        ctx.id = decoded.id
        await next()
    };
};