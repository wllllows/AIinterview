import { useState } from 'react'
import {
    Mic,
    Video,
    ChevronRight,
    Timer,
    Clock,
    MessageSquare,
    Sparkles,
    Send,
    User
} from 'lucide-react'
import './index.css'

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
            content: '评分：8/10\n建议：可以更具体一些',
        }
        setRecords(prev => [...prev, scoreRecord])
    }

    return (
        <div className="interview-page">
            {/* 左侧：视频与输入 */}
            <main className="interview-main">
                <div className="video user-video">
                    <div className="video-placeholder">
                        <Video size={24} />
                        <span>用户视频</span>
                    </div>
                </div>

                <div className="video ai-video">
                    <div className="video-placeholder">
                        <Sparkles size={48} color="#60a5fa" />
                        <span>数字人面试官</span>
                    </div>
                </div>

                {/* 输入回答区 */}
                <div className="answer-box">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="在此输入你的回答..."
                    />
                    <button className="send-btn" onClick={submitAnswer}>
                        <Send size={18} />
                        提交回答
                    </button>
                </div>

                {/* 底部控制栏 */}
                <div className="control-bar">
                    <button className="icon-btn"><Mic size={18} /> 麦克风</button>
                    <button className="icon-btn"><Video size={18} /> 摄像头</button>
                    <button className="primary-btn" onClick={nextQuestion}>
                        下一题 <ChevronRight size={18} />
                    </button>
                </div>
            </main>

            {/* 右侧：记录流 */}
            <aside className="interview-sidebar">
                <div className="sidebar-header">
                    <div className="info-item"><Timer size={16} /> 00:00</div>
                    <div className="info-item"><Clock size={16} /> 实时</div>
                </div>

                <div className="record-list">
                    {records.map(item => (
                        <div key={item.id}>
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
                                        <Sparkles size={14} style={{ marginRight: 6 }} />
                                        {item.content}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    )
}