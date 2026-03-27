import { useEffect, useState, useRef } from 'react';
import { ThumbsUp, MessageSquare, Star, Share2 } from 'lucide-react';
import BackToTop from '../components/BackToTop';
import './ArticleDetail.css';
import { useParams } from 'react-router-dom';

export default function ArticleDetail() {
    const { id } = useParams();
    const [isLiked, setIsLiked] = useState(false);
    const [isStarred, setIsStarred] = useState(false);

    // --- 目录高亮逻辑状态 ---
    const [activeId, setActiveId] = useState<string>("");
    const [headings, setHeadings] = useState<{ id: string, text: string }[]>([]);
    const articleRef = useRef<HTMLElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        // 1. 动态扫描文章中的 h2 标题并分配 ID
        const nodes = articleRef.current?.querySelectorAll('h2');
        const headingData: { id: string, text: string }[] = [];

        nodes?.forEach((node, index) => {
            const headingId = `heading-${index}`;
            node.id = headingId; // 注入 ID 供跳转和观察使用
            headingData.push({ id: headingId, text: node.innerHTML });
        });
        setHeadings(headingData);

        // 2. 核心：监听滚动位置同步高亮目录
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // 当标题进入视口上半部分（从顶向下 100px 处）时激活
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0px -50% 0px',
                threshold: 0.1
            }
        );

        nodes?.forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, [id, headings.length]); // 依赖文章 ID 和标题数量，确保切换文章时重新绑定观察

    // 3. 点击目录平滑跳转逻辑
    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // 使用原生方法，behavior: 'smooth' 实现平滑滚动
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // 滚动到元素的顶部
            });

            setActiveId(id);
        }
    };

    return (
        <div className="article-page">
            <BackToTop />

            <div className="article-layout">
                {/* ===== 左侧：悬浮互动栏 ===== */}
                <aside className="article-side-actions">
                    <div className="action-wrapper">
                        <button className={`action-btn ${isLiked ? 'active' : ''}`} onClick={() => setIsLiked(!isLiked)}>
                            <ThumbsUp size={22} /><span className="count">128</span>
                        </button>
                        <button className="action-btn" onClick={() => scrollToHeading('comments')}>
                            <MessageSquare size={22} /><span className="count">45</span>
                        </button>
                        <button className={`action-btn ${isStarred ? 'active' : ''}`} onClick={() => setIsStarred(!isStarred)}>
                            <Star size={22} />
                        </button>
                        <div className="divider"></div>
                        <button className="action-btn share"><Share2 size={22} /></button>
                    </div>
                </aside>

                {/* ===== 中间：视觉中心主内容 ===== */}
                <main className="article-main">
                    <div className="article-card">
                        <header className="article-header">
                            <h1 className="article-title">如何优雅地实现 React 状态管理？深度解析 Zustand 与 Redux</h1>
                            <div className="article-meta">
                                <span className="author-name">前端小白</span>
                                <span className="dot">·</span>
                                <span>2024年03月27日</span>
                                <span className="dot">·</span>
                                <span>阅读 1.2k</span>
                            </div>
                        </header>

                        {/* 绑定 ref 用于扫描标题 */}
                        <article className="markdown-body" ref={articleRef}>
                            <p>在 React 生态中，状态管理一直是个绕不开的话题。技术的演进都在朝着“更简单、更直观”的方向发展。</p>

                            <h2>1. 为什么我们需要状态管理？</h2>
                            <p>当你的应用变得复杂，组件层级极深时，单纯靠 props 层层传递会导致臭名昭著的 "Prop Drilling"。</p>

                            <blockquote>"好的架构应该让复杂的事情变简单，而不是让简单的事情变复杂。"</blockquote>

                            <h2>2. Zustand 核心优势</h2>
                            <p>相比于 Redux 繁琐的样板代码，Zustand 的 API 设计简直是一股清流。</p>

                            <div className="code-block">
                                <div className="code-header"><span>typescript</span></div>
                                <pre><code>{`import { create } from 'zustand'
                                const useStore = create((set) => ({
                                bears: 0,
                                increase: () => set((state) => ({ bears: state.bears + 1 })),
                                }))`}</code></pre>
                            </div>

                            <h2>3. 总结</h2>
                            <p>选择什么工具取决于你的业务场景。对于大多数中小型项目，Zustand 绝对是首选。</p>
                        </article>

                        <footer className="article-footer">
                            <div className="tags-container">
                                <span className="tag">React</span>
                                <span className="tag">Zustand</span>
                            </div>
                            <div className="support-section">
                                <button className="like-big-btn">
                                    <ThumbsUp size={24} /> <span>赞同 128</span>
                                </button>
                            </div>
                        </footer>
                    </div>

                    <div className="comments-section-card" id="comments">
                        <h3>评论 (45)</h3>
                        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-gray)' }}>
                            评论区组件占位...
                        </div>
                    </div>
                </main>

                {/* ===== 右侧：作者 & 目录吸附 ===== */}
                <aside className="article-sidebar">
                    <div className="toc-sticky-wrapper">
                        <div className="author-mini-card">
                            <div className="author-main-info">
                                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=12" className="author-avatar-large" alt="" />
                                <div className="author-info">
                                    <div className="name">前端小白</div>
                                    <div className="title">资深前端工程师</div>
                                </div>
                            </div>
                            <button className="sidebar-follow-btn">+ 关注</button>
                        </div>

                        {/* 目录部分保持不变 */}
                        <div className="toc-card">
                            <div className="toc-title">目录</div>
                            <ul className="toc-list">
                                {headings.map((h) => (
                                    <li key={h.id} className={`toc-item ${activeId === h.id ? 'active' : ''}`} onClick={() => scrollToHeading(h.id)}>
                                        {h.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}