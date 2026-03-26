import './Header.css'
import { NavLink } from 'react-router-dom'
import { Bell, Search, User, PenSquare } from 'lucide-react'

export default function Header() {
    return (
        <header className="header">
            <div className="header-inner">
                {/* 左侧 */}
                <div className="left">
                    <div className="logo">AIInterview</div>
                    <nav className="nav">
                        <NavLink to="/" end>首页</NavLink>
                        <NavLink to="/questions">题库</NavLink>
                        <NavLink to="/community">社区</NavLink>
                        <NavLink to="/ai">AI面试</NavLink>
                    </nav>
                </div>

                {/* 右侧 */}
                <div className="right">
                    {/* 搜索框 */}
                    <div className="search">
                        <Search size={16} className="search-icon" />
                        <input placeholder="搜索面试题..." />
                    </div>

                    {/* 创作按钮 */}
                    <button className="create-btn">
                        <PenSquare size={16} />
                        <span>创作</span>
                    </button>

                    {/* 通知 */}
                    <div className="icon">
                        <Bell size={20} />
                        <span className="dot"></span>
                    </div>

                    {/* 头像 */}
                    <div className="avatar">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    )
}