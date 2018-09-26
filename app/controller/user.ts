import {Controller} from 'egg'
import {struct} from 'superstruct'
import user_code from "../common/user"
export default class User extends Controller {
    public async createUser() {
        const {ctx, service} = this
        let User = struct({
            username: 'string',
            password: 'string',
            name: 'string',
            sex: struct.enum([0, 1]),
            phone: 'string',
            info: 'string',
            roleId: struct.enum([0, 1, 2])
        })
        let validUser = null;
        try {
            validUser = User(ctx.request.body)
        } catch (err) {
            return ctx.helper.error(ctx, user_code['user_001']['code'], user_code['user_001']['message'])
        }
        try {
            let user = await service.user.create(validUser)
            return ctx.helper.success(ctx, user)
        } catch (err) {
            return ctx.helper.error(ctx, user_code['user_002']['code'], user_code['user_002']['message'])
        }
    }

    public async login() {
        const {ctx, service} = this
        let User = struct({
            phone: 'string',
            password: 'string'
        })
        let validUser = null;
        try {
            validUser = User(ctx.request.body)
        } catch (err) {
            return ctx.helper.error(ctx, user_code['user_001']['code'], user_code['user_001']['message'])
        }

        // verify if the user is existing
        let existUsers = await service.user.checkExist(validUser.phone, validUser.password)
        if (!existUsers) {
            return ctx.helper.error(ctx, user_code['user_003']['code'], user_code['user_003']['message'])
        }
        // create token ant send token
        let token = service.user.createToken({id: existUsers.id, phone: existUsers.phone})
        await service.user.updateOne(existUsers.id, {token, lastSignInAt: Date.now()})
        return ctx.helper.success(ctx, {token})
    }


    public async auth() {
        const {ctx, service} = this
        let token = ctx.helper.getAccessToken(ctx)
        let verifyData = await service.user.verifyToken(token)
        if (verifyData.verify) {
            let userInfo = await service.user.findById(verifyData.id)
            return ctx.helper.success(ctx, userInfo)
        } else {
            return ctx.helper.error(ctx, user_code['auth_001']['code'], user_code['auth_001']['message'])
        }
    }
}
