import { useState, useEffect } from 'react'
import { X, Sparkles, Building, BarChart3, Users, ChevronRight, RefreshCw, Monitor, Server } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './InterviewModal.css'

type Props = {
    open: boolean
    onClose: () => void
}

export default function InterviewModal({ open, onClose }: Props) {
    const navigate = useNavigate()

    // 丰富的性格库
    const personalityPool = [
        { label: '专业严谨', color: '#3b82f6' }, { label: '亲和友善', color: '#10b981' },
        { label: '高压追问', color: '#ef4444' }, { label: '技术深挖', color: '#8b5cf6' },
        { label: '逻辑死磕', color: '#f59e0b' }, { label: '冷静客观', color: '#64748b' },
        { label: '职场老辣', color: '#ec4899' }, { label: '幽默风趣', color: '#06b6d4' },
        { label: '沉默寡言', color: '#475569' }, { label: '循循善诱', color: '#2dd4bf' },
        { label: '注重实践', color: '#f97316' }, { label: '学术派', color: '#6366f1' },
    ];

    const [form, setForm] = useState({
        company: '',
        position: '前端开发',
        level: '中等',
        count: 1,
        personalities: [] as typeof personalityPool, // 存储选中的性格对象
        duration: '30',
    })

    // 纯随机抽取 1-3 个性格的函数
    const generateRandomPersonalities = () => {
        const count = Math.floor(Math.random() * 3) + 1; // 随机 1-3
        const shuffled = [...personalityPool].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, count);
        setForm(prev => ({ ...prev, personalities: selected }));
    }

    // 初始打开时随机生成一次
    useEffect(() => {
        if (open) generateRandomPersonalities();
    }, [open]);

    if (!open) return null

    const startInterview = () => {
        onClose()
        // 传递性格标签数组
        const personalityLabels = form.personalities.map(p => p.label);
        navigate('/ai', { state: { config: { ...form, personalities: personalityLabels } } })
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div className="header-title">
                        <div className="title-icon"><Sparkles size={16} /></div>
                        <span>AI 面试实验室</span>
                    </div>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </div>

                <div className="modal-body">
                    {/* 岗位选择 */}
                    <div className="form-section full-width">
                        <h4 className="section-title"><Building size={13} /> 目标岗位</h4>
                        <div className="position-grid">
                            <input
                                className="company-input"
                                placeholder="拟申请公司"
                                value={form.company}
                                onChange={e => setForm({ ...form, company: e.target.value })}
                            />
                            <div className="position-selectors">
                                <div
                                    className={`pos-card ${form.position === '前端开发' ? 'active' : ''}`}
                                    onClick={() => setForm({ ...form, position: '前端开发' })}
                                >
                                    <Monitor size={14} /> 前端
                                </div>
                                <div
                                    className={`pos-card ${form.position === '后端开发' ? 'active' : ''}`}
                                    onClick={() => setForm({ ...form, position: '后端开发' })}
                                >
                                    <Server size={14} /> 后端
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 难度 */}
                    <div className="form-section full-width">
                        <h4 className="section-title"><BarChart3 size={13} /> 面试难度</h4>
                        <div className="radio-pill-group">
                            {['简单', '中等', '困难'].map(item => (
                                <label key={item} className={`radio-pill-item ${form.level === item ? 'active' : ''}`}>
                                    <input type="radio" checked={form.level === item} onChange={() => setForm({ ...form, level: item })} />
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 纯随机性格展示区 */}
                    <div className="form-section full-width">
                        <div className="section-header-flex">
                            <h4 className="section-title"><Users size={13} /> 面试官特质</h4>
                            <button className="random-refresh-btn" onClick={generateRandomPersonalities}>
                                <RefreshCw size={12} /> 随机抽取
                            </button>
                        </div>

                        <div className="random-personality-display">
                            {form.personalities.map((p, index) => (
                                <div
                                    key={index}
                                    className="personality-bubble"
                                    style={{ '--theme': p.color } as any}
                                >
                                    <span className="dot"></span>
                                    {p.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 数量与时长 */}
                    <div className="form-section">
                        <h4 className="section-title">考官数量</h4>
                        <div className="counter-input">
                            <button onClick={() => setForm({ ...form, count: Math.max(1, form.count - 1) })}>-</button>
                            <span>{form.count} 位</span>
                            <button onClick={() => setForm({ ...form, count: Math.min(3, form.count + 1) })}>+</button>
                        </div>
                    </div>

                    <div className="form-section">
                        <h4 className="section-title">预计时长</h4>
                        <div className="unit-input">
                            <input type="number" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
                            <span className="unit">min</span>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-primary-shine" onClick={startInterview}>
                        <span>立即进入面试</span>
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}