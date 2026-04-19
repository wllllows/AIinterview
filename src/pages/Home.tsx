import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, UserCircle, ChevronRight, FileText, Video,
  Monitor, Users, Building2, TrendingUp, Target, PhoneOff,
  Mic, UserCog, Code, Briefcase, Share2, X, LineChart, MicOff
} from 'lucide-react';
import './Home.css';

// 🌟 1. 引入独立的子生态模块
import InterviewModal from '../components/InterviewModal';
import WrittenTest from '../components/WrittenTest'; // 这个组件现在自带了配置弹窗和考试界面！

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasScrolledRef = useRef(false);

  // --- 页面锚点滚动控制 ---
  useEffect(() => {
    if (hasScrolledRef.current) return;
    const shouldScroll = location.state?.scrollToFeatures || window.location.hash === '#features';
    if (shouldScroll) {
      hasScrolledRef.current = true;
      setTimeout(() => {
        const target = document.getElementById('features');
        if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }, 450);
    }
  }, [location]);

  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- 🌟 2. 调度控制台 ---
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showWrittenTest, setShowWrittenTest] = useState(false); // 控制整个笔试生命周期

  return (
    <>
      <div id="home-app-root" className="home-container">

        {/* ================= Hero Section ================= */}
        <section className="hero-gradient">
          <div className="hero-section" style={{ position: 'relative' }}>
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-pulse"><span></span><span></span></span>
                <span className="badge-text">AI 数字考官现已上线</span>
              </div>

              <h1 className="hero-title">
                与 <span className="hero-title-highlight">AI 数字考官</span><br />
                进行全真面试模拟
              </h1>

              <p className="hero-description">
                基于您的简历和目标公司定制个性化面试体验。支持视频面试、面对面面试、单对单、多对多等多种场景，让每一次练习都如临实战。
              </p>

              <div className="hero-buttons">
                <button
                  className="btn-primary"
                  onClick={() => {
                    const target = document.getElementById('features');
                    if (target) {
                      const targetY = target.offsetTop - 80;
                      const startY = window.scrollY;
                      const distance = targetY - startY;
                      const duration = 800;
                      const startTime = performance.now();
                      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                      const scroll = (currentTime: number) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        window.scrollTo(0, startY + distance * easeOutCubic(progress));
                        if (progress < 1) requestAnimationFrame(scroll);
                      };
                      requestAnimationFrame(scroll);
                    }
                  }}
                >
                  <span>开始模拟面试</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setShowVideo(true);
                    setTimeout(() => videoRef.current?.play(), 600);
                  }}
                >
                  观看演示
                </button>
              </div>

              <div className="hero-features">
                <div className="feature-item"><CheckCircle className="feature-icon" /><span>实时交互</span></div>
                <div className="feature-item"><CheckCircle className="feature-icon" /><span>智能反馈</span></div>
                <div className="feature-item"><CheckCircle className="feature-icon" /><span>多场景支持</span></div>
              </div>
            </div>

            <div className="hero-demo" style={{
              transform: showVideo ? 'translateY(-120%)' : 'translateY(0)', opacity: showVideo ? 0 : 1,
              transition: 'transform 600ms cubic-bezier(0.33, 1, 0.68, 1), opacity 400ms ease-out',
            }}>
              <div className="demo-card">
                <div className="demo-header">
                  <div className="traffic-lights"><div className="traffic-light light-red"></div><div className="traffic-light light-yellow"></div><div className="traffic-light light-green"></div></div>
                  <div className="demo-title">AI Interview Room</div>
                </div>
                <div className="demo-body">
                  <div className="msg-group">
                    <div className="msg-avatar ai">AI<div className="pulse-ring"></div></div>
                    <div className="msg-content">
                      <div className="msg-bubble ai"><p>您好，我是今天的面试官。请简单介绍一下您自己，并说明为什么想加入字节跳动？</p></div>
                      <div className="msg-meta"><span>数字考官 · 技术总监</span><span>·</span><span>2分钟前</span></div>
                    </div>
                  </div>
                  <div className="msg-group user">
                    <div className="msg-avatar user">👤</div>
                    <div className="msg-content">
                      <div className="msg-bubble user"><p>您好，我毕业于计算机系，有3年后端开发经验。我选择字节是因为...</p></div>
                      <div className="msg-meta user"><span>您 · 正在回答</span></div>
                    </div>
                  </div>
                  <div className="input-group">
                    <div className="input-field"><Mic className="mic-icon" /><span>语音输入中...</span></div>
                    <button className="end-btn"><PhoneOff className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
              <div className="float-card">
                <div className="float-icon green"><TrendingUp className="w-5 h-5 text-green-600" /></div>
                <div className="float-content"><div className="float-label">表现评分</div><div className="float-value">92/100</div></div>
              </div>
              <div className="float-card">
                <div className="float-icon" style={{ backgroundColor: '#f3e8ff' }}><Target className="w-5 h-5" style={{ color: '#a855f7' }} /></div>
                <div className="float-content"><div className="float-label">目标匹配度</div><div className="float-value">字节跳动</div></div>
              </div>
            </div>

            <div style={{
              position: 'absolute', top: 0, left: '50%', right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
              padding: '20px 40px 20px 20px', transform: showVideo ? 'translateY(0)' : 'translateY(120%)', opacity: showVideo ? 1 : 0,
              transition: 'transform 600ms cubic-bezier(0.33, 1, 0.68, 1) 200ms, opacity 400ms ease-out 300ms', pointerEvents: showVideo ? 'auto' : 'none',
            }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '640px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', backgroundColor: '#000', }}>
                <button onClick={() => { setShowVideo(false); videoRef.current?.pause(); }} style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, width: '36px', height: '36px', borderRadius: '50%', border: 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s', }}><X size={20} /></button>
                <video ref={videoRef} src="/src/assets/introduce_video.mp4" style={{ width: '100%', height: 'auto', display: 'block', }} controls playsInline />
              </div>
            </div>
          </div>
        </section>

        {/* --- 核心训练模块 --- */}
        <section id="features" className="features-section">
          <div className="section-header">
            <h2 className="section-title">核心训练模块</h2>
            <p className="section-subtitle">选择适合您的模拟模块，全方位补齐短板</p>
          </div>

          <div className="features-grid">
            <div className="feature-card" onClick={() => navigate('/app/profile?tab=resume')} style={{ cursor: 'pointer' }}>
              <div className="feature-icon blue"><UserCog className="w-6 h-6" /></div>
              <h3 className="feature-title">资料完善</h3>
              <p className="feature-desc">上传简历，设置目标公司和岗位</p>
              <div className="feature-link blue"><span>去完善</span><ChevronRight className="w-4 h-4" /></div>
            </div>

            {/* 🌟 触发独立的笔试组件生命周期 */}
            <div className="feature-card" onClick={() => setShowWrittenTest(true)} style={{ cursor: 'pointer' }}>
              <div className="feature-icon purple"><FileText className="w-6 h-6" /></div>
              <h3 className="feature-title">笔试模拟</h3>
              <p className="feature-desc">算法、行测、专业知识笔试练习</p>
              <div className="feature-link purple"><span>开始笔试</span><ChevronRight className="w-4 h-4" /></div>
            </div>

            {/* 🌟 触发独立面试弹窗 */}
            <div className="feature-card hot" onClick={() => setShowInterviewModal(true)} style={{ cursor: 'pointer' }}>
              <div className="hot-badge">热门</div>
              <div className="feature-icon orange"><Video className="w-6 h-6" /></div>
              <h3 className="feature-title">面试模拟</h3>
              <p className="feature-desc">与AI数字考官进行实时视频面试</p>
              <div className="feature-link orange"><span>开始面试</span><ChevronRight className="w-4 h-4" /></div>
            </div>

            <div className="feature-card" onClick={() => navigate('/app/profile?tab=insight')} style={{ cursor: 'pointer' }}>
              <div className="feature-icon pink"><LineChart className="w-6 h-6" /></div>
              <h3 className="feature-title">能力洞察</h3>
              <p className="feature-desc">基于底层训练数据，生成您的多维能力雷达</p>
              <div className="feature-link pink"><span>查看看板</span><ChevronRight className="w-4 h-4" /></div>
            </div>
          </div>
        </section>

        {/* --- 面试场景展示区 --- */}
        <section id="scenes" className="scenes-section">
          <div className="scenes-container">
            <div className="scenes-content">
              <h2 className="scenes-title">支持多种面试场景</h2>
              <p className="scenes-desc">无论您是准备线上视频面试、线下面对面交流，还是群面、压力面，我们的AI数字考官都能完美模拟真实场景，让您在任何环境下都能从容应对。</p>
              <div className="scenes-list">
                <div className="scene-item">
                  <div className="scene-icon blue"><Monitor className="w-5 h-5" /></div>
                  <div className="scene-text-box"><h4 className="scene-title">线上面试模拟</h4><p className="scene-desc">模拟腾讯会议、钉钉、Zoom等环境</p></div>
                </div>
                <div className="scene-item">
                  <div className="scene-icon green"><Users className="w-5 h-5" /></div>
                  <div className="scene-text-box"><h4 className="scene-title">群面/无领导小组</h4><p className="scene-desc">多考生同时参与，模拟真实竞争环境</p></div>
                </div>
                <div className="scene-item">
                  <div className="scene-icon purple"><Building2 className="w-5 h-5" /></div>
                  <div className="scene-text-box"><h4 className="scene-title">多对一压力面</h4><p className="scene-desc">多位考官连环提问，训练抗压能力</p></div>
                </div>
              </div>
            </div>

            <div className="scenes-demo">
              <div className="demo-group-1">
                <div className="demo-card-small">
                  <div className="scene-avatar-layout">
                    <div className="avatar-circle" style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', color: '#2563eb' }}>总监</div>
                    <div className="avatar-info">
                      <div className="avatar-name">技术总监</div>
                      <div className="avatar-status green"><span className="status-dot"></span>在线聆听中</div>
                    </div>
                    <div className="avatar-action"><Mic size={14} /></div>
                  </div>
                </div>
                <div className="demo-card-small">
                  <div className="scene-avatar-layout">
                    <div className="avatar-circle" style={{ background: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)', color: '#9333ea' }}>HR</div>
                    <div className="avatar-info">
                      <div className="avatar-name">资深 HRBP</div>
                      <div className="avatar-status gray"><MicOff size={10} style={{ marginRight: '2px' }} /> 旁听状态</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="demo-group-2">
                <div className="demo-card-main">
                  <div className="demo-card-main-header">
                    <span>面试房间</span>
                    <div className="Status-indicator"><span></span><span></span></div>
                  </div>
                  <div className="demo-card-video">
                    <div style={{ textAlign: 'center', opacity: 0.5 }}>
                      <UserCircle size={48} style={{ margin: '0 auto 8px auto' }} />
                      <div style={{ fontSize: '12px' }}>摄像头已开启</div>
                    </div>
                  </div>
                  <div className="demo-card-controls">
                    <div className="demo-control-btn"><Mic className="w-4 h-4" /></div>
                    <div className="demo-control-btn"><Video className="w-4 h-4" /></div>
                  </div>
                </div>
                <div className="demo-card-small">
                  <div className="scene-avatar-layout">
                    <div className="avatar-circle" style={{ background: 'linear-gradient(135deg, #ffedd5, #fed7aa)', color: '#ea580c' }}>经理</div>
                    <div className="avatar-info">
                      <div className="avatar-name">部门经理</div>
                      <div className="avatar-status orange"><span className="status-dot" style={{ backgroundColor: '#f97316' }}></span>正在提问...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 数据背书 --- */}
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-card">
              <h3 className="stat-num">50万+</h3>
              <p className="stat-text">累计模拟面试次数</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-num">98%</h3>
              <p className="stat-text">用户满意度</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-num">500+</h3>
              <p className="stat-text">覆盖目标公司</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-num">85%</h3>
              <p className="stat-text">面试通过率提升</p>
            </div>
          </div>
        </section>

        {/* --- CTA & Footer --- */}
        <section className="cta-section">
          <div className="cta-container">
            <h2 className="cta-title">准备好迎接您的下一场面试了吗？</h2>
            <p className="cta-subtitle">立即开始免费体验，让AI数字考官助您一臂之力</p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span>免费开始模拟面试</span><ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary">联系销售团队</button>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-container">
            <div className="footer-grid">
              <div className="footer-section">
                <div className="footer-logo">
                  <div className="footer-logo-icon"><UserCircle className="w-5 h-5" /></div>
                  <span className="footer-logo-text">ExaminerAI</span>
                </div>
                <p className="footer-desc">AI驱动的数字考官面试模拟平台</p>
              </div>
              <div className="footer-section">
                <h4 className="footer-title">产品功能</h4>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">面试模拟</a></li>
                  <li><a href="#" className="footer-link">笔试练习</a></li>
                  <li><a href="#" className="footer-link">能力洞察</a></li>
                  <li><a href="#" className="footer-link">错题复盘</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4 className="footer-title">场景支持</h4>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">视频面试</a></li>
                  <li><a href="#" className="footer-link">现场面试</a></li>
                  <li><a href="#" className="footer-link">群面模拟</a></li>
                  <li><a href="#" className="footer-link">压力面试</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4 className="footer-title">关于我们</h4>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">公司介绍</a></li>
                  <li><a href="#" className="footer-link">联系我们</a></li>
                  <li><a href="#" className="footer-link">隐私政策</a></li>
                  <li><a href="#" className="footer-link">使用条款</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-divider">
              <p className="footer-copyright">© 2026 ExaminerAI. All rights reserved.</p>
              <div className="footer-social">
                <a href="#" className="footer-social-link"><Share2 className="w-5 h-5" /></a>
                <a href="#" className="footer-social-link"><Code className="w-5 h-5" /></a>
                <a href="#" className="footer-social-link"><Briefcase className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ================= 🌟 3. 外部独立生态组件区 ================= */}

      <InterviewModal
        open={showInterviewModal}
        onClose={() => setShowInterviewModal(false)}
      />

      {showWrittenTest && (
        <WrittenTest
          onClose={() => setShowWrittenTest(false)}
        />
      )}
    </>
  );
}