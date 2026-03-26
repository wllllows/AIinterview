import { useState } from 'react'
import {
    Mic,
    ChevronRight,
    Timer,
    Clock,
    MessageSquare,
    Sparkles,
    Send,
    User,
    Pause,     // 新增
    Play,      // 新增
    Settings,  // 新增
    X          // 新增
} from 'lucide-react'
import './index.css'

// ... RecordItem 类型定义和 questions 保持不变 ...
type RecordItem = {
    id: number
    type: 'ai' | 'user' | 'action' | 'score'
    content?: string
}

const questions = [
    '请介绍一下你自己',
    'React 的生命周期有哪些？',
    '什么是闭包？',
]

export default function Interview() {
    const [records, setRecords] = useState<RecordItem[]>([])
    const [currentQ, setCurrentQ] = useState(0)
    const [input, setInput] = useState('')
    
    // --- 新增状态 ---
    const [isPaused, setIsPaused] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [resolution, setResolution] = useState('1080p')

    const nextQuestion = () => {
        if (currentQ >= questions.length) return
        const newRecord: RecordItem = {
            id: Date.now(),
            type: 'ai',
            content: questions[currentQ],
        }
        setRecords(prev => [...prev, newRecord])
        setCurrentQ(prev => prev + 1)
    }

    const submitAnswer = () => {
        if (!input.trim()) return
        const userRecord: RecordItem = {
            id: Date.now(),
            type: 'user',
            content: input,
        }
        const actionRecord: RecordItem = {
            id: Date.now() + 1,
            type: 'action',
        }
        setRecords(prev => [...prev, userRecord, actionRecord])
        setInput('')
    }

    const getScore = () => {
        const scoreRecord: RecordItem = {
            id: Date.now(),
            type: 'score',
            content: '评分：8.5/10\n建议：逻辑清晰，可以结合具体业务场景再深入阐述。',
        }
        setRecords(prev => [...prev, scoreRecord])
    }

    return (
        <div className="interview-page">
            <main className="interview-main">
                <div className="video ai-video-full">
                    
                    {/* 暂停状态遮罩 */}
                    {isPaused && (
                        <div className="pause-overlay">
                            <div className="pause-badge">已暂停</div>
                        </div>
                    )}

                    <div className="video-placeholder ai-center">
                        <Sparkles size={56} color="#60a5fa" />
                        <span>数字人面试官</span>
                    </div>

                    <div className="video user-video-pip">
                        <User size={24} color="#94a3b8" />
                        <span>用户视频</span>
                    </div>

                    {/* 悬浮控制栏 */}
                    <div className="floating-control-bar">
                        <button className="icon-btn" title="麦克风"><Mic size={20} /></button>
                        
                        {/* 替换：摄像头 -> 暂停/继续 */}
                        <button 
                            className={`icon-btn ${isPaused ? 'active-orange' : ''}`} 
                            onClick={() => setIsPaused(!isPaused)}
                            title={isPaused ? "继续" : "暂停"}
                        >
                            {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} />}
                        </button>

                        <button className="primary-btn" onClick={nextQuestion}>
                            <span>下一题</span>
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    {/* 新增：右侧设置按钮 */}
                    <button 
                        className="settings-trigger" 
                        onClick={() => setShowSettings(true)}
                    >
                        <Settings size={20} />
                    </button>

                    {/* 新增：设置小窗口 */}
                    {showSettings && (
                        <div className="settings-popover">
                            <div className="settings-header">
                                <span>视频设置</span>
                                <X size={16} onClick={() => setShowSettings(false)} className="close-x" />
                            </div>
                            <div className="settings-body">
                                <div className="setting-item">
                                    <label>分辨率</label>
                                    <select value={resolution} onChange={(e) => setResolution(e.target.value)}>
                                        <option value="720p">720p (标准)</option>
                                        <option value="1080p">1080p (高清)</option>
                                        <option value="2k">2k (超清)</option>
                                    </select>
                                </div>
                                <div className="setting-item">
                                    <label>美颜强度</label>
                                    <input type="range" />
                                </div>
                                <div className="setting-item">
                                    <label>背景虚化</label>
                                    <input type="checkbox" checked />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <aside className="interview-sidebar">
                <div className="sidebar-header">
                    <div className="info-item"><Timer size={16} /> {isPaused ? '已暂停' : '00:00'}</div>
                    <div className="info-item"><Clock size={16} /> 实时转写</div>
                </div>

                <div className="record-list">
                    {records.map(item => (
                        <div key={item.id} className={`record-wrapper ${item.type}`}>
                            {item.type === 'ai' && (
                                <div className="record-item ai">
                                    <div className="label"><Sparkles size={12} /> AI 面试官</div>
                                    <div className="content">{item.content}</div>
                                </div>
                            )}
                            {item.type === 'user' && (
                                <div className="record-item user">
                                    <div className="label"><User size={12} /> 你</div>
                                    <div className="content">{item.content}</div>
                                </div>
                            )}
                            {item.type === 'action' && (
                                <div className="record-item action">
                                    <button className="score-btn" onClick={getScore}>
                                        <MessageSquare size={14} /> 获取评分
                                    </button>
                                </div>
                            )}
                            {item.type === 'score' && (
                                <div className="record-item score">
                                    <div className="content">
                                        <Sparkles size={14} style={{ marginRight: 6, flexShrink: 0 }} />
                                        <span>{item.content}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {records.length === 0 && (
                        <div className="empty-state">点击“下一题”开始面试模拟</div>
                    )}
                </div>

                <div className="sidebar-input">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="模拟语音转写文字..."
                        onKeyDown={(e) => e.key === 'Enter' && submitAnswer()}
                    />
                    <button className="send-btn" onClick={submitAnswer} disabled={!input.trim()}>
                        <Send size={16} />
                    </button>
                </div>
            </aside>
        </div>
    )
}