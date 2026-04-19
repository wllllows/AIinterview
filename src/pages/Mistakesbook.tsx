import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, ArrowUp, Sparkles, BookOpen, CheckCircle2,
    Calendar, Briefcase, EyeOff, Search, Building2, ArrowDownUp, X, BarChart3
} from 'lucide-react';
import './MistakesBook.css';

const initialMistakes = [
    {
        id: 1, company: '字节跳动', position: '前端开发工程师', date: '2026-04-18', tags: ['React', 'Hooks'], status: 'reviewing',
        question: '在 React 中，useEffect 的依赖数组如果为空数组 []，它的执行时机是什么？',
        userAnswer: '每次组件重新渲染时都会执行一次。',
        correctAnswer: '组件首次挂载（Mount）完成后执行一次，后续的重新渲染不再执行。',
        explanation: '空依赖数组告诉 React，这个 effect 不依赖于组件 state 或 props 中的任何值。常被用来模拟 componentDidMount。',
    },
    {
        id: 2, company: '腾讯', position: '全栈工程师', date: '2026-04-15', tags: ['网络协议', 'HTTP'], status: 'reviewing',
        question: 'HTTP 状态码 301 和 302 有什么区别？',
        userAnswer: '都是重定向，301 是临时，302 是永久。',
        correctAnswer: '301 是永久重定向（Moved Permanently），302 是临时重定向（Found）。',
        explanation: '301 会转移 SEO 权重，302 则不会。域名更换通常用 301，临时活动用 302。',
    },
    {
        id: 3, company: '美团', position: '前端开发工程师', date: '2026-04-10', tags: ['Vue', '源码原理'], status: 'mastered',
        question: 'Vue3 中的 ref 和 reactive 有什么本质区别？',
        userAnswer: 'ref 用来定义基础类型，reactive 用来定义对象。',
        correctAnswer: 'ref 通过 Object.defineProperty 的 getter/setter 拦截，reactive 通过 Proxy 代理整个对象。',
        explanation: '底层实现不同，ref 内部包裹对象时也会调用 reactive。',
    }
];

export default function MistakesBook() {
    const navigate = useNavigate();

    const [mistakes, setMistakes] = useState(initialMistakes);
    const [view, setView] = useState<'list' | 'detail' | 'chat'>('list');
    const [activeQuestion, setActiveQuestion] = useState<typeof initialMistakes[0] | null>(null);

    const [activeTab, setActiveTab] = useState<'reviewing' | 'mastered'>('reviewing');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCompany, setFilterCompany] = useState('all');
    const [filterPosition, setFilterPosition] = useState('all');
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

    const [revealedAnswers, setRevealedAnswers] = useState<number[]>([]);
    const [toastMsg, setToastMsg] = useState('');

    const chatEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<{ id: number, role: string, content: string }[]>([]);

    const companyOptions = useMemo(() => Array.from(new Set(mistakes.map(m => m.company))), [mistakes]);
    const positionOptions = useMemo(() => Array.from(new Set(mistakes.map(m => m.position))), [mistakes]);
    const masteryRate = Math.round((mistakes.filter(m => m.status === 'mastered').length / mistakes.length) * 100) || 0;

    const displayMistakes = useMemo(() => {
        let result = mistakes.filter(m => m.status === activeTab);
        if (filterCompany !== 'all') result = result.filter(m => m.company === filterCompany);
        if (filterPosition !== 'all') result = result.filter(m => m.position === filterPosition);
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            result = result.filter(m =>
                m.question.toLowerCase().includes(query) ||
                m.tags.some(tag => tag.toLowerCase().includes(query)) ||
                m.company.toLowerCase().includes(query)
            );
        }
        return result.sort((a, b) => {
            const tA = new Date(a.date).getTime();
            const tB = new Date(b.date).getTime();
            return sortOrder === 'desc' ? tB - tA : tA - tB;
        });
    }, [mistakes, activeTab, filterCompany, filterPosition, searchQuery, sortOrder]);

    const hasActiveFilters = filterCompany !== 'all' || filterPosition !== 'all' || searchQuery !== '';

    useEffect(() => {
        if (view === 'chat') {
            document.body.style.overflow = 'hidden';
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            document.body.style.overflow = '';
        }
    }, [messages, view]);

    const showToast = (msg: string) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(''), 2500);
    };

    const handleMarkMastered = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setMistakes(prev => prev.map(m => m.id === id ? { ...m, status: 'mastered' } : m));
        showToast('已移入“已掌握”归档！🎉');
        if (view === 'detail') setView('list');
    };

    const handleMarkReview = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setMistakes(prev => prev.map(m => m.id === id ? { ...m, status: 'reviewing' } : m));
        showToast('已重置为“待复习”！💪');
    };

    const sendUserMessage = (text: string = inputValue) => {
        const msg = text.trim();
        if (!msg) return;
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: msg }]);
        setInputValue('');
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1, role: 'ai', content: `关于“${msg.substring(0, 8)}...”，这是更深入的解析...`
            }]);
        }, 800);
    };

    return (
        // 🌟 关键：加上了 id="mb-app-root" 作为绝对防御的命名空间
        <div id="mb-app-root" className="mb-container">
            {toastMsg && <div className="mb-toast fade-in"><CheckCircle2 size={16} /> {toastMsg}</div>}

            {view !== 'chat' && (
                <header className="mb-header">
                    <button className="mb-back-btn" onClick={() => view === 'detail' ? setView('list') : navigate('/app')}>
                        <ChevronLeft size={24} />
                    </button>
                </header>
            )}

            {view === 'list' && (
                <main className="mb-list-view fade-in">
                    <div className="mb-summary-banner">
                        <div className="summary-left">
                            <div className="summary-icon"><BarChart3 size={24} color="#3b82f6" /></div>
                            <div>
                                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#0f172a' }}>能力复盘中心</h3>
                                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>持续攻克弱项，逢考必过</p>
                            </div>
                        </div>
                        <div className="summary-right">
                            <div className="stat-item">
                                <span className="stat-value">{mistakes.filter(m => m.status === 'reviewing').length}</span>
                                <span className="stat-label">待复习</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-value text-green">{masteryRate}%</span>
                                <span className="stat-label">总体掌握率</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-control-panel">
                        <div className="control-top-row">
                            <div className="mb-tabs">
                                <button className={`mb-tab ${activeTab === 'reviewing' ? 'active' : ''}`} onClick={() => setActiveTab('reviewing')}>
                                    待复习 <span className="mb-count-badge">{mistakes.filter(m => m.status === 'reviewing').length}</span>
                                </button>
                                <button className={`mb-tab ${activeTab === 'mastered' ? 'active' : ''}`} onClick={() => setActiveTab('mastered')}>
                                    已掌握 <span className="mb-count-badge">{mistakes.filter(m => m.status === 'mastered').length}</span>
                                </button>
                            </div>
                            <div className="mb-search-box">
                                <Search size={16} className="search-icon" />
                                <input type="text" placeholder="搜索题目、公司或标签..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                        </div>

                        <div className="control-bottom-row">
                            <div className="mb-filters">
                                <div className="mb-filter-item">
                                    <Building2 size={14} className="filter-icon" />
                                    <select value={filterCompany} onChange={e => setFilterCompany(e.target.value)}>
                                        <option value="all">所有公司</option>
                                        {companyOptions.map(comp => <option key={comp} value={comp}>{comp}</option>)}
                                    </select>
                                </div>
                                <div className="mb-filter-item">
                                    <Briefcase size={14} className="filter-icon" />
                                    <select value={filterPosition} onChange={e => setFilterPosition(e.target.value)}>
                                        <option value="all">所有岗位</option>
                                        {positionOptions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                                    </select>
                                </div>
                                <div className="mb-filter-item">
                                    <ArrowDownUp size={14} className="filter-icon" />
                                    <select value={sortOrder} onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}>
                                        <option value="desc">时间倒序 (最新)</option>
                                        <option value="asc">时间正序 (最早)</option>
                                    </select>
                                </div>
                            </div>
                            {hasActiveFilters && (
                                <button className="clear-filter-btn" onClick={() => { setFilterCompany('all'); setFilterPosition('all'); setSearchQuery(''); }}>
                                    <X size={14} /> 清除条件
                                </button>
                            )}
                        </div>
                    </div>

                    {displayMistakes.length === 0 ? (
                        <div className="mb-empty-state">
                            <CheckCircle2 size={48} color="#10b981" />
                            <h3>暂无相关题目</h3>
                        </div>
                    ) : (
                        displayMistakes.map(item => (
                            <div key={item.id} className="mb-card fade-in">
                                <div className="mb-card-header-meta">
                                    <div className="meta-left">
                                        <span className="meta-company">{item.company}</span>
                                        <span className="meta-position">{item.position}</span>
                                    </div>
                                    <span className="meta-right"><Calendar size={12} /> {item.date}</span>
                                </div>
                                <div className="mb-card-tags">
                                    {item.tags.map(tag => <span key={tag} className="meta-tag">#{tag}</span>)}
                                </div>
                                <div className="mb-card-q">
                                    <span className="mb-tag">面试原题</span>
                                    <p>{item.question}</p>
                                </div>
                                <div className="mb-card-a">
                                    <span className="mb-tag red">我的作答</span>
                                    <div className={`blind-test-box ${revealedAnswers.includes(item.id) ? 'revealed' : ''}`} onClick={() => setRevealedAnswers([...revealedAnswers, item.id])}>
                                        {!revealedAnswers.includes(item.id) && (
                                            <div className="blind-overlay"><EyeOff size={18} /><span>点击查看作答与解析</span></div>
                                        )}
                                        <p className="wrong-text">{item.userAnswer}</p>
                                    </div>
                                </div>
                                <div className="mb-card-actions">
                                    <button className="mb-btn-outline" onClick={() => { setActiveQuestion(item); setView('detail'); }}>
                                        <BookOpen size={16} /> 查看深度解析
                                    </button>
                                    {item.status === 'reviewing' ? (
                                        <button className="mb-btn-primary" onClick={(e) => handleMarkMastered(e, item.id)}>
                                            <CheckCircle2 size={16} /> 确认掌握
                                        </button>
                                    ) : (
                                        <button className="mb-btn-outline red" onClick={(e) => handleMarkReview(e, item.id)}>
                                            重新移回待复习
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </main>
            )}

            {view === 'detail' && activeQuestion && (
                <main className="mb-detail-view fade-in">
                    <div className="mb-card">
                        <div className="mb-card-header-meta" style={{ border: 'none', paddingBottom: 0, marginBottom: '16px' }}>
                            <div className="meta-left"><span className="meta-company">{activeQuestion.company}</span><span className="meta-position">{activeQuestion.position}</span></div>
                            <div className="mb-card-tags" style={{ margin: 0 }}>{activeQuestion.tags.map(tag => <span key={tag} className="meta-tag">#{tag}</span>)}</div>
                        </div>
                        <div className="mb-card-q"><span className="mb-tag">面试原题</span><p>{activeQuestion.question}</p></div>
                        <div className="mb-card-a"><span className="mb-tag red">我的作答</span><p className="wrong-text">{activeQuestion.userAnswer}</p></div>
                    </div>
                    <div className="mb-explanation-box">
                        <div className="explanation-section"><h4 className="green-text">🎯 正确答案：</h4><p>{activeQuestion.correctAnswer}</p></div>
                        <div className="explanation-section"><h4>💡 核心解析点拨：</h4><p>{activeQuestion.explanation}</p></div>
                        <div className="mb-card-actions" style={{ marginTop: '20px' }}>
                            <button className="mb-btn-outline blue" onClick={() => setView('chat')}><Sparkles size={16} /> 还没懂？问 AI</button>
                            {activeQuestion.status === 'reviewing' && (
                                <button className="mb-btn-primary" onClick={(e) => handleMarkMastered(e, activeQuestion.id)}><CheckCircle2 size={16} /> 彻底掌握</button>
                            )}
                        </div>
                    </div>
                </main>
            )}

            {view === 'chat' && activeQuestion && (
                <div className="mb-chat-layout">
                    <aside className="mb-chat-sidebar">
                        <div className="mb-sidebar-header"><button className="mb-minimal-back" onClick={() => setView('detail')}><ChevronLeft size={18} /><span>返回解析</span></button></div>
                        <div className="mb-sidebar-content">
                            <div className="mb-side-q"><span className="mb-tag">题目</span><p>{activeQuestion.question}</p></div>
                            <div className="mb-side-a"><span className="mb-tag red">我的答案</span><p>{activeQuestion.userAnswer}</p></div>
                            <hr className="mb-divider" />
                            <div className="explanation-section"><h4 className="green-text">正确答案：</h4><p>{activeQuestion.correctAnswer}</p></div>
                        </div>
                    </aside>
                    <main className="mb-chat-main">
                        <div className="mb-chat-history">
                            <div className="mb-chat-center">
                                {messages.length === 0 ? (
                                    <div className="mb-empty-state"><Sparkles size={40} className="empty-icon" /><h2>向我提问吧</h2><p>针对这道错题，哪里没懂都可以问我</p></div>
                                ) : (
                                    <div className="mb-chat-list">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={`mb-bubble-wrap ${msg.role}`}>
                                                {msg.role === 'ai' && <div className="mb-avatar ai"><Sparkles size={16} /></div>}
                                                <div className="mb-bubble">{msg.content}</div>
                                            </div>
                                        ))}
                                        <div ref={chatEndRef} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-chat-input-area">
                            <div className="mb-quick-prompts">
                                <button onClick={() => sendUserMessage('能用大白话给我解释一下吗？')}>讲通俗点</button>
                                <button onClick={() => sendUserMessage('能给我一个具体的代码示例吗？')}>求代码示例</button>
                                <button onClick={() => sendUserMessage('针对这个知识点，再出一道题考考我')}>变式练习</button>
                            </div>
                            <div className="mb-input-box">
                                <textarea placeholder="有问题就问我..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} rows={1} />
                                <button className={`mb-send-btn ${inputValue.trim() ? 'active' : ''}`} onClick={() => sendUserMessage()}><ArrowUp size={20} /></button>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
}