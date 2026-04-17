import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, FileText, Clock, ChevronRight, Target, Zap, PlayCircle, BarChart2 } from 'lucide-react';
import ResumeForm from './ResumeForm';
import './ProfileInfo.css';

export default function ProfileCenter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = (searchParams.get('tab') as 'growth' | 'learning' | 'resume' | null) || 'growth';
    const [activeTab, setActiveTab] = useState<'growth' | 'learning' | 'resume'>(initialTab);

    useEffect(() => {
        const tabFromUrl = searchParams.get('tab') as 'growth' | 'learning' | 'resume' | null;
        if (tabFromUrl && ['growth', 'learning', 'resume'].includes(tabFromUrl) && tabFromUrl !== activeTab) {
            setActiveTab(tabFromUrl);
        }
    }, [searchParams]);

    const historyRecords = [
        { id: 1, date: '2026-04-12', company: '字节跳动', position: '前端开发', score: 95, tags: ['表现优异', '技术扎实'] },
        { id: 2, date: '2026-04-05', company: '美团', position: '大前端', score: 78, tags: ['算法薄弱', '语速偏快'] },
        { id: 3, date: '2026-03-28', company: '腾讯', position: 'Web前端', score: 82, tags: ['项目深度不足'] },
    ];

    const learningResources = [
        { id: 1, type: 'article', title: 'React Fiber 架构深度解析与面试防坑', reason: '针对历次面试中“底层原理”得分较低推荐', duration: '15 mins', icon: <FileText size={16} /> },
        { id: 2, type: 'video', title: '面试突击：如何用 STAR 原则包装你的普通项目？', reason: '针对上周面试“项目经验”挖掘不足推荐', duration: '8 mins', icon: <PlayCircle size={16} /> },
        { id: 3, type: 'practice', title: '高频手写题专项训练：防抖、节流与深拷贝', reason: '算法与手撕代码模块需巩固', duration: '3 题', icon: <Target size={16} /> },
    ];

    const renderGrowthTab = () => (
        <div className="tab-pane fade-in-up">
            {/* 🌟 核心升级：Bento Box (2:1 黄金网格) */}
            <div className="bento-grid-top">

                {/* 左宽 (65%)：成长曲线图表 */}
                <div className="saas-card chart-card">
                    <div className="card-header">
                        <div className="header-left">
                            <BarChart2 size={16} className="text-gray-500" />
                            <h3 className="card-title">综合能力趋势</h3>
                        </div>
                        <span className="card-subtitle">近 6 次面试</span>
                    </div>
                    <div className="chart-container">
                        {/* 🌟 纯手工绘制的高级 SVG 折线图 (替代占位符) */}
                        <svg viewBox="0 0 600 200" className="svg-chart" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                                </linearGradient>
                            </defs>
                            {/* 背景网格线 */}
                            <path d="M0 40 L600 40 M0 100 L600 100 M0 160 L600 160" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                            {/* 渐变填充区域 */}
                            <path d="M 0 150 C 100 150, 150 120, 250 130 C 350 140, 450 60, 600 40 L 600 200 L 0 200 Z" fill="url(#chart-gradient)" />
                            {/* 核心折线 */}
                            <path d="M 0 150 C 100 150, 150 120, 250 130 C 350 140, 450 60, 600 40" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            {/* 数据点 */}
                            <circle cx="250" cy="130" r="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
                            <circle cx="450" cy="85" r="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
                            <circle cx="600" cy="40" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                        </svg>
                    </div>
                </div>

                {/* 右窄 (35%)：AI 弱项诊断 */}
                <div className="saas-card diagnosis-card">
                    <div className="card-header border-bottom-light">
                        <div className="header-left">
                            <Zap size={16} className="text-orange-500" />
                            <h3 className="card-title">AI 短板诊断</h3>
                        </div>
                    </div>
                    <div className="metrics-list">
                        <div className="metric-item">
                            <div className="metric-label">
                                <span>算法与复杂度评估</span>
                                <span className="metric-value text-red">待提升</span>
                            </div>
                            <div className="progress-thin"><div className="progress-bar bg-red" style={{ width: '45%' }}></div></div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-label">
                                <span>项目难点挖掘</span>
                                <span className="metric-value text-orange">一般</span>
                            </div>
                            <div className="progress-thin"><div className="progress-bar bg-orange" style={{ width: '60%' }}></div></div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-label">
                                <span>抗压与情绪管理</span>
                                <span className="metric-value text-green">良好</span>
                            </div>
                            <div className="progress-thin"><div className="progress-bar bg-green" style={{ width: '85%' }}></div></div>
                        </div>
                    </div>
                    <div className="diagnosis-footer">
                        💡 <strong>洞察：</strong>基础扎实，但系统设计易紧张，建议增加压测模拟。
                    </div>
                </div>
            </div>

            {/* 底部全宽 (100%)：历史记录 */}
            <div className="saas-card mt-6">
                <div className="card-header border-bottom">
                    <div className="header-left">
                        <Clock size={16} className="text-gray-500" />
                        <h3 className="card-title">历史面试记录</h3>
                    </div>
                </div>
                <div className="data-list">
                    {historyRecords.map(record => (
                        <div className="data-row" key={record.id}>
                            <div className="row-left">
                                <div className={`score-badge ${record.score >= 90 ? 'score-high' : record.score >= 80 ? 'score-mid' : 'score-low'}`}>
                                    {record.score}
                                </div>
                                <div className="row-info">
                                    <h4>{record.company} <span className="divider">/</span> <span className="font-normal">{record.position}</span></h4>
                                    <span className="row-date">{record.date}</span>
                                </div>
                            </div>
                            <div className="row-right">
                                <div className="tag-group">
                                    {record.tags.map(tag => <span key={tag} className="data-tag">{tag}</span>)}
                                </div>
                                <button className="btn-icon-link">查看报告 <ChevronRight size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderLearningTab = () => (
        <div className="tab-pane fade-in-up">
            <div className="banner-sleek">
                <div className="banner-content">
                    <h2>为您定制的提升计划</h2>
                    <p>基于最近 3 次面试表现生成的精准突破路径</p>
                </div>
            </div>
            <div className="resource-grid">
                {learningResources.map(res => (
                    <div className="resource-card" key={res.id}>
                        <div className="res-header">
                            <div className={`res-icon-box ${res.type}`}>{res.icon}</div>
                            <span className="res-meta">{res.duration}</span>
                        </div>
                        <h4 className="res-title">{res.title}</h4>
                        <div className="res-footer">
                            <Target size={12} className="text-gray-400" />
                            <span className="res-reason">{res.reason}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="profile-center-container">
            {/* 🌟 核心升级：对齐切割式头部 */}
            <div className="profile-header-aligned">
                <div className="header-titles">
                    <h1 className="page-title">成长看板</h1>
                </div>

                <div className="segmented-control">
                    <button className={`segment-btn ${activeTab === 'growth' ? 'active' : ''}`} onClick={() => { setActiveTab('growth'); setSearchParams({ tab: 'growth' }); }}>
                        <BarChart2 size={14} style={{ marginRight: '4px' }} /> 能力洞察
                    </button>
                    <button className={`segment-btn ${activeTab === 'learning' ? 'active' : ''}`} onClick={() => { setActiveTab('learning'); setSearchParams({ tab: 'learning' }); }}>
                        <Zap size={14} style={{ marginRight: '4px' }} /> 突破路径
                    </button>
                    <button className={`segment-btn ${activeTab === 'resume' ? 'active' : ''}`} onClick={() => { setActiveTab('resume'); setSearchParams({ tab: 'resume' }); }}>
                        <FileText size={14} style={{ marginRight: '4px' }} /> 个人档案
                    </button>
                </div>
            </div>

            <div className="profile-content">
                {activeTab === 'growth' && renderGrowthTab()}
                {activeTab === 'learning' && renderLearningTab()}
                {activeTab === 'resume' && <ResumeForm />}
            </div>
        </div>
    );
}