import { ArrowRight, CheckCircle, UserCircle, ChevronRight, FileText, Video, GitBranch, BarChart2, Monitor, Users, Building2, TrendingUp, Target, PhoneOff, Mic, UserCog, Code, Briefcase, Share2 } from 'lucide-react';

export default function Home() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white text-gray-900 antialiased">
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-gray-600">AI 数字考官现已上线</span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-light leading-tight tracking-tight">
                与 <span className="text-blue-500">AI 数字考官</span><br />
                进行全真面试模拟
              </h1>

              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                基于您的简历和目标公司定制个性化面试体验。支持视频面试、面对面面试、单对单、多对多等多种场景，让每一次练习都如临实战。
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-500 text-white px-8 py-3.5 rounded-full font-medium hover:bg-blue-600 transition-all flex items-center space-x-2 group">
                  <span>开始模拟面试</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white text-gray-900 border border-gray-200 px-8 py-3.5 rounded-full font-medium hover:border-gray-400 transition-all">
                  观看演示
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>实时交互</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>智能反馈</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>多场景支持</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Demo */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 text-center text-xs text-gray-400">AI Interview Room</div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg relative">
                      AI
                      <div className="pulse-ring absolute inset-0 bg-blue-400"></div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-none p-4">
                      <p className="text-sm text-gray-800">您好，我是今天的面试官。请简单介绍一下您自己，并说明为什么想加入字节跳动？</p>
                      <div className="mt-2 flex items-center space-x-2 text-xs text-gray-400">
                        <span>数字考官 · 技术总监</span>
                        <span>·</span>
                        <span>2分钟前</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 flex-row-reverse">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">👤</span>
                    </div>
                    <div className="flex-1 bg-gray-900 rounded-2xl rounded-tr-none p-4 text-white">
                      <p className="text-sm">您好，我毕业于清华大学计算机系，有3年后端开发经验。我选择字节是因为...</p>
                      <div className="mt-2 flex items-center justify-end space-x-2 text-xs text-gray-400">
                        <span>您 · 正在回答</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-400 flex items-center space-x-2">
                      <Mic className="w-4 h-4" />
                      <span>语音输入中...</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                      <PhoneOff className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 float-animation" style={{ animationDelay: '0s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">表现评分</div>
                    <div className="text-lg font-bold text-gray-900">92/100</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 float-animation" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">目标匹配度</div>
                    <div className="text-lg font-bold text-gray-900">字节跳动</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">快速开始您的面试准备</h2>
            <p className="text-gray-600">选择适合您的模拟模块，开启个性化面试训练</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Profile */}
            <div className="feature-card group cursor-pointer bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UserCog className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">资料完善</h3>
              <p className="text-sm text-gray-500 mb-4">上传简历，设置目标公司和岗位</p>
              <div className="flex items-center text-sm font-medium text-blue-500">
                <span>去完善</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Written Test */}
            <div className="feature-card group cursor-pointer bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">笔试模拟</h3>
              <p className="text-sm text-gray-500 mb-4">算法、行测、专业知识笔试练习</p>
              <div className="flex items-center text-sm font-medium text-purple-600">
                <span>开始笔试</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Interview */}
            <div className="feature-card group cursor-pointer bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-bl-lg">热门</div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">面试模拟</h3>
              <p className="text-sm text-gray-500 mb-4">与AI数字考官进行实时视频面试</p>
              <div className="flex items-center text-sm font-medium text-orange-600">
                <span>开始面试</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Full Process */}
            <div className="feature-card group cursor-pointer bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GitBranch className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">全流程模拟</h3>
              <p className="text-sm text-gray-500 mb-4">从笔试到终面的完整流程体验</p>
              <div className="flex items-center text-sm font-medium text-green-600">
                <span>全流程</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Feedback */}
            <div className="feature-card group cursor-pointer bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-300">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart2 className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">反馈指导</h3>
              <p className="text-sm text-gray-500 mb-4">查看历史表现与个性化改进建议</p>
              <div className="flex items-center text-sm font-medium text-pink-600">
                <span>查看报告</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Scenes */}
      <section id="scenes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">支持多种面试场景</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                无论您是准备线上视频面试、线下面对面交流，还是群面、压力面，我们的AI数字考官都能完美模拟真实场景，让您在任何环境下都能从容应对。
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Monitor className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">线上面试模拟</h4>
                    <p className="text-sm text-gray-500">模拟腾讯会议、钉钉、Zoom等视频面试环境</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">群面/无领导小组</h4>
                    <p className="text-sm text-gray-500">多考生同时参与，模拟真实群面竞争环境</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">多对一压力面</h4>
                    <p className="text-sm text-gray-500">多位考官连环提问，训练抗压能力</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                      <div className="text-xs text-gray-500">技术总监</div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                      <div className="text-xs text-gray-500">HRBP</div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-xl shadow-lg text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs opacity-70">面试房间</span>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    </div>
                    <div className="aspect-video bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-600">👤</span>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <Mic className="w-4 h-4" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <Video className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                      <div className="text-xs text-gray-500">部门经理</div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">模拟面试流程</h2>
            <p className="text-gray-600">四步开启您的个性化面试训练</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: 1, title: '完善资料', desc: '上传简历，选择目标公司和岗位，AI分析您的背景' },
              { num: 2, title: '场景选择', desc: '选择面试形式（视频/现场）、考官数量和面试轮次' },
              { num: 3, title: '实时模拟', desc: '与AI数字考官进行实时对话，体验真实面试流程' },
              { num: 4, title: '智能反馈', desc: '获取详细评分报告和个性化改进建议' },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
                {step.num < 4 && (
                  <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-gray-200 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Trust */}
      <section className="py-20 bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50万+</div>
              <div className="text-gray-400 text-sm">累计模拟面试次数</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-gray-400 text-sm">用户满意度</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-400 text-sm">覆盖目标公司</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-gray-400 text-sm">面试通过率提升</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">准备好迎接您的下一场面试了吗？</h2>
          <p className="text-lg text-gray-600 mb-8">立即开始免费体验，让AI数字考官助您一臂之力</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-500 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-600 transition-all flex items-center justify-center space-x-2">
              <span>免费开始模拟面试</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-full font-medium hover:border-gray-400 transition-all">
              联系销售团队
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <UserCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ExaminerAI</span>
              </div>
              <p className="text-sm text-gray-500">AI驱动的数字考官面试模拟平台</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">产品功能</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">面试模拟</a></li>
                <li><a href="#" className="hover:text-gray-900">笔试练习</a></li>
                <li><a href="#" className="hover:text-gray-900">全流程模拟</a></li>
                <li><a href="#" className="hover:text-gray-900">反馈报告</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">场景支持</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">视频面试</a></li>
                <li><a href="#" className="hover:text-gray-900">现场面试</a></li>
                <li><a href="#" className="hover:text-gray-900">群面模拟</a></li>
                <li><a href="#" className="hover:text-gray-900">压力面试</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">关于我们</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">公司介绍</a></li>
                <li><a href="#" className="hover:text-gray-900">联系我们</a></li>
                <li><a href="#" className="hover:text-gray-900">隐私政策</a></li>
                <li><a href="#" className="hover:text-gray-900">使用条款</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2026 ExaminerAI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Code className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <Briefcase className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}