import React, { useState, useEffect } from 'react';
// 🌟 修复 1：在这里加入了 ChevronDown 图标
import { ChevronLeft, Sparkles, Clock, Mic, Zap, BrainCircuit, BarChart2, CheckCircle2, AlertTriangle, Target, FileText, Loader2, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './InterviewSummary.css';

// 🌟 修复 2：完整定义包含了 transcript, analysis, reference 的数据结构，让 TS 正确推导类型
const MOCK_REPORT_DATA = {
    overview: {
        totalScore: 95,
        matchLevel: '高度匹配',
        summaryDesc: '候选人展现出卓越的技术正确性与逻辑严谨性，与【前端开发】岗位契合度极高，基础扎实，潜力极佳。',
    },
    expressStats: {
        confidence: 92,
        speed: 185,
        duration: 32,
    },
    skills: {
        technical: 96,
        depth: 88,
        logic: 90,
        match: 95,
        clarity: 94,
        emotion: 85,
    },
    insights: {
        highlights: [
            { title: '技术准确', desc: '对 React 底层原理的表述准确无误，知识体系构建完整，展现了扎实的技术基础。' },
            { title: '逻辑严密', desc: '在描述复杂状态管理方案时，能通过对比不同方案的优劣进行论证。' },
            { title: '表达自信', desc: '声学情感分析显示，回答关键技术点时音调平稳，自信度极高。' }
        ],
        improvements: [
            { title: '知识深度', desc: '在算法时空复杂度分析环节略显薄弱，建议补充相关知识储备。' },
            { title: '语速控制', desc: '当遇到压力问题时，语速瞬间飙升至 220字/分，建议刻意练习停顿。' }
        ]
    },
    timeline: [
        {
            q: '请简述 React Hooks 的核心原理及其解决的痛点？',
            score: 98,
            tag: '完美',
            transcript: 'React Hooks 主要是通过闭包和单向链表来实现的。它解决了类组件中状态逻辑难以复用、生命周期极其臃肿的问题...',
            analysis: '回答非常精准！准确提到了“闭包”和“单向链表”这两个底层核心词，并且清晰对比了与类组件的差异。',
            reference: 'Hooks 核心原理是依靠 Fiber 节点上的 memoizedState 链表来按顺序存放状态...'
        },
        {
            q: '在真实业务中，你是如何处理复杂状态管理的？',
            score: 85,
            tag: '良好',
            transcript: '一般来说，简单的用 useState，跨组件的我用 Context，如果特别复杂我会用 Redux 或者 Zustand。',
            analysis: '提到了主流方案，但缺乏具体业务场景的结合（STAR原则）。建议补充一个实际项目中遇到“状态灾难”并用 Zustand 重构的例子。',
            reference: '我会根据业务复杂度分层：局部状态用 useState；跨层级但变动低频的用 Context；高频且共享的全局业务状态引入 Zustand...'
        },
        {
            q: '如果遇到严重的内存泄漏，你会如何排查？',
            score: 72,
            tag: '待提升',
            transcript: '我会打开 Chrome 的控制台，看看 Network 有没有卡住，然后看看 Performance 面板。',
            analysis: '排查方向出现偏差。Network 主要排查网络阻塞，排查内存泄漏应该重点提及 Memory 面板的 Heap Snapshot（堆快照）。',
            reference: '首先使用 Chrome DevTools 的 Memory 面板抓取 Heap Snapshot，通过对比不同操作前后的快照，查找 Detached DOM 或未清除的定时器/闭包...'
        },
    ]
};

export default function InterviewSummary() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [reportData, setReportData] = useState<typeof MOCK_REPORT_DATA | null>(null);

    // 🌟 控制手风琴展开的 state
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
            setReportData(MOCK_REPORT_DATA);
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const toggleExpand = (index: number) => {
        setExpandedIndex(prev => prev === index ? null : index);
    };

    if (isLoading || !reportData) {
        return (
            <div className="summary-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Loader2 size={40} color="#3b82f6" style={{ animation: 'spin 1s linear infinite', marginBottom: '20px' }} />
                <h2 style={{ fontSize: '20px', color: '#0f172a', marginBottom: '8px' }}>正在生成深度评估报告...</h2>
                <p style={{ color: '#64748b', fontSize: '14px' }}>AI 正在分析您的技术回答与语音情感</p>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    const { overview, expressStats, skills, insights, timeline } = reportData;

    return (
        <div className="summary-container">
            <header className="summary-header">
                <button className="back-btn" onClick={() => navigate('/app')}>
                    <ChevronLeft size={18} />
                    <span>返回首页</span>
                </button>
            </header>

            <main className="summary-main fade-in-up">
                <section className="dashboard-hero">
                    <div className="score-card">
                        <div className="score-title">综合面试得分</div>
                        <div className="score-value-wrap">
                            <span className="score-value text-gradient">{overview.totalScore}</span>
                            <div className="score-badge">{overview.matchLevel}</div>
                        </div>
                        <p className="score-desc">{overview.summaryDesc}</p>
                    </div>

                    <div className="quick-stats">
                        <div className="stat-item">
                            <Mic size={18} className="stat-icon blue" />
                            <div className="stat-info">
                                <span className="stat-label">表达自信度</span>
                                <span className="stat-num">{expressStats.confidence} <span className="stat-unit">/ 100</span></span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <Zap size={18} className="stat-icon orange" />
                            <div className="stat-info">
                                <span className="stat-label">平均语速</span>
                                <span className="stat-num">{expressStats.speed} <span className="stat-unit">字/分 (适中)</span></span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <Clock size={18} className="stat-icon green" />
                            <div className="stat-info">
                                <span className="stat-label">面试总时长</span>
                                <span className="stat-num">{expressStats.duration} <span className="stat-unit">min</span></span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="dashboard-grid">
                    <div className="card-panel visual-panel">
                        <h3 className="panel-title"><BrainCircuit size={16} /> 深度能力分析</h3>

                        <div className="skill-group-title">硬技能与逻辑分析</div>
                        <div className="skill-bars">
                            <div className="skill-item">
                                <div className="skill-header"><span>技术正确性</span><span>{skills.technical}%</span></div>
                                <div className="progress-track"><div className="progress-fill" style={{ width: `${skills.technical}%`, background: '#3b82f6' }}></div></div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header"><span>知识深度挖掘</span><span>{skills.depth}%</span></div>
                                <div className="progress-track"><div className="progress-fill" style={{ width: `${skills.depth}%`, background: '#3b82f6' }}></div></div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header"><span>逻辑严谨性</span><span>{skills.logic}%</span></div>
                                <div className="progress-track"><div className="progress-fill" style={{ width: `${skills.logic}%`, background: '#3b82f6' }}></div></div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header"><span>岗位要求匹配度</span><span>{skills.match}%</span></div>
                                <div className="progress-track"><div className="progress-fill" style={{ width: `${skills.match}%`, background: '#8b5cf6' }}></div></div>
                            </div>
                        </div>

                        <div className="skill-group-title" style={{ marginTop: '24px' }}>表达与情感分析</div>
                        <div className="skill-bars">
                            <div className="skill-item">
                                <div className="skill-header"><span>发音清晰度</span><span>{skills.clarity}%</span></div>
                                <div className="progress-track"><div className="progress-fill" style={{ width: `${skills.clarity}%`, background: '#10b981' }}></div></div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-header"><span>情绪稳定性</span><span>{skills.emotion}%</span></div>
                                <div className="progress-track"><div className="progress-fill" style={{ width: `${skills.emotion}%`, background: '#f59e0b' }}></div></div>
                            </div>
                        </div>
                    </div>

                    <div className="insight-column">
                        <div className="card-panel insight-card highlight">
                            <h3 className="panel-title green"><CheckCircle2 size={18} /> 评估亮点</h3>
                            <ul className="insight-list">
                                {insights.highlights.map((h, i) => (
                                    <li key={i}><strong>{h.title}：</strong>{h.desc}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="card-panel insight-card improvement">
                            <h3 className="panel-title orange"><AlertTriangle size={18} /> 改进建议</h3>
                            <ul className="insight-list">
                                {insights.improvements.map((h, i) => (
                                    <li key={i}><strong>{h.title}：</strong>{h.desc}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="card-panel timeline-panel">
                    <h3 className="panel-title">
                        <Target size={18} /> 关键问答复盘
                        <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#64748b', marginLeft: '8px' }}>(点击查看详情)</span>
                    </h3>
                    <div className="timeline-container">
                        {timeline.map((item, index) => {
                            const isExpanded = expandedIndex === index;

                            return (
                                <div className={`timeline-item ${isExpanded ? 'expanded' : ''}`} key={index}>
                                    <div className="tl-header" onClick={() => toggleExpand(index)}>
                                        <div className="tl-node">Q{index + 1}</div>
                                        <div className="tl-content">
                                            <p className="tl-question">{item.q}</p>
                                            <div className="tl-meta">
                                                <span className="tl-score">单题得分：{item.score}</span>
                                                <span className={`tl-tag ${item.score > 90 ? 'good' : item.score > 80 ? 'ok' : 'warn'}`}>
                                                    {item.tag}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronDown className={`tl-chevron ${isExpanded ? 'rotated' : ''}`} size={20} />
                                    </div>

                                    <div className="tl-body-wrapper">
                                        <div className="tl-body">
                                            <div className="tl-details">
                                                <div className="detail-block">
                                                    <span className="detail-label">🗣️ 你的原声录音转写：</span>
                                                    <p className="detail-text user-text">"{item.transcript}"</p>
                                                </div>
                                                <div className="detail-block analysis-block">
                                                    <span className="detail-label"><Sparkles size={14} /> AI 深度批注：</span>
                                                    <p className="detail-text">{item.analysis}</p>
                                                </div>
                                                <div className="detail-block reference-block">
                                                    <span className="detail-label">💡 参考满分回答：</span>
                                                    <p className="detail-text">{item.reference}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section className="card-panel minutes-panel">
                    <h3 className="panel-title blue"><FileText size={18} /> 会议纪要 (HR 存档视⻆示例)</h3>
                    <p className="minutes-text">
                        候选人整体技术面表现优异，主考官重点考察了 React 原理和网络协议，候选人对答如流。二面侧重于架构设计经验，考察中发现其对于大型项目的系统性设计尚有提升空间。最终确认为强推评级，已确认其期望薪资与最快到岗时间，建议尽快推进后续流程。
                    </p>
                </section>
            </main>

            <div className="floating-actions">
                <button className="btn-deep-review" onClick={() => navigate('/interview/review')}>
                    <Sparkles size={18} className="shine-icon" />
                    <span>与 AI 深度复盘</span>
                </button>
            </div>

            <style>{`
                .fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}