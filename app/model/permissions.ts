'use strict'
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const PostSchema = new Schema({
        name: { // 权限名称
            type: String,
            required: true,
        },
        method: { // Restful API方法，请求方法
            type: String,
            required: true
        },
        url: { // 权限对应的url
            type: String,
            required: true
        },
        creator: { // 账单创建人
            type: Schema.ObjectId,
            ref: 'Users',
            required: true
        },
        remark: { // 备注说明
            type: String,
        },
        createAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date
        },
        deletedAt: {
            type: Date
        },
        status: { // 状态
            type: String,
            enum: ['0', '1', '2'], // 0存在 1更新，2 删除
            default: '0'
        }

    }, {versionKey: false})
    return mongoose.model('Permissions', PostSchema)
}