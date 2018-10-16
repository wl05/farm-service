import {Controller} from 'egg'
// import {struct} from 'superstruct'
// import roles_code from "../common/roles"
export default class Permissions extends Controller {
    public async getPermissions() {
        const {service, ctx} = this
        let permissions = await service.permissions.find()
        return ctx.helper.success(ctx, permissions)
    }
}
