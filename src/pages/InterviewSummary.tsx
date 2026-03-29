import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom'; // 引入跳转
import './InterviewSummary.css';

const radarData = [
    { subject: '专业知识', score: 85, fullMark: 100 },
    { subject: '面试策略', score: 70, fullMark: 100 },
    { subject: '态度软实力', score: 95, fullMark: 100 },
    { subject: '基础表现', score: 88, fullMark: 100 },
    { subject: '语言表达', score: 92, fullMark: 100 },
];

export default function InterviewSummary() {
    const navigate = useNavigate();

    return (
        <div className="summary-page">

            <header className="summary-header">
                <button className="back-home-btn" onClick={() => navigate('/')}>
                    <ChevronLeft size={18} />
                    <span>返回首页</span>
                </button>
            </header>

            <div className="summary-layout">

                <div className="summary-column summary-left fade-in">
                    <div className="score-header">
                        <span className="score-title">面试总得分</span>
                        <span className="score-number">95</span>
                    </div>

                    <div className="radar-chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="summary-list-section">
                        <h3 className="list-title">面试亮点</h3>
                        <ul className="custom-list highlight">
                            <li>专业基础扎实，能够清晰阐述底层逻辑。</li>
                            <li>沟通表达流畅，面对压力问题不怯场。</li>
                            <li>对公司业务有提前调研，态度积极。</li>
                        </ul>
                    </div>
                </div>

                {/* 右侧：复盘报告区 */}
                <div className="summary-column summary-right fade-in">
                    <div className="summary-list-section">
                        <h3 className="list-title">可改进的地方</h3>
                        <ul className="custom-list improve">
                            <li>部分算法题解题思路不够优化，需要补充时间复杂度分析。</li>
                            <li>对于过往项目的难点挖掘不够深，显得过于平铺直叙。</li>
                            <li>提问环节的问题略显宽泛，可以更聚焦于团队核心业务。</li>
                            <li>面试后半程语速偏快，需要注意节奏控制。</li>
                        </ul>
                    </div>

                    <div className="summary-list-section">
                        <h3 className="list-title">会议纪要</h3>
                        <ul className="custom-list meeting">
                            <li>一面面试官主要考察了 React 原理和网络协议。</li>
                            <li>二面将侧重于架构设计和项目实战经验。</li>
                            <li>HR 确认了目前的薪资期望和最快到岗时间。</li>
                            <li>需要在一周内补充一份过往的开源项目代码样例。</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="summary-actions">
                <button className="btn-ai-chat" onClick={() => navigate('/interview/review')}>
                    <Sparkles size={18} className="ai-icon" />
                    <span>与 AI 深度复盘</span>
                    <ChevronRight size={18} />
                </button>
            </div>

        </div>
    );
}