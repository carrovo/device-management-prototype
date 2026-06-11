import { useState } from 'react'
import { PROJECT_DATA, LC_BADGE, CONN_BADGE } from '../data.js'
import Modal from './Modal.jsx'
import { IconPlus, IconEdit, IconTrash, IconChevronLeft, IconFile, IconDevice, IconAlert } from './Icons.jsx'

export function Projects({ onOpen, toast }) {
  const [showAdd, setShowAdd] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  return (
    <div className="page">
      <div className="page-header">
        <span className="page-title">项目管理</span>
        <button className="bp" onClick={() => setShowAdd(true)}><IconPlus stroke="white" strokeWidth="2.5" /> 新建项目</button>
      </div>
      <div className="info-box">
        项目是设备数据隔离的基本单元。所有设备必须归属于某个项目，跨项目数据互不可见。
      </div>
      <div className="proj-grid">
        {Object.entries(PROJECT_DATA).map(([name, d]) => (
          <div className="proj-card" key={name} onClick={() => onOpen(name)}>
            <div className="proj-card-header">
              <span className="proj-card-name"><span className="proj-status-dot" style={{ background: d.devices.some(x => x.conn === '在线') ? '#639922' : '#888780' }} />{name}</span>
              <div className="proj-card-actions" onClick={e => e.stopPropagation()}>
                <button className="bs" onClick={() => setEditTarget(name)}><IconEdit /> 编辑</button>
                <button className="bd" onClick={() => setDeleteTarget(name)}><IconTrash /> 删除</button>
              </div>
            </div>
            <div className="proj-card-desc">{d.desc}</div>
            <div className="proj-card-meta">
              <span className="proj-meta-item"><span className="proj-meta-num">{d.devices.length}</span>台设备</span>
              <span className="proj-meta-item"><span className="proj-meta-num">{d.devices.filter(x => x.conn === '在线').length}</span>在线</span>
              <span className="proj-meta-item">创建于 {d.created}</span>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <Modal title="新建项目" size="modal-sm" onClose={() => setShowAdd(false)}>
          <div className="modal-input-label">项目名称<span className="req">*</span></div>
          <input className="modal-input" placeholder="请输入项目名称，如：仓储物流项目" />
          <div className="modal-input-label">项目描述</div>
          <textarea className="modal-textarea" placeholder="选填，简要描述该项目的用途或场景" />
          <div className="ff" style={{ marginTop: 0, paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => setShowAdd(false)}>取消</button>
            <button className="bp" onClick={() => { setShowAdd(false); toast('原型演示：项目创建成功') }}>确认创建</button>
          </div>
        </Modal>
      )}

      {editTarget && (
        <Modal title="编辑项目" size="modal-sm" onClose={() => setEditTarget(null)}>
          <div className="modal-input-label">项目名称<span className="req">*</span></div>
          <input className="modal-input" defaultValue={editTarget} />
          <div className="modal-input-label">项目描述</div>
          <textarea className="modal-textarea" defaultValue={PROJECT_DATA[editTarget].desc} />
          <div className="ff" style={{ marginTop: 0, paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => setEditTarget(null)}>取消</button>
            <button className="bp" onClick={() => { setEditTarget(null); toast('原型演示：修改已保存') }}>保存修改</button>
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="确认删除项目" size="modal-sm" onClose={() => setDeleteTarget(null)}>
          <div className="danger-box">
            <IconAlert />删除后，该项目下的 {PROJECT_DATA[deleteTarget].devices.length} 台设备将无法通过项目维度检索，此操作不可撤销。建议先将设备转移至其他项目。
          </div>
          <div className="modal-body">确定要删除项目 <strong>{deleteTarget}</strong> 吗？</div>
          <div className="ff" style={{ marginTop: 0, paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => setDeleteTarget(null)}>取消</button>
            <button className="bd" onClick={() => { setDeleteTarget(null); toast('原型演示：正式版本将执行删除') }}>确认删除</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export function ProjectDetail({ name, onBack, onDeviceDetail, toast }) {
  const d = PROJECT_DATA[name]
  const alertCount = (dev) => !dev.health ? 0 : Object.values(dev.health).filter(v => v === '异常').length

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}><IconChevronLeft strokeWidth="2.5" /> 返回项目管理</button>
      <div className="page-header">
        <div>
          <span className="page-title">{name}</span>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{d.desc}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="bs" onClick={() => toast('原型演示：编辑项目弹窗见项目管理页')}><IconEdit /> 编辑项目</button>
          <button className="bd" onClick={() => toast('原型演示：删除项目需二次确认')}><IconTrash /> 删除项目</button>
        </div>
      </div>
      <div className="card">
        <div className="sh"><IconFile /> 项目信息</div>
        <div className="dr"><span className="dk">项目名称</span><span className="dv">{name}</span></div>
        <div className="dr"><span className="dk">创建时间</span><span className="dv">{d.created}</span></div>
        <div className="dr"><span className="dk">描述</span><span className="dv">{d.desc}</span></div>
      </div>
      <div className="card">
        <div className="sh"><IconDevice /> 设备概况<span className="sh-note">本项目下的设备统计</span></div>
        <div className="stat-row">
          <div className="stat-chip"><div><div className="stat-num">{d.devices.length}</div><div className="stat-label">设备总数</div></div></div>
          <div className="stat-chip"><div><div className="stat-num">{d.devices.filter(x => x.lifecycle === '在线运营').length}</div><div className="stat-label">在线运营</div></div></div>
          <div className="stat-chip"><div><div className="stat-num">{d.devices.filter(x => x.conn === '在线').length}</div><div className="stat-label">当前在线</div></div></div>
          <div className="stat-chip stat-chip-warn"><div><div className="stat-num stat-num-warn">{d.devices.filter(x => x.conn === '离线').length}</div><div className="stat-label">当前离线</div></div></div>
        </div>
        <div className="sh" style={{ marginTop: 4 }}>项目设备列表<span className="sh-note">点击设备行可查看详情</span></div>
        <div className="tw" style={{ marginTop: 8 }}>
          <table>
            <thead>
              <tr>
                <th>SN 号</th><th>名称</th><th>设备类型</th><th>生命周期状态</th><th>连接状态</th><th>告警</th>
              </tr>
            </thead>
            <tbody>
              {d.devices.map(dev => {
                const ac = alertCount(dev)
                return (
                  <tr key={dev.sn} style={{ cursor: 'pointer' }}
                    onClick={() => onDeviceDetail ? onDeviceDetail(dev) : toast('原型演示：点击跳转设备详情')}>
                    <td>{dev.sn}</td>
                    <td style={{ fontWeight: 500 }}>{dev.name}</td>
                    <td>{dev.type}</td>
                    <td><span className={`badge ${LC_BADGE[dev.lifecycle]}`}>{dev.lifecycle}</span></td>
                    <td><span className={`badge ${CONN_BADGE[dev.conn]}`}>{dev.conn}</span></td>
                    <td>{ac > 0
                      ? <span className="badge b-error">{ac} 项</span>
                      : <span style={{ color: 'var(--text3)', fontSize: 11 }}>—</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
