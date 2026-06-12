import { useState } from 'react'
import { DEVICE_TYPES, PROJECT_DATA } from '../data.js'
import Modal from './Modal.jsx'
import { IconPlus, IconEdit, IconTrash, IconAlert, IconUpload, IconChevronDown } from './Icons.jsx'

export default function DeviceTypes({ toast }) {
  const [showAdd, setShowAdd]       = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [expandedIds, setExpandedIds] = useState(new Set())
  const [draftModules, setDraftModules] = useState([])

  const countByType = {}
  Object.values(PROJECT_DATA).forEach(p => p.devices.forEach(d => {
    countByType[d.type] = (countByType[d.type] || 0) + 1
  }))

  const openEdit = (t) => {
    setEditTarget(t)
    setDraftModules((t.modules || []).map(m => ({ ...m })))
  }

  const addModule = () =>
    setDraftModules([...draftModules, { name: '', spec: '', config: '' }])

  const removeModule = (i) =>
    setDraftModules(draftModules.filter((_, idx) => idx !== i))

  const updateModule = (i, field, val) =>
    setDraftModules(draftModules.map((m, idx) => idx === i ? { ...m, [field]: val } : m))

  const toggleExpand = (id) => {
    const next = new Set(expandedIds)
    next.has(id) ? next.delete(id) : next.add(id)
    setExpandedIds(next)
  }

  return (
    <div className="page">
      <div className="page-header">
        <span className="page-title">设备类型</span>
        <button className="bp" onClick={() => { setShowAdd(true); setDraftModules([]) }}>
          <IconPlus stroke="white" strokeWidth="2.5" /> 新建类型
        </button>
      </div>
      <div className="info-box">
        每台设备必须关联一个设备类型。设备类型定义该型号的整机 URDF 及各模块的规格配置，供仿真、健康监测等上层模块调用。
      </div>
      <div className="tw">
        <table>
          <thead>
            <tr>
              <th style={{ width: 32 }} />
              <th>类型名称</th>
              <th>URDF 文件</th>
              <th>描述</th>
              <th>模块数</th>
              <th>关联设备</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {DEVICE_TYPES.map(t => {
              const isOpen = expandedIds.has(t.id)
              const mods = t.modules || []
              return [
                <tr key={t.id}>
                  <td style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => toggleExpand(t.id)}>
                    <IconChevronDown
                      strokeWidth="2.5"
                      style={{ width: 13, height: 13, transition: 'transform .2s', transform: isOpen ? 'rotate(180deg)' : 'none', color: 'var(--text3)' }}
                    />
                  </td>
                  <td style={{ fontWeight: 500, cursor: 'pointer' }} onClick={() => toggleExpand(t.id)}>{t.name}</td>
                  <td><span className="dv mono">{t.urdf}</span></td>
                  <td style={{ whiteSpace: 'normal' }}>{t.desc}</td>
                  <td>{mods.length} 个</td>
                  <td>{countByType[t.name] || 0} 台</td>
                  <td style={{ fontSize: 11 }}>{t.created}</td>
                  <td>
                    <button className="btn-link" onClick={() => openEdit(t)}>编辑</button>
                    <span className="sep">|</span>
                    <button className="btn-link-danger" onClick={() => setDeleteTarget(t)}>删除</button>
                  </td>
                </tr>,
                isOpen && (
                  <tr key={`${t.id}-detail`} className="dt-expand-row">
                    <td colSpan="8" style={{ padding: '0 12px 14px 44px', background: 'var(--bg2)' }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', margin: '10px 0 8px' }}>
                        模块清单 · {t.name}
                      </div>
                      {mods.length === 0 ? (
                        <div style={{ fontSize: 12, color: 'var(--text3)', padding: '4px 0 8px' }}>暂未配置模块信息</div>
                      ) : (
                        <table className="module-table">
                          <thead>
                            <tr>
                              <th>模块名称</th>
                              <th>规格 / 型号</th>
                              <th>配置文件</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mods.map((m, i) => (
                              <tr key={i}>
                                <td style={{ fontWeight: 500 }}>{m.name}</td>
                                <td style={{ color: 'var(--text2)' }}>{m.spec}</td>
                                <td><span className="dv mono">{m.config}</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </td>
                  </tr>
                ),
              ]
            })}
          </tbody>
        </table>
      </div>

      {/* 新建 / 编辑弹窗 */}
      {(showAdd || editTarget) && (
        <Modal
          title={editTarget ? `编辑设备类型 · ${editTarget.name}` : '新建设备类型'}
          size="modal-lg"
          onClose={() => { setShowAdd(false); setEditTarget(null) }}
        >
          <div className="modal-input-label">类型名称<span className="req">*</span></div>
          <input className="modal-input" placeholder="如 Alpha-3" defaultValue={editTarget?.name || ''} />
          <div className="modal-input-label">URDF 文件<span className="req">*</span></div>
          <div className="upload-zone" style={{ padding: '1rem', marginBottom: 12 }}>
            <IconUpload strokeWidth="1.5" style={{ width: 22, height: 22 }} />
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>
              {editTarget ? `当前：${editTarget.urdf}，` : ''}<span style={{ color: 'var(--info)', cursor: 'pointer' }}>点击上传</span> .urdf 文件
            </div>
          </div>
          <div className="modal-input-label">描述</div>
          <textarea className="modal-textarea" placeholder="选填，描述该类型的形态与适用场景" defaultValue={editTarget?.desc || ''} />

          {/* 模块清单 */}
          <div className="modal-input-label" style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>模块清单</span>
            <button className="perm-all-btn" onClick={addModule}>+ 添加模块</button>
          </div>
          {draftModules.length === 0 ? (
            <div style={{ fontSize: 12, color: 'var(--text3)', margin: '6px 0 10px' }}>
              暂无模块配置，点击「添加模块」开始录入
            </div>
          ) : (
            <div style={{ marginBottom: 10 }}>
              <div className="module-edit-header">
                <span style={{ flex: '0 0 22%' }}>模块名称</span>
                <span style={{ flex: 1 }}>规格 / 型号</span>
                <span style={{ flex: '0 0 22%' }}>配置文件</span>
                <span style={{ width: 32 }} />
              </div>
              {draftModules.map((m, i) => (
                <div key={i} className="module-edit-row">
                  <input className="module-edit-input" style={{ flex: '0 0 22%' }}
                    placeholder="如：左臂" value={m.name}
                    onChange={e => updateModule(i, 'name', e.target.value)} />
                  <input className="module-edit-input" style={{ flex: 1 }}
                    placeholder="如：RM-65B 6-DOF 协作臂" value={m.spec}
                    onChange={e => updateModule(i, 'spec', e.target.value)} />
                  <input className="module-edit-input" style={{ flex: '0 0 22%' }}
                    placeholder="如：left_arm.urdf" value={m.config}
                    onChange={e => updateModule(i, 'config', e.target.value)} />
                  <button className="btn-link-danger" style={{ flexShrink: 0, width: 32, textAlign: 'center' }}
                    onClick={() => removeModule(i)}>✕</button>
                </div>
              ))}
            </div>
          )}

          <div className="ff" style={{ marginTop: 4, paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => { setShowAdd(false); setEditTarget(null) }}>取消</button>
            <button className="bp" onClick={() => { setShowAdd(false); setEditTarget(null); toast('原型演示：设备类型已保存') }}>
              {editTarget ? '保存修改' : '确认创建'}
            </button>
          </div>
        </Modal>
      )}

      {/* 删除确认 */}
      {deleteTarget && (
        <Modal title="确认删除设备类型" size="modal-sm" onClose={() => setDeleteTarget(null)}>
          <div className="danger-box">
            <IconAlert />当前有 {countByType[deleteTarget.name] || 0} 台设备关联此类型。删除前需先将这些设备改绑到其他类型。
          </div>
          <div className="modal-body">确定要删除设备类型 <strong>{deleteTarget.name}</strong> 吗？</div>
          <div className="ff" style={{ marginTop: 0, paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => setDeleteTarget(null)}>取消</button>
            <button className="bd" onClick={() => { setDeleteTarget(null); toast('原型演示：存在关联设备时将阻止删除') }}>确认删除</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
