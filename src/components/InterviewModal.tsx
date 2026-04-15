import { useState, useEffect } from 'react'
import { X, Sparkles, Building, BarChart3, Users, ChevronRight, RefreshCw, Briefcase, FileText, Clock, Target } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './InterviewModal.css'

type Props = {
    open: boolean
    onClose: () => void
}

export default function InterviewModal({ open, onClose }: Props) {
    const navigate = useNavigate()

    const companyList = [
        '通用科技公司', '字节跳动', '腾讯', '阿里巴巴', '美团',
    ];

    const personalityPool = [
        { label: '专业严谨', color: '#3b82f6' }, { label: '亲和友善', color: '#10b981' },
        { label: '高压追问', color: '#ef4444' }, { label: '技术深挖', color: '#8b5cf6' },
        { label: '逻辑死磕', color: '#f59e0b' }, { label: '冷静客观', color: '#64748b' },
        { label: '职场老辣', color: '#ec4899' }, { label: '幽默风趣', color: '#06b6d4' },
        { label: '沉默寡言', color: '#475569' }, { label: '循循善诱', color: '#2dd4bf' },
        { label: '注重实践', color: '#f97316' }, { label: '学术派', color: '#6366f1' },
    ];

    // 🌟 核心升级：数据结构完全贴合真实的面试业务流
    const [form, setForm] = useState({
        company: companyList[0],
        position: '前端开发工程师', // 改为自由输入，支持更细分的岗位
        level: '初中级 (1-3年)',   // 目标职级
        round: '专业技术面',       // 面试轮次
        useSystemResume: true,    // 是否关联系统简历
        jdText: '',               // 目标岗位的 JD
        personalities: [] as typeof personalityPool,
        duration: '30',           // 15, 30, 45 分钟
    })

    // 选中特质 (限制最多选 2 个，保证 AI 人设不精神分裂)
    const togglePersonality = (p: typeof personalityPool[0]) => {
        setForm(prev => {
            const isSelected = prev.personalities.some(item => item.label === p.label);
            if (isSelected) {
                return { ...prev, personalities: prev.personalities.filter(item => item.label !== p.label) };
            } else {
                if (prev.personalities.length >= 2) return prev;
                return { ...prev, personalities: [...prev.personalities, p] };
            }
        });
    }

    // 随机抽取 1-2 个特质
    const generateRandomPersonalities = () => {
        const count = Math.floor(Math.random() * 2) + 1;
        const shuffled = [...personalityPool].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, count);
        setForm(prev => ({ ...prev, personalities: selected }));
    }

    useEffect(() => {
        if (open) generateRandomPersonalities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    if (!open) return null

    const startInterview = () => {
        if (form.personalities.length === 0) generateRandomPersonalities();

        onClose()
        const personalityLabels = form.personalities.map(p => p.label);
        navigate('/interview/start', {
            state: { config: { ...form, personalities: personalityLabels } }
        })
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-title">
                        <div className="title-icon"><Sparkles size={16} /></div>
                        <span>AI 模拟面试</span>
                    </div>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </div>

                <div className="modal-body">

                    {/* === 1. 目标定位 (公司 + 细分岗位) === */}
                    <div className="form-section full-width">
                        <h4 className="section-title"><Building size={13} /> 目标定位</h4>
                        <div className="position-grid">
                            <div className="company-select-wrapper" style={{ flex: 1 }}>
                                <select
                                    className="company-select"
                                    value={form.company}
                                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                                >
                                    {companyList.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div style={{ flex: 1.5 }}>
                                <input
                                    type="text"
                                    className="position-input"
                                    value={form.position}
                                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                                    placeholder="输入具体岗位 (如: React资深开发)"
                                />
                            </div>
                        </div>
                    </div>

                    {/* === 2. 面试维度 (职级 + 轮次) === */}
                    <div className="form-section">
                        <h4 className="section-title"><BarChart3 size={13} /> 目标职级</h4>
                        <div className="radio-pill-group vertical">
                            {['实习/校招', '初中级 (1-3年)', '资深/专家'].map(item => (
                                <label key={item} className={`radio-pill-item ${form.level === item ? 'active' : ''}`}>
                                    <input type="radio" checked={form.level === item} onChange={() => setForm({ ...form, level: item })} />
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <h4 className="section-title"><Target size={13} /> 面试轮次</h4>
                        <div className="radio-pill-group vertical">
                            {['专业技术面', '项目/架构面', '综合/HR面'].map(item => (
                                <label key={item} className={`radio-pill-item ${form.round === item ? 'active' : ''}`}>
                                    <input type="radio" checked={form.round === item} onChange={() => setForm({ ...form, round: item })} />
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* === 3. 背景材料 (AI 提问的灵魂) === */}
                    <div className="form-section full-width bg-material-box">
                        <div className="section-header-flex">
                            <h4 className="section-title"><FileText size={13} /> 面试背景材料</h4>
                            <label className="switch-wrapper">
                                <span className="switch-label">关联系统个人档案</span>
                                <div className={`switch ${form.useSystemResume ? 'active' : ''}`}>
                                    <input type="checkbox" checked={form.useSystemResume} onChange={(e) => setForm({ ...form, useSystemResume: e.target.checked })} hidden />
                                </div>
                            </label>
                        </div>
                        <textarea
                            className="jd-textarea"
                            placeholder="选填：粘贴目标岗位的 JD (职位描述)，AI 将基于此进行定向提问，极大提升模拟真实度..."
                            value={form.jdText}
                            onChange={e => setForm({ ...form, jdText: e.target.value })}
                        />
                    </div>

                    {/* === 4. 面试官设定 === */}
                    <div className="form-section full-width">
                        <div className="section-header-flex">
                            <h4 className="section-title">
                                <Users size={13} /> 考官特质 <span style={{ fontSize: '11px', fontWeight: 'normal', opacity: 0.6 }}>(最多2项)</span>
                            </h4>
                            <button className="random-refresh-btn" onClick={generateRandomPersonalities}>
                                <RefreshCw size={12} /> 随机抽取
                            </button>
                        </div>

                        <div className="personality-pool-grid">
                            {personalityPool.map((p) => {
                                const isSelected = form.personalities.some(item => item.label === p.label);
                                return (
                                    <div
                                        key={p.label}
                                        className={`pool-badge ${isSelected ? 'selected' : ''}`}
                                        style={{ '--theme': p.color } as any}
                                        onClick={() => togglePersonality(p)}
                                    >
                                        {isSelected && <span className="dot"></span>}
                                        {p.label}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* === 5. 时长设置 === */}
                    <div className="form-section full-width">
                        <h4 className="section-title"><Clock size={13} /> 预计时长</h4>
                        <div className="radio-pill-group">
                            {[
                                { val: '15', label: '15分钟 (快速热身)' },
                                { val: '30', label: '30分钟 (标准单面)' },
                                { val: '45', label: '45分钟 (深度考察)' }
                            ].map(item => (
                                <label key={item.val} className={`radio-pill-item ${form.duration === item.val ? 'active' : ''}`}>
                                    <input type="radio" checked={form.duration === item.val} onChange={() => setForm({ ...form, duration: item.val })} />
                                    <span>{item.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-primary-shine" onClick={startInterview}>
                        <span>生成考场并进入面试</span>
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}