import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import MainLayout from '../layout/MainLayout';
import Home from './Home';

export default function LandingTransition() {
    const [fadeProgress, setFadeProgress] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const navigate = useNavigate();
    
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 5;

            if (isAtBottom && e.deltaY > 0) {
                e.preventDefault(); 
                setIsTransitioning(true);

                setFadeProgress((prev) => {
                    const newProgress = Math.min(prev + 0.05, 1);
                    if (newProgress >= 1) {
                        setTimeout(() => navigate('/app', { replace: true }), 0);
                        return 1;
                    }
                    return newProgress;
                });
            } else if (isTransitioning && e.deltaY < 0) {
                e.preventDefault();
                setFadeProgress((prev) => {
                    const newProgress = Math.max(prev - 0.05, 0);
                    if (newProgress <= 0) setIsTransitioning(false);
                    return newProgress;
                });
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [isTransitioning, navigate]);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#f4f6f9' }}>
            
            <div 
                ref={scrollContainerRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 1 - fadeProgress,
                    transform: `translateY(-${fadeProgress * 60}px)`, 
                    transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
                    // 过渡期间锁死内部滚动，平时允许滚动
                    overflowY: isTransitioning ? 'hidden' : 'auto',
                    overflowX: 'hidden',
                    zIndex: 10
                }}
            >
                <Login />
            </div>

            {/* 第二层：幻影首页 */}
            {isTransitioning && (
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: fadeProgress, 
                        transition: 'opacity 0.1s ease-out',
                        pointerEvents: 'none', 
                        zIndex: 20, // 幻影层级必须比 Login 高
                    }}
                >
                    {/* 🌟 3. 传入 isPhantom={true}，让 MainLayout 乖乖闭嘴，不要瞎滚 */}
                    <MainLayout isPhantom={true}>
                        <Home />
                    </MainLayout>
                </div>
            )}
        </div>
    );
}