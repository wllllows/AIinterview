import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowUp, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import './MistakesBook.css';

const mockMistakes = [
    {
        id: 1,
        question: '在 React 中，useEffect 的依赖数组如果为空数组 []，它的执行时机是什么？',
        userAnswer: '每次组件重新渲染时都会执行一次。',
        correctAnswer: '组件首次挂载（Mount）完成后执行一次，后续的重新渲染不再执行。',
        explanation: '空依赖数组告诉 React，这个 effect 不依赖于组件 state 或 props 中的任何值，因此它永远不需要在重渲染时重新运行。它常常被用来模拟类组件的 componentDidMount 生命周期。',
    },
    {
        id: 2,
        question: 'HTTP 状态码 301 和 302 有什么区别？',
        userAnswer: '都是重定向，301 是临时，302 是永久。',
        correctAnswer: '301 是永久重定向（Moved Permanently），302 是临时重定向（Found/Moved Temporarily）。',
        explanation: '搜索引擎在抓取页面时，如果是 301，会将旧网址的权重转移到新网址；如果是 302，则不会转移。在日常开发中，临时活动页通常用 302，域名更换通常用 301。',
    }
];

export default function MistakesBook() {
    const navigate = useNavigate();

    const [view, setView] = useState<'list' | 'detail' | 'chat'>('list');
    const [activeQuestion, setActiveQuestion] = useState<typeof mockMistakes[0] | null>(null);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<{ id: number, role: string, content: string }[]>([]);

    useEffect(() => {
        const headerEl = document.querySelector('.header') as HTMLElement;

        if (view === 'chat') {
            if (headerEl) headerEl.style.display = 'none';
            document.body.style.overflow = 'hidden';
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            if (headerEl) headerEl.style.display = '';
            document.body.style.overflow = '';
        }

        return () => {
            if (headerEl) headerEl.style.display = '';
            document.body.style.overflow = '';
        };
    }, [messages, view]);

    const handleViewDetail = (item: typeof mockMistakes[0]) => {
        setActiveQuestion(item);
        setView('detail');
    };

    const handleAskAI = () => {
        setView('chat');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    const sendUserMessage = () => {
        if (!inputValue.trim()) return;
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: inputValue }]);
        setInputValue('');
        if (textareaRef.current) textareaRef.current.style.height = 'auto';

        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'ai',
                content: `关于“${activeQuestion?.question.substring(0, 10)}...”这个问题，你需要我用更通俗的代码例子为你讲解一下吗？`
            }]);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendUserMessage();
        }
    };

    return (
        <div className="mb-container">

            {view !== 'chat' && (
                <header className="mb-header">
                    <button
                        className="mb-back-btn"
                        onClick={() => {
                            if (view === 'detail') setView('list');
                            else navigate('/');
                        }}
                    >
                        <ChevronLeft size={24} />
                        <span className="mb-title">{view === 'list' ? '我的错题本' : '题目解析'}</span>
                    </button>
                </header>
            )}

            {view === 'list' && (
                <main className="mb-list-view fade-in">
                    {mockMistakes.map(item => (
                        <div key={item.id} className="mb-card">
                            <div className="mb-card-q">
                                <span className="mb-tag">题目</span>
                                <p>{item.question}</p>
                            </div>
                            <div className="mb-card-a">
                                <span className="mb-tag red">你的答案</span>
                                <p className="wrong-text">{item.userAnswer}</p>
                            </div>
                            <div className="mb-card-actions">
                                <button className="mb-btn-outline" onClick={() => handleViewDetail(item)}>
                                    <BookOpen size={16} /> 查看解析
                                </button>
                                <button className="mb-btn-primary">
                                    <CheckCircle2 size={16} /> 确认
                                </button>
                            </div>
                        </div>
                    ))}
                </main>
            )}

            {view === 'detail' && activeQuestion && (
                <main className="mb-detail-view fade-in">
                    <div className="mb-card">
                        <div className="mb-card-q">
                            <span className="mb-tag">题目</span>
                            <p>{activeQuestion.question}</p>
                        </div>
                        <div className="mb-card-a">
                            <span className="mb-tag red">你的答案</span>
                            <p className="wrong-text">{activeQuestion.userAnswer}</p>
                        </div>
                    </div>

                    <div className="mb-explanation-box">
                        <div className="explanation-section">
                            <h4 className="green-text">正确答案：</h4>
                            <p>{activeQuestion.correctAnswer}</p>
                        </div>
                        <div className="explanation-section">
                            <h4>解析：</h4>
                            <p>{activeQuestion.explanation}</p>
                        </div>

                        <div className="mb-card-actions" style={{ marginTop: '40px' }}>
                            <button className="mb-btn-outline blue" onClick={handleAskAI}>
                                <Sparkles size={16} /> 询问 AI
                            </button>
                            <button className="mb-btn-primary" onClick={() => setView('list')}>
                                <CheckCircle2 size={16} /> 确认掌握
                            </button>
                        </div>
                    </div>
                </main>
            )}

            {view === 'chat' && activeQuestion && (
                <div className="mb-chat-layout">
                    {/* 左侧上下文 */}
                    <aside className="mb-chat-sidebar">
                        <div className="mb-sidebar-header">
                            <button className="mb-minimal-back" onClick={() => setView('detail')}>
                                <ChevronLeft size={18} />
                                <span>返回解析</span>
                            </button>
                        </div>

                        <div className="mb-sidebar-content">
                            <div className="mb-side-q">
                                <span className="mb-tag">题目</span>
                                <p>{activeQuestion.question}</p>
                            </div>
                            <div className="mb-side-a">
                                <span className="mb-tag red">你的答案</span>
                                <p>{activeQuestion.userAnswer}</p>
                            </div>
                            <hr className="mb-divider" />
                            <div className="explanation-section">
                                <h4 className="green-text">正确答案：</h4>
                                <p>{activeQuestion.correctAnswer}</p>
                            </div>
                            <div className="explanation-section">
                                <h4>解析：</h4>
                                <p>{activeQuestion.explanation}</p>
                            </div>
                        </div>
                    </aside>

                    {/* 右侧聊天主区域 */}
                    <main className="mb-chat-main">
                        <div className="mb-chat-history">
                            <div className="mb-chat-center">
                                {messages.length === 0 ? (
                                    <div className="mb-empty-state">
                                        <Sparkles size={40} className="empty-icon" />
                                        <h2>向我提问吧</h2>
                                        <p>针对这道错题，哪里没懂都可以问我</p>
                                    </div>
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
                            <div className="mb-input-box">
                                <textarea
                                    ref={textareaRef}
                                    placeholder="针对这道题，有问题就问我..."
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    rows={1}
                                />
                                <button
                                    className={`mb-send-btn ${inputValue.trim() ? 'active' : ''}`}
                                    onClick={sendUserMessage}
                                >
                                    <ArrowUp size={20} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
}