'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        username: {type: String, required: true}, // 用户名
        name: {type: String, required: true}, // 姓名
        password: {type: String, required: true}, // 密码
        sex: {
            type: String,
            required: true,
            enum: [0, 1]
        }, // 用户性别：0男性, 1女性
        phone: {
            type: String,
            unique: true,
            required: true
        }, // 联系电话
        info: String, // 备注说明
        roleId: {
            type: Number,
            enum: [0, 1, 2]
        }, // 角色id 0,普通用户,1管理员,2 超级管理员
        token: String, // 认证 token
        forbidden: {
            type: Boolean,
            default: false
        },
        role: { // 用户权限
            type: Schema.ObjectId, ref: 'Roles'
        },
        bills: [{ // 账单
            type: Schema.ObjectId,
            ref: 'Bills',
        }],
        createAt: { // 创建时间
            type: Date,
            default: Date.now
        },
        updatedAt: { // 更新时间
            type: Date
        },
        deletedAt: { // 删除时间
            type: Date
        },
        status: { // 状态
            type: Number,
            enum: [0, 1, 2] // 0存在 1更新，2 删除
        }

    }, {versionKey: false});
    return mongoose.model('Users', UserSchema);
}