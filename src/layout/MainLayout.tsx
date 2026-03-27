import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function MainLayout() {
    return (
        <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
            <Header />
            {/* 移除固定 padding，让页面组件自己控制边距 */}
            <main>
                <Outlet />
            </main>
        </div>
    )
}