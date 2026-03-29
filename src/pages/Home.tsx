import { ArrowRight, CheckCircle, UserCircle, ChevronRight, FileText, Video, GitBranch, BarChart2, Monitor, Users, Building2, TrendingUp, Target, PhoneOff, Mic, UserCog, Code, Briefcase, Share2 } from 'lucide-react';
import './Home.css';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="hero-section">
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
              <button className="btn-primary">
                <span>开始模拟面试</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="btn-secondary">
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
          <div className="hero-demo">
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
                      <p>您好，我毕业于清华大学计算机系，有3年后端开发经验。我选择字节是因为...</p>
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
          <div className="feature-card">
            <div className="feature-icon blue">
              <UserCog className="w-6 h-6" />
            </div>
            <h3 className="feature-title">资料完善</h3>
            <p className="feature-desc">上传简历，设置目标公司和岗位</p>
            <div className="feature-link blue">
              <span>去完善</span>
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
            <button className="btn-primary">
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
    </div>
  );
}