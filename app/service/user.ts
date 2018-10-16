const Service = require('egg').Service
const jwt = require('jsonwebtoken');

class UsersService extends Service {
    async create(user) {
        return await this.ctx.model.Users.create(user)
    }

    async find() {
        return await this.ctx.model.Users.find()
    }

    async findById(_id) {
        return await this.ctx.model.Users.findOne({_id})
    }

    async updateById(_id, newData) {
        return await this.ctx.model.Users.updateOne({_id}, newData)
    }

    async findUserByPhone(phone) {
        return await this.ctx.model.Users.findOne({phone})
    }

    async checkExist(phone, password) {
        return await this.ctx.model.Users.findOne({phone, password})
    }

    createToken(data) {
        return jwt.sign(data, this.app.config.jwt.secret, {expiresIn: "12h"})
    }
}

module.exports = UsersService
