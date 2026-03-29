import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { useLayoutEffect, useRef } from 'react'

export default function MainLayout() {
    const location = useLocation()
    const mainRef = useRef<HTMLDivElement>(null)

    // 禁用浏览器的滚动恢复
    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }
    }, [])

    useLayoutEffect(() => {
        // 强制滚动到顶部
        const scrollToTop = () => {
            // 方法1: window.scrollTo
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant' as any
            })
            
            // 方法2: document.documentElement.scrollTop
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
            
            // 方法3: 如果mainRef存在，也滚动它
            if (mainRef.current) {
                mainRef.current.scrollTop = 0
            }
        }

        // 立即执行
        scrollToTop()
        
        // 使用requestAnimationFrame确保在下一帧滚动
        requestAnimationFrame(() => {
            scrollToTop()
        })
        
        // 额外使用setTimeout作为后备，确保滚动发生
        const timer1 = setTimeout(() => {
            scrollToTop()
        }, 50)
        
        const timer2 = setTimeout(() => {
            scrollToTop()
        }, 200)
        
        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [location.pathname])

    // 组件挂载时也滚动到顶部
    useLayoutEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0, 0)
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
            if (mainRef.current) {
                mainRef.current.scrollTop = 0
            }
        }
        
        scrollToTop()
        
        const timer = setTimeout(() => {
            scrollToTop()
        }, 100)
        
        return () => clearTimeout(timer)
    }, [])

    return (
        <div ref={mainRef} style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', overflow: 'auto' }}>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
