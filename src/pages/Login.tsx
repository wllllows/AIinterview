// Login.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        // Navigation scroll effect
        const nav = document.getElementById('login-nav');
        const floatingNav = document.getElementById('login-floating-nav');
        
        const handleNavScroll = () => {
            if (window.scrollY > 100) {
                nav?.classList.add('login-scrolled');
                floatingNav?.classList.add('login-visible');
            } else {
                nav?.classList.remove('login-scrolled');
                floatingNav?.classList.remove('login-visible');
            }
        };

        window.addEventListener('scroll', handleNavScroll);

        // Easing function for smooth scroll (ease-out cubic)
        function easeOutCubic(t: number): number {
            return 1 - Math.pow(1 - t, 3);
        }

        // Custom smooth scroll with easing
        function smoothScrollTo(targetY: number, duration = 4000) {
            const startY = window.pageYOffset;
            const distance = targetY - startY;
            const startTime = Date.now();

            function scroll() {
                const currentTime = Date.now() - startTime;
                const progress = Math.min(currentTime / duration, 1);
                const ease = easeOutCubic(progress);
                window.scrollTo(0, startY + distance * ease);

                if (progress < 1) {
                    requestAnimationFrame(scroll);
                }
            }

            requestAnimationFrame(scroll);
        }

        // Hero CTA button - scroll to bottom with easing
        const heroCtaBtn = document.querySelector('.login-hero-cta-btn');
        if (heroCtaBtn) {
            heroCtaBtn.addEventListener('click', function(e: Event) {
                e.preventDefault();
                const footer = document.getElementById('where');
                if (footer) {
                    const footerTop = footer.offsetTop;
                    smoothScrollTo(footerTop, 4000);
                }
            });
        }

        // Scroll reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('login-active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.login-reveal').forEach(el => observer.observe(el));

        // Parallax effect for floating images
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.login-floating-image');
            
            parallaxElements.forEach((el, index) => {
                const speed = 0.3 + (index * 0.05);
                const yPos = -(scrolled * speed);
                const rotation = index % 2 === 0 ? -3 : 3;
                (el as HTMLElement).style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
            });
        };

        window.addEventListener('scroll', handleParallax);

        // Smooth scroll for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        const handleAnchorClick = (e: Event) => {
            const target = e.target as HTMLAnchorElement;
            const href = target.getAttribute('href');
            
            // Skip hero-cta-btn as it has its own handler
            if (target.classList.contains('login-hero-cta-btn')) {
                return;
            }
            
            if (href) {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        };

        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', handleAnchorClick);
        });

        // Video thumbnail play button
        const videoThumb = document.querySelector('.login-video-thumb') as HTMLElement;
        if (videoThumb) {
            videoThumb.addEventListener('click', function() {
                alert('视频播放器将在此处打开');
            });
        }

        return () => {
            window.removeEventListener('scroll', handleNavScroll);
            window.removeEventListener('scroll', handleParallax);
            anchorLinks.forEach(anchor => {
                anchor.removeEventListener('click', handleAnchorClick);
            });
            observer.disconnect();
            if (heroCtaBtn) {
                heroCtaBtn.removeEventListener('click', handleAnchorClick);
            }
            if (videoThumb) {
                videoThumb.removeEventListener('click', handleAnchorClick);
            }
        };
    }, [navigate]);

    const handleFooterCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // 滚动到顶部后再导航
        window.scrollTo(0, 0);
        navigate('/app');
    };

    const handleHeroCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // 平滑滚动到页面底部
        const footer = document.getElementById('where');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleMenu = () => {
        const menu = document.getElementById('login-mobile-menu');
        menu?.classList.toggle('login-open');
    };

    return (
        <div className="login-container">
            {/* Navigation */}
            <nav className="login-nav" id="login-nav">
                <div className="login-nav-left">
                    <a href="#philosophy">模拟场景</a>
                    <a href="#bottle">数字人技术</a>
                    <a href="#vodka">面试模拟</a>
                    <a href="#seltzers">笔试模拟</a>
                </div>
                <div className="login-nav-center">
                    <div className="login-logo">智面AI<br/>面试平台</div>
                </div>
                <div className="login-nav-right">
                    <a href="#mocktails">全流程模拟</a>
                    <a href="#creators">面试社区</a>
                    <a href="#where">立即体验</a>
                    <a href="#" onClick={() => toggleMenu()}>中文</a>
                </div>
            </nav>

            {/* Floating Nav Pill */}
            <div className="login-floating-nav" id="login-floating-nav">
                <a href="#where">立即体验</a>
                <div className="login-menu-btn" onClick={toggleMenu}>
                    <span>菜单栏</span>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="login-mobile-menu" id="login-mobile-menu">
                <div className="login-close-menu" onClick={toggleMenu}>✕</div>
                <a href="#philosophy" onClick={toggleMenu}>模拟场景</a>
                <a href="#bottle" onClick={toggleMenu}>数字人技术</a>
                <a href="#vodka" onClick={toggleMenu}>面试模拟</a>
                <a href="#seltzers" onClick={toggleMenu}>笔试模拟</a>
                <a href="#mocktails" onClick={toggleMenu}>全流程模拟</a>
                <a href="#where" onClick={toggleMenu}>立即体验</a>
            </div>

            {/* Hero Section */}
            <section className="login-hero">
                <img src="/src/assets/img/marble.jpg" alt="面试演示" className="login-hero-video"/>
                <div className="login-hero-overlay"></div>
                <div className="login-hero-content">
                    <h1 className="login-hero-title">AI数字人面试官<br/><span>全真模拟</span>每一次面试</h1>
                </div>
                <div className="login-hero-bottom">
                    <div className="login-video-thumb">
                        <span className="login-video-label">观看演示</span>
                        <img src="/src/assets/img/film-thumb.jpg" alt="演示缩略图"/>
                        <span className="login-play-btn">(播放) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2分26秒</span>
                    </div>
                    <div className="login-hero-text">
                        <p>无论是线上视频面试还是线下面对面，单考官或多考官场景，智面AI都能为您还原最真实的面试体验，助您从容应对每一次挑战。</p>
                        <a href="#philosophy">了解模拟场景</a>
                    </div>
                </div>
                <a href="#where" onClick={handleHeroCtaClick} className="login-hero-cta-btn">立即开始</a>
            </section>

            {/* Philosophy Section */}
            <section className="login-philosophy" id="philosophy">
                <div className="login-topo-bg"></div>
                <div className="login-container-inner">
                    <div className="login-philosophy-content">
                        <div className="login-floating-image login-reveal">
                            <img src="/src/assets/img/marble.jpg" alt="线上面试场景"/>
                        </div>
                        <div className="login-philosophy-text login-reveal">
                            <h2>全场景覆盖，<span>无限接近真实</span>的面试体验</h2>
                            <p>支持多种面试场景<br/><br/>
                            线上面试模拟：视频通话界面、网络延迟模拟、突发状况应对。线下面试模拟：会议室场景、等候区体验、多轮次面试流程。单对一、单对多、多对一、多对多，任意组合灵活配置。</p>
                        </div>
                        <div className="login-floating-image login-right login-reveal">
                            <img src="/src/assets/img/copper.jpg" alt="线下面试场景"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Water Section */}
            <section className="login-water-section">
                <div className="login-container-inner">
                    <div className="login-water-content">
                        <div className="login-floating-image login-reveal">
                            <img src="/src/assets/img/winter-river.jpg" alt="科技背景"/>
                        </div>
                        <div className="login-water-text login-reveal">
                            <h2>智能数字人<span>实时交互</span>根据您的回答<span>动态调整</span>面试问题</h2>
                            <div className="login-water-desc">
                                <h3>核心技术优势</h3>
                                <p>基于大语言模型与多模态交互技术，数字人面试官能够实时理解您的回答内容、语气、表情，并据此进行追问、质疑或转换话题，模拟真实面试官的思维逻辑与互动方式。</p>
                            </div>
                        </div>
                        <div className="login-floating-image login-right login-reveal">
                            <img src="/src/assets/img/snowy-landscape.jpg" alt="AI技术"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nature Section */}
            <section className="login-nature-section">
                <div className="login-arch-shape"></div>
                <div className="login-container-inner">
                    <div className="login-nature-grid">
                        <div className="login-nature-item login-reveal">
                            <img src="/src/assets/img/dining.jpg" alt="个性化定制"/>
                            <p>根据您的简历与目标公司，定制专属面试体验</p>
                        </div>
                        <div className="login-nature-item login-reveal" style={{marginTop: '4rem'}}>
                            <div style={{background: 'var(--color-white)', padding: '4rem 2rem', border: '2px solid var(--color-blue)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <h3 style={{fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontStyle: 'italic', textAlign: 'center', color: 'var(--color-blue)'}}>千人千面，每一次模拟都是为您量身打造</h3>
                            </div>
                        </div>
                        <div className="login-nature-item login-reveal">
                            <img src="/src/assets/img/bottle-yellow.jpg" alt="实时反馈"/>
                            <p>面试结束后即时生成详细反馈报告与改进建议</p>
                        </div>
                    </div>
                    <div style={{textAlign: 'center', marginTop: '4rem'}}>
                        <img src="/src/assets/img/ice-texture.jpg" alt="数据分析" style={{border: '2px solid var(--color-blue)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', maxWidth: '300px', display: 'inline-block'}}/>
                        <p style={{marginTop: '1rem', fontSize: '0.85rem', letterSpacing: '0.05em', fontWeight: '500', background: 'var(--color-blue)', color: 'var(--color-white)', padding: '1rem', display: 'inline-block'}}>从回答内容到肢体语言，全方位评估您的面试表现</p>
                    </div>
                </div>
            </section>

            {/* Bottle Section */}
            <section className="login-bottle-section" id="bottle">
                <div className="login-container-inner">
                    <div className="login-bottle-container">
                        <div className="login-bottle-text login-reveal">
                            <h2>数字人面试官<span>核心技术</span>解析</h2>
                            
                            <h3 style={{marginTop: '3rem'}}>形象生成</h3>
                            <h2 style={{fontSize: '1.8rem'}}>多维度形象定制</h2>
                            <p>根据目标公司行业特性、职位级别、企业文化，生成相匹配的面试官形象。科技公司 casual 风格，投行正装严肃，国企稳重正式，形象随心而变。</p>
                            
                            <h3 style={{marginTop: '2rem'}}>语言理解</h3>
                            <h2 style={{fontSize: '1.8rem'}}>深度语义<span>实时解析</span></h2>
                            <p>不仅听懂您说了什么，更理解您想表达什么。识别回答中的逻辑漏洞、亮点突出、经验匹配度，并据此进行针对性追问。</p>
                            
                            <h3 style={{marginTop: '2rem'}}>情感计算</h3>
                            <h2 style={{fontSize: '1.8rem'}}>微表情与语气识别</h2>
                            <p>通过计算机视觉技术分析您的面部表情、眼神接触、姿态语言，结合语音语调，评估自信度与专业度。</p>
                            
                            <h3 style={{marginTop: '2rem'}}>知识图谱</h3>
                            <h2 style={{fontSize: '1.8rem'}}>行业知识<span>即时调用</span></h2>
                            <p>内置各行业专业知识库，技术面试中的算法细节，产品面试中的业务逻辑，财务面试中的报表分析，无所不包。</p>
                        </div>
                        <div className="login-bottle-image login-reveal">
                            <img src="/src/assets/img/bottle-main.png" alt="数字人面试官"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vodka Section */}
            <section className="login-products-section" id="vodka">
                <div className="login-container-inner">
                    <div className="login-section-header login-reveal">
                        <h2>面试模拟</h2>
                        <p>单面模拟 · 群面模拟 · 压力面模拟 · 案例面模拟</p>
                    </div>
                    <div className="login-product-grid">
                        <div className="login-product-card login-reveal">
                            <img src="/src/assets/img/vodka-bottle.jpg" alt="面试模拟界面"/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem'}}>
                            <h3 style={{fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--color-black)'}}>全真面试模拟</h3>
                            <p style={{fontSize: '1rem', color: 'var(--color-red)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600'}}>还原度99%的面试体验</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seltzers Section */}
            <section className="login-seltzers-section" id="seltzers">
                <div className="login-container-inner">
                    <div className="login-section-header login-reveal">
                        <h2>笔试模拟</h2>
                        <p>行测题库 · 专业笔试 · 编程算法 · 限时挑战</p>
                    </div>
                    <div className="login-seltzer-grid">
                        <div className="login-seltzer-card login-lime login-reveal">
                            <img src="/src/assets/img/seltzer-lime.png" alt="行测模拟"/>
                            <h3>行测笔试<br/>模拟系统</h3>
                        </div>
                        <div className="login-seltzer-card login-grapefruit login-reveal">
                            <img src="/src/assets/img/seltzer-grapefruit.png" alt="编程算法"/>
                            <h3>编程算法<br/>在线评测</h3>
                        </div>
                    </div>
                    <div className="login-mocktails-grid" style={{marginTop: '2rem'}}>
                        <div className="login-mocktail-card login-reveal">
                            <img src="/src/assets/img/seltzer-cranberry.png" alt="专业知识"/>
                            <h3 style={{fontFamily: 'var(--font-serif)', fontSize: '1rem', textTransform: 'uppercase', color: 'var(--color-black)'}}>专业知识<br/>笔试模拟</h3>
                        </div>
                        <div className="login-mocktail-card login-reveal">
                            <img src="/src/assets/img/seltzer-dirty.png" alt="案例分析"/>
                            <h3 style={{fontFamily: 'var(--font-serif)', fontSize: '1rem', textTransform: 'uppercase', color: 'var(--color-black)'}}>案例分析<br/>限时挑战</h3>
                        </div>
                        <div className="login-mocktail-card login-reveal">
                            <img src="/src/assets/img/seltzer-grapefruit-small.png" alt="英语测试"/>
                            <h3 style={{fontFamily: 'var(--font-serif)', fontSize: '1rem', textTransform: 'uppercase', color: 'var(--color-black)'}}>英语能力<br/>在线测评</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mocktails Section */}
            <section className="login-products-section" id="mocktails">
                <div className="login-container-inner">
                    <div className="login-section-header login-reveal">
                        <h2>全流程模拟</h2>
                        <p>网申辅导 · 简历优化 · 笔试面试 · Offer谈判</p>
                    </div>
                    <div className="login-mocktails-grid">
                        <div className="login-mocktail-card login-reveal">
                            <img src="/src/assets/img/mocktail-cranberry.png" alt="简历优化"/>
                            <h3 style={{fontFamily: 'var(--font-serif)', fontSize: '1rem', textTransform: 'uppercase', color: 'var(--color-black)'}}>简历优化<br/>智能诊断</h3>
                        </div>
                        <div className="login-mocktail-card login-reveal">
                            <img src="/src/assets/img/mocktail-shirley.png" alt="网申辅导"/>
                            <h3 style={{fontFamily: 'var(--font-serif)', fontSize: '1rem', textTransform: 'uppercase', color: 'var(--color-black)'}}>网申辅导<br/>开放题辅助</h3>
                        </div>
                        <div className="login-mocktail-card login-reveal">
                            <img src="/src/assets/img/mocktail-lime.png" alt="Offer谈判"/>
                            <h3 style={{fontFamily: 'var(--font-serif)', fontSize: '1rem', textTransform: 'uppercase', color: 'var(--color-black)'}}>Offer谈判<br/>薪资指导</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section className="login-community-section" id="creators">
                <div className="login-container-inner">
                    <div className="login-community-images login-reveal">
                        <img src="/src/assets/img/person-holding.jpg" alt="用户分享"/>
                        <img src="/src/assets/img/bottle-lifestyle.jpg" alt="面试经验"/>
                        <img src="/src/assets/img/bottle-ice.jpg" alt="面经交流"/>
                        <img src="/src/assets/img/drinks.jpg" alt="求职社群"/>
                    </div>
                    <h2 className="login-community-title login-reveal">加入<span>面试社区</span></h2>
                    <div className="login-community-text login-reveal">
                        <h3>与十万求职者一起，<em>分享经验</em>，共同成长</h3>
                        <p>真实面经分享、行业动态解读、内推信息交流、模拟面试组队。在这里，您不是一个人在战斗。</p>
                    </div>
                </div>
            </section>

            {/* Leave No Trace */}
            <section className="login-trace-section">
                <div className="login-container-inner">
                    <h2 className="login-trace-title login-reveal">开启您的<br/><span>面试</span>进阶之路</h2>
                    <div className="login-trace-content login-reveal">
                        <p>立即注册，免费体验一次完整的AI数字人面试模拟。输入您的目标公司与职位，让智面AI为您生成专属面试场景，获得详细反馈报告与个性化改进建议。</p>
                    </div>
                    <div style={{marginTop: '4rem'}}>
                        <svg width="80" height="80" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" style={{color: 'var(--color-white)', filter: 'drop-shadow(3px 3px 0 var(--color-black))'}}>
                            <circle cx="20" cy="20" r="18"/>
                            <path d="M20 2 L20 38 M2 20 L38 20 M6 6 L34 34 M34 6 L6 34"/>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="login-footer" id="where">
                <div className="login-container-inner">
                    <div className="login-footer-top">
                        <div className="login-newsletter">
                            <h3>订阅更新</h3>
                            <p style={{fontSize: '0.8rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '400'}}>获取最新面经、行业报告与产品更新</p>
                            <form className="login-newsletter-form">
                                <input type="email" placeholder="您的邮箱"/>
                                <button type="submit">订阅</button>
                            </form>
                        </div>
                        <div className="login-social">
                            <h3>关注我们</h3>
                            <div className="login-social-links">
                                <a href="#">微信公众号</a>
                                <a href="#">小红书</a>
                                <a href="#">知乎</a>
                                <a href="#">B站</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="login-footer-bottom">
                        <span>© 智面AI 2024 保留所有权利</span>
                        <a href="#">用户协议</a>
                        <a href="#">隐私政策</a>
                        <span>中文 ↓</span>
                        <span>智面AI团队出品</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
