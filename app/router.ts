import {Application} from 'egg';
/**
 * @swagger
 * resourcePath: /doc
 * description: All about API
 */
export default (app:Application) => {
    const {controller, router} = app
    const jwt = app.middleware.jwt()
    const permissions = app.middleware.permissions()
    const subRouterV1 = router.namespace('/v1');
    subRouterV1.get('/error_map', controller.user.getErrorMap)
    // 创建用户
    subRouterV1.post('/users', jwt, permissions, controller.user.createUser)
    // 获取用户列表
    subRouterV1.get('/users', jwt, permissions, controller.user.getUsers)
    // 获取单个用户
    subRouterV1.get('/users/:id', jwt, permissions, controller.user.getUser)
    // 删除用户
    subRouterV1.delete('/users/:id', jwt, permissions, controller.user.getUsers)
    // 更新用户信息
    subRouterV1.put('/users/:id', jwt, permissions, controller.user.getUsers)

    // 获取角色列表
    subRouterV1.get('/roles', jwt, permissions, controller.roles.getRoles)
    // 创建角色
    subRouterV1.post('/roles', jwt, permissions, controller.roles.createRole)
    // 获取单个角色
    subRouterV1.get('/roles/:id', jwt, permissions, controller.roles.getRoles)
    // 删除角色
    subRouterV1.delete('/roles/:id', jwt, permissions, controller.roles.deleteRole)
    // 修改角色
    subRouterV1.put('/roles/:id', jwt, permissions, controller.roles.deleteRole)

    // 获取权限列表
    subRouterV1.get('/permissions', jwt, permissions, controller.permissions.getPermissions)
    // 创建权限
    subRouterV1.post('/permissions', jwt, permissions, controller.permissions.getPermissions)
    // 获取单个权限
    subRouterV1.get('/permissions/:id', jwt, permissions, controller.permissions.getPermissions)
    // 删除权限
    subRouterV1.delete('/permissions/:id', jwt, permissions, controller.permissions.getPermissions)
    // 修改权限
    subRouterV1.put('/permissions/:id', jwt, permissions, controller.permissions.getPermissions)

    // 登录
    subRouterV1.post('/login', controller.user.login)
    // 验证
    subRouterV1.get('/auth', jwt, controller.user.auth)

};
