import React, { useState } from 'react';
import { Clock, ChevronRight, Zap, BarChart2, Target, Award, Filter, Hexagon, FileText, AlertCircle } from 'lucide-react';
import './GrowthTab.css';

export default function GrowthTab() {
    const chartNodes = [
        { id: 1, cx: 50, cy: 200, score: 55, company: '初次摸底测评', date: '02-15', desc: '八股文薄弱，基础不牢，未达及格线' },
        { id: 2, cx: 150, cy: 180, score: 62, company: '阿里日常一面', date: '02-28', desc: 'CSS基础不过关，被挂' },
        { id: 3, cx: 250, cy: 190, score: 60, company: '美团笔试', date: '03-05', desc: '动态规划全错，未进面试' },
        { id: 4, cx: 350, cy: 140, score: 75, company: '百度日常一面', date: '03-12', desc: 'React 原理答得不错，触底反弹' },
        { id: 5, cx: 450, cy: 150, score: 72, company: '百度日常二面', date: '03-19', desc: '手写防抖节流失误，稍有回落' },
        { id: 6, cx: 550, cy: 100, score: 82, company: '腾讯暑期一面', date: '03-25', desc: '网络协议深挖过关，首次突破 80 分' },
        { id: 7, cx: 650, cy: 120, score: 78, company: '腾讯暑期二面', date: '04-02', desc: '高并发系统设计紧张，暴露短板' },
        { id: 8, cx: 750, cy: 80, score: 88, company: '字节跳动一面', date: '04-09', desc: '项目难点深挖顺利，渐入佳境' },
        { id: 9, cx: 850, cy: 50, score: 92, company: '字节跳动二面', date: '04-15', desc: '微前端架构题回答完美，进入安全区' },
        { id: 10, cx: 950, cy: 30, score: 96, company: '字节跳动HR面', date: '04-18', desc: '价值观契合，沟通流畅，Offer 稳了' },
    ];

    const [activeNode, setActiveNode] = useState<number | null>(null);
    const activeNodeData = chartNodes.find(n => n.id === activeNode);

    const historyRecords = [
        { id: 1, date: '2026-04-18', company: '字节跳动', position: '前端开发 (暑期)', score: 96, tags: ['表现优异', '架构思维'] },
        { id: 2, date: '2026-04-02', company: '腾讯', position: '前端开发 (暑期)', score: 78, tags: ['系统设计薄弱', '需加强宏观思考'] },
        { id: 3, date: '2026-03-05', company: '美团', position: '大前端', score: 60, tags: ['算法需强化', '笔试未通过'] },
    ];

    return (
        <div className="tab-pane fade-in-up">

            {/* 顶部求职意向卡片 */}
            <div className="target-match-panel">
                <div className="target-info">
                    <Award size={24} className="text-blue-500" />
                    <div className="target-text-content">
                        <div className="target-title">当前冲刺目标：大厂前端开发工程师 (T5/P6 级)</div>
                        <div className="target-subtitle">综合 AI 评定：你已跨越及格线，正处于核心发力期。从最近 3 次的面经数据来看，你的基础八股文已经形成肌肉记忆，目前的提分瓶颈在于「开放性系统设计」与「极端场景下的手写代码」。</div>
                    </div>
                </div>
                <div className="match-score-section">
                    <div className="match-score-text">
                        <span className="score-value">84</span><span className="score-unit">%</span>
                    </div>
                    <div className="match-progress-bg">
                        <div className="match-progress-fill" style={{ width: '84%' }}></div>
                    </div>
                    <div className="match-hint text-green-500">已达大厂录取基准线</div>
                </div>
            </div>

            {/* 🌟 核心重构 1：超大画幅图表 + 智能定位气泡 + 深度复盘文案 */}
            <div className="saas-card chart-card-epic mt-6">
                <div className="card-header border-bottom-light">
                    <div className="header-left">
                        <BarChart2 size={18} className="text-gray-500" />
                        <h3 className="card-title">全周期能力演进轨迹与 AI 复盘</h3>
                    </div>
                    <div className="chart-legend">
                        <span className="legend-item"><span className="safe-zone-box"></span>Offer 安全区</span>
                        <span className="legend-item"><span className="dot my-score"></span>实战综合评分</span>
                    </div>
                </div>

                <div className="epic-layout-container">
                    <div className="interactive-chart-wrapper epic-wrapper">
                        {/* 🌟 智能悬浮气泡：解决边缘遮挡问题 */}
                        {activeNodeData && (
                            <div
                                className={`hover-tooltip fade-in ${activeNodeData.id === 1 ? 'align-left' : activeNodeData.id === chartNodes.length ? 'align-right' : 'align-center'}`}
                                style={{
                                    left: activeNodeData.id === 1 ? '5%' : activeNodeData.id === chartNodes.length ? 'auto' : `${activeNodeData.cx / 10}%`,
                                    right: activeNodeData.id === chartNodes.length ? '5%' : 'auto',
                                    bottom: `calc(${100 - activeNodeData.cy / 2.5}% + 20px)`
                                }}
                            >
                                <div className="tooltip-header">
                                    <span className="tooltip-company">{activeNodeData.company}</span>
                                    <span className="tooltip-score">{activeNodeData.score}分</span>
                                </div>
                                <div className="tooltip-date">{activeNodeData.date}</div>
                                <div className="tooltip-desc">{activeNodeData.desc}</div>
                            </div>
                        )}

                        <svg viewBox="0 0 1000 250" className="interactive-svg">
                            <defs>
                                <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                                </linearGradient>
                            </defs>

                            <rect x="0" y="20" width="1000" height="70" fill="rgba(16, 185, 129, 0.05)" />
                            <line x1="0" y1="90" x2="1000" y2="90" stroke="#10b981" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />

                            <path d="M0 50 L1000 50 M0 120 L1000 120 M0 190 L1000 190" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" fill="none" />

                            <path d={`M ${chartNodes.map(n => `${n.cx} ${n.cy}`).join(' L ')}`} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinejoin="round" />
                            <path d={`M 50 250 L ${chartNodes.map(n => `${n.cx} ${n.cy}`).join(' L ')} L 950 250 Z`} fill="url(#area-gradient)" />

                            {chartNodes.map((node) => (
                                <g
                                    key={node.id}
                                    onMouseEnter={() => setActiveNode(node.id)}
                                    onMouseLeave={() => setActiveNode(null)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <circle cx={node.cx} cy={node.cy} r="25" fill="transparent" />
                                    <circle
                                        cx={node.cx} cy={node.cy}
                                        r={activeNode === node.id ? "7" : "5"}
                                        fill="#ffffff"
                                        stroke={node.cy <= 90 ? "#10b981" : node.cy >= 170 ? "#ef4444" : "#3b82f6"}
                                        strokeWidth={activeNode === node.id ? "3" : "2"}
                                        style={{ transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                                    />
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* 🌟 丰富的 AI 报告感文字 */}
                    <div className="ai-report-summary">
                        <h4><FileText size={15} /> AI 阶段性复盘报告</h4>
                        <p>经过 10 轮测试与实战，您的成长曲线呈现典型的<strong>「先抑后扬」</strong>态势。前期（2月中旬-3月上旬）在算法和基础 CSS 上失分严重；中期（3月中旬-4月初）通过框架原理的恶补，分数稳步提升至 80 分梯队；后期（4月中旬至今），由于在字节跳动面试中完美展现了微前端架构思维，<strong>综合评级已成功跃升并稳定在 Offer 安全区。</strong>继续保持对底层源码的敏锐度！</p>
                    </div>
                </div>
            </div>

            <div className="bento-grid-bottom mt-6">

                {/* 漏斗分析 */}
                <div className="saas-card flex-1">
                    <div className="card-header border-bottom-light">
                        <div className="header-left">
                            <Filter size={16} className="text-orange-500" />
                            <h3 className="card-title">历史求职转化漏斗</h3>
                        </div>
                    </div>
                    <div className="funnel-container">
                        <div className="funnel-step">
                            <div className="step-bar" style={{ height: '100%', background: '#eff6ff' }}><span className="step-val text-blue-500">124</span></div>
                            <span className="step-label">简历投递</span>
                        </div>
                        <div className="funnel-divider"><ChevronRight size={14} className="text-gray-400" /></div>
                        <div className="funnel-step">
                            <div className="step-bar" style={{ height: '60%', background: '#f1f5f9' }}><span className="step-val">42</span></div>
                            <span className="step-label">笔试/测评</span>
                        </div>
                        <div className="funnel-divider"><ChevronRight size={14} className="text-gray-400" /></div>
                        <div className="funnel-step">
                            <div className="step-bar" style={{ height: '35%', background: '#f1f5f9' }}><span className="step-val">15</span></div>
                            <span className="step-label">业务一面</span>
                        </div>
                        <div className="funnel-divider"><ChevronRight size={14} className="text-gray-400" /></div>
                        <div className="funnel-step">
                            <div className="step-bar" style={{ height: '15%', background: '#fff7ed' }}><span className="step-val text-orange-500">4</span></div>
                            <span className="step-label">交叉/二面</span>
                        </div>
                        <div className="funnel-divider"><ChevronRight size={14} className="text-gray-400" /></div>
                        <div className="funnel-step">
                            <div className="step-bar" style={{ height: '8%', background: '#ecfdf5' }}><span className="step-val text-green-500">2</span></div>
                            <span className="step-label">Offer</span>
                        </div>
                    </div>
                    {/* 🌟 丰富的诊断文本 */}
                    <div className="diagnosis-rich-text">
                        <h5>漏斗瓶颈诊断：</h5>
                        <p>您的简历通过率（33.8%）高于大盘均值，说明教育背景和项目包装出色。但<strong>「业务一面 到 交叉/二面」的转化率仅为 26.6%</strong>。通常二面由交叉部门或资深总监面，侧重于项目的难点挖掘和架构设计的广度。建议在后续练习中，开启 AI 的「高压追问模式」。</p>
                    </div>
                </div>

                {/* 水位图 */}
                <div className="saas-card flex-2">
                    <div className="card-header border-bottom-light">
                        <div className="header-left">
                            <Hexagon size={16} className="text-purple-500" />
                            <h3 className="card-title">核心维度掌握水位</h3>
                        </div>
                    </div>
                    <div className="waterLevel-container">
                        <div className="waterLevel-item">
                            <div className="wl-info">
                                <span className="wl-name">计算机基础 (网络协议/操作系统/数据库)</span>
                                <span className="wl-status text-green-500">精通</span>
                            </div>
                            <div className="wl-track"><div className="wl-fill bg-green" style={{ width: '92%' }}></div></div>
                        </div>
                        <div className="waterLevel-item">
                            <div className="wl-info">
                                <span className="wl-name">前端框架底层原理 (Vue3 Proxy / React Fiber)</span>
                                <span className="wl-status text-blue-500">熟练</span>
                            </div>
                            <div className="wl-track"><div className="wl-fill bg-blue" style={{ width: '80%' }}></div></div>
                        </div>
                        <div className="waterLevel-item">
                            <div className="wl-info">
                                <span className="wl-name">经典算法与手撕代码 (防抖节流 / 调度器)</span>
                                <span className="wl-status text-orange-500">一般</span>
                            </div>
                            <div className="wl-track"><div className="wl-fill bg-orange" style={{ width: '60%' }}></div></div>
                        </div>
                        <div className="waterLevel-item">
                            <div className="wl-info">
                                <span className="wl-name">高并发系统架构与复杂业务场景设计</span>
                                <span className="wl-status text-red">薄弱</span>
                            </div>
                            <div className="wl-track"><div className="wl-fill bg-red" style={{ width: '35%' }}></div></div>
                        </div>
                    </div>
                    {/* 🌟 丰富的短板说明 */}
                    <div className="diagnosis-rich-text warning">
                        <h5><AlertCircle size={14} /> 短板干预建议：</h5>
                        <p>架构设计模块目前水位极低。面试官通常会提问：“如果这是一个千万级 UV 的页面，你会怎么优化？”或“请设计一个前端监控系统”。你需要立即前往【突破路径】查阅系统设计相关套路，并补充大厂真实场景下的解决方案。</p>
                    </div>
                </div>
            </div>

            {/* 历史记录保持不变... */}
            <div className="saas-card mt-6 mb-10">
                <div className="card-header border-bottom">
                    <div className="header-left">
                        <Clock size={16} className="text-gray-500" />
                        <h3 className="card-title">历史面试复盘</h3>
                    </div>
                </div>
                <div className="data-list">
                    {historyRecords.map(record => (
                        <div className="data-row" key={record.id}>
                            <div className="row-left">
                                <div className={`score-badge ${record.score >= 90 ? 'score-high' : record.score >= 80 ? 'score-mid' : 'score-low'}`}>{record.score}</div>
                                <div className="row-info">
                                    <h4>{record.company} <span className="divider">/</span> <span className="font-normal">{record.position}</span></h4>
                                    <span className="row-date">{record.date}</span>
                                </div>
                            </div>
                            <div className="row-right">
                                <div className="tag-group">
                                    {record.tags.map(tag => <span key={tag} className="data-tag">{tag}</span>)}
                                </div>
                                <button className="btn-icon-link">查看详情 <ChevronRight size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}