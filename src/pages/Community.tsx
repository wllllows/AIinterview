import { useState, useEffect, useRef } from 'react'
import {
    Sparkles, Monitor, Server, BrainCircuit, Blocks,
    Eye, ThumbsUp, Flame, BarChart3, Hash, MessageSquare, Loader2
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './Community.css'

const categories = [
    { name: '推荐', icon: Sparkles },
    { name: '前端', icon: Monitor },
    { name: '后端', icon: Server },
    { name: 'AI', icon: BrainCircuit },
    { name: '算法', icon: Blocks },
]

const rawPosts = [
    { title: '如何优雅地实现 React 状态管理？', author: '前端小白', views: '1.2k', likes: 320, comments: 45, tags: ['React', 'Zustand'], desc: '本文将介绍几种常见的 React 状态管理方案，并分析它们的优缺点，结合实际项目给出最佳实践推荐...' },
    { title: '前端性能优化实战总结', author: '工程师阿强', views: '2.3k', likes: 540, comments: 89, tags: ['性能优化', 'Webpack'], desc: '从加载速度到渲染优化，全面提升你的前端性能表现。涵盖了代码分割、懒加载、Tree Shaking等核心技术点...' },
    { title: 'AI面试到底在考什么？', author: 'AI研究员', views: '980', likes: 210, comments: 32, tags: ['AI', '面试'], desc: '深入解析AI面试的考察重点，帮你轻松应对技术面试。不仅是八股文，更是逻辑思维和表达能力的全面考察...' },
]

const generateFakePosts = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
        const template = rawPosts[i % rawPosts.length];
        return {
            ...template,
            id: i,
            title: `${template.title}`,
            time: `${Math.floor(Math.random() * 23 + 1)}小时前`,
            avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${i}`
        };
    });
};

const allFakePosts = generateFakePosts(100);
const hotArticles = ['React性能优化实战', '前端工程化指南', 'AI面试技巧总结', 'JS深度解析'];

export default function Community() {
    const [activeCategory, setActiveCategory] = useState('推荐');
    const [activeTab, setActiveTab] = useState('推荐');
    const [displayPosts, setDisplayPosts] = useState<any[]>([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);
    const natigate = useNavigate();

    useEffect(() => {
        setDisplayPosts(allFakePosts.slice(0, visibleCount));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && visibleCount < allFakePosts.length) {
                loadMore();
            }
        }, { threshold: 0.1 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loading, visibleCount]);

    const loadMore = () => {
        setLoading(true);
        setTimeout(() => {
            const nextBatch = visibleCount + 6;
            setDisplayPosts(allFakePosts.slice(0, nextBatch));
            setVisibleCount(nextBatch);
            setLoading(false);
        }, 800);
    };

    return (
        <div className="community-page">
            {/* 左侧：透明容器 + 悬浮白卡片 */}
            <aside className="sidebar-left">
                <div className="nav-card">
                    <nav className="nav-menu">
                        {categories.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.name}
                                    className={`nav-item ${activeCategory === item.name ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(item.name)}>
                                    <Icon size={16} />
                                    <span>{item.name}</span>
                                </div>
                            )
                        })}
                    </nav>
                </div>
            </aside>

            {/* 中间：Feed 主卡片 */}
            <main className="feed">
                <div className="main-content-card">
                    <div className="feed-header">
                        <div className="feed-tabs">
                            {['推荐', '最新', '热榜'].map(tab => (
                                <span key={tab} className={`tab-item ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                                    {tab}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="post-list">
                        {displayPosts.map((post) => (
                            <article key={post.id} className="post-item" onClick={()=>natigate('/post/${post.id}')}>
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-desc">{post.desc}</p>
                                <div className="post-footer">
                                    <div className="meta-left">
                                        <img src={post.avatar} className="avatar-mini" alt="" />
                                        <span className="author">{post.author}</span>
                                        <span className="time">{post.time}</span>
                                        <span className="tag-link">{post.tags[0]}</span>
                                    </div>
                                    <div className="meta-right">
                                        <span><Eye size={12}/> {post.views}</span>
                                        <span><ThumbsUp size={12}/> {post.likes}</span>
                                        <span><MessageSquare size={12}/> {post.comments}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                        <div ref={loaderRef} className="loader-box">
                            {loading && <Loader2 className="spin" size={20} />}
                        </div>
                    </div>
                </div>
            </main>

            {/* 右侧：透明容器 + 随动吸附卡片组 */}
            <aside className="sidebar-right">
                <div className="sticky-wrapper"> {/* 这个容器负责吸附 */}
                    <div className="side-card-item">
                        <div className="card-title"><Flame size={16} color="#ef4444"/> 24h 热榜</div>
                        <div className="hot-list">
                            {hotArticles.map((t, i) => (
                                <div key={t} className="hot-row">
                                    <span className={`rank-num r-${i+1}`}>{i+1}</span> 
                                    <span className="hot-name">{t}</span>
                                    <span className="hot-value">{999 - i*100}℃</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="side-card-item">
                        <div className="card-title"><BarChart3 size={16} color="#3b82f6"/> 实时概览</div>
                        <div className="stat-grid">
                            <div className="grid-item"><label>今日面试</label><span>128</span></div>
                            <div className="grid-item"><label>通过率</label><span className="text-green">86%</span></div>
                        </div>
                    </div>

                    <div className="side-card-item">
                        <div className="card-title"><Hash size={16} color="#5cc3f6"/> 热门话题</div>
                        <div className="topic-tags">
                            {['React19', '大模型', '前端工程化'].map(t => <span key={t}>#{t}</span>)}
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}