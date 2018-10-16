import {Controller} from 'egg'
import {struct} from 'superstruct'
import roles_code from "../common/roles"
export default class Roles extends Controller {
    public async createRole() {
        const {ctx, service} = this
        const Role = struct({
            name: 'string',
            permissions: ['string'],
            remark: 'string?'
        })
        let validRole = null, role = null
        try {
            console.log('ctx.request.body', ctx.request.body)
            validRole = Role(ctx.request.body)
        } catch (err) {
            return ctx.helper.error(ctx, roles_code['role_002']['code'], roles_code['role_002']['message'])
        }
        // 验证角色是否存在
        role = await service.roles.findByName(validRole.name)
        if (role) {
            return ctx.helper.error(ctx, roles_code['role_003']['code'], roles_code['role_003']['message'])
        }
        validRole.creator = ctx.id
        let newRole = await service.roles.createRole(validRole)
        return ctx.helper.success(ctx, newRole)
    }

    public async getRoles() {
        const {service, ctx} = this
        let roles = await service.roles.find()
        return ctx.helper.success(ctx, roles)
    }

    public async deleteRole() {
        const {service, ctx} = this
        const Id = struct({
            id: 'string'
        })
        let validId = null
        try {
            console.log('ctx.request.body', ctx.request.body)
            validId = Id(ctx.request.body)
        } catch (err) {
            return ctx.helper.error(ctx, roles_code['role_002']['code'], roles_code['role_002']['message'])
        }
        let role = await service.roles.deleteById(validId.id)
        return ctx.helper.success(ctx, role)
    }
}
