import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function MainLayout() {
    return (
        <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}