import { DEMO_USERS } from '../data.js'

function FeishuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0}}>
      <rect width="40" height="40" rx="9" fill="white"/>
      <path d="M20 6C15.6 6 11.8 8.2 9.6 11.6L14.2 14.8C15.4 12.8 17.6 11.5 20 11.5C23.9 11.5 27 14.6 27 18.5C27 20.2 26.4 21.7 25.4 22.9L29.6 26.5C31.4 24.3 32.5 21.5 32.5 18.5C32.5 11.6 26.9 6 20 6Z" fill="#1664FF"/>
      <path d="M20 11.5C17.6 11.5 15.4 12.8 14.2 14.8L9.6 11.6C9.2 12.5 9 13.5 9 14.5V30L14 27V20.5C14 18 16.8 16 20 16C21.2 16 22.3 16.3 23.2 16.9L27.4 13.3C25.5 12.2 22.9 11.5 20 11.5Z" fill="#1664FF" opacity="0.55"/>
      <path d="M14 27V34L20 30.5L26 34V20.5C26 19.8 25.8 19.1 25.4 18.5L20 22.5L14 20.5V27Z" fill="#1664FF" opacity="0.35"/>
    </svg>
  )
}

const [admin, guest] = DEMO_USERS

export default function Login({ onLogin }) {
  return (
    <div className="login-screen">
      <div className="login-wrap">
        <div className="login-logo">
          <div className="login-logo-title">
            <span className="login-logo-dot" />
            云控平台
          </div>
          <div className="login-logo-sub">设备全生命周期管理 · 智平方</div>
        </div>
        <div className="login-card">
          <button className="feishu-btn" onClick={() => onLogin(admin)}>
            <FeishuIcon />
            使用飞书账号登录
          </button>
          <div className="feishu-hint">推荐 · 飞书登录默认以管理员身份进入</div>
          <div className="divider">
            <div className="divider-line" /><span className="divider-text">或使用账号密码</span><div className="divider-line" />
          </div>
          <div className="login-label">账号</div>
          <input className="login-input" placeholder="请输入账号" />
          <div className="login-label">密码</div>
          <input className="login-input" type="password" placeholder="请输入密码" />
          <button className="login-submit" onClick={() => onLogin(admin)}>登 录</button>

          <div className="divider" style={{ marginTop: 18 }}>
            <div className="divider-line" /><span className="divider-text">原型演示 · 快捷切换身份</span><div className="divider-line" />
          </div>
          <div className="demo-login-row">
            <button className="demo-login-btn demo-admin" onClick={() => onLogin(admin)}>
              <div className="demo-avatar demo-avatar-admin">张</div>
              <div>
                <div className="demo-name">张三</div>
                <div className="demo-role">管理员 · 全部权限</div>
              </div>
            </button>
            <button className="demo-login-btn demo-guest" onClick={() => onLogin(guest)}>
              <div className="demo-avatar demo-avatar-guest">赵</div>
              <div>
                <div className="demo-name">赵六</div>
                <div className="demo-role">游客 · 只读权限</div>
              </div>
            </button>
          </div>

          <div className="login-hint">仅限智平方内部人员使用</div>
        </div>
      </div>
    </div>
  )
}
