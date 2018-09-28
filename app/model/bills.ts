'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const PostSchema = new Schema({
        creator: { // 账单创建人
            type: Schema.ObjectId,
            ref: 'Users',
            required: true
        },
        parts: [{// 使用的零件列表
            name: {
                type: String,// 零件名
            },
            amount: {
                type: Number, // 数量
            },
            price: {
                type: Number,// 单价
            }
        }],
        wages: { // 工钱
            type: Number,
            required: true,
            default: 0,
        },
        date: {  // 生成账单日期
            type: Date,
            default: Date.now
        },
        payStatus: { // 付款状态
            type: Number,
            required: true,
            enum: [0, 1, 2] // 0： 正在进行,1：已付款，2：赊账
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
    return mongoose.model('Bills', PostSchema);
}