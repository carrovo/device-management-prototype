import { useState } from 'react'
import { INITIAL_ROLES, INITIAL_USERS, MODULES, ACTIONS } from '../data.js'
import Modal from './Modal.jsx'
import { IconPlus, IconShield, IconAlert } from './Icons.jsx'

export default function RoleCenter({ toast }) {
  const [roles, setRoles] = useState(INITIAL_ROLES)
  const [permTarget, setPermTarget] = useState(null)   // 正在配置权限的角色
  const [draftPerms, setDraftPerms] = useState(null)   // 弹窗内的临时勾选状态
  const [showAdd, setShowAdd] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const userCount = (roleName) => INITIAL_USERS.filter(u => u.role === roleName).length

  const openPermModal = (role) => {
    setPermTarget(role)
    setDraftPerms(JSON.parse(JSON.stringify(role.perms)))
  }

  const togglePerm = (module, action) => {
    const list = draftPerms[module] || []
    const next = list.includes(action) ? list.filter(a => a !== action) : [...list, action]
    setDraftPerms({ ...draftPerms, [module]: next })
  }

  const toggleModuleAll = (module) => {
    const all = (draftPerms[module] || []).length === ACTIONS.length
    setDraftPerms({ ...draftPerms, [module]: all ? [] : [...ACTIONS] })
  }

  const savePerms = () => {
    setRoles(roles.map(r => r.id === permTarget.id ? { ...r, perms: draftPerms } : r))
    setPermTarget(null)
    toast(`原型演示：角色「${permTarget.name}」权限已更新`)
  }

  return (
    <div className="page">
      <div className="page-header">
        <span className="page-title">角色中心</span>
        <button className="bp" onClick={() => setShowAdd(true)}><IconPlus stroke="white" strokeWidth="2.5" /> 新建角色</button>
      </div>
      <div className="info-box">
        角色定义平台各模块的操作权限（查看 / 新增 / 编辑 / 删除）。用户与角色的绑定在「用户中心」操作。<strong>管理员</strong> 和 <strong>游客</strong> 为系统内置角色，不可删除。
      </div>
      <div className="tw">
        <table>
          <thead><tr><th>角色名称</th><th>说明</th><th>权限概览</th><th>关联用户</th><th>操作</th></tr></thead>
          <tbody>
            {roles.map(r => {
              const permCount = Object.values(r.perms).reduce((s, l) => s + l.length, 0)
              const totalCount = MODULES.length * ACTIONS.length
              return (
                <tr key={r.id}>
                  <td style={{ fontWeight: 500 }}>
                    {r.name}
                    {r.builtin && <span className="badge b-nc" style={{ marginLeft: 6, fontSize: 10 }}>内置</span>}
                  </td>
                  <td style={{ whiteSpace: 'normal', fontSize: 11, color: 'var(--text2)' }}>{r.desc}</td>
                  <td><span style={{ fontSize: 11 }}>{permCount} / {totalCount} 项</span></td>
                  <td>{userCount(r.name)} 人</td>
                  <td>
                    <button className="btn-link" onClick={() => openPermModal(r)}>配置权限</button>
                    {!r.builtin && <>
                      <span className="sep">|</span>
                      <button className="btn-link-danger" onClick={() => setDeleteTarget(r)}>删除</button>
                    </>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 权限配置弹窗 — 可勾选矩阵 */}
      {permTarget && (
        <Modal title={`配置权限 · ${permTarget.name}`} size="modal-xl" onClose={() => setPermTarget(null)}>
          <div className="modal-body" style={{ marginBottom: 12 }}>
            勾选该角色在各模块下可执行的操作。可点击行末「全选」快速勾满整行。
          </div>
          <table className="perm-matrix">
            <thead>
              <tr>
                <th style={{ width: 140 }}>模块</th>
                <th className="perm-col-view">查看</th>
                <th className="perm-col-add">新增</th>
                <th className="perm-col-edit">编辑</th>
                <th className="perm-col-del">删除</th>
                <th style={{ width: 70, color: 'var(--text3)', fontWeight: 400 }}>快捷</th>
              </tr>
            </thead>
            <tbody>
              {MODULES.map(m => {
                const checked = draftPerms[m] || []
                const allSelected = checked.length === ACTIONS.length
                return (
                  <tr key={m}>
                    <td style={{ fontWeight: 500 }}>{m}</td>
                    {ACTIONS.map((a, i) => {
                      const colCls = ['perm-col-view','perm-col-add','perm-col-edit','perm-col-del'][i]
                      return (
                        <td key={a} style={{ background: checked.includes(a) ? undefined : undefined }}>
                          <input type="checkbox" className="perm-check"
                            style={{ accentColor: ['#185FA5','#1A8546','#B87A10','#A32D2D'][i] }}
                            checked={checked.includes(a)}
                            onChange={() => togglePerm(m, a)} />
                        </td>
                      )
                    })}
                    <td>
                      <button className="perm-all-btn" onClick={() => toggleModuleAll(m)}>
                        {allSelected ? '清空' : '全选'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8, marginBottom: 4 }}>
            提示：权限粒度与平台菜单一一对应，后续新增模块时此矩阵自动扩展。
          </div>
          <div className="ff" style={{ marginTop: 8, paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => setPermTarget(null)}>取消</button>
            <button className="bp" onClick={savePerms}>保存权限</button>
          </div>
        </Modal>
      )}

      {showAdd && (
        <Modal title="新建角色" size="modal-sm" onClose={() => setShowAdd(false)}>
          <div className="modal-input-label">角色名称<span className="req">*</span></div>
          <input className="modal-input" placeholder="如：质检员" />
          <div className="modal-input-label">角色说明</div>
          <textarea className="modal-textarea" placeholder="选填，描述该角色的职责范围" />
          <div className="info-box" style={{ marginBottom: 12 }}>创建后请通过「配置权限」为该角色勾选具体权限，新角色默认无任何权限。</div>
          <div className="ff" style={{ marginTop: 0, paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => setShowAdd(false)}>取消</button>
            <button className="bp" onClick={() => { setShowAdd(false); toast('原型演示：角色已创建，请继续配置权限') }}>确认创建</button>
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="确认删除角色" size="modal-sm" onClose={() => setDeleteTarget(null)}>
          <div className="danger-box">
            <IconAlert />当前有 {userCount(deleteTarget.name)} 名用户使用此角色。删除后这些用户将自动降级为「游客」角色。
          </div>
          <div className="modal-body">确定要删除角色 <strong>{deleteTarget.name}</strong> 吗？</div>
          <div className="ff" style={{ marginTop: 0, paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => setDeleteTarget(null)}>取消</button>
            <button className="bd" onClick={() => { setDeleteTarget(null); toast('原型演示：角色已删除，关联用户已降级为游客') }}>确认删除</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
