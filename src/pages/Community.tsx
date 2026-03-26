import { useState, useEffect, useRef } from 'react'
import {
    Sparkles, Monitor, Server, BrainCircuit, Blocks,
    Eye, ThumbsUp, Flame, BarChart3, Hash, MessageSquare, Clock, Loader2
} from 'lucide-react'
import './Community.css'

const categories = [
    { name: '推荐', icon: Sparkles },
    { name: '前端', icon: Monitor },
    { name: '后端', icon: Server },
    { name: 'AI', icon: BrainCircuit },
    { name: '算法', icon: Blocks },
]

// 原始模板数据
const rawPosts = [
    { title: '如何优雅地实现 React 状态管理？', author: '前端小白', views: '1.2k', likes: 320, comments: 45, tags: ['React', 'Zustand'], desc: '本文将介绍几种常见的 React 状态管理方案，并分析它们的优缺点...' },
    { title: '前端性能优化实战总结', author: '工程师阿强', views: '2.3k', likes: 540, comments: 89, tags: ['性能优化', 'Webpack'], desc: '从加载速度到渲染优化，全面提升你的前端性能表现...' },
    { title: 'AI面试到底在考什么？', author: 'AI研究员', views: '980', likes: 210, comments: 32, tags: ['AI', '面试'], desc: '深入解析AI面试的考察重点，帮你轻松应对技术面试...' },
]

// 自动生成 100 条假数据逻辑
const generateFakePosts = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
        const template = rawPosts[i % rawPosts.length];
        return {
            ...template,
            id: i,
            title: `${template.title} `,
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

    // 无限滚动相关状态
    const [displayPosts, setDisplayPosts] = useState<any[]>([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    // 初始化数据
    useEffect(() => {
        setDisplayPosts(allFakePosts.slice(0, visibleCount));
    }, []);

    // 监听滚动逻辑 (Intersection Observer)
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
        setTimeout(() => { // 模拟 800ms 网络延迟
            const nextBatch = visibleCount + 5;
            setDisplayPosts(allFakePosts.slice(0, nextBatch));
            setVisibleCount(nextBatch);
            setLoading(false);
        }, 800);
    };

    return (
        <div className="community-page">
            {/* 左侧导航 */}
            <div className="sidebar-left">
                <div className="nav-menu">
                    {categories.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.name}
                                className={`nav-item ${activeCategory === item.name ? 'active' : ''}`}
                                onClick={() => setActiveCategory(item.name)}>
                                <Icon size={18} className="nav-icon" />
                                <span>{item.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* 中间 Feed 流 */}
            <div className="feed">
                <div className="feed-tabs-container">
                    <div className="feed-tabs">
                        {['推荐', '最新', '热榜'].map(tab => (
                            <span key={tab}
                                className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}>
                                {tab}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="post-list">
                    {displayPosts.map((post) => (
                        <div key={post.id} className="post-card">
                            <div className="post-content">
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-desc">{post.desc}</p>

                                <div className="post-tags">
                                    {post.tags.map((tag: string) => (
                                        <span key={tag} className="tag-pill">{tag}</span>
                                    ))}
                                </div>

                                <div className="post-meta">
                                    <div className="meta-author">
                                        <img src={post.avatar} alt="avatar" className="author-avatar" />
                                        <span className="author-name">{post.author}</span>
                                        <span className="post-time"><Clock size={12} /> {post.time}</span>
                                    </div>
                                    <div className="meta-stats">
                                        <span className="stat-item"><Eye size={14} /> {post.views}</span>
                                        <span className="stat-item"><ThumbsUp size={14} /> {post.likes}</span>
                                        <span className="stat-item"><MessageSquare size={14} /> {post.comments}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* 观察哨 & 加载动画 */}
                    <div ref={loaderRef} className="scroll-loader">
                        {loading ? (
                            <div className="loading-state">
                                <Loader2 size={20} className="spinner" />
                                <span>正在加载 AI 推荐内容...</span>
                            </div>
                        ) : visibleCount >= allFakePosts.length ? (
                            <div className="end-line">—— 我是有底线的 ——</div>
                        ) : null}
                    </div>
                </div>
            </div>

            {/* 右侧边栏 */}
            <div className="sidebar-right">
                <div className="side-card">
                    <div className="card-header"><Flame size={18} className="text-orange" /><h4>热门文章</h4></div>
                    <ul className="hot-list">
                        {hotArticles.map((title, idx) => (
                            <li key={idx} className="hot-item">
                                <span className={`rank rank-${idx + 1}`}>{idx + 1}</span>
                                <span className="hot-title">{title}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="side-card">
                    <div className="card-header"><BarChart3 size={18} className="text-blue" /><h4>面试统计</h4></div>
                    <div className="stats-list">
                        <div className="stat-row"><span className="stat-label">今日面试人数</span><span className="stat-value">128</span></div>
                        <div className="stat-row"><span className="stat-label">平均得分</span><span className="stat-value text-green">7.6</span></div>
                        <div className="stat-row"><span className="stat-label">热门岗位</span><span className="stat-value">前端工程师</span></div>
                    </div>
                </div>

                <div className="side-card">
                    <div className="card-header"><Hash size={18} className="text-purple" /><h4>推荐话题</h4></div>
                    <div className="topics-cloud">
                        {['React', '前端面试', 'AI', '算法'].map(t => <span key={t}>{t}</span>)}
                    </div>
                </div>
            </div>
        </div>
    )
}