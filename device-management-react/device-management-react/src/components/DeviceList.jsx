import { useState } from 'react'
import { PROJECT_DATA, DEVICE_TYPES, LC_BADGE, CONN_BADGE, LIFECYCLE_STAGES } from '../data.js'
import Csel from './Csel.jsx'
import Modal from './Modal.jsx'
import { IconSearch, IconPlus, IconUpload, IconDownload, IconReset, IconCloud, IconChevronRight, IconX, IconChevronDown } from './Icons.jsx'

export default function DeviceList({ currentProj, setCurrentProj, onDetail, onEdit, onAdd, toast }) {
  const [tab, setTab] = useState('list')
  const [keyword, setKeyword] = useState('')
  const [fLC, setFLC] = useState('')
  const [fConn, setFConn] = useState('')
  const [fType, setFType] = useState('')
  const [fLog, setFLog] = useState('')
  const [applied, setApplied] = useState(null)  // 已执行的筛选条件
  const [showImport, setShowImport] = useState(false)
  const [projOpen, setProjOpen] = useState(false)

  const data = PROJECT_DATA[currentProj]
  const total = data.devices.length
  const stats = {
    total,
    online: data.devices.filter(d => d.conn === '在线').length,
    operating: data.devices.filter(d => d.lifecycle === '在线运营').length,
    registered: data.devices.filter(d => d.lifecycle === '生产注册').length,
  }

  // 应用筛选
  const doSearch = () => setApplied({ keyword: keyword.trim().toLowerCase(), lc: fLC, conn: fConn, type: fType })
  const doReset = () => { setKeyword(''); setFLC(''); setFConn(''); setFType(''); setApplied(null) }
  const removeTag = (key) => {
    const next = { ...applied, [key]: '' }
    if (key === 'keyword') setKeyword('')
    if (key === 'lc') setFLC('')
    if (key === 'conn') setFConn('')
    if (key === 'type') setFType('')
    const hasAny = next.keyword || next.lc || next.conn || next.type
    setApplied(hasAny ? next : null)
  }

  let devices = data.devices
  if (applied) {
    devices = devices.filter(d => {
      if (applied.keyword && !d.sn.toLowerCase().includes(applied.keyword) && !d.name.toLowerCase().includes(applied.keyword)) return false
      if (applied.lc && d.lifecycle !== applied.lc) return false
      if (applied.conn && d.conn !== applied.conn) return false
      if (applied.type && d.type !== applied.type) return false
      return true
    })
  }

  const switchProj = (name) => {
    setCurrentProj(name)
    doReset()
    setProjOpen(false)
  }

  const tags = applied ? [
    applied.keyword && { key: 'keyword', label: `关键词：${applied.keyword}` },
    applied.lc && { key: 'lc', label: `生命周期：${applied.lc}` },
    applied.conn && { key: 'conn', label: `连接：${applied.conn}` },
    applied.type && { key: 'type', label: `类型：${applied.type}` },
  ].filter(Boolean) : []

  return (
    <div className="page">
      <div className="header-row">
        <span className="page-title">设备管理</span>
        {/* 项目切换 */}
        <div className={`csel ${projOpen ? 'open' : ''}`}>
          <div className="csel-trigger" onClick={() => setProjOpen(!projOpen)}>
            <span style={{ fontSize: 11, color: 'var(--text3)' }}>当前项目</span>
            <span style={{ fontWeight: 500 }}>{currentProj}</span>
            <IconChevronDown className="csel-arrow" strokeWidth="2.5" />
          </div>
          {projOpen && (
            <div className="csel-menu">
              {Object.entries(PROJECT_DATA).map(([name, d]) => (
                <div key={name} className={`csel-opt ${name === currentProj ? 'selected' : ''}`} onClick={() => switchProj(name)}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: d.devices.some(x => x.conn === '在线') ? '#639922' : '#888780', flexShrink: 0 }} />
                  {name}
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text3)' }}>{d.devices.length} 台</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="bs" onClick={() => setShowImport(true)}><IconUpload /> 批量导入</button>
          <button className="bp" onClick={onAdd}><IconPlus stroke="white" strokeWidth="2.5" /> 添加设备</button>
        </div>
      </div>

      {/* 统计 */}
      <div className="stat-row">
        <div className="stat-chip"><div><div className="stat-num">{stats.total}</div><div className="stat-label">设备总数</div></div></div>
        <div className="stat-chip"><div><div className="stat-num">{stats.operating}</div><div className="stat-label">在线运营</div></div></div>
        <div className="stat-chip"><div><div className="stat-num">{stats.online}</div><div className="stat-label">当前在线</div></div></div>
        <div className="stat-chip"><div><div className="stat-num">{stats.registered}</div><div className="stat-label">生产注册</div></div></div>
      </div>

      <div className="tabs">
        <div className={`tab ${tab === 'list' ? 'active' : ''}`} onClick={() => setTab('list')}>设备列表</div>
        <div className={`tab ${tab === 'log' ? 'active' : ''}`} onClick={() => setTab('log')}>注册日志</div>
      </div>

      {tab === 'list' && (
        <>
          {/* 搜索栏 */}
          <div className="tbar" style={{ marginBottom: '0.6rem' }}>
            <div className="sb">
              <IconSearch />
              <input placeholder="搜索 SN 号 / 机器人名称" value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doSearch()} />
            </div>
            <button className="bp" onClick={doSearch}><IconSearch stroke="white" /> 搜索</button>
            <button className="bs" onClick={doReset}><IconReset /> 重置</button>
          </div>
          {/* 筛选条件 */}
          <div className="tbar">
            <Csel value={fLC} placeholder="生命周期状态" options={LIFECYCLE_STAGES} onChange={setFLC} highlight />
            <Csel value={fConn} placeholder="连接状态" options={['在线', '离线', '未连接']} onChange={setFConn} highlight />
            <Csel value={fType} placeholder="设备类型" options={DEVICE_TYPES.map(t => t.name)} onChange={setFType} highlight />
            {tags.map(t => (
              <span key={t.key} className="filter-tag" onClick={() => removeTag(t.key)}>
                {t.label}<IconX strokeWidth="3" />
              </span>
            ))}
          </div>

          <div className="tw">
            <table>
              <thead><tr>
                <th>SN 号</th><th>名称</th><th>设备类型</th><th>生命周期状态</th><th>连接状态</th>
                <th>电量</th><th>系统版本</th><th>注册时间</th><th>操作</th>
              </tr></thead>
              <tbody>
                {devices.length === 0 ? (
                  <tr><td colSpan="9" className="empty-row">暂无符合条件的设备，可尝试调整筛选条件或点击"重置"</td></tr>
                ) : devices.map(d => (
                  <tr key={d.sn}>
                    <td>{d.sn}</td><td>{d.name}</td><td>{d.type}</td>
                    <td><span className={`badge ${LC_BADGE[d.lifecycle]}`}>{d.lifecycle}</span></td>
                    <td><span className={`badge ${CONN_BADGE[d.conn]}`}>{d.conn}</span></td>
                    <td>{d.battery ?? <span style={{ color: 'var(--text3)' }}>—</span>}</td>
                    <td>{d.sysVersion}</td>
                    <td style={{ fontSize: 11 }}>{d.reg}</td>
                    <td>
                      <button className="btn-link" onClick={() => onDetail(d)}>详情</button>
                      <span className="sep">|</span>
                      <button className="btn-link" onClick={() => onEdit(d)}>编辑</button>
                      <span className="sep">|</span>
                      <button className="btn-link-danger" onClick={() => toast('原型演示：删除设备需二次确认，正式版本将弹出确认框')}>删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pg">
            <span style={{ marginRight: 6 }}>
              {applied ? `共 ${devices.length} 条结果（项目共 ${total} 台）` : `共 ${total} 台设备`}
            </span>
            <div className="pb pa">1</div>
            <div className="pb"><IconChevronRight strokeWidth="2.5" /></div>
          </div>
        </>
      )}

      {tab === 'log' && (
        <>
          <div className="tbar">
            <div className="sb"><IconSearch /><input placeholder="搜索 SN 号" /></div>
            <Csel value={fLog} placeholder="注册结果" options={['成功', '失败']} onChange={setFLog} highlight />
          </div>
          <div className="tw">
            <table>
              <thead><tr><th>时间</th><th>SN 号</th><th>请求 IP</th><th>注册结果</th><th>失败原因</th></tr></thead>
              <tbody>
                {data.logs.filter(l => !fLog || l.result === fLog).map((l, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: 11 }}>{l.time}</td><td>{l.sn}</td><td>{l.ip}</td>
                    <td><span className={`badge ${l.result === '成功' ? 'b-ok' : 'b-fail'}`}>{l.result}</span></td>
                    <td style={{ fontSize: 11, color: 'var(--text2)' }}>{l.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="info-box" style={{ marginTop: 4 }}>
            注册日志记录设备上电后向平台发起的云端自动注册请求。注册失败的常见原因：SN 号未在系统中预先录入、网络认证失败。
          </div>
        </>
      )}

      {showImport && (
        <Modal title="批量导入设备" onClose={() => setShowImport(false)}>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 14 }}>请按模板格式填写后上传，系统将自动校验数据。必填列：SN 号、设备类型、所属项目。</div>
          <button className="bs" style={{ marginBottom: 16 }}><IconDownload /> 下载导入模板（.xlsx）</button>
          <div className="upload-zone">
            <IconCloud strokeWidth="1.5" />
            <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 4 }}>拖拽文件至此，或 <span style={{ color: 'var(--info)', cursor: 'pointer' }}>点击上传</span></div>
            <div style={{ fontSize: 11, color: 'var(--text3)' }}>支持 .xlsx 格式，单次最多 500 条</div>
          </div>
          <div className="result-box">
            <div style={{ marginBottom: 8, fontWeight: 500 }}>导入结果（示例）</div>
            <div style={{ display: 'flex', gap: 18, marginBottom: 6 }}>
              <span>成功 <span style={{ color: '#27500A', fontWeight: 500 }}>48</span> 条</span>
              <span>失败 <span style={{ color: '#A32D2D', fontWeight: 500 }}>2</span> 条</span>
            </div>
            <button className="btn-link" style={{ fontSize: 11 }}><IconDownload style={{ width: 11, height: 11 }} /> 下载失败明细</button>
          </div>
          <div className="ff" style={{ marginTop: 0, paddingTop: '0.75rem' }}>
            <button className="bs" onClick={() => setShowImport(false)}>关闭</button>
            <button className="bp" onClick={() => { setShowImport(false); toast('原型演示：导入成功后设备将出现在列表中') }}>确认导入</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
