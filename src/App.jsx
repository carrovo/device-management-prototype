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

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [page, setPage] = useState('devices')          // 当前页面
  const [currentProj, setCurrentProj] = useState('遥操项目')
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [toastMsg, setToastMsg] = useState('')

  const toast = useCallback((msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2600)
  }, [])

  // 导航高亮归属
  const navOf = {
    'devices': 'devices', 'device-detail': 'devices', 'device-add': 'devices', 'device-edit': 'devices',
    'alert-center': 'alert-center',
    'projects': 'projects', 'project-detail': 'projects',
    'device-types': 'device-types',
    'user-center': 'user-center',
    'role-center': 'role-center',
  }

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />

  return (
    <div className="app-shell">
      <Sidebar activeNav={navOf[page]} onNav={setPage} onLogout={() => { setLoggedIn(false); setPage('devices') }} />
      <main className="main">
        {page === 'devices' && (
          <DeviceList
            currentProj={currentProj} setCurrentProj={setCurrentProj}
            onDetail={(d) => { setSelectedDevice(d); setPage('device-detail') }}
            onEdit={(d) => { setSelectedDevice(d); setPage('device-edit') }}
            onAdd={() => setPage('device-add')}
            toast={toast}
          />
        )}
        {page === 'device-detail' && selectedDevice && (
          <DeviceDetail device={selectedDevice} currentProj={currentProj}
            onBack={() => setPage('devices')}
            onEdit={(d) => { setSelectedDevice(d); setPage('device-edit') }}
            onDeviceChange={(updated) => setSelectedDevice(updated)}
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
          <Projects onOpen={(name) => { setSelectedProject(name); setPage('project-detail') }} toast={toast} />
        )}
        {page === 'project-detail' && selectedProject && (
          <ProjectDetail name={selectedProject} onBack={() => setPage('projects')}
            onDeviceDetail={(d) => { setSelectedDevice(d); setCurrentProj(selectedProject); setPage('device-detail') }}
            toast={toast} />
        )}
        {page === 'alert-center' && <AlertCenter toast={toast} />}
        {page === 'device-types' && <DeviceTypes toast={toast} />}
        {page === 'user-center' && <UserCenter toast={toast} />}
        {page === 'role-center' && <RoleCenter toast={toast} />}
      </main>
      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  )
}
