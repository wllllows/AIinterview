import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    { id: 2, type: 'ai', content: '聊Spring。你简历写"精通Spring Boot"，这个"精通"怎么定义？' },
    { id: 3, type: 'user', content: '可能用词有点过，是熟练应用级别。理解自动配置原理，能自定义starter' },
    {
        id: 301,
        type: 'score_trigger',
        score: '8.5',
        content: '表述清晰，能够快速切入核心。对主要区别阐述到位，体现了扎实的知识。'
    },
    { id: 4, type: 'ai', content: '那我问个简单的。Spring Bean默认单例，多线程安全吗？' },
    { id: 5, type: 'user', content: '不安全。单例是容器级单例，如果Bean有成员变量状态，并发修改会出问题。' },
    {
        id: 501,
        type: 'score_trigger',
        score: '9.2',
        content: '非常好。不仅给出了解决方案（qiankun全局状态），还主动谈到了遇到的坑（内存泄漏）和最终解法（高阶组件清理），体现了深度的工程实践经验。'
    },
    { id: 6, type: 'system', content: '⚠️ 网络轻微波动，已自动恢复并同步音频。' },
    { id: 7, type: 'ai', content: '项目用Nacos做注册中心，如果Nacos挂了，服务还能调用吗？' },
    { id: 8, type: 'user', content: '能，客户端有本地缓存。Nacos挂了后，Consumer用本地缓存的实例列表继续调用，只是不能感知新服务上线或下线。但缓存会过期，长时间挂的话需要兜底方案，比如静态IP列表或降级。' },
    {
        id: 801,
        type: 'score_trigger',
        score: '8.0',
        content: '核心思路正确（只渲染可视区、计算索引、绝对定位）。但忽略了“不定高度”这一常见复杂场景，回答略显模板化。'
    },
    { id: 9, type: 'ai', content: '你们怎么保证缓存一致性？Nacos恢复后数据乱了怎么办？' },
];

export default function Interview() {
    const [isPaused, setIsPaused] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [resolution, setResolution] = useState('1080p');
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);
    const [embedLoading, setEmbedLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const incomingMode = location.state?.config?.interviewMode;
    const initialMode: 'offline' | 'online-pc' | 'online-mobile' =
        incomingMode === 'offline' ? 'offline' : 'online-pc';
    const [deviceMode, setDeviceMode] = useState(initialMode);

    useEffect(() => {
        fetch('http://localhost:3000/api/create-embed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(data => {
                if (data.success && data.url) {
                    setEmbedUrl(data.url);
                } else {
                    console.error('Failed to create embed:', data);
                }
            })
            .catch(err => console.error('Embed fetch error:', err))
            .finally(() => setEmbedLoading(false));
    }, []);

    const [revealedScores, setRevealedScores] = useState<number[]>([]);

    // 模拟倒计时：从 00:15:32 开始
    const TOTAL_SECONDS = 15 * 60 + 32; // 932
    const [remainingSeconds, setRemainingSeconds] = useState(TOTAL_SECONDS);

    useEffect(() => {
        if (remainingSeconds <= 0) return;
        const timer = setInterval(() => {
            setRemainingSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (totalSec: number) => {
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

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
        // 确保页面底层背景为纯黑，防止信箱模式漏出其他颜色
        document.body.style.backgroundColor = '#000';
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

                    {/* LiveAvatar 数字人 */}
                    {embedLoading ? (
                        <div className="video-placeholder ai-center">
                            <Sparkles size={64} color="#60a5fa" strokeWidth={1.5} />
                            <span className="ai-status-text">AI 面试官正在加载中...</span>
                        </div>
                    ) : embedUrl ? (
                        <iframe
                            src={embedUrl}
                            allow="microphone; camera; autoplay; fullscreen"
                            title="LiveAvatar AI Interviewer"
                            referrerPolicy="no-referrer-when-downgrade"
                            loading="eager"
                            // 🌟 修复点：移除 aspectRatio: '16/9'，让视频完全铺满容器高度
                            style={{ width: '100%', height: '100%', border: 'none', objectFit: 'cover' }}
                        />
                    ) : (
                        <div className="video-placeholder ai-center">
                            <Sparkles size={64} color="#ef4444" strokeWidth={1.5} />
                            <span className="ai-status-text">数字人加载失败，请刷新重试</span>
                        </div>
                    )}

                    {/* 纯绿色背景层 */}
                    <div className="green-screen-layer" />

                    {deviceMode !== 'offline' && (
                        <div className={`video user-video-pip ${deviceMode === 'online-mobile' ? 'user-video-pip--mobile' : ''}`}>
                            <User size={28} color="#cbd5e1" />
                            <span>我的镜头</span>
                        </div>
                    )}

                    {deviceMode !== 'offline' && (
                        <div className={`floating-control-bar ${deviceMode === 'online-mobile' ? 'floating-control-bar--mobile' : ''}`}>
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
                    )}

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
                        <span>{formatTime(remainingSeconds)}</span>
                    </div>
                    <select
                        className="mode-select"
                        value={deviceMode}
                        onChange={(e) => setDeviceMode(e.target.value as 'offline' | 'online-pc' | 'online-mobile')}
                    >
                        <option value="offline">线下面试</option>
                        <option value="online-pc">线上电脑端</option>
                        <option value="online-mobile">线上手机端</option>
                    </select>
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