const Service = require('egg').Service
const jwt = require('jsonwebtoken');

class UsersService extends Service {
    async create(user) {
        return await this.ctx.model.Users.create(user)
    }

    async findById(_id) {
        return await this.ctx.model.Users.findOne({_id})
    }

    async checkExist(phone, password) {
        return await this.ctx.model.Users.findOne({phone, password})
    }

    async updateOne(_id, newData) {
        return await this.ctx.model.Users.updateOne({_id}, newData)
    }

    createToken(data) {
        return jwt.sign(data, this.app.config.jwt.secret, {expiresIn: "12h"})
    }
}

module.exports = UsersService
