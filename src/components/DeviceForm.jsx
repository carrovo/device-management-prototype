import { useState } from 'react'
import { DEVICE_TYPES, PROJECT_DATA } from '../data.js'
import { FormSelect } from './Csel.jsx'
import { IconChevronLeft, IconInfo, IconCpu } from './Icons.jsx'

const END_OPTIONS = ['夹爪 A型', '夹爪 B型', '吸盘组件', '无末端']
const CAM_OPTIONS = ['深度相机 D435i', '深度相机 D455', 'RGB相机 标准版', '无相机']

export default function DeviceForm({ mode, device, currentProj, onBack, onDone, toast }) {
  const isEdit = mode === 'edit'
  const [form, setForm] = useState(isEdit ? {
    name: device.name, type: device.type, proj: currentProj,
    sysVersion: device.sysVersion, end: device.endEffector, cam: device.cameraType, camSN: device.cameraSN,
  } : { name: '', type: '', proj: currentProj, sysVersion: '', end: '', cam: '', camSN: '' })

  const set = (k) => (v) => setForm({ ...form, [k]: typeof v === 'object' ? v.target.value : v })

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}><IconChevronLeft strokeWidth="2.5" /> {isEdit ? '返回设备详情' : '返回设备列表'}</button>
      <div className="page-header"><span className="page-title">{isEdit ? `编辑设备 · ${device.name}` : '添加设备'}</span></div>
      <div className="card">
        <div className="sh"><IconInfo /> 基础信息</div>
        <div className="fg">
          <div className="fgroup">
            <span className="fl">SN 号{!isEdit && <span className="req">*</span>}</span>
            {isEdit
              ? <div className="fi locked">{device.sn}<span style={{ fontSize: 11, color: 'var(--text3)' }}>（唯一标识，不可修改）</span></div>
              : <input className="fi" placeholder="请输入机器人序列号，如 SN-20240601" />}
          </div>
          <div className="fgroup">
            <span className="fl">机器人名称</span>
            <input className="fi" placeholder="选填，便于识别设备" value={form.name} onChange={set('name')} />
          </div>
          <div className="fgroup">
            <span className="fl">设备类型<span className="req">*</span></span>
            <FormSelect value={form.type} placeholder="请选择设备类型" onChange={set('type')}
              options={DEVICE_TYPES.map(t => ({ value: t.name, label: `${t.name}（${t.urdf}）` }))} />
          </div>
          <div className="fgroup">
            <span className="fl">出厂日期</span>
            <input className="fi" placeholder="YYYY-MM-DD" defaultValue={isEdit ? device.reg : ''} />
          </div>
          <div className="fgroup">
            <span className="fl">所属项目<span className="req">*</span></span>
            <FormSelect value={form.proj} placeholder="请选择项目" onChange={set('proj')}
              options={Object.keys(PROJECT_DATA)} />
          </div>
          <div className="fgroup">
            <span className="fl">备注</span>
            <input className="fi" placeholder="选填" />
          </div>
        </div>

        <div className="sec-div" />
        <div className="sh"><IconCpu /> 硬件配置<span className="sh-note">出厂时录入初始配置，硬件更换后请及时更新</span></div>
        <div className="fg">
          <div className="fgroup">
            <span className="fl">系统版本</span>
            <input className="fi" placeholder="如 v1.2.0，OTA 升级后自动更新" value={form.sysVersion} onChange={set('sysVersion')} />
          </div>
          <div className="fgroup">
            <span className="fl">末端配置</span>
            <FormSelect value={form.end} placeholder="请选择末端配置" onChange={set('end')} options={END_OPTIONS} />
          </div>
          <div className="fgroup">
            <span className="fl">相机类型</span>
            <FormSelect value={form.cam} placeholder="请选择相机类型" onChange={set('cam')} options={CAM_OPTIONS} />
          </div>
          <div className="fgroup">
            <span className="fl">相机 SN</span>
            <input className="fi" placeholder="如 CAM-00312，相机更换后需同步修改" value={form.camSN} onChange={set('camSN')} />
          </div>
        </div>

        {!isEdit && (
          <div className="auto-sec">
            <div className="auto-lbl">以下字段由系统自动生成，无需填写</div>
            <div className="fg3">
              <div className="fgroup"><span className="fl">设备 ID</span><div className="fi-auto">提交后由系统自动分配</div></div>
              <div className="fgroup"><span className="fl">注册时间</span><div className="fi-auto">提交时自动记录</div></div>
              <div className="fgroup"><span className="fl">生命周期状态</span><div className="fi-auto">默认：生产注册</div></div>
            </div>
          </div>
        )}

        <div className="ff">
          <button className="bs" onClick={onBack}>取消</button>
          <button className="bp" onClick={() => { toast(isEdit ? '原型演示：修改已保存' : '原型演示：设备已添加，生命周期状态为"生产注册"'); onDone() }}>
            {isEdit ? '保存修改' : '确认添加'}
          </button>
        </div>
      </div>
    </div>
  )
}
