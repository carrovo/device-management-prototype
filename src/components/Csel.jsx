import { useState, useRef, useEffect } from 'react'
import { IconChevronDown } from './Icons.jsx'

/**
 * 通用下拉选择组件
 * @param value 当前值（空字符串表示未选）
 * @param placeholder 未选择时展示的文字
 * @param options 选项数组 [{ value, label, extra }] 或字符串数组
 * @param onChange 选中回调
 * @param full 是否撑满宽度
 * @param highlight 选中后是否高亮边框（筛选场景用）
 */
export default function Csel({ value, placeholder, options, onChange, full = false, highlight = false }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const opts = options.map(o => typeof o === 'string' ? { value: o, label: o } : o)
  const hasValue = value !== '' && value != null

  return (
    <div className={`csel ${open ? 'open' : ''} ${full ? 'csel-full' : ''}`} ref={ref}>
      <div
        className={`csel-trigger ${highlight && hasValue ? 'has-value' : ''}`}
        onClick={() => setOpen(!open)}
        style={!hasValue ? { color: 'var(--text3)' } : {}}
      >
        <span className="csel-val">{hasValue ? value : placeholder}</span>
        <IconChevronDown className="csel-arrow" strokeWidth="2.5" />
      </div>
      {open && (
        <div className="csel-menu">
          <div className={`csel-opt ${!hasValue ? 'selected' : ''}`} onClick={() => { onChange(''); setOpen(false) }}>全部</div>
          {opts.map(o => (
            <div key={o.value} className={`csel-opt ${value === o.value ? 'selected' : ''}`}
              onClick={() => { onChange(o.value); setOpen(false) }}>
              {o.label}{o.extra && <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text3)' }}>{o.extra}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/** 表单场景的下拉（无"全部"选项） */
export function FormSelect({ value, placeholder, options, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])
  const opts = options.map(o => typeof o === 'string' ? { value: o, label: o } : o)
  const hasValue = value !== '' && value != null

  return (
    <div className={`csel csel-full ${open ? 'open' : ''}`} ref={ref}>
      <div className="csel-trigger" onClick={() => setOpen(!open)}
        style={hasValue ? { borderColor: '#378ADD', background: 'var(--bg)', color: 'var(--text)' } : { color: 'var(--text3)' }}>
        <span className="csel-val">{hasValue ? value : placeholder}</span>
        <IconChevronDown className="csel-arrow" strokeWidth="2.5" />
      </div>
      {open && (
        <div className="csel-menu">
          {opts.map(o => (
            <div key={o.value} className={`csel-opt ${value === o.value ? 'selected' : ''}`}
              onClick={() => { onChange(o.value); setOpen(false) }}>{o.label}</div>
          ))}
        </div>
      )}
    </div>
  )
}
