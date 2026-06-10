import { IconX } from './Icons.jsx'

export default function Modal({ title, onClose, children, size = '' }) {
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`modal ${size}`}>
        <div className="modal-title">
          {title}
          <IconX className="modal-close" strokeWidth="2.5" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  )
}
