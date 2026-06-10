import { useState } from 'react'
import { INITIAL_USERS, INITIAL_ROLES } from '../data.js'
import Csel, { FormSelect } from './Csel.jsx'
import Modal from './Modal.jsx'
import { IconSearch, IconPlus } from './Icons.jsx'

const ROLE_BADGE = { '管理员': 'b-admin', '游客': 'b-nc' }

export default function UserCenter({ toast }) {
  const [fRole, setFRole] = useState('')
  const [roleTarget, setRoleTarget] = useState(null)
  const [newRole, setNewRole] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const users = INITIAL_USERS.filter(u => !fRole || u.role === fRole)
  const roleNames = INITIAL_ROLES.map(r => r.name)

  return (
    <div className="page">
      <div className="page-header">
        <span className="page-title">用户中心</span>
        <button className="bp" onClick={() => setShowAdd(true)}><IconPlus stroke="white" strokeWidth="2.5" /> 添加用户</button>
      </div>
      <div className="info-box">
        通过飞书 SSO 首次登录的账号将自动创建用户并分配 <strong>游客</strong> 角色（仅可查看）。如需更高权限，请联系管理员在此调整角色。角色对应的具体权限在「角色中心」配置。
      </div>
      <div className="tbar">
        <div className="sb"><IconSearch /><input placeholder="搜索姓名 / 账号" /></div>
        <Csel value={fRole} placeholder="角色" options={roleNames} onChange={setFRole} highlight />
      </div>
      <div className="tw">
        <table>
          <thead><tr><th>姓名</th><th>账号</th><th>登录方式</th><th>角色</th><th>操作</th></tr></thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="5" className="empty-row">暂无符合条件的用户</td></tr>
            ) : users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td><td>{u.account}</td>
                <td><span style={{ fontSize: 11, color: 'var(--text2)' }}>{u.login}</span></td>
                <td><span className={`badge ${ROLE_BADGE[u.role] || 'b-user'}`}>{u.role}</span></td>
                <td>
                  <button className="btn-link" onClick={() => { setRoleTarget(u); setNewRole(u.role) }}>修改角色</button>
                  <span className="sep">|</span>
                  <button className="btn-link-danger" onClick={() => toast('原型演示：移除用户需二次确认')}>移除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {roleTarget && (
        <Modal title={`修改角色 · ${roleTarget.name}`} size="modal-sm" onClose={() => setRoleTarget(null)}>
          <div className="modal-body">为用户 <strong>{roleTarget.name}</strong>（{roleTarget.account}）分配新角色。角色权限详情可在「角色中心」查看。</div>
          <div className="modal-input-label">角色</div>
          <FormSelect value={newRole} placeholder="请选择角色" options={roleNames} onChange={setNewRole} />
          <div className="ff" style={{ marginTop: 12, paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => setRoleTarget(null)}>取消</button>
            <button className="bp" onClick={() => { setRoleTarget(null); toast(`原型演示：已将 ${roleTarget.name} 的角色改为 ${newRole}`) }}>确认修改</button>
          </div>
        </Modal>
      )}

      {showAdd && (
        <Modal title="添加用户" size="modal-sm" onClose={() => setShowAdd(false)}>
          <div className="modal-body">手动创建账号密码用户。飞书用户无需手动添加，首次登录自动创建。</div>
          <div className="modal-input-label">姓名<span className="req">*</span></div>
          <input className="modal-input" placeholder="请输入姓名" />
          <div className="modal-input-label">账号<span className="req">*</span></div>
          <input className="modal-input" placeholder="请输入登录账号" />
          <div className="modal-input-label">初始角色</div>
          <FormSelect value="游客" placeholder="请选择" options={roleNames} onChange={() => {}} />
          <div className="ff" style={{ marginTop: 12, paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => setShowAdd(false)}>取消</button>
            <button className="bp" onClick={() => { setShowAdd(false); toast('原型演示：用户已创建，初始密码将通过飞书发送') }}>确认添加</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
