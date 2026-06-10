import { IconUser, IconLock } from './Icons.jsx'

export default function Login({ onLogin }) {
  return (
    <div className="login-screen">
      <div>
        <div className="login-logo">
          <div className="login-logo-title">云控平台</div>
          <div className="login-logo-sub">设备管理模块 · 智平方</div>
        </div>
        <div className="login-card">
          <button className="feishu-btn" onClick={onLogin}>
            <div className="feishu-icon">飞</div>使用飞书账号登录
          </button>
          <div className="divider">
            <div className="divider-line" /><span className="divider-text">或使用账号密码登录</span><div className="divider-line" />
          </div>
          <div className="login-label">账号</div>
          <input className="login-input" placeholder="请输入账号" />
          <div className="login-label">密码</div>
          <input className="login-input" type="password" placeholder="请输入密码" />
          <button className="login-submit" onClick={onLogin}>登 录</button>
          <div className="login-hint">仅限智平方内部人员使用 · 飞书账号首次登录默认为游客权限</div>
        </div>
      </div>
    </div>
  )
}
