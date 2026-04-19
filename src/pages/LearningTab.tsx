import React from 'react';
import './LearningTab.css'
import { Target, ShieldAlert, Code, PlayCircle, FileText, LayoutList, BookOpen, Mic, Briefcase, Zap, Compass } from 'lucide-react';

export default function LearningTab() {
    // 栏目 1：专属错题与薄弱题库
    const questionBank = [
        { id: 101, type: 'practice', title: '前端性能优化：首屏秒开排查', reason: '历史失分率 60%', meta: '12 题', icon: <ShieldAlert size={16} /> },
        { id: 102, type: 'practice', title: '手撕代码：带并发限制的 Promise', reason: '大厂机考极高频', meta: '专项', icon: <Code size={16} /> },
        { id: 103, type: 'practice', title: 'Vue3 响应式系统底层重写', reason: '针对"底层原理"薄弱项', meta: '进阶', icon: <Code size={16} /> },
    ];

    // 栏目 2：知识补漏与实战模拟
    const mockAndLearn = [
        { id: 201, type: 'video', title: '全真模拟：字节跳动架构面 (高压)', reason: '针对抗压与情绪管理', meta: '45 mins', icon: <Target size={16} /> },
        { id: 202, type: 'article', title: '大厂真实系统设计题解题套路解析', reason: '补齐项目难点挖掘短板', meta: '必读', icon: <FileText size={16} /> },
        { id: 203, type: 'video', title: '面试突击：用 STAR 原则包装普通项目', reason: '提升综合表达能力', meta: '8 mins', icon: <PlayCircle size={16} /> },
    ];

    // 栏目 3：大厂真题与面经解析 (扩充丰富度)
    const deepDives = [
        { id: 301, type: 'article', title: '腾讯 WXG 核心业务一面真题拆解', reason: '对齐冲刺目标', meta: '热点', icon: <Compass size={16} /> },
        { id: 302, type: 'article', title: 'V8 引擎垃圾回收机制与内存泄漏排查', reason: '突破高阶基础考察', meta: '长文', icon: <BookOpen size={16} /> },
        { id: 303, type: 'practice', title: '微前端架构选型：Qiankun vs MicroApp', reason: '补齐工程化视野', meta: '架构', icon: <LayoutList size={16} /> },
    ];

    // 栏目 4：软实力与综合素养 (扩充丰富度)
    const softSkills = [
        { id: 401, type: 'article', title: '如何优雅地回答 "你还有什么要问我的？"', reason: '反问环节绝佳模板', meta: '速记', icon: <Mic size={16} /> },
        { id: 402, type: 'video', title: 'HR 面常见陷阱与大厂谈薪策略', reason: '稳拿高定级 Offer', meta: '12 mins', icon: <Briefcase size={16} /> },
        { id: 403, type: 'video', title: '行为面试 (BQ) 中如何体现团队协作？', reason: '规避独狼人设', meta: '10 mins', icon: <Zap size={16} /> },
    ];

    return (
        <div className="tab-pane fade-in-up">

            {/* 🌟 极简横幅：完美还原图片中干净的“为您定制的突破路径” */}
            <div className="banner-sleek-clean">
                <h2>为您定制的突破路径</h2>
                <p>结合历史弱项生成，包含专属题库与全真模拟局</p>
            </div>

            <div className="learning-sections-wrapper">

                {/* 栏目 1 */}
                <div className="resource-section">
                    <h3 className="section-header-title">
                        <LayoutList size={18} className="text-blue-500" /> 专属错题与薄弱题库
                    </h3>
                    <div className="resource-grid">
                        {questionBank.map(res => (
                            <div className="resource-card" key={res.id}>
                                <div className="res-header">
                                    <div className={`res-icon-box ${res.type}`}>{res.icon}</div>
                                    <span className="res-meta">{res.meta}</span>
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

                {/* 栏目 2 */}
                <div className="resource-section">
                    <h3 className="section-header-title">
                        <BookOpen size={18} className="text-green-500" /> 知识补漏与实战模拟
                    </h3>
                    <div className="resource-grid">
                        {mockAndLearn.map(res => (
                            <div className="resource-card" key={res.id}>
                                <div className="res-header">
                                    <div className={`res-icon-box ${res.type}`}>{res.icon}</div>
                                    <span className="res-meta">{res.meta}</span>
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

                {/* 栏目 3 */}
                <div className="resource-section">
                    <h3 className="section-header-title">
                        <Compass size={18} className="text-purple-500" /> 大厂真题与深度解析
                    </h3>
                    <div className="resource-grid">
                        {deepDives.map(res => (
                            <div className="resource-card" key={res.id}>
                                <div className="res-header">
                                    <div className={`res-icon-box ${res.type}`}>{res.icon}</div>
                                    <span className="res-meta">{res.meta}</span>
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

                {/* 栏目 4 */}
                <div className="resource-section">
                    <h3 className="section-header-title">
                        <Mic size={18} className="text-orange-500" /> 软实力与面试技巧
                    </h3>
                    <div className="resource-grid">
                        {softSkills.map(res => (
                            <div className="resource-card" key={res.id}>
                                <div className="res-header">
                                    <div className={`res-icon-box ${res.type}`}>{res.icon}</div>
                                    <span className="res-meta">{res.meta}</span>
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

            </div>
        </div>
    );
}