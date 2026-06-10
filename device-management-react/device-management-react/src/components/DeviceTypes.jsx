import { useState } from 'react'
import { DEVICE_TYPES, PROJECT_DATA } from '../data.js'
import Modal from './Modal.jsx'
import { IconPlus, IconEdit, IconTrash, IconBox, IconAlert, IconUpload } from './Icons.jsx'

export default function DeviceTypes({ toast }) {
  const [showAdd, setShowAdd] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  // 统计每个类型下的设备数
  const countByType = {}
  Object.values(PROJECT_DATA).forEach(p => p.devices.forEach(d => {
    countByType[d.type] = (countByType[d.type] || 0) + 1
  }))

  return (
    <div className="page">
      <div className="page-header">
        <span className="page-title">设备类型</span>
        <button className="bp" onClick={() => setShowAdd(true)}><IconPlus stroke="white" strokeWidth="2.5" /> 新建类型</button>
      </div>
      <div className="info-box">
        每台设备必须关联一个设备类型。设备类型定义了该型号的 URDF 模型文件与默认配置，供仿真、可视化等上层模块调用。
      </div>
      <div className="tw">
        <table>
          <thead><tr><th>类型名称</th><th>URDF 文件</th><th>描述</th><th>关联设备数</th><th>创建时间</th><th>操作</th></tr></thead>
          <tbody>
            {DEVICE_TYPES.map(t => (
              <tr key={t.id}>
                <td style={{ fontWeight: 500 }}>{t.name}</td>
                <td><span className="dv mono">{t.urdf}</span></td>
                <td style={{ whiteSpace: 'normal' }}>{t.desc}</td>
                <td>{countByType[t.name] || 0} 台</td>
                <td style={{ fontSize: 11 }}>{t.created}</td>
                <td>
                  <button className="btn-link" onClick={() => setEditTarget(t)}>编辑</button>
                  <span className="sep">|</span>
                  <button className="btn-link-danger" onClick={() => setDeleteTarget(t)}>删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showAdd || editTarget) && (
        <Modal title={editTarget ? '编辑设备类型' : '新建设备类型'} size="modal-sm"
          onClose={() => { setShowAdd(false); setEditTarget(null) }}>
          <div className="modal-input-label">类型名称<span className="req">*</span></div>
          <input className="modal-input" placeholder="如 Alpha-3" defaultValue={editTarget?.name || ''} />
          <div className="modal-input-label">URDF 文件<span className="req">*</span></div>
          <div className="upload-zone" style={{ padding: '1.1rem' }}>
            <IconUpload strokeWidth="1.5" style={{ width: 24, height: 24 }} />
            <div style={{ fontSize: 12, color: 'var(--text2)' }}>
              {editTarget ? `当前：${editTarget.urdf}，` : ''}<span style={{ color: 'var(--info)', cursor: 'pointer' }}>点击上传</span> .urdf 文件
            </div>
          </div>
          <div className="modal-input-label">描述</div>
          <textarea className="modal-textarea" placeholder="选填，描述该类型的形态与适用场景" defaultValue={editTarget?.desc || ''} />
          <div className="ff" style={{ marginTop: 0, paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => { setShowAdd(false); setEditTarget(null) }}>取消</button>
            <button className="bp" onClick={() => { setShowAdd(false); setEditTarget(null); toast('原型演示：设备类型已保存') }}>
              {editTarget ? '保存修改' : '确认创建'}
            </button>
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="确认删除设备类型" size="modal-sm" onClose={() => setDeleteTarget(null)}>
          <div className="danger-box">
            <IconAlert />当前有 {countByType[deleteTarget.name] || 0} 台设备关联此类型。删除前需先将这些设备改绑到其他类型，否则将导致设备类型信息缺失。
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
