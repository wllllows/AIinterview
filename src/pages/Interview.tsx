import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Mic,
    MicOff,
    Pause,
    Play,
    Settings,
    X,
    Sparkles,
    User,
    Clock,
    PhoneOff, 
    Wifi,
    ClipboardCheck,
    ChevronDown
} from 'lucide-react';
import './Interview.css';
const mockRecords = [
    { id: 1, type: 'system', content: '14:00 面试正式开始，正在开启实时语音转写...' },
    { id: 2, type: 'ai', content: '你好，我是本次的 AI 面试官。很高兴认识你。我看过你的简历，你在上一家公司主导了后台管理系统的重构。为了让我们更好地开始，能不能用 2-3 分钟简单做一个自我介绍，并着重分享一个你觉得最有挑战的前端项目？' },
    { id: 3, type: 'user', content: '面试官你好。我叫张三，有三年的前端开发经验，技术栈主要是 React 和 TypeScript。在上一家公司，我印象最深的项目是把一个老旧的 Vue2 巨石应用迁移到了 React + Vite 的微前端架构。当时最大的挑战是新老系统需要并行跑大半年，期间还有状态共享和跨应用路由跳转的问题。' },
    {
        id: 301,
        type: 'score_trigger',
        score: '8.5',
        content: '表述清晰，能够快速切入核心项目难点（微前端重构）。技术栈（React+TS+Vite）匹配度高。'
    },
    { id: 4, type: 'ai', content: '微前端架构确实是一个很有挑战的方向。你刚刚提到新老系统并行期间的“状态共享”问题，能具体说说你们当时是怎么解决 Vue 应用和 React 应用之间的全局状态同步的吗？有没有遇到什么坑？' },
    { id: 5, type: 'user', content: '嗯，当时我们评估了几个方案。一开始想用 localStorage，但因为涉及到频繁的实时状态更新，性能不太理想。后来我们引入了 qiankun 框架，利用它的 initGlobalState API 在主应用维护了一套全局状态，然后在子应用通过 onGlobalStateChange 监听。遇到的坑主要是内存泄漏，子应用卸载时如果没有手动注销监听器会导致主应用卡顿。后来我们在 unmount 阶段封装了一个高阶组件统一清理。' },
    {
        id: 501,
        type: 'score_trigger',
        score: '9.2',
        content: '非常好。不仅给出了解决方案（qiankun全局状态），还主动谈到了遇到的坑（内存泄漏）和最终解法（高阶组件清理），体现了深度的工程实践经验。'
    },
    { id: 6, type: 'system', content: '⚠️ 网络轻微波动，已自动恢复并同步音频。' },
    { id: 7, type: 'ai', content: '非常清晰的解决思路，尤其是对生命周期清理的关注，这在微前端中确实很关键。那我们聊聊性能优化吧。假设现在有一个长列表页面，数据量有上万条，用户滚动时非常卡顿。但在不使用第三方库的前提下，你会如何设计一个虚拟列表（Virtual List）来解决这个问题？请描述一下核心思路。' },
    { id: 8, type: 'user', content: '自己实现的话，核心思路就是“只渲染可视区域内的 DOM 节点”。首先，用一个外层容器设置 overflow: auto 并监听 onScroll 事件。然后根据每行固定的高度，计算出总高度撑开滚动条。接着，在滚动事件中拿到当前的 scrollTop，算出当前可视区域的起始索引（startIndex）和结束索引（endIndex）。最后，利用绝对定位把真正渲染出来的这几十个 DOM 节点推到正确的位置上。' },
    {
        id: 801,
        type: 'score_trigger',
        score: '8.0',
        content: '核心思路正确（只渲染可视区、计算索引、绝对定位）。但忽略了“不定高度”这一常见复杂场景，回答略显模板化。'
    },
    { id: 9, type: 'ai', content: '回答得很好，基本抓住了虚拟滚动的核心原理。如果每行的高度是不固定的呢？你会怎么优化这个计算逻辑？' },
];

export default function Interview() {
    const [isPaused, setIsPaused] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [resolution, setResolution] = useState('1080p');
    const navigate = useNavigate();

    const [revealedScores, setRevealedScores] = useState<number[]>([]);

    const handleRevealScore = (id: number) => {
        if (!revealedScores.includes(id)) {
            setRevealedScores([...revealedScores, id]);
        }
    };

    const handleEndInterview = () => {
        if (window.confirm("确定要结束当前的面试并生成分析报告吗？")) {
            navigate('/interview/summary');
        }
    };
    useEffect(() => {
        document.body.style.backgroundColor = '#020617';
        return () => {
            document.body.style.backgroundColor = '#f4f6f9';
        };
    }, []);

    return (
        <div className="interview-page">

            {/* 左侧：视频与控制区 */}
            <main className="interview-main">
                <div className="video ai-video-full">

                    {/* 暂停状态遮罩 */}
                    {isPaused && (
                        <div className="pause-overlay">
                            <div className="pause-badge">面试已暂停</div>
                        </div>
                    )}

                    {/* AI 数字人占位 */}
                    <div className="video-placeholder ai-center">
                        <Sparkles size={64} color="#60a5fa" strokeWidth={1.5} />
                        <span className="ai-status-text">AI 面试官正在聆听...</span>
                    </div>

                    {/* 用户画面 (画中画) */}
                    <div className="video user-video-pip">
                        <User size={28} color="#cbd5e1" />
                        <span>我的镜头</span>
                    </div>

                    {/* 底部玻璃质感控制栏 (Dock) */}
                    <div className="floating-control-bar">
                        <button
                            className={`icon-btn ${!isMicOn ? 'muted' : ''}`}
                            onClick={() => setIsMicOn(!isMicOn)}
                            title={isMicOn ? "静音" : "开启麦克风"}
                        >
                            {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                        </button>

                        <button
                            className={`icon-btn ${isPaused ? 'active-orange' : ''}`}
                            onClick={() => setIsPaused(!isPaused)}
                            title={isPaused ? "继续" : "暂停"}
                        >
                            {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} />}
                        </button>

                        <button
                            className="icon-btn"
                            onClick={() => setShowSettings(!showSettings)}
                            title="设置"
                        >
                            <Settings size={20} />
                        </button>

                        <div className="control-divider"></div>

                        {/* 结束面试按钮 */}
                        <button className="danger-btn" onClick={handleEndInterview}>
                            <PhoneOff size={18} />
                            <span>结束面试</span>
                        </button>
                    </div>

                    {/* 设置小窗口 */}
                    {showSettings && (
                        <div className="settings-popover">
                            <div className="settings-header">
                                <span>音视频设置</span>
                                <X size={16} onClick={() => setShowSettings(false)} className="close-x" />
                            </div>
                            <div className="settings-body">
                                <div className="setting-item">
                                    <label>摄像头分辨率</label>
                                    <select value={resolution} onChange={(e) => setResolution(e.target.value)}>
                                        <option value="720p">720p (流畅)</option>
                                        <option value="1080p">1080p (高清)</option>
                                    </select>
                                </div>
                                <div className="setting-item">
                                    <label>麦克风降噪</label>
                                    <input type="checkbox" defaultChecked />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* 右侧：实时文字流区 */}
            <aside className="interview-sidebar">
                <div className="sidebar-header">
                    <div className="info-item">
                        <span className="recording-dot"></span>
                        <span>00:15:32</span>
                    </div>
                    <div className="info-item"><Clock size={16} /> 实时转写中</div>
                </div>

                <div className="record-list">
                    {mockRecords.map(item => (
                        <div key={item.id} className={`record-wrapper ${item.type}`}>

                            {/* 系统提示信息 */}
                            {item.type === 'system' && (
                                <div className="system-message">
                                    {item.content.includes('网络') ? <Wifi size={14} /> : <Clock size={14} />}
                                    <span>{item.content}</span>
                                </div>
                            )}

                            {/* AI 提问 */}
                            {item.type === 'ai' && (
                                <div className="record-item ai">
                                    <div className="label"><Sparkles size={12} /> AI 面试官</div>
                                    <div className="content">{item.content}</div>
                                </div>
                            )}

                            {/* 用户回答 */}
                            {item.type === 'user' && (
                                <div className="record-item user">
                                    <div className="label"><User size={12} /> 张三 (你)</div>
                                    <div className="content">{item.content}</div>
                                </div>
                            )}
                            {item.type === 'score_trigger' && (
                                <div className="score-reveal-container">
                                    {!revealedScores.includes(item.id) ? (
                                        <button
                                            className="btn-reveal-score"
                                            onClick={() => handleRevealScore(item.id)}
                                        >
                                            <Sparkles size={14} />
                                            <span>查看本轮评价</span>
                                            <ChevronDown size={14} />
                                        </button>
                                    ) : (
                                        <div className="record-item analysis">
                                            <div className="analysis-header">
                                                <ClipboardCheck size={16} />
                                                <span>AI 实时评估</span>
                                                <span className="score-badge">{item.score} 分</span>
                                            </div>
                                            <div className="analysis-content">
                                                {item.content}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* 模拟正在输入/思考的动画 */}
                    <div className="record-wrapper user">
                        <div className="record-item user">
                            <div className="label"><User size={12} /> 张三 (你)</div>
                            <div className="content typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}