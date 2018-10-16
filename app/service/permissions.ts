import {Service}  from "egg"
class PermissionsService extends Service {
    async createRole(role) {
        return await this.ctx.model.Permissions.create(role)
    }


    async find() {
        return await this.ctx.model.Permissions.find({status: {$ne: 2}}).populate({
            path: "creator", match: {status: {$ne: 2}}, select: {
                _id: 1,
                name: 1,
                username: 1
            }
        })
    }
}

module.exports = PermissionsService