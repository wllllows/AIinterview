import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowUp, Sparkles, CheckCircle2, AlertCircle, FileText, MessageSquarePlus } from 'lucide-react';
import './AIReview.css';

export default function AIReview() {
    const navigate = useNavigate();
    const chatEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<{ id: number, role: string, content: string }[]>([]);

    const quickPrompts = [
        "帮我详细复盘一下微前端那道题",
        "针对“可改进的地方”第一点，能给我个标准答案吗？",
        "如果重面一次，我该怎么做自我介绍？"
    ];

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // 先重置高度
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    const sendUserMessage = (text: string) => {
        if (!text.trim()) return;

        const newUserMsg = { id: Date.now(), role: 'user', content: text };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');

        // 重置输入框高度
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }

        // 模拟 AI 回复
        setTimeout(() => {
            const aiReply = {
                id: Date.now() + 1,
                role: 'ai',
                content: '好的！针对你提到的点，业内标准的做法通常分为三个步骤。首先是确定边界条件，其次是……（这里是 AI 详细的解答）。'
            };
            setMessages(prev => [...prev, aiReply]);
        }, 1200);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendUserMessage(inputValue);
        }
    };

    return (
        <div className="review-layout">
            <aside className="review-sidebar">
                <header className="sidebar-header">
                    <button className="modern-back-btn" onClick={() => navigate('/interview/summary')}>
                        <ChevronLeft size={20} />
                        <span>返回总结</span>
                    </button>
                </header>

                <div className="sidebar-scroll-content">
                    <div className="sidebar-section">
                        <h4 className="section-title highlight-title">
                            <CheckCircle2 size={16} /> 面试亮点
                        </h4>
                        <ol className="modern-list">
                            <li>专业基础扎实，能够清晰阐述底层逻辑。</li>
                            <li>沟通表达流畅，面对压力问题不怯场。</li>
                        </ol>
                    </div>
                    <div className="sidebar-section">
                        <h4 className="section-title improve-title">
                            <AlertCircle size={16} /> 可改进的地方
                        </h4>
                        <ol className="modern-list">
                            <li>部分算法题解题思路不够优化。</li>
                            <li>对于过往项目的难点挖掘不够深。</li>
                        </ol>
                    </div>
                    <div className="sidebar-divider"></div>
                    <div className="sidebar-section">
                        <h4 className="section-title meeting-title">
                            <FileText size={16} /> 会议纪要
                        </h4>
                        <ol className="modern-list">
                            <li>一面考察了 React 原理和网络协议。</li>
                            <li>需在一周内补充开源代码样例。</li>
                        </ol>
                    </div>
                </div>
            </aside>

            <main className="review-main">

                {/* 聊天记录区 */}
                <div className="chat-history-area">
                    <div className="chat-center-container">

                        {messages.length === 0 ? (
                            <div className="empty-state-container fade-in">
                                <Sparkles size={48} strokeWidth={1.5} className="empty-icon" />
                                <h2 className="empty-state-text">向我提问吧</h2>
                                <p className="empty-state-sub">任何面试中没发挥好的问题，都可以随时问我</p>

                                <div className="quick-prompts-wrapper">
                                    {quickPrompts.map((prompt, index) => (
                                        <button
                                            key={index}
                                            className="quick-prompt-btn"
                                            onClick={() => sendUserMessage(prompt)}
                                        >
                                            <MessageSquarePlus size={16} />
                                            <span>{prompt}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // 对话气泡列表
                            <div className="chat-messages">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`chat-bubble-wrapper ${msg.role} fade-in`}>
                                        {msg.role === 'ai' && (
                                            <div className="chat-avatar ai-avatar">
                                                <Sparkles size={16} />
                                            </div>
                                        )}
                                        <div className="chat-bubble">
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>
                        )}

                    </div>
                </div>

                {/* 底部输入区 (带渐变遮罩) */}
                <div className="chat-input-area">
                    <div className="chat-input-center">
                        <div className="chat-input-box">
                            <textarea
                                ref={textareaRef}
                                placeholder="有问题就问我..."
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                rows={1} // 默认 1 行
                            />
                            <button
                                className={`send-circle-btn ${inputValue.trim() ? 'active' : ''}`}
                                onClick={() => sendUserMessage(inputValue)}
                                disabled={!inputValue.trim()}
                            >
                                <ArrowUp size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                        <div className="input-footer-text">
                            AI 可能会产生误导性信息，复盘结果仅供参考。
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}