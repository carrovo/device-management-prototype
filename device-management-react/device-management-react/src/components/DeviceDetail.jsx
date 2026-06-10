import { LC_BADGE, CONN_BADGE, LIFECYCLE_STAGES, HEALTH_MODULES } from '../data.js'
import { IconChevronLeft, IconEdit, IconTrash, IconFile, IconCpu, IconActivity, IconHeart, IconFlow } from './Icons.jsx'

export default function DeviceDetail({ device, currentProj, onBack, onEdit, toast }) {
  const d = device
  const stageIdx = LIFECYCLE_STAGES.indexOf(d.lifecycle)
  const isOnline = d.conn === '在线'

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}><IconChevronLeft strokeWidth="2.5" /> 返回设备列表</button>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="page-title">{d.name}</span>
          <span style={{ fontSize: 13, color: 'var(--text2)' }}>{d.sn}</span>
          <span className={`badge ${LC_BADGE[d.lifecycle]}`}>{d.lifecycle}</span>
          <span className={`badge ${CONN_BADGE[d.conn]}`}>{d.conn}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="bs" onClick={() => onEdit(d)}><IconEdit /> 编辑</button>
          <button className="bd" onClick={() => toast('原型演示：删除设备需二次确认')}><IconTrash /> 删除</button>
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
              <div className="lc-assignee">{d.assignee?.[stage] || (i <= stageIdx ? '—' : '待进行')}</div>
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

      {/* 硬件配置（设备上报） */}
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
    </div>
  )
}
