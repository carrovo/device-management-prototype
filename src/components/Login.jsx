import { IconUser, IconLock } from './Icons.jsx'

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

export default function Login({ onLogin }) {
  return (
    <div className="login-screen">
      <div className="login-panel-left">
        <div className="login-brand">
          <div className="login-brand-icon">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
              <rect width="36" height="36" rx="9" fill="rgba(255,255,255,0.12)"/>
              <path d="M10 26 L18 10 L26 26 L21 26 L18 20 L15 26 Z" fill="white"/>
            </svg>
          </div>
          <div className="login-brand-name">云控平台</div>
          <div className="login-brand-tagline">设备全生命周期管理</div>
          <div className="login-brand-by">by 智平方</div>
        </div>
        <div className="login-brand-footer">
          仅限内部人员使用
        </div>
      </div>

      <div className="login-panel-right">
        <div className="login-card">
          <div className="login-card-title">欢迎回来</div>
          <div className="login-card-sub">登录以继续使用设备管理系统</div>

          <button className="feishu-btn" onClick={onLogin}>
            <FeishuIcon />
            使用飞书账号登录
          </button>
          <div className="feishu-hint">推荐 · 飞书账号首次登录默认游客权限</div>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">或使用账号密码</span>
            <div className="divider-line" />
          </div>

          <div className="login-label">账号</div>
          <input className="login-input" placeholder="请输入账号" />
          <div className="login-label">密码</div>
          <input className="login-input" type="password" placeholder="请输入密码" />
          <button className="login-submit" onClick={onLogin}>登 录</button>
        </div>
      </div>
    </div>
  )
}
