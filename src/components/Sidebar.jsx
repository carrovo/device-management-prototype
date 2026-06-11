import { IconDevice, IconFolder, IconBox, IconUsers, IconShield, IconLogout, IconAlert } from './Icons.jsx'

const NAV = [
  { section: '设备', items: [
    { key: 'devices',      label: '设备管理', icon: IconDevice },
    { key: 'alert-center', label: '告警中心', icon: IconAlert },
    { key: 'projects',     label: '项目管理', icon: IconFolder },
    { key: 'device-types', label: '设备类型', icon: IconBox,    guestHidden: true },
  ]},
  { section: '系统', items: [
    { key: 'user-center',  label: '用户中心', icon: IconUsers,  guestHidden: true },
    { key: 'role-center',  label: '角色中心', icon: IconShield, guestHidden: true },
  ]},
]

export default function Sidebar({ activeNav, onNav, onLogout, currentUser, isGuest }) {
  const user = currentUser || { name: '张三', role: '管理员', avatar: '张' }
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-title">云控平台</div>
        <div className="sidebar-logo-sub">设备管理模块</div>
      </div>
      {NAV.map(group => {
        const items = group.items.filter(item => !(isGuest && item.guestHidden))
        if (items.length === 0) return null
        return (
          <div className="sidebar-section" key={group.section}>
            <div className="sidebar-section-label">{group.section}</div>
            {items.map(item => (
              <div key={item.key} className={`nav-item ${activeNav === item.key ? 'active' : ''}`} onClick={() => onNav(item.key)}>
                <item.icon stroke="white" strokeWidth="1.8" />
                {item.label}
              </div>
            ))}
          </div>
        )
      })}
      <div className="sidebar-bottom">
        <div className="user-chip">
          <div className="avatar">{user.avatar}</div>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>{user.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>{user.role}</div>
          </div>
        </div>
        <div className="logout-btn" onClick={onLogout}>
          <IconLogout strokeWidth="1.8" /><span>退出登录</span>
        </div>
      </div>
    </nav>
  )
}
