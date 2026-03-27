import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 平滑滚动到顶部
        });
    };

    return (
        <button
            onClick={scrollToTop}
            style={{
                position: 'fixed',
                bottom: '40px',
                right: '40px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--white, #ffffff)',
                color: 'var(--text-gray, #6e6e73)',
                border: '1px solid var(--border-thin, #f0f0f2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', // 比普通卡片稍微重一点的阴影，凸显悬浮感
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2000,
                // 优雅的淡入淡出动画
                opacity: isVisible ? 1 : 0,
                visibility: isVisible ? 'visible' : 'hidden',
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            // hover 效果使用 inline 稍显麻烦，但为了单文件完整性这里简单处理
            onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary, #0066ff)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 102, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-gray, #6e6e73)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
            }}
        >
            <ArrowUp size={20} strokeWidth={2.5} />
        </button>
    );
}