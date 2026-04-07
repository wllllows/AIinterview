import { useState, useRef } from 'react';
import { ArrowRight, CheckCircle, UserCircle, ChevronRight, FileText, Video, GitBranch, BarChart2, Monitor, Users, Building2, TrendingUp, Target, PhoneOff, Mic, UserCog, Code, Briefcase, Share2, Upload, ArrowLeft, X } from 'lucide-react';
import './Home.css';

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    age: '',
    city: '',
    education: 'bachelor',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleGoToProfile = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentView('profile');
      setIsAnimating(false);
      window.scrollTo(0, 0);
    }, 50);
  };

  const handleBackToHome = (scrollToFeatures = false) => {
    setIsAnimating(true);
    // 先启动画（页面左滑）
    setTimeout(() => {
      setCurrentView('home');
      // 动画完成后重置状态
      setTimeout(() => {
        setIsAnimating(false);
        // 如果需要，滚动到功能区域
        if (scrollToFeatures) {
          setTimeout(() => {
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
          }, 100);
        }
      }, 500);
    }, 50);
  };

  const handleSubmit = () => {
    setShowSuccessModal(true);
    setProfileCompleted(true);
    // 1.5秒后关闭弹窗并返回首页，同时滚动到功能区域
    setTimeout(() => {
      setShowSuccessModal(false);
      handleBackToHome(true); // true 表示返回后滚动到功能区域
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div className="home-container" style={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="hero-section" style={{ position: 'relative' }}>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-pulse">
                <span></span>
                <span></span>
              </span>
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
                    const targetY = target.offsetTop - 80; // 预留 header 空间
                    const startY = window.scrollY;
                    const distance = targetY - startY;
                    const duration = 800; // 动画时长 ms
                    const startTime = performance.now();
                    
                    // ease-out-cubic 缓动函数
                    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                    
                    const scroll = (currentTime: number) => {
                      const elapsed = currentTime - startTime;
                      const progress = Math.min(elapsed / duration, 1);
                      const eased = easeOutCubic(progress);
                      
                      window.scrollTo(0, startY + distance * eased);
                      
                      if (progress < 1) {
                        requestAnimationFrame(scroll);
                      }
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
                  // 自动播放视频
                  setTimeout(() => {
                    videoRef.current?.play();
                  }, 600);
                }}
              >
                观看演示
              </button>
            </div>

            <div className="hero-features">
              <div className="feature-item">
                <CheckCircle className="feature-icon" />
                <span>实时交互</span>
              </div>
              <div className="feature-item">
                <CheckCircle className="feature-icon" />
                <span>智能反馈</span>
              </div>
              <div className="feature-item">
                <CheckCircle className="feature-icon" />
                <span>多场景支持</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Demo */}
          <div 
            className="hero-demo"
            style={{
              transform: showVideo ? 'translateY(-120%)' : 'translateY(0)',
              opacity: showVideo ? 0 : 1,
              transition: 'transform 600ms cubic-bezier(0.33, 1, 0.68, 1), opacity 400ms ease-out',
            }}
          >
            <div className="demo-card">
              <div className="demo-header">
                <div className="traffic-lights">
                  <div className="traffic-light light-red"></div>
                  <div className="traffic-light light-yellow"></div>
                  <div className="traffic-light light-green"></div>
                </div>
                <div className="demo-title">AI Interview Room</div>
              </div>
              <div className="demo-body">
                <div className="msg-group">
                  <div className="msg-avatar ai">
                    AI
                    <div className="pulse-ring"></div>
                  </div>
                  <div className="msg-content">
                    <div className="msg-bubble ai">
                      <p>您好，我是今天的面试官。请简单介绍一下您自己，并说明为什么想加入字节跳动？</p>
                    </div>
                    <div className="msg-meta">
                      <span>数字考官 · 技术总监</span>
                      <span>·</span>
                      <span>2分钟前</span>
                    </div>
                  </div>
                </div>

                <div className="msg-group user">
                  <div className="msg-avatar user">👤</div>
                  <div className="msg-content">
                    <div className="msg-bubble user">
                      <p>您好，我毕业于杭州电子科技大学计算机系，有3年后端开发经验。我选择字节是因为...</p>
                    </div>
                    <div className="msg-meta user">
                      <span>您 · 正在回答</span>
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-field">
                    <Mic className="mic-icon" />
                    <span>语音输入中...</span>
                  </div>
                  <button className="end-btn">
                    <PhoneOff className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="float-card">
              <div className="float-icon green">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="float-content">
                <div className="float-label">表现评分</div>
                <div className="float-value">92/100</div>
              </div>
            </div>

            <div className="float-card">
              <div className="float-icon" style={{ backgroundColor: '#f3e8ff' }}>
                <Target className="w-5 h-5" style={{ color: '#a855f7' }} />
              </div>
              <div className="float-content">
                <div className="float-label">目标匹配度</div>
                <div className="float-value">字节跳动</div>
              </div>
            </div>
          </div>

          {/* 视频展示区 - 从底部滑入 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '20px 40px 20px 20px',
              transform: showVideo ? 'translateY(0)' : 'translateY(120%)',
              opacity: showVideo ? 1 : 0,
              transition: 'transform 600ms cubic-bezier(0.33, 1, 0.68, 1) 200ms, opacity 400ms ease-out 300ms',
              pointerEvents: showVideo ? 'auto' : 'none',
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              backgroundColor: '#000',
            }}>
              {/* 关闭按钮 */}
              <button
                onClick={() => {
                  setShowVideo(false);
                  videoRef.current?.pause();
                }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  zIndex: 10,
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'}
              >
                <X size={20} />
              </button>
              
              <video
                ref={videoRef}
                src="/src/assets/introduce_video.mp4"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
                controls
                playsInline
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Features */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">快速开始您的面试准备</h2>
          <p className="section-subtitle">选择适合您的模拟模块，开启个性化面试训练</p>
        </div>

        <div className="features-grid">
          {/* Profile */}
          <div className="feature-card" onClick={handleGoToProfile} style={{ cursor: 'pointer', position: 'relative' }}>
            {profileCompleted && (
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                backgroundColor: '#dcfce7',
                color: '#16a34a',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '20px',
                border: '1px solid #86efac',
              }}>
                <CheckCircle size={12} />
                已完成<br />下一步👉
              </div>
            )}
            <div className="feature-icon blue">
              <UserCog className="w-6 h-6" />
            </div>
            <h3 className="feature-title">资料完善</h3>
            <p className="feature-desc">上传简历，设置目标公司和岗位</p>
            <div className="feature-link blue">
              <span>{profileCompleted ? '查看/修改' : '去完善'}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Written Test */}
          <div className="feature-card">
            <div className="feature-icon purple">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="feature-title">笔试模拟</h3>
            <p className="feature-desc">算法、行测、专业知识笔试练习</p>
            <div className="feature-link purple">
              <span>开始笔试</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Interview */}
          <div className="feature-card hot">
            <div className="hot-badge">热门</div>
            <div className="feature-icon orange">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="feature-title">面试模拟</h3>
            <p className="feature-desc">与AI数字考官进行实时视频面试</p>
            <div className="feature-link orange">
              <span>开始面试</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Full Process */}
          <div className="feature-card">
            <div className="feature-icon green">
              <GitBranch className="w-6 h-6" />
            </div>
            <h3 className="feature-title">全流程模拟</h3>
            <p className="feature-desc">从笔试到终面的完整流程体验</p>
            <div className="feature-link green">
              <span>全流程</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Feedback */}
          <div className="feature-card">
            <div className="feature-icon pink">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="feature-title">反馈指导</h3>
            <p className="feature-desc">查看历史表现与个性化改进建议</p>
            <div className="feature-link pink">
              <span>查看报告</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Interview Scenes */}
      <section id="scenes" className="scenes-section">
        <div className="scenes-container">
          <div className="scenes-content">
            <h2>支持多种面试场景</h2>
            <p>
              无论您是准备线上视频面试、线下面对面交流，还是群面、压力面，我们的AI数字考官都能完美模拟真实场景，让您在任何环境下都能从容应对。
            </p>

            <div className="scenes-list">
              <div className="scene-item">
                <div className="scene-icon blue">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="scene-title">线上面试模拟</h4>
                  <p className="scene-desc">模拟腾讯会议、钉钉、Zoom等视频面试环境</p>
                </div>
              </div>

              <div className="scene-item">
                <div className="scene-icon green">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="scene-title">群面/无领导小组</h4>
                  <p className="scene-desc">多考生同时参与，模拟真实群面竞争环境</p>
                </div>
              </div>

              <div className="scene-item">
                <div className="scene-icon purple">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="scene-title">多对一压力面</h4>
                  <p className="scene-desc">多位考官连环提问，训练抗压能力</p>
                </div>
              </div>
            </div>
          </div>

          <div className="scenes-demo">
            <div className="demo-group-1">
              <div className="demo-card-small">
                <div className="demo-person">
                  <div className="demo-avatar"></div>
                  <div className="demo-person-info">
                    <div className="demo-person-name">技术总监</div>
                  </div>
                </div>
                <div className="demo-line"></div>
              </div>
              <div className="demo-card-small">
                <div className="demo-person">
                  <div className="demo-avatar"></div>
                  <div className="demo-person-info">
                    <div className="demo-person-name">HRBP</div>
                  </div>
                </div>
                <div className="demo-line" style={{ width: '50%' }}></div>
              </div>
            </div>
            <div className="demo-group-2">
              <div className="demo-card-main">
                <div className="demo-card-main-header">
                  <span>面试房间</span>
                  <div className="Status-indicator">
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="demo-card-video">👤</div>
                <div className="demo-card-controls">
                  <div className="demo-control-btn">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div className="demo-control-btn">
                    <Video className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="demo-card-small">
                <div className="demo-person">
                  <div className="demo-avatar"></div>
                  <div className="demo-person-info">
                    <div className="demo-person-name">部门经理</div>
                  </div>
                </div>
                <div className="demo-line" style={{ width: '66%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="process" className="process-section">
        <div className="process-container">
          <div className="section-header">
            <h2 className="section-title">模拟面试流程</h2>
            <p className="section-subtitle">四步开启您的个性化面试训练</p>
          </div>

          <div className="process-steps">
            {[
              { num: 1, title: '完善资料', desc: '上传简历，选择目标公司和岗位，AI分析您的背景' },
              { num: 2, title: '场景选择', desc: '选择面试形式（视频/现场）、考官数量和面试轮次' },
              { num: 3, title: '实时模拟', desc: '与AI数字考官进行实时对话，体验真实面试流程' },
              { num: 4, title: '智能反馈', desc: '获取详细评分报告和个性化改进建议' },
            ].map((step) => (
              <div key={step.num} className="process-step">
                <div className="step-number">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Trust */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>50万+</h3>
            <p>累计模拟面试次数</p>
          </div>
          <div className="stat-item">
            <h3>98%</h3>
            <p>用户满意度</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>覆盖目标公司</p>
          </div>
          <div className="stat-item">
            <h3>85%</h3>
            <p>面试通过率提升</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">准备好迎接您的下一场面试了吗？</h2>
          <p className="cta-subtitle">立即开始免费体验，让AI数字考官助您一臂之力</p>
          <div className="cta-buttons">
            <button 
              className="btn-primary"
              onClick={() => {
                const target = document.getElementById('features');
                if (target) {
                  const targetY = target.offsetTop - 80;
                  const startY = window.scrollY;
                  const distance = targetY - startY;
                  const duration = 1000; // 向上滚动稍慢一点更有质感
                  const startTime = performance.now();
                  
                  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                  
                  const scroll = (currentTime: number) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = easeOutCubic(progress);
                    
                    window.scrollTo(0, startY + distance * eased);
                    
                    if (progress < 1) {
                      requestAnimationFrame(scroll);
                    }
                  };
                  
                  requestAnimationFrame(scroll);
                }
              }}
            >
              <span>免费开始模拟面试</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn-secondary">
              联系销售团队
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <UserCircle className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold">ExaminerAI</span>
              </div>
              <p className="text-sm" style={{ color: '#6b7280' }}>AI驱动的数字考官面试模拟平台</p>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">产品功能</h4>
              <ul className="space-y-2">
                <li><a href="#" className="footer-link">面试模拟</a></li>
                <li><a href="#" className="footer-link">笔试练习</a></li>
                <li><a href="#" className="footer-link">全流程模拟</a></li>
                <li><a href="#" className="footer-link">反馈报告</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">场景支持</h4>
              <ul className="space-y-2">
                <li><a href="#" className="footer-link">视频面试</a></li>
                <li><a href="#" className="footer-link">现场面试</a></li>
                <li><a href="#" className="footer-link">群面模拟</a></li>
                <li><a href="#" className="footer-link">压力面试</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">关于我们</h4>
              <ul className="space-y-2">
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
              <a href="#" className="footer-social-link">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="footer-social-link">
                <Code className="w-5 h-5" />
              </a>
              <a href="#" className="footer-social-link">
                <Briefcase className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* 资料完善页面 - 滑动进入 */}
      <div 
        className={`profile-page ${currentView === 'profile' ? 'profile-page-active' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f8fafc',
          zIndex: 100,
          transform: currentView === 'profile' 
            ? 'translateX(0)' 
            : 'translateX(100%)',
          transition: isAnimating 
            ? 'transform 500ms cubic-bezier(0.33, 1, 0.68, 1)' 
            : 'none',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <header style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <button 
              onClick={() => handleBackToHome()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: '#fff',
                color: '#64748b',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
                e.currentTarget.style.color = '#334155';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              <ArrowLeft size={18} />
              返回主页面
            </button>
            <h1 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#1e293b',
            }}>完善个人资料</h1>
            <div style={{ width: '100px' }} />
          </div>
        </header>

        {/* Form Content */}
        <main style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '32px 24px 80px',
        }}>
          {/* Resume Upload Section */}
          <section style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#1e293b',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Upload size={18} style={{ color: '#3b82f6' }} />
              简历上传
            </h2>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '12px',
                padding: '40px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: uploadedFile ? '#eff6ff' : '#f8fafc',
                borderColor: uploadedFile ? '#3b82f6' : '#cbd5e1',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.backgroundColor = '#eff6ff';
              }}
              onMouseLeave={(e) => {
                if (!uploadedFile) {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }
              }}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
              />
              <Upload size={32} style={{ 
                color: uploadedFile ? '#3b82f6' : '#94a3b8',
                marginBottom: '12px' 
              }} />
              {uploadedFile ? (
                <div>
                  <p style={{ color: '#3b82f6', fontWeight: 500 }}>{uploadedFile.name}</p>
                  <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>
                    点击重新上传
                  </p>
                </div>
              ) : (
                <>
                  <p style={{ color: '#334155', fontWeight: 500, marginBottom: '4px' }}>
                    点击或拖拽上传简历
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                    支持 PDF、Word 格式，大小不超过 10MB
                  </p>
                </>
              )}
            </div>
          </section>

          {/* Basic Info Section */}
          <section style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#1e293b',
              marginBottom: '20px',
            }}>基本信息</h2>

            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '6px',
                }}>
                  姓名 <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="请输入您的真实姓名"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Gender & Age */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '6px',
                  }}>
                    性别 <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {[
                      { value: 'male', label: '男' },
                      { value: 'female', label: '女' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '12px',
                          border: `1px solid ${formData.gender === option.value ? '#3b82f6' : '#e2e8f0'}`,
                          borderRadius: '10px',
                          cursor: 'pointer',
                          backgroundColor: formData.gender === option.value ? '#eff6ff' : '#fff',
                          color: formData.gender === option.value ? '#3b82f6' : '#64748b',
                          fontSize: '14px',
                          transition: 'all 0.2s',
                        }}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option.value}
                          checked={formData.gender === option.value}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          style={{ display: 'none' }}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '6px',
                  }}>
                    年龄 <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="请输入年龄"
                    min="18"
                    max="60"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                      outline: 'none',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '6px',
                }}>
                  城市 <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="例如：北京、上海、深圳"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Education */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '6px',
                }}>
                  学历 <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                    outline: 'none',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                >
                  <option value="highschool">高中及以下</option>
                  <option value="college">大专</option>
                  <option value="bachelor">本科</option>
                  <option value="master">硕士</option>
                  <option value="phd">博士</option>
                </select>
              </div>
            </div>
          </section>

          {/* Submit Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            position: 'sticky',
            bottom: 20,
            backgroundColor: '#f8fafc',
            padding: '16px 0',
          }}>
            <button
              onClick={() => handleBackToHome()}
              style={{
                flex: 1,
                padding: '14px 24px',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                backgroundColor: '#fff',
                color: '#64748b',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
                e.currentTarget.style.color = '#334155';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              style={{
                flex: 2,
                padding: '14px 24px',
                border: 'none',
                borderRadius: '10px',
                backgroundColor: '#3b82f6',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              确认提交
            </button>
          </div>
        </main>

        {/* 成功提交弹窗 */}
        {showSuccessModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 200,
            animation: 'fadeIn 0.3s ease-out',
          }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '40px 48px',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              maxWidth: '360px',
              width: '90%',
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <CheckCircle size={36} style={{ color: '#16a34a' }} />
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#1e293b',
                marginBottom: '8px',
              }}>
                提交成功！
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                marginBottom: '24px',
              }}>
                您的资料已成功保存
              </p>
              <div style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#e2e8f0',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  backgroundColor: '#3b82f6',
                  borderRadius: '2px',
                  animation: 'progress 1.5s ease-out forwards',
                }} />
              </div>
            </div>
          </div>
        )}

        {/* 弹窗动画样式 */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          @keyframes progress {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
}