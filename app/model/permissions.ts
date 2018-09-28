'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const PostSchema = new Schema({
        name: { // 权限名称
            type: String,
            required: true,
        },
        url: { // 权限对应的url
            type: String,
            required: true
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
        status: {
            type: Number,
            enum: [0, 1, 2] // 0存在 1更新，2 删除
        }

    }, {versionKey: false});
    return mongoose.model('Permissions', PostSchema);
}