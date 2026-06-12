import { useState } from 'react'
import { PROJECT_DATA, ALERT_DESC, HEALTH_MODULES } from '../data.js'
import Csel from './Csel.jsx'
import { IconX } from './Icons.jsx'

const ALERT_TIMES = {
  'SN-20240101:存储模块': '2024-06-08 14:32:07',
  'SN-AP-002:相机模块':   '2024-06-09 09:15:44',
}

const ALL_ALERTS = (() => {
  const rows = []
  Object.entries(PROJECT_DATA).forEach(([proj, pd]) => {
    pd.devices.forEach(dev => {
      if (!dev.health) return
      Object.entries(dev.health).forEach(([module, status]) => {
        if (status !== '异常') return
        rows.push({
          sn: dev.sn,
          name: dev.name,
          proj,
          module,
          desc: ALERT_DESC[module] || '检测到异常状态',
          time: ALERT_TIMES[`${dev.sn}:${module}`] || '2024-06-10 08:00:00',
        })
      })
    })
  })
  return rows
})()

const ALL_PROJECTS   = Object.keys(PROJECT_DATA)
const ALL_DEV_NAMES  = [...new Set(
  Object.values(PROJECT_DATA).flatMap(pd => pd.devices.map(d => d.name))
)].sort()

export default function AlertCenter({ toast }) {
  const [fProj,   setFProj]   = useState('')
  const [fModule, setFModule] = useState('')
  const [fDevice, setFDevice] = useState('')

  const hasFilter = fProj || fModule || fDevice
  const alerts = ALL_ALERTS.filter(a => {
    if (fProj   && a.proj   !== fProj)   return false
    if (fModule && a.module !== fModule) return false
    if (fDevice && a.name   !== fDevice) return false
    return true
  })

  const clearAll = () => { setFProj(''); setFModule(''); setFDevice('') }

  return (
    <div className="page">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="page-title">告警中心</span>
          {ALL_ALERTS.length > 0 && (
            <span className="badge b-error" style={{ fontSize: 11 }}>{ALL_ALERTS.length} 条活跃告警</span>
          )}
        </div>
      </div>
      <div className="info-box">
        汇总平台所有在线设备中健康检测发现的模块异常。告警由设备端服务实时上报，离线设备不产生新告警。
      </div>

      <div className="tbar" style={{ marginBottom: '0.75rem' }}>
        <Csel value={fProj}   placeholder="按所属项目筛选" options={ALL_PROJECTS}   onChange={setFProj}   highlight />
        <Csel value={fModule} placeholder="按告警模块筛选" options={HEALTH_MODULES}  onChange={setFModule} highlight />
        <Csel value={fDevice} placeholder="按设备筛选"     options={ALL_DEV_NAMES}   onChange={setFDevice} highlight />
        {hasFilter && (
          <span className="filter-tag" onClick={clearAll}>
            清除筛选<IconX strokeWidth="3" />
          </span>
        )}
      </div>

      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>设备名称</th>
              <th>SN 号</th>
              <th>所属项目</th>
              <th>告警模块</th>
              <th>告警描述</th>
              <th>发现时间</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length === 0 ? (
              <tr><td colSpan="6" className="empty-row">
                {ALL_ALERTS.length === 0 ? '当前平台无活跃告警' : '无符合筛选条件的告警记录'}
              </td></tr>
            ) : alerts.map((a, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{a.name}</td>
                <td className="mono" style={{ fontSize: 11 }}>{a.sn}</td>
                <td>{a.proj}</td>
                <td><span className="badge b-error">{a.module}</span></td>
                <td style={{ fontSize: 11, color: 'var(--text2)' }}>{a.desc}</td>
                <td style={{ fontSize: 11 }}>{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pg">
        <span>共 {alerts.length} 条{hasFilter ? `（全部 ${ALL_ALERTS.length} 条）` : ''}</span>
      </div>
    </div>
  )
}
