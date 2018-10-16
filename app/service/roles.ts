import {Service}  from "egg"
class RolesService extends Service {
    async createRole(role) {
        return await this.ctx.model.Roles.create(role)
    }

    async findById(_id) {
        return await this.ctx.model.Roles.findOne({_id})
    }

    async findByName(name) {
        return await this.ctx.model.Roles.findOne({name})
    }

    async deleteById(_id) {
        return await this.ctx.model.Roles.updateOne({_id}, {
            $set: {
                status: 2,
                updatedAt: Date.now()
            }
        })
    }

    async find() {
        return await this.ctx.model.Roles.find()
            .populate('permissions', "name _id")
            .populate('creator', "name username _id")
    }
}

module.exports = RolesService