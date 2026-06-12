import { IconClipboard, IconTool, IconMessageSq } from './Icons.jsx'

const PAGE_ICON = {
  '出厂检验': IconClipboard,
  '安装调试': IconTool,
  '维修客诉': IconMessageSq,
}

export default function Placeholder({ title }) {
  const Icon = PAGE_ICON[title] || IconClipboard
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-title">{title}</span>
      </div>
      <div className="placeholder-page">
        <Icon strokeWidth="1.2" style={{ width: 52, height: 52, color: 'var(--text3)', marginBottom: 18 }} />
        <div className="placeholder-text">该模块需求正在梳理中</div>
        <div className="placeholder-sub">功能规划完成后将在此处上线</div>
      </div>
    </div>
  )
}
