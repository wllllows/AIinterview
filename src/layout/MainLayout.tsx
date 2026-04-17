import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { useLayoutEffect, useRef, useEffect, useState } from 'react'
import React from 'react'

// 🌟 1. 新增 isPhantom 属性，默认为 false
export default function MainLayout({ children, isPhantom = false }: { children?: React.ReactNode, isPhantom?: boolean }) {
    const location = useLocation()
    const mainRef = useRef<HTMLDivElement>(null)
    const [slide, setSlide] = useState<'none' | 'from-right' | 'from-left'>('none')

    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }
    }, [])

    useEffect(() => {
        const dir = location.state?.direction
        if (dir === 'forward') {
            setSlide('from-right')
        } else if (dir === 'backward') {
            setSlide('from-left')
        } else {
            setSlide('none')
        }
        if (dir === 'forward' || dir === 'backward') {
            const timer = setTimeout(() => setSlide('none'), 400)
            return () => clearTimeout(timer)
        }
    }, [location.pathname, location.key])

    useLayoutEffect(() => {
        // 🌟 2. 核心麻醉：如果是幻影状态，直接 return，绝对不要执行回顶逻辑！
        if (isPhantom) return;
        // 如果 URL 带有 hash，跳过强制回顶，由目标页面自行处理滚动定位
        if (location.hash) return;

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
        if (location.hash) return;

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
        <div id="main-scroll" ref={mainRef} style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', overflow: 'auto' }}>
            <Header />
            <main>
                <div style={{
                    width: '100%',
                    animation: slide === 'from-right'
                        ? 'slideInFromRight 400ms cubic-bezier(0.33, 1, 0.68, 1) forwards'
                        : slide === 'from-left'
                        ? 'slideInFromLeft 400ms cubic-bezier(0.33, 1, 0.68, 1) forwards'
                        : 'none',
                    position: 'relative',
                }}>
                    {children || <Outlet />}
                    <style>{`
                        @keyframes slideInFromRight {
                            from { transform: translateX(100%); }
                            to { transform: translateX(0); }
                        }
                        @keyframes slideInFromLeft {
                            from { transform: translateX(-100%); }
                            to { transform: translateX(0); }
                        }
                    `}</style>
                </div>
            </main>
        </div>
    )
}