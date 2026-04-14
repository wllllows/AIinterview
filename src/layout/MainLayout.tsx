import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { useLayoutEffect, useRef } from 'react'
import React from 'react'

// 🌟 1. 新增 isPhantom 属性，默认为 false
export default function MainLayout({ children, isPhantom = false }: { children?: React.ReactNode, isPhantom?: boolean }) {
    const location = useLocation()
    const mainRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }
    }, [])

    useLayoutEffect(() => {
        // 🌟 2. 核心麻醉：如果是幻影状态，直接 return，绝对不要执行回顶逻辑！
        if (isPhantom) return;

        const scrollToTop = () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any })
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
            if (mainRef.current) mainRef.current.scrollTop = 0
        }

        scrollToTop()
        requestAnimationFrame(() => scrollToTop())
        const timer1 = setTimeout(() => scrollToTop(), 50)
        const timer2 = setTimeout(() => scrollToTop(), 200)
        
        return () => { clearTimeout(timer1); clearTimeout(timer2) }
    }, [location.pathname, isPhantom])

    useLayoutEffect(() => {
        // 🌟 3. 组件首次挂载时同理，幻影状态直接跳过
        if (isPhantom) return;

        const scrollToTop = () => {
            window.scrollTo(0, 0)
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
            if (mainRef.current) mainRef.current.scrollTop = 0
        }
        
        scrollToTop()
        const timer = setTimeout(() => scrollToTop(), 100)
        return () => clearTimeout(timer)
    }, [isPhantom])

    return (
        <div ref={mainRef} style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', overflow: 'auto' }}>
            <Header />
            <main>
                {children || <Outlet />}
            </main>
        </div>
    )
}