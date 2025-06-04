# 基于 Express 的 Todo Web API

这是一个使用 Express.js 构建的简单 Todo Web API，提供用户管理、待办事项管理和文件上传功能。

## 项目结构

```
├── controllers/       # 控制器，处理业务逻辑
│   ├── todo.js        # 待办事项相关逻辑
│   └── user.js        # 用户相关逻辑
├── models/           # 数据模型
│   ├── db.js         # 数据库关联配置
│   ├── todo.js       # 待办事项模型
│   └── user.js       # 用户模型
├── public/           # 静态资源
│   └── uploadPics/   # 上传图片存储目录
├── routes/           # 路由配置
│   ├── todo.js       # 待办事项路由
│   ├── uploader.js   # 文件上传路由
│   └── user.js       # 用户路由
├── utils/            # 工具函数
│   ├── auth.js       # 认证中间件
│   └── connect.js    # 数据库连接
├── .env.bk           # 环境变量模板
├── server.js         # 应用入口文件
└── package.json      # 项目配置和依赖
```

## 功能特性

- 用户认证与授权（注册、登录、退出）
- 用户资料管理（查看、更新个人资料）
- 密码管理（重置密码、找回密码）
- 待办事项管理（创建、查看、更新、删除）
- 文件上传（支持图片上传）

## 安装与配置

1. 克隆此仓库
2. 安装依赖
   ```bash
   npm install
   ```
3. 配置环境变量
   - 将 `.env.bk` 文件重命名为 `.env`
   - 在 `.env` 文件中配置数据库设置：
     ```
     DATABASE_HOST="你的数据库主机地址"
     DATABASE_PORT="你的数据库端口"
     DATABASE_DIALECT="你的数据库类型(mysql/postgres等)"
     DATABASE_USER="你的数据库用户名"
     DATABASE_PASSWORD="你的数据库密码"
     DATABASE_NAME="你的数据库名称"
     ```
4. 启动服务器
   ```bash
   npm start
   ```
   服务器将在 http://127.0.0.1:3000 上运行

## API 接口

### 用户管理

- `POST /api/users/register`: 注册新用户
- `POST /api/users/login`: 用户登录
- `GET /api/users/logout`: 退出登录
- `POST /api/users/reset-password/:userId`: 重置用户密码
- `POST /api/users/forgot-password`: 找回密码
- `GET /api/users/profile/:userId`: 获取用户资料
- `PUT /api/users/profile/:userId`: 更新用户资料

### 待办事项管理

- `POST /api/todos`: 创建新的待办事项
- `GET /api/todos`: 获取所有待办事项列表
- `GET /api/todos/:todoId`: 获取特定待办事项详情
- `PUT /api/todos/:todoId`: 更新待办事项
- `DELETE /api/todos/:todoId`: 删除待办事项

### 文件上传

- `POST /api/upload`: 上传文件（支持图片）

## 技术栈

- **Express.js**: Web 应用框架
- **Sequelize**: ORM 工具，用于数据库操作
- **MySQL**: 数据库（通过 mysql2 驱动）
- **JWT**: 用于用户认证
- **bcryptjs**: 密码加密
- **multer**: 文件上传处理
- **moment**: 日期时间处理
- **dotenv**: 环境变量管理
- **cors**: 跨域资源共享
- **cookie-parser**: Cookie 解析

## 开发

项目使用 nodemon 进行开发，支持热重载。

```bash
npm start
```

## 注意事项

- API 默认配置为允许来自 http://127.0.0.1:3300 的跨域请求
- 上传的文件将存储在 `public/uploadPics` 目录中
- 用户认证使用 JWT，通过 cookie 或 Authorization 头传递令牌
