import { useState, useCallback } from 'react'
import Login from './components/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import DeviceList from './components/DeviceList.jsx'
import DeviceDetail from './components/DeviceDetail.jsx'
import DeviceForm from './components/DeviceForm.jsx'
import { Projects, ProjectDetail } from './components/Projects.jsx'
import DeviceTypes from './components/DeviceTypes.jsx'
import UserCenter from './components/UserCenter.jsx'
import RoleCenter from './components/RoleCenter.jsx'
import AlertCenter from './components/AlertCenter.jsx'
import Placeholder from './components/Placeholder.jsx'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [page, setPage] = useState('devices')
  const [currentProj, setCurrentProj] = useState('遥操项目')
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [toastMsg, setToastMsg] = useState('')

  const isGuest = currentUser?.role === '游客'

  const toast = useCallback((msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2600)
  }, [])

  // 导航高亮归属
  const navOf = {
    'devices': 'devices', 'device-detail': 'devices', 'device-add': 'devices', 'device-edit': 'devices',
    'alert-center': 'alert-center',
    'factory-inspect': 'factory-inspect',
    'installation': 'installation',
    'repair-support': 'repair-support',
    'projects': 'projects', 'project-detail': 'projects',
    'device-types': 'device-types',
    'user-center': 'user-center',
    'role-center': 'role-center',
  }

  if (!loggedIn) return <Login onLogin={(user) => { setCurrentUser(user); setLoggedIn(true) }} />

  return (
    <div className="app-shell">
      <Sidebar activeNav={navOf[page]} onNav={setPage} currentUser={currentUser} isGuest={isGuest}
        onLogout={() => { setLoggedIn(false); setCurrentUser(null); setPage('devices') }} />
      <main className="main">
        {isGuest && (
          <div className="guest-banner">
            <span>⚠</span>
            当前以<strong style={{ margin: '0 4px' }}>游客</strong>身份登录，仅可查看数据，如需操作请联系管理员。
          </div>
        )}
        {page === 'devices' && (
          <DeviceList
            currentProj={currentProj} setCurrentProj={setCurrentProj}
            onDetail={(d) => { setSelectedDevice(d); setPage('device-detail') }}
            onEdit={(d) => { setSelectedDevice(d); setPage('device-edit') }}
            onAdd={() => setPage('device-add')}
            isGuest={isGuest}
            toast={toast}
          />
        )}
        {page === 'device-detail' && selectedDevice && (
          <DeviceDetail device={selectedDevice} currentProj={currentProj}
            onBack={() => setPage('devices')}
            onEdit={(d) => { setSelectedDevice(d); setPage('device-edit') }}
            onDeviceChange={(updated) => setSelectedDevice(updated)}
            isGuest={isGuest}
            toast={toast} />
        )}
        {page === 'device-add' && (
          <DeviceForm mode="add" currentProj={currentProj}
            onBack={() => setPage('devices')} onDone={() => setPage('devices')} toast={toast} />
        )}
        {page === 'device-edit' && selectedDevice && (
          <DeviceForm mode="edit" device={selectedDevice} currentProj={currentProj}
            onBack={() => setPage('device-detail')} onDone={() => setPage('device-detail')} toast={toast} />
        )}
        {page === 'projects' && (
          <Projects onOpen={(name) => { setSelectedProject(name); setPage('project-detail') }} isGuest={isGuest} toast={toast} />
        )}
        {page === 'project-detail' && selectedProject && (
          <ProjectDetail name={selectedProject} onBack={() => setPage('projects')}
            onDeviceDetail={(d) => { setSelectedDevice(d); setCurrentProj(selectedProject); setPage('device-detail') }}
            isGuest={isGuest}
            toast={toast} />
        )}
        {page === 'alert-center'    && <AlertCenter toast={toast} />}
        {page === 'factory-inspect' && <Placeholder title="出厂检验" />}
        {page === 'installation'    && <Placeholder title="安装调试" />}
        {page === 'repair-support'  && <Placeholder title="维修客诉" />}
        {page === 'device-types' && <DeviceTypes toast={toast} />}
        {page === 'user-center' && <UserCenter toast={toast} />}
        {page === 'role-center' && <RoleCenter toast={toast} />}
      </main>
      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  )
}
