import { useState, useEffect } from 'react'
import './Header.css'
import { NavLink, useNavigate } from 'react-router-dom' // 引入 useNavigate
import { Bell, Search, User, PenSquare } from 'lucide-react'
import InterviewModal from './InterviewModal' // 引入你的弹窗组件

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // 控制弹窗显示
    const navigate = useNavigate();

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 64) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 处理 AI面试 点击
    const handleAIClick = (e: React.MouseEvent) => {
        // 阻止 NavLink 的默认跳转行为
        e.preventDefault();
        // 打开配置弹窗
        setIsModalOpen(true);
    };

    return (
        <>
            <header className={`header ${isVisible ? '' : 'header-hidden'}`}>
                <div className="header-inner">
                    <div className="left">
                        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                            AIInterview
                        </div>
                        <nav className="nav">
                            <NavLink to="/" end>首页</NavLink>
                            <NavLink to="/questions">题库</NavLink>
                            <NavLink to="/community">社区</NavLink>
                            {/* 修改这里：使用 onClick 拦截跳转 */}
                            <NavLink
                                to="/ai"
                                onClick={handleAIClick}
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                AI面试
                            </NavLink>
                        </nav>
                    </div>

                    <div className="right">
                        <div className="search">
                            <Search size={16} className="search-icon" />
                            <input placeholder="搜索面试题..." />
                        </div>

                        <button className="create-btn">
                            <PenSquare size={16} />
                            <span>创作</span>
                        </button>

                        <div className="icon">
                            <Bell size={20} />
                            <span className="dot"></span>
                        </div>

                        <div className="avatar">
                            <User size={20} />
                        </div>
                    </div>
                </div>
            </header>

            {/* 渲染配置弹窗 */}
            <InterviewModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}