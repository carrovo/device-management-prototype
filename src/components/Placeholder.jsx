// ---- 出厂检验 ---------------------------------------------------------------

const INSPECT_DATA = [
  { sn: 'SN-20240601-001', type: '空气净化器 A1', module: '滤网检测 / 风量测试 / 噪音测试', result: '合格', inspector: '张磊', time: '2024-06-01 09:34', conclusion: '全项通过' },
  { sn: 'SN-20240601-002', type: '空气净化器 A1', module: '滤网检测 / 风量测试 / 噪音测试', result: '不合格', inspector: '张磊', time: '2024-06-01 10:12', conclusion: '噪音超标，返修' },
  { sn: 'SN-20240603-007', type: '新风机 B2',    module: '风量测试 / 漏风检测 / 通电自检',  result: '待检',  inspector: '—',    time: '—',               conclusion: '—' },
]

const INSPECT_RESULT_CLASS = { '合格': 'b-ok', '不合格': 'b-fail', '待检': 'b-warn' }

function FactoryInspect() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-title">出厂检验</span>
      </div>
      <div className="info-box" style={{ marginBottom: 12 }}>
        该模块为初步占位展示，详细字段与流程待设备全生命周期质量管理需求文档确认后完善。
      </div>
      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>SN 号</th>
              <th>设备类型</th>
              <th>检验模块</th>
              <th>检验结果</th>
              <th>检验人</th>
              <th>检验时间</th>
              <th>整体结论</th>
            </tr>
          </thead>
          <tbody>
            {INSPECT_DATA.map((row, i) => (
              <tr key={i}>
                <td>{row.sn}</td>
                <td>{row.type}</td>
                <td style={{ fontSize: 11, color: 'var(--text2)' }}>{row.module}</td>
                <td><span className={`badge ${INSPECT_RESULT_CLASS[row.result]}`}>{row.result}</span></td>
                <td>{row.inspector}</td>
                <td style={{ fontSize: 11 }}>{row.time}</td>
                <td style={{ fontSize: 11, color: 'var(--text2)' }}>{row.conclusion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ---- 安装调试 ---------------------------------------------------------------

const INSTALL_DATA = [
  { sn: 'SN-20240601-001', project: '上海虹桥写字楼改造',   address: '上海市长宁区虹桥路 1号 3F',   date: '2024-06-10', status: '调试完成', leader: '王建国', acceptance: '已验收' },
  { sn: 'SN-20240601-002', project: '北京朝阳办公楼净化项目', address: '北京市朝阳区建国路 88号 12F', date: '2024-06-15', status: '调试中',   leader: '李慧',   acceptance: '待验收' },
  { sn: 'SN-20240603-007', project: '深圳南山总部园区',       address: '深圳市南山区科技南路 16号',  date: '—',          status: '待安装',   leader: '陈明',   acceptance: '—'   },
]

const INSTALL_STATUS_CLASS = { '调试完成': 'b-ok', '调试中': 'b-warn', '待安装': 'b-info' }
const ACCEPT_CLASS         = { '已验收': 'b-ok', '待验收': 'b-warn', '—': 'b-info' }

function Installation() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-title">安装调试</span>
      </div>
      <div className="info-box" style={{ marginBottom: 12 }}>
        该模块为初步占位展示，详细字段与流程待设备全生命周期质量管理需求文档确认后完善。
      </div>
      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>SN 号</th>
              <th>所属项目</th>
              <th>现场地址</th>
              <th>安装日期</th>
              <th>调试状态</th>
              <th>现场负责人</th>
              <th>客户验收状态</th>
            </tr>
          </thead>
          <tbody>
            {INSTALL_DATA.map((row, i) => (
              <tr key={i}>
                <td>{row.sn}</td>
                <td>{row.project}</td>
                <td style={{ fontSize: 11, color: 'var(--text2)' }}>{row.address}</td>
                <td style={{ fontSize: 11 }}>{row.date}</td>
                <td><span className={`badge ${INSTALL_STATUS_CLASS[row.status]}`}>{row.status}</span></td>
                <td>{row.leader}</td>
                <td><span className={`badge ${ACCEPT_CLASS[row.acceptance]}`}>{row.acceptance}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ---- 维修客诉 ---------------------------------------------------------------

const REPAIR_DATA = [
  { ticket: 'WO-2024-0089', sn: 'SN-20240601-002', desc: '出风口噪音异常，客户反馈扰民',     severity: '高', status: '处理中', repairer: '赵伟', result: '已更换风扇组件，待复验' },
  { ticket: 'WO-2024-0091', sn: 'SN-20240601-001', desc: 'PM2.5 传感器数值偏高，疑似漂移', severity: '中', status: '已关闭', repairer: '刘洋', result: '传感器校准完成，已回装' },
  { ticket: 'WO-2024-0095', sn: 'SN-20240603-007', desc: '设备无法联网，注册请求超时',       severity: '低', status: '待处理', repairer: '—',   result: '—' },
]

const SEVERITY_CLASS = { '高': 'b-fail', '中': 'b-warn', '低': 'b-info' }
const REPAIR_STATUS_CLASS = { '待处理': 'b-warn', '处理中': 'b-info', '已关闭': 'b-ok' }

function RepairSupport() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-title">维修客诉</span>
      </div>
      <div className="info-box" style={{ marginBottom: 12 }}>
        该模块为初步占位展示，详细字段与流程待设备全生命周期质量管理需求文档确认后完善。
      </div>
      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>工单号</th>
              <th>SN 号</th>
              <th>故障描述</th>
              <th>严重程度</th>
              <th>当前状态</th>
              <th>维修人</th>
              <th>处理结果</th>
            </tr>
          </thead>
          <tbody>
            {REPAIR_DATA.map((row, i) => (
              <tr key={i}>
                <td style={{ fontSize: 11 }}>{row.ticket}</td>
                <td>{row.sn}</td>
                <td style={{ fontSize: 11, color: 'var(--text2)' }}>{row.desc}</td>
                <td><span className={`badge ${SEVERITY_CLASS[row.severity]}`}>{row.severity}</span></td>
                <td><span className={`badge ${REPAIR_STATUS_CLASS[row.status]}`}>{row.status}</span></td>
                <td>{row.repairer}</td>
                <td style={{ fontSize: 11, color: 'var(--text2)' }}>{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ---- 路由导出 ----------------------------------------------------------------

export default function Placeholder({ title }) {
  if (title === '出厂检验') return <FactoryInspect />
  if (title === '安装调试') return <Installation />
  if (title === '维修客诉') return <RepairSupport />
  return null
}
