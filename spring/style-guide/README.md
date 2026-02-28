# 风格参考模块（style-guide）

> 作用：为后续新项目保留你的编码风格“快照”，不参与运行。

## 后端风格要点

1. **模块分层**：`controller -> model -> repository -> entity/dto/vo`，Controller 负责请求编排与日志。
2. **统一返回**：使用 `ResponseResult` 包装响应。
3. **验证码与安全**：登录/注册通过 `CaptchaDispatcher` 校验，Token 通过 Redis 服务维护。
4. **用户体系**：`sq_system.user` 存系统账号，`user_to_role` / `user_to_project` 管理权限与项目归属。
5. **动态数据源**：系统库使用 `@DS("system")`，项目库使用 `@DS("ljj")`。
6. **日志风格**：启动 `@PostConstruct` 打印模块初始化信息；行为日志写入 operation_log。

## 前端风格要点

1. Vue2 + Vuex + VueRouter，页面以 `views/*` 分类。
2. 登录/注册页为单页卡片式布局，强调角色选择与验证码。
3. 统一把 token + user 存 `localStorage`，路由基于 role 做权限跳转。

## 新项目启动建议

- 保留 `system/*` 作为基础能力。
- 在 `project/` 下新增业务模块，不再复制历史业务模块。
- 每次数据库变更都落盘到 `db/sq_system_change.sql` 与 `db/ljj_change.sql`。
