const Service = require('egg').Service;

class UserService extends Service {
    async create(user) {
        return await this.ctx.model.User.create(user)
    }

    async findById(id) {
        return await this.ctx.model.User.findOne({id})
    }

    async checkExist(phone, password) {
        return await this.ctx.model.User.findOne({phone, password})
    }

    async updateOne(id, newData) {
        return await this.ctx.model.User.update({id}, newData)
    }

    /**
     * 生成 Token
     * @param {Object} data
     */
    createToken(data) {
        return this.app.jwt.sign(data, this.app.config.jwt.secret, {
            expiresIn: "12h"
        })
    }


    /**
     * 验证token的合法性
     * @param {String} token
     */
    async verifyToken(token) {
        return new Promise((resolve) => {
            this.app.jwt.verify(token, this.ctx.app.config.jwt.secret, (err, decoded) => {
                let result = {}
                if (err) {
                    result["verify"] = false
                    result["message"] = err.message
                } else {
                    result["verify"] = true
                    result["message"] = decoded
                }
                resolve(result)
            })
        })

    }
}

module.exports = UserService
