import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, X, Building2, Briefcase as BriefcaseIcon, Clock, Monitor, Server, Code, Target } from 'lucide-react';
import './WrittenTest.css';

interface WrittenTestProps {
    onClose: () => void;
}

// ================= 🌟 丰富后的题库字典 (每个科目 5 道题) =================
const QUESTION_BANK: Record<string, any[]> = {
    frontend: [
        { id: 'q1_f', type: 'choice', title: '在 React 中，useEffect 的依赖数组如果为空数组 []，它的执行时机是什么？', options: [{ id: 'A', text: '每次重新渲染时执行' }, { id: 'B', text: '首次挂载完成后执行一次' }, { id: 'C', text: '卸载时执行' }, { id: 'D', text: '更新时执行' }], answer: 'B', explanation: '空依赖数组意味着 effect 不依赖任何状态，仅在 Mount 时执行。' },
        { id: 'q2_f', type: 'blank', parts: ['HTTP 状态码 301 表示', '重定向，302 表示', '重定向。'], keys: ['q2_f_1', 'q2_f_2'], answers: ['永久', '临时'], explanation: '301是永久重定向，302是临时重定向。' },
        { id: 'q3_f', type: 'text', title: '如何设计一个虚拟列表（Virtual List）解决长列表渲染卡顿？', explanation: '核心思路：只渲染可视区域内的 DOM 节点，通过 scrollTop 计算起止索引并利用绝对定位推到正确位置。' },
        { id: 'q4_f', type: 'choice', title: 'CSS 中 box-sizing: border-box 的作用是什么？', options: [{ id: 'A', text: '宽度包含 padding 和 border' }, { id: 'B', text: '宽度仅包含 content' }, { id: 'C', text: '消除外边距折叠' }, { id: 'D', text: '生成 BFC' }], answer: 'A', explanation: 'border-box 会将 padding 和 border 算入元素的 width 之中，避免元素被撑大。' },
        { id: 'q5_f', type: 'choice', title: 'Promise.all() 和 Promise.race() 的区别是？', options: [{ id: 'A', text: 'all 返回最快的，race 等待所有' }, { id: 'B', text: 'all 等待所有成功，race 返回最快的' }, { id: 'C', text: '两者没有区别' }, { id: 'D', text: 'race 只能处理同步任务' }], answer: 'B', explanation: 'all 需要所有 Promise resolve，race 只要有一个状态改变就立即返回。' }
    ],
    backend: [
        { id: 'q1_b', type: 'choice', title: 'MySQL 中 InnoDB 存储引擎默认的事务隔离级别是？', options: [{ id: 'A', text: '读未提交' }, { id: 'B', text: '读已提交' }, { id: 'C', text: '可重复读' }, { id: 'D', text: '串行化' }], answer: 'C', explanation: 'InnoDB 默认使用可重复读（Repeatable Read）。' },
        { id: 'q2_b', type: 'blank', parts: ['Redis 的默认监听端口号是 ', '。'], keys: ['q2_b_1'], answers: ['6379'], explanation: 'Redis 默认端口是 6379，来源于手机键盘上 MERZ 对应的数字。' },
        { id: 'q3_b', type: 'text', title: '请简述进程（Process）与线程（Thread）的核心区别。', explanation: '进程是资源分配的基本单位，拥有独立的内存空间；线程是 CPU 调度的基本单位，多线程共享所属进程的内存资源，切换开销更小。' },
        { id: 'q4_b', type: 'choice', title: '分布式系统中的 CAP 定理指出，一个分布式系统最多只能同时满足几项？', options: [{ id: 'A', text: '1项' }, { id: 'B', text: '2项' }, { id: 'C', text: '3项' }, { id: 'D', text: '0项' }], answer: 'B', explanation: 'CAP 理论指出一致性、可用性、分区容错性三者最多只能同时满足两项。' },
        { id: 'q5_b', type: 'blank', parts: ['在防止 SQL 注入攻击时，最常用的技术手段是使用', '语句（PreparedStatement）。'], keys: ['q5_b_1'], answers: ['预编译'], explanation: '预编译可以有效防止恶意 SQL 字符串被当做代码执行。' }
    ],
    algorithm: [
        { id: 'q1_a', type: 'choice', title: '快速排序（Quick Sort）的平均时间复杂度是多少？', options: [{ id: 'A', text: 'O(N)' }, { id: 'B', text: 'O(N log N)' }, { id: 'C', text: 'O(N^2)' }, { id: 'D', text: 'O(log N)' }], answer: 'B', explanation: '快排平均 O(N log N)，在数组极度不平衡的最差情况下退化为 O(N^2)。' },
        { id: 'q2_a', type: 'text', title: '请简述如何判断一个单链表是否存在环？', explanation: '通常使用「快慢指针法」。定义两指针，快指针每次走两步，慢指针走一步，若相遇则有环；若快指针达 null 则无环。' },
        { id: 'q3_a', type: 'choice', title: '二分查找（Binary Search）的时间复杂度是？', options: [{ id: 'A', text: 'O(1)' }, { id: 'B', text: 'O(N)' }, { id: 'C', text: 'O(log N)' }, { id: 'D', text: 'O(N log N)' }], answer: 'C', explanation: '每次排除一半的数据，时间复杂度为 O(log N)。' },
        { id: 'q4_a', type: 'blank', parts: ['二叉树遍历中，按照“根节点 -> 左子树 -> 右子树”顺序进行的是', '遍历。'], keys: ['q4_a_1'], answers: ['前序'], explanation: '前序遍历（Pre-order）是中左右，中序是左中右，后序是左右中。' },
        { id: 'q5_a', type: 'text', title: '哈希表（Hash Map）发生哈希冲突时，常用的解决办法有哪些？', explanation: '主要有：链地址法（拉链法）、开放定址法（线性探测、二次探测）、再哈希法等。' }
    ],
    aptitude: [
        { id: 'q1_ap', type: 'choice', title: '数字推理：1, 3, 6, 10, ( ? )', options: [{ id: 'A', text: '12' }, { id: 'B', text: '14' }, { id: 'C', text: '15' }, { id: 'D', text: '16' }], answer: 'C', explanation: '差值递增：2, 3, 4, 5。10+5=15。' },
        { id: 'q2_ap', type: 'text', title: '如果你和直属领导在某个技术方案上产生了严重的分歧，你会怎么处理？', explanation: '考察职场沟通。1. 保持冷静，私下沟通；2. 列出优缺点数据；3. 若领导最终拍板，则坚决执行。' },
        { id: 'q3_ap', type: 'choice', title: '逻辑推理：所有A都是B，有些B是C。那么可以确定以下哪项为真？', options: [{ id: 'A', text: '所有A都是C' }, { id: 'B', text: '有些A是C' }, { id: 'C', text: '有些C是B' }, { id: 'D', text: '所有C都是A' }], answer: 'C', explanation: '“有些B是C”等价于“有些C是B”。无法确定A与C的关系。' },
        { id: 'q4_ap', type: 'blank', parts: ['面试中描述过往经验常用的 STAR 原则，其中 T 代表的是 ', ' (Task)。'], keys: ['q4_ap_1'], answers: ['任务'], explanation: 'STAR: Situation(情境), Task(任务), Action(行动), Result(结果)。' },
        { id: 'q5_ap', type: 'text', title: '如果项目快上线了，但由于不可抗力导致开发进度严重延期，你作为负责人该怎么做？', explanation: '1. 立即向上级汇报风险；2. 梳理核心链路，砍掉非 P0 需求；3. 协调额外资源或安排加班；4. 事后复盘。' }
    ]
};

const SUBJECTS = [
    { id: 'frontend', name: '前端开发与架构', desc: 'React/Vue、工程化、原理', icon: Monitor, color: '#3b82f6' },
    { id: 'backend', name: '后端原理与设计', desc: 'Java/Go、数据库、系统设计', icon: Server, color: '#8b5cf6' },
    { id: 'algorithm', name: '算法与数据结构', desc: 'LeetCode高频题、手写代码', icon: Code, color: '#ec4899' },
    { id: 'aptitude', name: '综合素质测评', desc: '行测逻辑推理、性格图谱', icon: Target, color: '#f59e0b' },
];

export default function WrittenTest({ onClose }: WrittenTestProps) {
    // ================= 1. 所有的 Hooks 必须放在最顶层 =================
    const [phase, setPhase] = useState<'config' | 'exam'>('config');

    const [config, setConfig] = useState({
        company: '', position: '', subject: 'frontend', difficulty: 'medium', duration: 45, antiCheat: true,
    });

    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [submitted, setSubmitted] = useState(false);
    const [remainingSec, setRemainingSec] = useState(0);

    // 随机抽题逻辑 (依赖 subject，当进入考试时抽题一次并保持稳定)
    const currentQuestions = useMemo(() => {
        const source = QUESTION_BANK[config.subject] || QUESTION_BANK['frontend'];
        const shuffled = [...source];
        // Fisher-Yates 洗牌算法
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        // 🌟 每次随机抽取 3 道题展示
        return shuffled.slice(0, 3);
    }, [config.subject]);

    // 倒计时逻辑
    useEffect(() => {
        if (phase !== 'exam' || remainingSec <= 0) return;
        const timer = setInterval(() => setRemainingSec(prev => prev <= 1 ? 0 : prev - 1), 1000);
        return () => clearInterval(timer);
    }, [phase, remainingSec]);

    const formatTime = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;


    // ================= 2. 条件渲染 =================

    // 渲染配置弹窗 (阶段 1)
    if (phase === 'config') {
        return (
            <div className="modal-overlay" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', animation: 'fadeIn 0.3s ease-out' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: '20px', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                    <div style={{ padding: '24px 32px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>笔试参数配置</h2>
                            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>选择并定制您的专项笔试训练库</p>
                        </div>
                        <button onClick={onClose} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', backgroundColor: '#f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <X size={20} color="#64748b" />
                        </button>
                    </div>

                    <div style={{ padding: '24px 32px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>目标公司 <span style={{ color: '#ef4444' }}>*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <Building2 size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input type="text" value={config.company} onChange={(e) => setConfig({ ...config, company: e.target.value })} placeholder="例如：腾讯" style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>目标岗位 <span style={{ color: '#ef4444' }}>*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <BriefcaseIcon size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input type="text" value={config.position} onChange={(e) => setConfig({ ...config, position: e.target.value })} placeholder="例如：高级前端工程师" style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>专项训练库选择</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                                {SUBJECTS.map((sub) => {
                                    const Icon = sub.icon;
                                    const isActive = config.subject === sub.id;
                                    return (
                                        <button key={sub.id} onClick={() => setConfig({ ...config, subject: sub.id })} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: `2px solid ${isActive ? sub.color : '#e2e8f0'}`, borderRadius: '12px', backgroundColor: isActive ? `${sub.color}0A` : '#fff', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: isActive ? sub.color : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#fff' : '#64748b' }}>
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '15px', fontWeight: 700, color: isActive ? sub.color : '#1e293b', marginBottom: '4px' }}>{sub.name}</div>
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>{sub.desc}</div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>试卷难度</label>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                {[
                                    { id: 'easy', name: '简单 (基础)', color: '#22c55e' },
                                    { id: 'medium', name: '中等 (进阶)', color: '#3b82f6' },
                                    { id: 'hard', name: '困难 (专家)', color: '#ef4444' },
                                ].map((level) => (
                                    <button key={level.id} onClick={() => setConfig({ ...config, difficulty: level.id })} style={{ flex: 1, padding: '12px 0', border: `2px solid ${config.difficulty === level.id ? level.color : '#e2e8f0'}`, borderRadius: '10px', backgroundColor: config.difficulty === level.id ? `${level.color}10` : '#fff', color: config.difficulty === level.id ? level.color : '#64748b', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                                        {level.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>答题限时（分钟）</label>
                                <div style={{ position: 'relative' }}>
                                    <Clock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input type="number" value={config.duration} onChange={(e) => setConfig({ ...config, duration: parseInt(e.target.value) || 45 })} min="10" max="180" style={{ width: '100%', padding: '12px 12px 12px 40px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', backgroundColor: config.antiCheat ? '#eff6ff' : '#f8fafc', border: `2px solid ${config.antiCheat ? '#3b82f6' : '#e2e8f0'}`, borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: config.antiCheat ? '#3b82f6' : '#64748b' }}>
                                <input type="checkbox" checked={config.antiCheat} onChange={(e) => setConfig({ ...config, antiCheat: e.target.checked })} style={{ width: '16px', height: '16px' }} />
                                <span>开启切屏监测反馈</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ padding: '20px 32px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px', justifyContent: 'flex-end', backgroundColor: '#f8fafc' }}>
                        <button onClick={onClose} style={{ padding: '12px 24px', border: '1px solid #cbd5e1', borderRadius: '10px', backgroundColor: '#fff', color: '#475569', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>取消</button>
                        <button onClick={() => {
                            setRemainingSec(config.duration * 60);
                            setPhase('exam'); // 🌟 点击确认后，切换到考试界面
                        }} disabled={!config.company || !config.position} style={{ padding: '12px 32px', border: 'none', borderRadius: '10px', backgroundColor: (!config.company || !config.position) ? '#cbd5e1' : '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: (!config.company || !config.position) ? 'not-allowed' : 'pointer' }}>
                            抽取试题并开始
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ================= 阶段 2：渲染考试界面 =================
    return (
        <div className="wt-container" style={{ position: 'fixed', inset: 0, backgroundColor: '#f8fafc', zIndex: 3000, display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.4s ease-out' }}>
            <header className="wt-header">
                <div className="wt-header-left">
                    <button onClick={onClose} className="wt-back-btn">
                        <ArrowLeft size={16} /> 返回首页
                    </button>
                    <h1 className="wt-title">笔试模拟</h1>
                </div>
                <div className="wt-header-right">
                    <div className="wt-meta-text">{config.company} · {config.position}</div>
                    <div className="wt-timer">
                        剩余 {formatTime(remainingSec)}
                    </div>
                </div>
            </header>

            <main className="wt-main">
                <div className="wt-content-wrapper">
                    {currentQuestions.map((q, index) => {
                        // ==== 单选题 ====
                        if (q.type === 'choice') {
                            return (
                                <div key={q.id} className="wt-card">
                                    <div className="wt-q-header">
                                        <span className="wt-badge choice">选择题</span>
                                        <span className="wt-q-index">第 {index + 1} 题 / 共 {currentQuestions.length} 题</span>
                                    </div>
                                    <h3 className="wt-q-title">{q.title}</h3>

                                    <div className="wt-options-group">
                                        {q.options.map((opt: any) => {
                                            const isSelected = answers[q.id] === opt.id;
                                            const isCorrect = q.answer === opt.id;

                                            let labelClass = "wt-option-label";
                                            if (submitted) {
                                                labelClass += " disabled";
                                                if (isCorrect) labelClass += " correct";
                                                else if (isSelected && !isCorrect) labelClass += " wrong";
                                            } else if (isSelected) {
                                                labelClass += " selected";
                                            }

                                            return (
                                                <label key={opt.id} className={labelClass}>
                                                    <input
                                                        type="radio" name={q.id} value={opt.id}
                                                        checked={isSelected}
                                                        onChange={() => !submitted && setAnswers({ ...answers, [q.id]: opt.id })}
                                                        disabled={submitted}
                                                    />
                                                    <span className="wt-option-text">{opt.text}</span>
                                                </label>
                                            )
                                        })}
                                    </div>

                                    {submitted && (
                                        <div className={`wt-feedback-box ${answers[q.id] === q.answer ? 'correct' : 'wrong'}`}>
                                            <div className={`wt-feedback-title ${answers[q.id] === q.answer ? 'correct' : 'wrong'}`}>
                                                {answers[q.id] === q.answer ? '✅ 回答正确' : '❌ 回答错误'}
                                            </div>
                                            <div className="wt-feedback-desc">正确答案：{q.answer}。<br />{q.explanation}</div>
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        // ==== 填空题 ====
                        if (q.type === 'blank') {
                            const allCorrect = submitted && q.keys.every((k: string, i: number) => (answers[k] || '').trim().toLowerCase().includes((q.answers[i] as string).toLowerCase()));
                            return (
                                <div key={q.id} className="wt-card">
                                    <div className="wt-q-header">
                                        <span className="wt-badge blank">填空题</span>
                                        <span className="wt-q-index">第 {index + 1} 题 / 共 {currentQuestions.length} 题</span>
                                    </div>
                                    <h3 className="wt-q-title" style={{ lineHeight: 2.5 }}>
                                        {q.parts.map((part: string, idx: number) => {
                                            let inputClass = "wt-input-inline";
                                            if (submitted) inputClass += allCorrect ? " correct" : " wrong";
                                            return (
                                                <React.Fragment key={idx}>
                                                    {part}
                                                    {idx < q.keys.length && (
                                                        <input
                                                            type="text" className={inputClass}
                                                            value={answers[q.keys[idx]] || ''}
                                                            onChange={(e) => !submitted && setAnswers({ ...answers, [q.keys[idx]]: e.target.value })}
                                                            disabled={submitted} placeholder="请填写"
                                                        />
                                                    )}
                                                </React.Fragment>
                                            )
                                        })}
                                    </h3>
                                    {submitted && (
                                        <div className={`wt-feedback-box ${allCorrect ? 'correct' : 'wrong'}`}>
                                            <div className={`wt-feedback-title ${allCorrect ? 'correct' : 'wrong'}`}>
                                                {allCorrect ? '✅ 回答正确' : '❌ 回答有误'}
                                            </div>
                                            <div className="wt-feedback-desc">{q.explanation}</div>
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        // ==== 简答题 ====
                        if (q.type === 'text') {
                            const hasAns = (answers[q.id] || '').trim().length > 10;
                            let textClass = "wt-textarea";
                            if (submitted) textClass += hasAns ? " correct" : " wrong";

                            return (
                                <div key={q.id} className="wt-card">
                                    <div className="wt-q-header">
                                        <span className="wt-badge text">简答题</span>
                                        <span className="wt-q-index">第 {index + 1} 题 / 共 {currentQuestions.length} 题</span>
                                    </div>
                                    <h3 className="wt-q-title">{q.title}</h3>
                                    <textarea
                                        className={textClass}
                                        value={answers[q.id] || ''}
                                        onChange={(e) => !submitted && setAnswers({ ...answers, [q.id]: e.target.value })}
                                        disabled={submitted} placeholder="请输入您的答案..." rows={5}
                                    />
                                    {submitted && (
                                        <div className="wt-feedback-box info">
                                            <div className="wt-feedback-title info">参考答案解析</div>
                                            <div className="wt-feedback-desc">{q.explanation}</div>
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </main>

            <div className="wt-footer">
                {!submitted ? (
                    <button
                        className="wt-btn-primary"
                        onClick={() => { setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    >
                        提交试卷
                    </button>
                ) : (
                    <button
                        className="wt-btn-primary wt-btn-success"
                        onClick={onClose}
                    >
                        确认返回主页
                    </button>
                )}
            </div>
        </div>
    );
}