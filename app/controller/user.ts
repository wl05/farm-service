import {Controller} from 'egg'
import {struct} from 'superstruct'
import user_code from "../common/user"
import roles_code from "../common/roles"
export default class User extends Controller {
    // create user
    public async createUser() {
        const {ctx, service} = this
        let User = struct({
            username: 'string',
            password: 'string',
            name: 'string',
            sex: struct.enum(['0', '1']),
            phone: 'string',
            remark: 'string?',
            role: 'string',
            creator: 'string'
        })
        let validUser = null, user = null
        try {
            validUser = User(ctx.request.body)
        } catch (err) {
            return ctx.helper.error(ctx, user_code['user_001']['code'], user_code['user_001']['message'])
        }
        user = await service.user.findUserByPhone(validUser.phone)
        if (user) {
            return ctx.helper.error(ctx, user_code['user_004']['code'], user_code['user_004']['message'])
        }
        let role = service.roles.findById(User.role)
        if (!role) {
            return ctx.helper.error(ctx, user_code['role_001']['code'], user_code['role_001']['message'])
        }
        try {
            user = await service.user.create(validUser)
            return ctx.helper.success(ctx, user)
        } catch (err) {
            return ctx.helper.error(ctx, user_code['user_002']['code'], user_code['user_002']['message'])
        }
    }

    // get user list
    public async getUsers() {
        const {ctx, service} = this
        let user = await service.user.find()
        return ctx.helper.success(ctx, user)
    }

    // get user
    public async  getUser() {
        const {ctx, service} = this
        console.log(ctx.params.id)
        let verifier = struct({
            id: 'string'
        }), id = ''
        try {
            id = verifier({id: ctx.params.id}).id
        } catch (err) {
            return ctx.helper.error(ctx, user_code['user_001']['code'], user_code['user_001']['message'])
        }
        let user = await service.user.findById(id)
        return ctx.helper.success(ctx, user)
    }

    // login
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

        let existUsers = await service.user.checkExist(validUser.phone, validUser.password)
        if (!existUsers) {
            return ctx.helper.error(ctx, user_code['user_003']['code'], user_code['user_003']['message'])
        }
        let token = service.user.createToken({id: existUsers.id, phone: existUsers.phone})
        await service.user.updateById(existUsers.id, {token, updatedAt: Date.now()})
        ctx.cookies.set('token', token);
        return ctx.helper.success(ctx, {token})
    }

    // verify user
    public async auth() {
        const {ctx, service} = this
        let userInfo = await service.user.findById(ctx.id)
        if (!userInfo) {
            return ctx.helper.error(ctx, user_code['auth_002']['code'], user_code['auth_002']['message'])
        }
        return ctx.helper.success(ctx, userInfo)
    }

    // get error code
    public getErrorMap() {
        const {ctx} = this
        return ctx.helper.success(ctx, {...roles_code, ...user_code})
    }

}
