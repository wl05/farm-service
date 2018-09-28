'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const PostSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true,
            default: 0
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
    return mongoose.model('parts', PostSchema);
}