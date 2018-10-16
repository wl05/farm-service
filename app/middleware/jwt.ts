import user_code from "../common/user"
module.exports = () => {
    const jwt = require('jsonwebtoken')
    return async(ctx, next) => {
        let bearerToken = ctx.headers.authorization,
            decoded = null,
            token = bearerToken && bearerToken.replace("Bearer ", "")
        if (!token) {
            token = ctx.cookies.get('token');
        }
        try {
            decoded = jwt.verify(token, ctx.app.config.jwt.secret)
        } catch (err) {
            ctx.body = {
                code: user_code['auth_001']['code'],
                message: user_code['auth_001']['message']
            }
            ctx.status = 200
            return
        }
        ctx.id = decoded.id
        await next()
    };
};