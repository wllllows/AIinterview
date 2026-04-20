import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Link as LinkIcon, Search, BrainCircuit, Sparkles, Globe, FileText, Cpu, Building2, Target, BookOpen, Users } from 'lucide-react';
import './ResumeForm.css';

// 通用的区块组件：处理左侧大标题和右侧内容布局
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="resume-section">
        <div className="section-title">{title}</div>
        <div className="section-content">{children}</div>
    </div>
);

// 通用的输入框组件：包含标签、必填标识和补充说明
const Field = ({ label, placeholder, type = "text", required = true, tip = "", value, onChange, options }: any) => (
    <div className="field-group">
        <label className="field-label">
            {label}{required && <span className="required">*</span>}
        </label>
        {type === "select" ? (
            <select className="field-input display-only" value={value || ""} onChange={onChange}>
                <option value="">{placeholder}</option>
                {options?.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        ) : (
            <input type="text" className="field-input display-only" placeholder={placeholder} value={value || ""} onChange={onChange} />
        )}
        {tip && <p className="field-tip">{tip}</p>}
    </div>
);

// 文件上传按钮组件
const FileUploadButton = ({ accept = "*", onChange, children }: { accept?: string; onChange: (file: File | null) => void; children: React.ReactNode }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                style={{ display: 'none' }}
                onChange={(e) => onChange(e.target.files?.[0] || null)}
            />
            <div onClick={() => inputRef.current?.click()} style={{ display: 'inline-block' }}>
                {children}
            </div>
        </>
    );
};

// 模拟搜索数据源
const searchSources = [
    { icon: <Globe size={14} />, text: '正在搜索华为校招官网...' },
    { icon: <FileText size={14} />, text: '正在读取牛客网面经贴 (1,247 条)...' },
    { icon: <Cpu size={14} />, text: '正在解析力扣华为题库...' },
    { icon: <Building2 size={14} />, text: '正在采集脉脉职场评价...' },
    { icon: <Target size={14} />, text: '正在匹配前端开发工程师 JD...' },
    { icon: <BookOpen size={14} />, text: '正在索引技术博客与开源项目...' },
];

// 模拟AI输出文本
const aiOutputText = `基于对华为前端开发工程师岗位的全网信息分析，我为你生成了以下备考情报：

【笔试特点】
华为前端笔试侧重计算机基础与前端工程化，选择题占60%，主要考察 JS 原型链、闭包、事件循环、HTTP 协议及浏览器渲染原理。编程题通常为 2 道算法 + 1 道场景实现（如 Promise 调度器、虚拟 DOM Diff），难度中等偏上，时间较为紧张。

【面试特点】
技术面试一般为 2-3 轮。一轮偏重基础深挖（CSS 布局、ES6+、性能优化），二轮侧重项目架构与业务思考（组件设计、状态管理、微前端），三轮主管面关注职业规划与团队协作。手撕代码出现频率极高，务必熟练。

【考官特点】
华为面试官风格整体偏严谨务实，不太喜欢"花架子"。他们倾向于追问项目细节直到你答不上来为止，以此来探测你的技术边界。对于没有实践过的技术栈，坦诚说明比强行套概念更安全。

【备考建议】
1. 重点复习 JS 异步模型、V8 垃圾回收、浏览器缓存策略；
2. 准备 1-2 个有深度、能体现你主导作用的项目，并提前准备好项目的难点、量化结果与复盘；
3. 刷透华为近年高频算法题（数组去重、二叉树遍历、LRU、扁平化数组等）；
4. 了解华为"狼性文化"与 IPD 流程，面试中适当体现你的抗压能力与结果导向思维。`;

// 生成唯一ID
let uidCounter = 0;
const uid = () => `item_${Date.now()}_${uidCounter++}`;

export default function ResumeForm() {
    const navigate = useNavigate();
    const [targetCompany, setTargetCompany] = useState('');
    const [targetPosition, setTargetPosition] = useState('');
    const [simulationStep, setSimulationStep] = useState<'idle' | 'searching' | 'thinking' | 'result'>('idle');
    const [searchProgress, setSearchProgress] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // 1. 简历上传
    const [resumeFileName, setResumeFileName] = useState('');

    // 2. 个人信息
    const [photoFileName, setPhotoFileName] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('男');
    const [country, setCountry] = useState('');
    const [idType, setIdType] = useState('身份证');
    const [idNumber, setIdNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    // 3. 教育经历
    const [educations, setEducations] = useState([
        { id: uid(), degree: '', school: '', location: '', startDate: '', endDate: '', department: '', major: '' }
    ]);

    // 4. 实习经历
    const [noInternship, setNoInternship] = useState(false);
    const [internships, setInternships] = useState([
        { id: uid(), company: '', position: '', description: '' }
    ]);

    // 5. 项目经历
    const [noProject, setNoProject] = useState(false);
    const [projects, setProjects] = useState([
        { id: uid(), name: '', role: '', description: '' }
    ]);

    // 6. 获奖信息
    const [noAward, setNoAward] = useState(false);
    const [awards, setAwards] = useState([
        { id: uid(), type: '', name: '', time: '' }
    ]);

    // 7. 技能信息
    const [examType, setExamType] = useState('');
    const [examScore, setExamScore] = useState('');
    const [languages, setLanguages] = useState('');
    const [aiSkills, setAiSkills] = useState('');

    // 8. 作品或个人主页
    const [portfolioFileName, setPortfolioFileName] = useState('');
    const [portfolioLinks, setPortfolioLinks] = useState([{ id: uid(), url: '' }]);

    // 9. 资料证明人
    const [refereeName, setRefereeName] = useState('');
    const [refereeRole, setRefereeRole] = useState('');
    const [refereePhone, setRefereePhone] = useState('');

    // 10. 其他关键信息
    const [extraInfo, setExtraInfo] = useState('');

    // 光标闪烁
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    // 模拟流程控制
    useEffect(() => {
        if (simulationStep === 'searching') {
            setSearchProgress(0);
            const progressInterval = setInterval(() => {
                setSearchProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        setTimeout(() => setSimulationStep('thinking'), 400);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 60);
            return () => clearInterval(progressInterval);
        }

        if (simulationStep === 'thinking') {
            const timer = setTimeout(() => {
                setSimulationStep('result');
            }, 3000);
            return () => clearTimeout(timer);
        }

        if (simulationStep === 'result') {
            setTypedText('');
            let index = 0;
            typewriterRef.current = setInterval(() => {
                setTypedText(prev => {
                    if (index >= aiOutputText.length) {
                        if (typewriterRef.current) clearInterval(typewriterRef.current);
                        return prev;
                    }
                    const next = prev + aiOutputText[index];
                    index++;
                    return next;
                });
            }, 22);
            return () => {
                if (typewriterRef.current) clearInterval(typewriterRef.current);
            };
        }
    }, [simulationStep]);

    const handleConfirm = () => {
        if (!targetCompany.trim() || !targetPosition.trim()) return;
        setSimulationStep('searching');
    };

    const companyName = targetCompany.trim() || '华为';
    const positionName = targetPosition.trim() || '前端开发工程师';

    // 通用数组操作
    const updateItem = useCallback((arr: any[], id: string, key: string, value: any) => {
        return arr.map(item => item.id === id ? { ...item, [key]: value } : item);
    }, []);

    const addItem = useCallback((arr: any[], template: any) => {
        return [...arr, { ...template, id: uid() }];
    }, []);

    const removeItem = useCallback((arr: any[], id: string) => {
        return arr.filter(item => item.id !== id);
    }, []);

    return (
        <div className="tab-pane fade-in-up resume-wrapper">

            {/* 1. 简历上传 */}
            <Section title="简历上传">
                <div className="upload-box">
                    <h3>简历文档上传</h3>
                    <FileUploadButton
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(file) => setResumeFileName(file ? file.name : '')}
                    >
                        <button className="btn-upload-square">
                            <Plus size={24} />
                        </button>
                    </FileUploadButton>
                    {resumeFileName && (
                        <p style={{ marginTop: '8px', fontSize: '14px', color: '#3b82f6' }}>{resumeFileName}</p>
                    )}
                    <p className="field-tip" style={{ justifyContent: 'center', marginTop: '12px' }}>
                        支持 PDF、Word、JPG 格式，大小不超过 10MB
                    </p>
                </div>
            </Section>

            {/* 2. 个人信息 */}
            <Section title="个人信息">
                <div className="field-group">
                    <label className="field-label">照片</label>
                    <FileUploadButton
                        accept=".jpg,.jpeg,.png"
                        onChange={(file) => setPhotoFileName(file ? file.name : '')}
                    >
                        <button className="btn-upload-square small">
                            <Plus size={20} />
                        </button>
                    </FileUploadButton>
                    {photoFileName && (
                        <p style={{ marginTop: '8px', fontSize: '14px', color: '#3b82f6' }}>{photoFileName}</p>
                    )}
                    <p className="field-tip">建议使用蓝底或白底证件照，展现专业形象</p>
                </div>

                <Field label="姓名" placeholder="请输入姓名" tip="请与身份证件上的姓名保持一致" value={name} onChange={(e: any) => setName(e.target.value)} />

                <div className="field-group">
                    <label className="field-label">性别<span className="required">*</span></label>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input type="radio" name="gender" checked={gender === '男'} onChange={() => setGender('男')} /> 男
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="gender" checked={gender === '女'} onChange={() => setGender('女')} /> 女
                        </label>
                    </div>
                </div>

                <div className="field-group">
                    <label className="field-label" style={{ fontWeight: 600, marginBottom: '12px', marginTop: '8px' }}>证件信息</label>
                </div>

                <Field label="国家/地区" placeholder="中国大陆" type="select" value={country} onChange={(e: any) => setCountry(e.target.value)} options={['中国大陆', '中国香港', '中国澳门', '中国台湾', '其他']} />

                <div className="field-group">
                    <label className="field-label">个人证件<span className="required">*</span></label>
                    <div className="flex-row">
                        <select className="field-input display-only" style={{ width: '140px' }} value={idType} onChange={(e) => setIdType(e.target.value)}>
                            <option>身份证</option>
                            <option>护照</option>
                        </select>
                        <input type="text" className="field-input display-only flex-1" placeholder="请填写您的证件号码" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
                    </div>
                </div>

                <Field label="手机号码" placeholder="请填写您的手机号码" value={phone} onChange={(e: any) => setPhone(e.target.value)} />
                <Field label="邮箱" placeholder="请填写您的邮箱地址" tip="面试通知将通过邮件发送，请确保填写准确" value={email} onChange={(e: any) => setEmail(e.target.value)} />
            </Section>

            {/* 3. 教育经历 */}
            <Section title="教育经历">
                {educations.map((edu, index) => (
                    <div className="experience-item" key={edu.id}>
                        <div className="experience-header">
                            <span>{index === 0 ? '当前教育经历' : `教育经历-${index + 1}`}</span>
                            {educations.length > 1 && (
                                <span className="action-link delete" onClick={() => setEducations(removeItem(educations, edu.id))}>
                                    <Trash2 size={15} style={{ marginRight: '4px' }} /> 删除经历
                                </span>
                            )}
                        </div>
                        <Field label="学历" placeholder="请选择学历" type="select" value={edu.degree} onChange={(e: any) => setEducations(updateItem(educations, edu.id, 'degree', e.target.value))} options={['高中生', '本科生', '研究生', '博士生']} />
                        <Field label="学校名称" placeholder="请输入学校名称" value={edu.school} onChange={(e: any) => setEducations(updateItem(educations, edu.id, 'school', e.target.value))} />
                        <Field label="目前就读地" placeholder="请输入目前就读地" value={edu.location} onChange={(e: any) => setEducations(updateItem(educations, edu.id, 'location', e.target.value))} />

                        <div className="field-group">
                            <label className="field-label">起止时间<span className="required">*</span></label>
                            <div className="flex-row align-center gap-2">
                                <input type="text" className="field-input display-only" placeholder="开始日期" value={edu.startDate} onChange={(e) => setEducations(updateItem(educations, edu.id, 'startDate', e.target.value))} />
                                <span>-</span>
                                <input type="text" className="field-input display-only" placeholder="结束日期" value={edu.endDate} onChange={(e) => setEducations(updateItem(educations, edu.id, 'endDate', e.target.value))} />
                            </div>
                        </div>
                        <Field label="院系" placeholder="请输入院系" value={edu.department} onChange={(e: any) => setEducations(updateItem(educations, edu.id, 'department', e.target.value))} />
                        <Field label="专业" placeholder="请输入专业" value={edu.major} onChange={(e: any) => setEducations(updateItem(educations, edu.id, 'major', e.target.value))} />
                    </div>
                ))}
                <div className="action-link" onClick={() => setEducations(addItem(educations, { degree: '', school: '', location: '', startDate: '', endDate: '', department: '', major: '' }))}>
                    <Plus size={16} /> 添加教育经历
                </div>
            </Section>

            {/* 4. 实习经历 */}
            <Section title="实习经历">
                <div className="field-group" style={{ marginBottom: '24px' }}>
                    <label className="checkbox-label">
                        <input type="checkbox" checked={noInternship} onChange={(e) => setNoInternship(e.target.checked)} /> 无实习经历
                    </label>
                </div>

                {!noInternship && (
                    <>
                        {internships.map((item, index) => (
                            <div className="experience-item" key={item.id}>
                                <div className="experience-header">
                                    <span>实习经历-{index + 1}</span>
                                    <span className="action-link delete" onClick={() => setInternships(removeItem(internships, item.id))}>
                                        <Trash2 size={15} style={{ marginRight: '4px' }} /> 删除经历
                                    </span>
                                </div>
                                <Field label="公司" placeholder="请输入实习公司" value={item.company} onChange={(e: any) => setInternships(updateItem(internships, item.id, 'company', e.target.value))} />
                                <Field label="职位" placeholder="请输入职位" value={item.position} onChange={(e: any) => setInternships(updateItem(internships, item.id, 'position', e.target.value))} />
                                <div className="field-group">
                                    <label className="field-label">描述</label>
                                    <textarea className="field-input display-only" rows={3} placeholder="请描述你的实习职责和主要成就" value={item.description} onChange={(e) => setInternships(updateItem(internships, item.id, 'description', e.target.value))}></textarea>
                                    <p className="field-tip">建议使用：动词 + 项目 + 结果 的方式描述</p>
                                </div>
                            </div>
                        ))}
                        <div className="action-link" onClick={() => setInternships(addItem(internships, { company: '', position: '', description: '' }))}>
                            <Plus size={16} /> 添加实习经历
                        </div>
                    </>
                )}
            </Section>

            {/* 5. 项目经历 */}
            <Section title="项目经历">
                <div className="field-group">
                    <label className="checkbox-label">
                        <input type="checkbox" checked={noProject} onChange={(e) => setNoProject(e.target.checked)} /> 无项目经历
                    </label>
                </div>
                {!noProject && (
                    <>
                        {projects.map((item, index) => (
                            <div className="experience-item" key={item.id}>
                                <div className="experience-header">
                                    <span>项目经历-{index + 1}</span>
                                    <span className="action-link delete" onClick={() => setProjects(removeItem(projects, item.id))}><Trash2 size={15} /> 删除项目</span>
                                </div>
                                <Field label="项目名称" placeholder="请输入项目名称" value={item.name} onChange={(e: any) => setProjects(updateItem(projects, item.id, 'name', e.target.value))} />
                                <Field label="担任角色" placeholder="例如：前端负责人、算法实习生" value={item.role} onChange={(e: any) => setProjects(updateItem(projects, item.id, 'role', e.target.value))} />
                                <div className="field-group">
                                    <label className="field-label">项目描述</label>
                                    <textarea className="field-input display-only" rows={3} placeholder="请输入项目背景及你的贡献" value={item.description} onChange={(e) => setProjects(updateItem(projects, item.id, 'description', e.target.value))}></textarea>
                                </div>
                            </div>
                        ))}
                        <div className="action-link" onClick={() => setProjects(addItem(projects, { name: '', role: '', description: '' }))}><Plus size={16} /> 添加项目经历</div>
                    </>
                )}
            </Section>

            {/* 6. 获奖信息 */}
            <Section title="获奖信息">
                <div className="field-group">
                    <label className="checkbox-label"><input type="checkbox" checked={noAward} onChange={(e) => setNoAward(e.target.checked)} /> 无获奖信息</label>
                </div>
                {!noAward && (
                    <>
                        {awards.map((item, index) => (
                            <div className="experience-item" key={item.id}>
                                <div className="experience-header">
                                    <span>获奖信息-{index + 1}</span>
                                    <span className="action-link delete" onClick={() => setAwards(removeItem(awards, item.id))}><Trash2 size={15} /> 删除</span>
                                </div>
                                <Field label="获奖类型" placeholder="请选择" type="select" value={item.type} onChange={(e: any) => setAwards(updateItem(awards, item.id, 'type', e.target.value))} options={['国奖', '赛区奖', '市奖']} />
                                <Field label="奖项名称" placeholder="请输入完整奖项名称" value={item.name} onChange={(e: any) => setAwards(updateItem(awards, item.id, 'name', e.target.value))} />
                                <Field label="获奖时间" placeholder="选择日期" value={item.time} onChange={(e: any) => setAwards(updateItem(awards, item.id, 'time', e.target.value))} />
                            </div>
                        ))}
                        <div className="action-link" onClick={() => setAwards(addItem(awards, { type: '', name: '', time: '' }))}><Plus size={16} /> 添加获奖信息</div>
                    </>
                )}
            </Section>

            {/* 7. 技能信息 */}
            <Section title="技能信息">
                <div className="field-group">
                    <label className="field-label">外语考试/等级</label>
                    <div className="flex-row">
                        <select className="field-input display-only" style={{ width: '180px' }} value={examType} onChange={(e) => setExamType(e.target.value)}>
                            <option value="">请选择考试类型</option>
                            <option>CET-4</option>
                            <option>CET-6</option>
                            <option>IELTS</option>
                        </select>
                        <input type="text" className="field-input display-only flex-1" placeholder="请填写分数/等级" value={examScore} onChange={(e) => setExamScore(e.target.value)} />
                    </div>
                </div>
                <Field label="掌握语言" placeholder="例如：Java, Python, JavaScript" tip="多个语言请用逗号分隔" value={languages} onChange={(e: any) => setLanguages(e.target.value)} />
                <div className="field-group">
                    <label className="field-label">AI应用技能</label>
                    <textarea className="field-input display-only" rows={2} placeholder="描述你熟悉的AI工具（如 ChatGPT, Midjourney, Copilot）及应用场景" value={aiSkills} onChange={(e) => setAiSkills(e.target.value)}></textarea>
                </div>
            </Section>

            {/* 8. 作品或个人主页 */}
            <Section title="作品或个人主页">
                <div className="upload-box" style={{ padding: '30px 0', marginBottom: '20px' }}>
                    <p style={{ marginBottom: '12px', fontSize: '14px', color: '#64748b' }}>上传您的作品集或其他证明附件</p>
                    <FileUploadButton
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar"
                        onChange={(file) => setPortfolioFileName(file ? file.name : '')}
                    >
                        <button className="btn-upload-square">
                            <Plus size={24} />
                        </button>
                    </FileUploadButton>
                    {portfolioFileName && (
                        <p style={{ marginTop: '8px', fontSize: '14px', color: '#3b82f6' }}>{portfolioFileName}</p>
                    )}
                </div>
                {portfolioLinks.map((link, index) => (
                    <div className="field-group" key={link.id}>
                        <label className="field-label">个人主页/作品链接 {portfolioLinks.length > 1 ? index + 1 : ''}</label>
                        <div className="flex-row align-center">
                            <LinkIcon size={18} color="#3b82f6" />
                            <input type="text" className="field-input display-only flex-1" placeholder="GitHub, 个人博客或作品在线预览链接" value={link.url} onChange={(e) => setPortfolioLinks(updateItem(portfolioLinks, link.id, 'url', e.target.value))} />
                            {portfolioLinks.length > 1 && (
                                <span className="action-link delete" onClick={() => setPortfolioLinks(removeItem(portfolioLinks, link.id))}>
                                    <Trash2 size={15} />
                                </span>
                            )}
                        </div>
                    </div>
                ))}
                <div className="action-link" onClick={() => setPortfolioLinks(addItem(portfolioLinks, { url: '' }))}><Plus size={16} /> 添加链接</div>
            </Section>

            {/* 9. 资料证明人 */}
            <Section title="资料证明人">
                <p className="field-tip" style={{ marginBottom: '20px' }}>请提供 1-2 位可以核实您背景信息的推荐人</p>
                <Field label="证明人姓名" placeholder="姓名" value={refereeName} onChange={(e: any) => setRefereeName(e.target.value)} />
                <Field label="证明人身份" placeholder="例如：导师、直属主管" value={refereeRole} onChange={(e: any) => setRefereeRole(e.target.value)} />
                <Field label="联系电话" placeholder="联系电话" value={refereePhone} onChange={(e: any) => setRefereePhone(e.target.value)} />
            </Section>

            {/* 10. 其他关键信息 */}
            <Section title="其他关键信息">
                <div className="field-group">
                    <label className="field-label">补充信息</label>
                    <textarea className="field-input display-only" rows={4} placeholder="你可以补充任何你想让面试官了解的信息，如：特殊的兴趣爱好、性格优势等" value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)}></textarea>
                </div>
            </Section>

            {/* 11. 目标公司信息 */}
            <Section title="目标公司信息">
                <div className="field-group">
                    <label className="field-label">目标公司名称</label>
                    <input
                        type="text"
                        className="field-input display-only"
                        placeholder="例如：华为、腾讯、阿里巴巴"
                        value={targetCompany}
                        onChange={(e) => setTargetCompany(e.target.value)}
                    />
                </div>
                <div className="field-group">
                    <label className="field-label">目标岗位</label>
                    <input
                        type="text"
                        className="field-input display-only"
                        placeholder="例如：前端开发工程师、Java后端开发"
                        value={targetPosition}
                        onChange={(e) => setTargetPosition(e.target.value)}
                    />
                </div>
                <button
                    className="btn-primary"
                    style={{ marginTop: '8px' }}
                    onClick={handleConfirm}
                    disabled={simulationStep !== 'idle'}
                >
                    {simulationStep === 'idle' ? '确定' : '分析中...'}
                </button>

                {/* 模拟动画区域 */}
                {simulationStep !== 'idle' && (
                    <div className="ai-simulation-box">
                        {simulationStep === 'searching' && (
                            <div className="simulation-searching">
                                <div className="simulation-header">
                                    <Search size={18} className="simulation-icon pulse" />
                                    <span>正在全网搜索 {companyName} {positionName} 相关信息...</span>
                                </div>
                                <div className="search-progress-bar">
                                    <div className="search-progress-fill" style={{ width: `${searchProgress}%` }} />
                                </div>
                                <div className="search-sources">
                                    {searchSources.map((source, idx) => (
                                        <div
                                            key={idx}
                                            className={`search-source-item ${searchProgress > idx * 14 ? 'visible' : ''}`}
                                        >
                                            <span className="source-icon">{source.icon}</span>
                                            <span className="source-text">{source.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {simulationStep === 'thinking' && (
                            <div className="simulation-thinking">
                                <BrainCircuit size={32} className="thinking-icon pulse" />
                                <p>AI 正在整合数据、构建知识图谱...</p>
                                <div className="thinking-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}

                        {simulationStep === 'result' && (
                            <div className="simulation-result fade-in-up">
                                {/* 知识图谱 */}
                                <div className="knowledge-graph-card complex">
                                    <div className="graph-header">
                                        <Sparkles size={16} />
                                        <span>{companyName} · {positionName} 知识图谱</span>
                                    </div>
                                    <div className="neo4j-graph-container">
                                        {/* SVG 连线层 */}
                                        <svg className="neo4j-edge-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="edge-blue" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
                                                </linearGradient>
                                                <linearGradient id="edge-green" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
                                                </linearGradient>
                                                <linearGradient id="edge-orange" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                                                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
                                                </linearGradient>
                                                <linearGradient id="edge-red" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                                                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.5" />
                                                </linearGradient>
                                                <linearGradient id="edge-purple" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
                                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
                                                </linearGradient>
                                            </defs>
                                            <path d="M 50 50 Q 35 25 19 16" className="neo4j-edge-path" stroke="url(#edge-blue)" />
                                            <path d="M 50 50 Q 65 25 81 16" className="neo4j-edge-path" stroke="url(#edge-green)" />
                                            <path d="M 50 50 Q 35 55 19 53" className="neo4j-edge-path" stroke="url(#edge-orange)" />
                                            <path d="M 50 50 Q 65 55 81 53" className="neo4j-edge-path" stroke="url(#edge-red)" />
                                            <path d="M 50 50 Q 50 72 50 89" className="neo4j-edge-path" stroke="url(#edge-purple)" />
                                        </svg>

                                        {/* 中心节点 */}
                                        <div className="neo4j-node center">
                                            <div className="theme-main">{companyName}</div>
                                            <div className="theme-sub">{positionName}</div>
                                        </div>

                                        {/* 卫星节点 */}
                                        <div className="neo4j-node pos-tl" style={{ '--node-color': '#3b82f6' } as any}>
                                            <div className="node-header">
                                                <div className="node-icon"><Cpu size={16} /></div>
                                                <span className="node-title">技术栈</span>
                                            </div>
                                            <ul className="node-branches">
                                                <li><strong>Java 基础：</strong>集合源码、并发编程、JVM 内存模型与 GC 算法</li>
                                                <li><strong>Spring 生态：</strong>Spring Boot 自动配置、Spring Cloud 微服务、MyBatis-Plus</li>
                                                <li><strong>中间件：</strong>Redis 缓存策略、MySQL 索引优化、Kafka 消息队列</li>
                                                <li><strong>云原生：</strong>Docker 容器化、Kubernetes 编排与服务网格</li>
                                                <li><strong>分布式理论：</strong>CAP、分布式事务（Seata）、分库分表（ShardingSphere）</li>
                                            </ul>
                                        </div>

                                        <div className="neo4j-node pos-tr" style={{ '--node-color': '#10b981' } as any}>
                                            <div className="node-header">
                                                <div className="node-icon"><FileText size={16} /></div>
                                                <span className="node-title">笔试特点</span>
                                            </div>
                                            <ul className="node-branches">
                                                <li>机考 <strong>3 道编程题</strong>，难度中等偏上，侧重边界处理</li>
                                                <li>题型覆盖：字符串处理、DFS/BFS、动态规划与贪心</li>
                                                <li>选择题占比约 30%，覆盖计网 / 操作系统 / 数据库三科</li>
                                                <li>时间紧张，平均每题仅 25 分钟，需提前熟悉牛客网环境</li>
                                                <li>通过率与代码鲁棒性（空指针、大数组）强相关</li>
                                            </ul>
                                        </div>

                                        <div className="neo4j-node pos-ml" style={{ '--node-color': '#f59e0b' } as any}>
                                            <div className="node-header">
                                                <div className="node-icon"><Users size={16} /></div>
                                                <span className="node-title">考官风格</span>
                                            </div>
                                            <ul className="node-branches">
                                                <li>整体风格<strong>严谨务实</strong>，不太喜欢"花架子"和空泛概念</li>
                                                <li>会对项目细节<strong>连环追问</strong>，直到探测到你的技术边界为止</li>
                                                <li>极度<strong>注重结果量化</strong>，要求用具体数据说明项目价值</li>
                                                <li>对未实践过的技术<strong>容忍度低</strong>，坦诚说明比强行套概念更安全</li>
                                                <li>手撕代码环节态度严肃，但会在你卡住时给予适度提示</li>
                                            </ul>
                                        </div>

                                        <div className="neo4j-node pos-mr" style={{ '--node-color': '#ef4444' } as any}>
                                            <div className="node-header">
                                                <div className="node-icon"><Target size={16} /></div>
                                                <span className="node-title">面试重点</span>
                                            </div>
                                            <ul className="node-branches">
                                                <li><strong>JVM 调优：</strong>GC 算法选择、线上 OOM 排查、Arthas 实战</li>
                                                <li><strong>高并发设计：</strong>线程池参数调优、缓存击穿/穿透/雪崩防护</li>
                                                <li><strong>项目架构演进：</strong>从单体到微服务的拆分理由与踩坑复盘</li>
                                                <li><strong>手撕代码必考：</strong>LRU、生产者消费者、TOP K 等问题</li>
                                                <li><strong>微服务实践：</strong>分布式锁、限流降级、注册中心选型</li>
                                            </ul>
                                        </div>

                                        <div className="neo4j-node pos-bottom" style={{ '--node-color': '#8b5cf6' } as any}>
                                            <div className="node-header">
                                                <div className="node-icon"><BookOpen size={16} /></div>
                                                <span className="node-title">备考方向</span>
                                            </div>
                                            <ul className="node-branches inline-five">
                                                <li>夯实 Java 并发与集合源码细节</li>
                                                <li>准备 2 个有高复杂度、可量化的项目</li>
                                                <li>刷透华为机考高频题库（近 3 年真题）</li>
                                                <li>熟悉华为"狼性文化"与 IPD 研发流程</li>
                                                <li>模拟面试中训练结构化表达能力</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* AI 分析报告 */}
                                <div className="ai-report-card">
                                    <div className="report-header">
                                        <div className="report-avatar">AI</div>
                                        <div>
                                            <div className="report-name">智能备考助手</div>
                                            <div className="report-meta">基于全网数据生成 · 仅供参考</div>
                                        </div>
                                    </div>
                                    <div className="report-body">
                                        <pre className="typewriter-text">{aiOutputText}</pre>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Section>

            {/* 底部按钮区 */}
            <div className="form-actions" style={{ borderTop: '1px solid #f1f5f9', marginTop: '40px' }}>
                <button className="btn-primary" onClick={() => navigate('/app', { state: { direction: 'backward', scrollToFeatures: true } })}>提交并保存</button>
            </div>

        </div>
    );
}
