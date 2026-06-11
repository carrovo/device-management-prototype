// ══════════ 设备类型（含 URDF 配置）══════════
export const DEVICE_TYPES = [
  { id: 'dt-1', name: 'Alpha-2', urdf: 'alpha2_v3.urdf', desc: '双臂轮式机器人，遥操与巡逻场景', created: '2023-09-15' },
  { id: 'dt-2', name: 'Beta-1',  urdf: 'beta1_v1.urdf',  desc: '单臂固定底座机器人，桌面操作场景', created: '2023-10-20' },
  { id: 'dt-3', name: 'Gamma-1', urdf: 'gamma1_v2.urdf', desc: '清洁作业机器人，大面积地面场景', created: '2024-01-08' },
]

// ══════════ 角色与权限 ══════════
export const MODULES = ['设备管理', '项目管理', '设备类型', '用户中心', '角色中心']
export const ACTIONS = ['查看', '新增', '编辑', '删除']

export const INITIAL_ROLES = [
  {
    id: 'r-admin', name: '管理员', desc: '平台全部操作权限', builtin: true,
    perms: { '设备管理': ['查看','新增','编辑','删除'], '项目管理': ['查看','新增','编辑','删除'], '设备类型': ['查看','新增','编辑','删除'], '用户中心': ['查看','新增','编辑','删除'], '角色中心': ['查看','新增','编辑','删除'] },
  },
  {
    id: 'r-assembly', name: '装配', desc: '生产制造阶段 · 负责设备装配环节确认', builtin: false,
    perms: { '设备管理': ['查看','编辑'], '项目管理': [], '设备类型': ['查看'], '用户中心': [], '角色中心': [] },
  },
  {
    id: 'r-register', name: '生产注册', desc: '生产制造阶段 · 负责设备录入与注册', builtin: false,
    perms: { '设备管理': ['查看','新增','编辑'], '项目管理': ['查看'], '设备类型': ['查看'], '用户中心': [], '角色中心': [] },
  },
  {
    id: 'r-ops', name: '项目运营', desc: '负责设备的项目分配与信息维护', builtin: false,
    perms: { '设备管理': ['查看','编辑'], '项目管理': ['查看','新增','编辑'], '设备类型': ['查看'], '用户中心': [], '角色中心': [] },
  },
  {
    id: 'r-guest', name: '游客', desc: '默认角色 · 飞书登录账号自动分配，仅可查看', builtin: true,
    perms: { '设备管理': ['查看'], '项目管理': ['查看'], '设备类型': ['查看'], '用户中心': [], '角色中心': [] },
  },
]

// ══════════ 用户 ══════════
export const INITIAL_USERS = [
  { id: 'u-1', name: '张三', account: 'zhangsan', login: '飞书 SSO',  role: '管理员' },
  { id: 'u-2', name: '李四', account: 'lisi',     login: '飞书 SSO',  role: '生产注册' },
  { id: 'u-3', name: '王五', account: 'wangwu',   login: '账号密码',  role: '项目运营' },
  { id: 'u-4', name: '赵六', account: 'zhaoliu',  login: '飞书 SSO',  role: '游客' },
]

// ══════════ 健康监测模块定义 ══════════
export const HEALTH_MODULES = ['关节模块', '相机模块', '电池模块', '存储模块', '网络模块', '末端执行器']

// ══════════ 告警模块描述 ══════════
export const ALERT_DESC = {
  '关节模块': '关节力矩超出正常阈值，可能存在机械磨损',
  '相机模块': '相机图像帧率下降，信号质量不达标',
  '电池模块': '电池健康度低于 80%，建议更换',
  '存储模块': '存储使用率超过 85%，读写性能下降',
  '网络模块': '网络丢包率异常，连接不稳定',
  '末端执行器': '末端执行器位置偏差超限',
}

// ══════════ 生命周期阶段 ══════════
export const LIFECYCLE_STAGES = ['装配', '生产注册', '云端注册', '在线运营', '退役']

// ══════════ 项目与设备 ══════════
export const PROJECT_DATA = {
  '遥操项目': {
    desc: '遥操作业机器人项目，覆盖研发测试场景',
    created: '2023-10-01',
    devices: [
      {
        sn: 'SN-20240101', name: '机器人-01', type: 'Alpha-2', lifecycle: '在线运营', conn: '在线',
        reg: '2024-01-01', regTime: '2024-01-01 09:32:14', deviceId: 'dev_7f3a92c1',
        sysVersion: 'v1.2.0', endEffector: '夹爪 A型',
        cameraSN: 'CAM-00312', cameraType: '深度相机 D435i',
        assignee: { 装配: '李四', 生产注册: '李四', 云端注册: '系统自动' },
        health: { '关节模块': '正常', '相机模块': '正常', '电池模块': '正常', '存储模块': '异常', '网络模块': '正常', '末端执行器': '正常' },
        battery: '87%', storage: '128G / 256G',
        changeLog: [
          { time: '2024-03-15 10:22:00', field: '末端配置', from: '夹爪 B型', to: '夹爪 A型', operator: '张三（管理员）' },
          { time: '2024-02-08 14:05:33', field: '系统版本', from: 'v1.1.3', to: 'v1.2.0', operator: '系统自动（OTA）' },
          { time: '2024-01-05 09:30:18', field: '相机 SN', from: 'CAM-00200', to: 'CAM-00312', operator: '李四（生产注册）' },
        ],
      },
      {
        sn: 'SN-20240215', name: '机器人-02', type: 'Alpha-2', lifecycle: '在线运营', conn: '离线',
        reg: '2024-02-15', regTime: '2024-02-15 14:20:08', deviceId: 'dev_8a4b03d2',
        sysVersion: 'v1.1.3', endEffector: '夹爪 B型',
        cameraSN: 'CAM-00415', cameraType: '深度相机 D435i',
        assignee: { 装配: '李四', 生产注册: '李四', 云端注册: '系统自动' },
        health: null, battery: null, storage: null,
      },
      {
        sn: 'SN-20240310', name: '机器人-03', type: 'Beta-1', lifecycle: '生产注册', conn: '未连接',
        reg: '2024-03-10', regTime: '2024-03-10 11:05:40', deviceId: 'dev_9c5d14e3',
        sysVersion: 'v1.2.0', endEffector: '吸盘组件',
        cameraSN: 'CAM-00520', cameraType: '深度相机 D455',
        assignee: { 装配: '李四', 生产注册: '李四' },
        health: null, battery: null, storage: null,
      },
    ],
    logs: [
      { time: '2024-03-10 09:12:33', sn: 'SN-20240310', ip: '192.168.1.42', result: '成功', reason: '—' },
      { time: '2024-03-09 14:05:11', sn: 'SN-20240309', ip: '192.168.1.38', result: '失败', reason: 'SN 号未在系统中录入' },
    ],
  },
  '机场项目': {
    desc: '深圳机场场内巡逻与旅客引导机器人项目',
    created: '2023-11-01',
    devices: [
      { sn: 'SN-AP-001', name: '机场-巡逻01', type: 'Alpha-2', lifecycle: '在线运营', conn: '在线', reg: '2023-11-05', regTime: '2023-11-05 08:00:12', deviceId: 'dev_ap001aa1', sysVersion: 'v1.2.0', endEffector: '无末端', cameraSN: 'CAM-10001', cameraType: '深度相机 D435i', assignee: { 装配: '李四', 生产注册: '李四', 云端注册: '系统自动' }, health: { '关节模块': '正常', '相机模块': '正常', '电池模块': '正常', '存储模块': '正常', '网络模块': '正常', '末端执行器': '正常' }, battery: '92%', storage: '96G / 256G' },
      { sn: 'SN-AP-002', name: '机场-巡逻02', type: 'Alpha-2', lifecycle: '在线运营', conn: '在线', reg: '2023-11-05', regTime: '2023-11-05 08:15:33', deviceId: 'dev_ap002bb2', sysVersion: 'v1.2.0', endEffector: '无末端', cameraSN: 'CAM-10002', cameraType: '深度相机 D435i', assignee: { 装配: '李四', 生产注册: '李四', 云端注册: '系统自动' }, health: { '关节模块': '正常', '相机模块': '异常', '电池模块': '正常', '存储模块': '正常', '网络模块': '正常', '末端执行器': '正常' }, battery: '64%', storage: '180G / 256G' },
      { sn: 'SN-AP-003', name: '机场-引导01', type: 'Beta-1', lifecycle: '在线运营', conn: '在线', reg: '2023-12-01', regTime: '2023-12-01 10:30:00', deviceId: 'dev_ap003cc3', sysVersion: 'v1.1.8', endEffector: '夹爪 A型', cameraSN: 'CAM-10003', cameraType: '深度相机 D455', assignee: { 装配: '李四', 生产注册: '李四', 云端注册: '系统自动' }, health: { '关节模块': '正常', '相机模块': '正常', '电池模块': '正常', '存储模块': '正常', '网络模块': '正常', '末端执行器': '正常' }, battery: '78%', storage: '110G / 256G' },
      { sn: 'SN-AP-004', name: '机场-引导02', type: 'Beta-1', lifecycle: '在线运营', conn: '离线', reg: '2024-01-10', regTime: '2024-01-10 08:30:00', deviceId: 'dev_ap004dd4', sysVersion: 'v1.1.8', endEffector: '夹爪 A型', cameraSN: 'CAM-10004', cameraType: '深度相机 D455', assignee: { 装配: '李四', 生产注册: '李四', 云端注册: '系统自动' }, health: null, battery: null, storage: null },
      { sn: 'SN-AP-005', name: '机场-清洁01', type: 'Gamma-1', lifecycle: '生产注册', conn: '未连接', reg: '2024-05-20', regTime: '2024-05-20 10:04:17', deviceId: 'dev_ap005ee5', sysVersion: 'v1.2.0', endEffector: '无末端', cameraSN: 'CAM-10005', cameraType: 'RGB相机 标准版', assignee: { 装配: '李四', 生产注册: '李四' }, health: null, battery: null, storage: null },
    ],
    logs: [
      { time: '2024-05-20 10:04:17', sn: 'SN-AP-005', ip: '10.10.1.15', result: '成功', reason: '—' },
      { time: '2024-01-10 08:30:00', sn: 'SN-AP-004', ip: '10.10.1.12', result: '成功', reason: '—' },
    ],
  },
  '智魔方项目': {
    desc: '智能魔方演示与交互机器人项目',
    created: '2024-02-01',
    devices: [
      { sn: 'SN-ZMF-001', name: '魔方-操控01', type: 'Beta-1', lifecycle: '在线运营', conn: '在线', reg: '2024-03-18', regTime: '2024-03-18 09:00:00', deviceId: 'dev_zmf001f6', sysVersion: 'v1.2.0', endEffector: '夹爪 B型', cameraSN: 'CAM-20001', cameraType: '深度相机 D435i', assignee: { 装配: '李四', 生产注册: '李四', 云端注册: '系统自动' }, health: { '关节模块': '正常', '相机模块': '正常', '电池模块': '正常', '存储模块': '正常', '网络模块': '正常', '末端执行器': '正常' }, battery: '95%', storage: '60G / 256G' },
      { sn: 'SN-ZMF-002', name: '魔方-操控02', type: 'Beta-1', lifecycle: '生产注册', conn: '未连接', reg: '2024-06-01', regTime: '2024-06-01 15:22:09', deviceId: 'dev_zmf002g7', sysVersion: 'v1.2.0', endEffector: '夹爪 B型', cameraSN: 'CAM-20002', cameraType: '深度相机 D435i', assignee: { 装配: '李四', 生产注册: '李四' }, health: null, battery: null, storage: null },
    ],
    logs: [
      { time: '2024-06-01 15:22:09', sn: 'SN-ZMF-002', ip: '172.16.0.5', result: '成功', reason: '—' },
    ],
  },
}

// 状态徽章映射
export const LC_BADGE = { '装配': 'b-recorded', '生产注册': 'b-recorded', '云端注册': 'b-activated', '在线运营': 'b-activated', '退役': 'b-retired' }
export const CONN_BADGE = { '在线': 'b-online', '离线': 'b-offline', '未连接': 'b-nc' }
