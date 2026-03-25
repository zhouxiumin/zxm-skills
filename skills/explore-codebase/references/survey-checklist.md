# 代码工程探索排查清单

按需读取，不要整份背进脑子里。

## 1. 基础识别

- 仓库是单体、多包、monorepo、微服务集合，还是单技能/单工具仓库？
- 主语言和次语言分别是什么？
- 是否存在多个运行进程或多个部署单元？
- 是否有明显的生成物目录、脚本目录、运维目录？

## 2. 工程入口

- `README*`
- `package.json` / `pyproject.toml` / `go.mod` / `pom.xml` / `Cargo.toml`
- `Makefile` / `Taskfile.yml` / `justfile`
- `.env.example` / `application*.yml` / `config/`
- `Dockerfile*` / `docker-compose*`

## 3. 应用入口与主流程

- 启动文件：`main.*`、`index.*`、`app.*`
- 路由：`routes/`、`router/`、controller 注册文件
- 中间件与过滤器：auth、logging、error handling、tracing
- 异步系统：`worker/`、`queue/`、`consumer/`、`jobs/`
- 定时任务：cron、scheduler、batch

## 4. 架构分层

- controller / handler
- service / usecase / application
- domain / model / entity
- repository / dao / mapper
- infra / adapters / clients

重点确认：

- 层与层之间是否清晰分离
- 是否有循环依赖或“上层偷摸直连数据库”
- 是否存在共享库、公共模型、基础组件

## 5. 接口说明

优先找：

- REST 路由定义
- OpenAPI / Swagger 文件
- GraphQL schema
- `.proto`
- CLI 参数解析
- 消息 topic / event / queue 名称

记录：

- 入口路径或命令
- 入参与出参
- 鉴权方式
- 错误码/异常模型
- 幂等、分页、版本、限流

## 6. 数据模型

优先找：

- ORM 实体
- migration
- schema 定义
- seed 脚本
- DTO / VO / event payload

重点回答：

- 核心实体是什么
- 实体之间如何关联
- 状态如何流转
- 哪些模型是持久化层，哪些只是接口层

## 7. 部署与运行

优先找：

- `Dockerfile`
- `docker-compose.yml`
- `helm/`、`charts/`、`k8s/`
- CI/CD workflow
- 环境变量模板
- 运维脚本、发布脚本、健康检查配置

重点回答：

- 怎么本地跑起来
- 怎么打包
- 怎么部署
- 依赖哪些外部服务
- 哪些配置是必须的

## 8. 风险信号

看到这些要提高警惕：

- README 和代码实现明显不一致
- 配置散落在多个目录和脚本里
- 没有 migration 但有大量数据库访问代码
- 入口很多但没有统一注册点
- 部署脚本与本地启动方式完全两套逻辑
- 接口契约没有集中定义，只能从实现反推
