const Service = require('egg').Service
const jwt = require('jsonwebtoken');

class UserService extends Service {
    async create(user) {
        return await this.ctx.model.User.create(user)
    }

    async findById(_id) {
        return await this.ctx.model.User.findOne({_id})
    }

    async checkExist(phone, password) {
        return await this.ctx.model.User.findOne({phone, password})
    }

    async updateOne(_id, newData) {
        return await this.ctx.model.User.updateOne({_id}, newData)
    }

    createToken(data) {
        return jwt.sign(data, this.app.config.jwt.secret, {expiresIn: "12h"})
    }
}

module.exports = UserService
