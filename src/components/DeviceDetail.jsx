import { useState } from 'react'
import { LC_BADGE, CONN_BADGE, LIFECYCLE_STAGES, HEALTH_MODULES } from '../data.js'
import { IconChevronLeft, IconEdit, IconTrash, IconFile, IconCpu, IconActivity, IconHeart, IconFlow, IconAlert } from './Icons.jsx'
import Modal from './Modal.jsx'

const RETIRE_STAGE = '退役'
const OPERATOR = '张三（管理员）'

export default function DeviceDetail({ device, currentProj, onBack, onEdit, toast, onDeviceChange }) {
  const [lifecycle, setLifecycle] = useState(device.lifecycle)
  const [assignee, setAssignee] = useState(device.assignee || {})
  const [showAdvance, setShowAdvance] = useState(false)
  const [showRetire, setShowRetire] = useState(false)

  const stageIdx = LIFECYCLE_STAGES.indexOf(lifecycle)
  const isRetired = lifecycle === RETIRE_STAGE
  const isOnline = device.conn === '在线'
  // 推进按钮：当前阶段不是退役，且下一阶段不是退役（退役通过专属按钮）
  const canAdvance = !isRetired && stageIdx < LIFECYCLE_STAGES.indexOf(RETIRE_STAGE) - 1

  const syncChange = (updates) => {
    if (onDeviceChange) onDeviceChange({ ...device, lifecycle, assignee, ...updates })
  }

  const doAdvance = () => {
    const next = LIFECYCLE_STAGES[stageIdx + 1]
    const newAssignee = { ...assignee, [next]: OPERATOR }
    setLifecycle(next)
    setAssignee(newAssignee)
    setShowAdvance(false)
    syncChange({ lifecycle: next, assignee: newAssignee })
    toast(`已确认完成「${lifecycle}」阶段，当前进入「${next}」`)
  }

  const doRetire = () => {
    setLifecycle(RETIRE_STAGE)
    setShowRetire(false)
    syncChange({ lifecycle: RETIRE_STAGE })
    toast('设备已退役，生命周期状态已更新为「退役」')
  }

  const d = device

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}><IconChevronLeft strokeWidth="2.5" /> 返回设备列表</button>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="page-title">{d.name}</span>
          <span style={{ fontSize: 13, color: 'var(--text2)' }}>{d.sn}</span>
          <span className={`badge ${LC_BADGE[lifecycle]}`}>{lifecycle}</span>
          <span className={`badge ${CONN_BADGE[d.conn]}`}>{d.conn}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="bs" onClick={() => onEdit(d)}><IconEdit /> 编辑</button>
          {!isRetired && (
            <button className="bd" onClick={() => setShowRetire(true)}>
              <IconTrash /> 退役设备
            </button>
          )}
        </div>
      </div>

      {/* 生命周期流程 */}
      <div className="card">
        <div className="sh"><IconFlow /> 生命周期流程<span className="sh-note">各阶段责任人通过飞书账号关联</span></div>
        <div className="lc-stepper">
          {LIFECYCLE_STAGES.map((stage, i) => (
            <div key={stage} className={`lc-step ${i < stageIdx ? 'done' : ''} ${i === stageIdx ? 'current' : ''}`}>
              <div className="lc-dot">{i < stageIdx ? '✓' : i + 1}</div>
              <div className="lc-label">{stage}</div>
              <div className="lc-assignee">{assignee?.[stage] || (i <= stageIdx ? '—' : '待进行')}</div>
              {i === stageIdx && canAdvance && (
                <button
                  className="lc-advance-btn"
                  onClick={() => setShowAdvance(true)}
                >
                  确认完成本阶段 →
                </button>
              )}
              {i < LIFECYCLE_STAGES.length - 1 && <div className="lc-line" />}
            </div>
          ))}
        </div>
      </div>

      {/* 基础信息 */}
      <div className="card">
        <div className="sh"><IconFile /> 基础信息</div>
        <div className="dr"><span className="dk">SN 号</span><span className="dv">{d.sn}</span></div>
        <div className="dr"><span className="dk">设备 ID</span><span className="dv mono">{d.deviceId}</span></div>
        <div className="dr"><span className="dk">机器人名称</span><span className="dv">{d.name}</span></div>
        <div className="dr"><span className="dk">设备类型</span><span className="dv">{d.type}<span style={{ fontSize: 11, color: 'var(--text3)', marginLeft: 8 }}>（关联 URDF 配置，见设备类型管理）</span></span></div>
        <div className="dr"><span className="dk">所属项目</span><span className="dv">{currentProj}</span></div>
        <div className="dr"><span className="dk">注册时间</span><span className="dv">{d.regTime}</span></div>
        <div className="dr"><span className="dk">备注</span><span className="dv dim">暂无备注</span></div>
      </div>

      {/* 硬件配置 */}
      <div className="card">
        <div className="sh"><IconCpu /> 硬件配置<span className="sh-note">出厂录入 + 设备端服务上报，可在编辑中更新</span></div>
        <div className="dr"><span className="dk">系统版本</span><span className="dv">{d.sysVersion}</span></div>
        <div className="dr"><span className="dk">末端配置</span><span className="dv">{d.endEffector}</span></div>
        <div className="dr"><span className="dk">相机类型</span><span className="dv">{d.cameraType}</span></div>
        <div className="dr"><span className="dk">相机 SN</span><span className="dv mono">{d.cameraSN}</span></div>
      </div>

      {/* 健康状态 */}
      <div className="card">
        <div className="sh">
          <IconHeart /> 健康状态
          <span className="sh-note">{isOnline ? '设备在线，实时检测各模块状态' : '设备离线，无法检测，恢复在线后自动更新'}</span>
        </div>
        <div className="health-grid">
          {HEALTH_MODULES.map(m => {
            const status = isOnline ? (d.health?.[m] || '正常') : '离线'
            const cls = status === '正常' ? 'b-normal' : status === '异常' ? 'b-error' : 'b-nc'
            return (
              <div className="health-item" key={m}>
                <span className="health-name">{m}</span>
                <span className={`badge ${cls}`}>{status}</span>
              </div>
            )
          })}
        </div>
        {isOnline && Object.values(d.health || {}).includes('异常') && (
          <div className="danger-box" style={{ marginTop: 10, marginBottom: 0 }}>
            检测到模块异常，已同步至健康告警服务。请联系运维人员排查。
          </div>
        )}
      </div>

      {/* 实时数据 */}
      <div className="card">
        <div className="sh">
          <IconActivity /> 实时数据
          <span className="sh-note">{isOnline ? '设备端服务实时上报' : '设备离线，显示最近无数据'}</span>
        </div>
        <div className="rt-grid">
          <div className="rt-card">
            <div className="rt-lbl">电量</div>
            <div className={`rt-val ${!d.battery ? 'dim' : ''}`}>{d.battery || '—'}</div>
          </div>
          <div className="rt-card">
            <div className="rt-lbl">存储</div>
            <div className={`rt-val ${!d.storage ? 'dim' : ''}`} style={{ fontSize: d.storage ? 14 : 18 }}>{d.storage || '—'}</div>
          </div>
          <div className="rt-card">
            <div className="rt-lbl">连接状态</div>
            <div className="rt-val" style={{ fontSize: 14 }}>{d.conn}</div>
          </div>
        </div>
      </div>

      {/* 确认推进阶段弹窗 */}
      {showAdvance && (
        <Modal title="确认完成本阶段" size="modal-sm" onClose={() => setShowAdvance(false)}>
          <div className="modal-body">
            确认当前阶段 <strong>「{lifecycle}」</strong> 已完成，并将流程推进至 <strong>「{LIFECYCLE_STAGES[stageIdx + 1]}」</strong>？
          </div>
          <div className="info-box" style={{ marginBottom: 12 }}>
            操作人将记录为：{OPERATOR}。操作完成后可在生命周期流程中查看。
          </div>
          <div className="ff" style={{ paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => setShowAdvance(false)}>取消</button>
            <button className="bp" onClick={doAdvance}>确认推进</button>
          </div>
        </Modal>
      )}

      {/* 退役设备弹窗 */}
      {showRetire && (
        <Modal title="退役设备" size="modal-sm" onClose={() => setShowRetire(false)}>
          <div className="danger-box" style={{ marginBottom: 12 }}>
            <IconAlert style={{ width: 16, height: 16, flexShrink: 0 }} />
            <span>退役后设备将<strong>停止上报数据</strong>，云端连接断开。<strong>此操作不可撤销</strong>，请确认设备已完成数据备份。</span>
          </div>
          <div className="modal-body">
            确定要将设备 <strong>{d.name}（{d.sn}）</strong> 退役吗？
          </div>
          <div className="ff" style={{ paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => setShowRetire(false)}>取消</button>
            <button className="bd" onClick={doRetire}>确认退役</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
