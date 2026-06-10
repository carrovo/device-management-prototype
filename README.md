# 云控平台 · 设备管理模块（原型）

基于 React + Vite 的前端展示原型，无后端依赖，所有数据为内置示例数据。

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:5173

## 部署到 Vercel

1. 将本项目推送到 GitHub 仓库
2. Vercel 中 Import 该仓库，框架自动识别为 Vite，无需额外配置
3. 点击 Deploy 即可

## 项目结构

```
src/
  data.js              示例数据（项目/设备/角色/用户/设备类型）
  styles.css           全局样式
  App.jsx              页面路由与全局状态
  components/
    Login.jsx          登录页（飞书 SSO + 账号密码）
    Sidebar.jsx        侧边导航
    DeviceList.jsx     设备列表（搜索/筛选/注册日志/批量导入）
    DeviceDetail.jsx   设备详情（生命周期流程/硬件配置/健康状态/实时数据）
    DeviceForm.jsx     添加/编辑设备表单
    Projects.jsx       项目管理 + 项目详情
    DeviceTypes.jsx    设备类型管理（URDF 配置）
    UserCenter.jsx     用户中心
    RoleCenter.jsx     角色中心（权限矩阵配置）
    Csel.jsx           通用下拉组件
    Modal.jsx          通用弹窗组件
    Icons.jsx          内联 SVG 图标库
```

## 角色体系

| 角色 | 说明 |
|------|------|
| 管理员 | 全部权限（内置） |
| 装配 | 生产制造阶段，装配环节 |
| 生产注册 | 生产制造阶段，设备录入注册 |
| 项目运营 | 设备分配与项目管理 |
| 游客 | 默认角色，飞书登录自动分配，仅可查看（内置） |
