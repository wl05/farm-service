#!/usr/bin/env bash

mongo
$MongoDB <<EOF
use farm
# 创建用户
db.createCollection('users')
db.users.insert({
     "username": "admin",
        "name": "admin",
        "password": "123456",
        "sex": 0,
        "phone": "18381089466",
        "forbidden": false,
        "createAt":  Date.now(),
        "status": 0
})
# 创建角色
db.createCollection('roles')
db.roles.insert({
    "name": "超级管理员",
    "createAt": Date.now(),
    "status": 0
})

# 更新用户表
db.users.update({
    _id: ObjectId("5bae54d506b42241982bee8e")
},{$set : {role: ObjectId("5bae56567c027a44fba2d23a")}})

# 创建权限列表
db.createCollection('Permissions')
db.permissions.insert([{
   name: "创建用户",
        method: "POST",
        url: "/user",
        createAt:Date.now(),
        status: 0
},
{
   name: "获取用户",
        method: "GET",
        url: "/user",
        createAt:Date.now(),
        status: 0
},

{
   name: "删除用户",
        method: "DELETE",
        url: "/user",
        createAt:Date.now(),
        status: 0
},
{
   name: "修改用户",
        method: "PUT",
        url: "/user",
        createAt:Date.now(),
        status: 0
}

])
exit;
EOF