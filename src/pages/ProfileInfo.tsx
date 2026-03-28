import React from 'react';
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import './ProfileInfo.css';

// 通用的区块组件：处理左侧大标题和右侧内容布局
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="resume-section">
        <div className="section-title">{title}</div>
        <div className="section-content">{children}</div>
    </div>
);

// 通用的输入框组件：包含标签、必填标识和补充说明
const Field = ({ label, placeholder, type = "text", required = true, tip = "" }: any) => (
    <div className="field-group">
        <label className="field-label">
            {label}{required && <span className="required">*</span>}
        </label>
        {type === "select" ? (
            <select className="field-input display-only">
                <option value="">{placeholder}</option>
            </select>
        ) : (
            <input type="text" className="field-input display-only" placeholder={placeholder} readOnly />
        )}
        {tip && <p className="field-tip">{tip}</p>}
    </div>
);

export default function ResumeDisplay() {
    return (
        <div className="resume-display-container">

            {/* 1. 简历上传 */}
            <Section title="简历上传">
                <div className="upload-box">
                    <h3>简历文档上传</h3>
                    <button className="btn-upload-square">
                        <Plus size={24} />
                    </button>
                    <p className="field-tip" style={{ justifyContent: 'center', marginTop: '12px' }}>
                        支持 PDF、Word、JPG 格式，大小不超过 10MB
                    </p>
                </div>
            </Section>

            {/* 2. 个人信息 */}
            <Section title="个人信息">
                <div className="field-group">
                    <label className="field-label">照片</label>
                    <button className="btn-upload-square small">
                        <Plus size={20} />
                    </button>
                    <p className="field-tip">建议使用蓝底或白底证件照，展现专业形象</p>
                </div>

                <Field label="姓名" placeholder="请输入姓名" tip="请与身份证件上的姓名保持一致" />

                <div className="field-group">
                    <label className="field-label">性别<span className="required">*</span></label>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input type="radio" name="gender" defaultChecked /> 男
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="gender" /> 女
                        </label>
                    </div>
                </div>

                <div className="field-group">
                    <label className="field-label" style={{ fontWeight: 600, marginBottom: '12px', marginTop: '8px' }}>证件信息</label>
                </div>

                <Field label="国家/地区" placeholder="中国大陆" type="select" />

                <div className="field-group">
                    <label className="field-label">个人证件<span className="required">*</span></label>
                    <div className="flex-row">
                        <select className="field-input display-only" style={{ width: '140px' }}>
                            <option>身份证</option>
                            <option>护照</option>
                        </select>
                        <input type="text" className="field-input display-only flex-1" placeholder="请填写您的证件号码" readOnly />
                    </div>
                </div>

                <Field label="手机号码" placeholder="请填写您的手机号码" />
                <Field label="邮箱" placeholder="请填写您的邮箱地址" tip="面试通知将通过邮件发送，请确保填写准确" />
            </Section>

            {/* 3. 教育经历 */}
            <Section title="教育经历">
                <div className="experience-item">
                    <div className="experience-header">
                        <span>当前教育经历</span>
                    </div>
                    <Field label="学历" placeholder="请选择学历" type="select" />
                    <Field label="学校名称" placeholder="请输入学校名称" />
                    <Field label="目前就读地" placeholder="请选择目前就读地" type="select" />

                    <div className="field-group">
                        <label className="field-label">起止时间<span className="required">*</span></label>
                        <div className="flex-row align-center gap-2">
                            <input type="text" className="field-input display-only" placeholder="开始日期" readOnly />
                            <span>-</span>
                            <input type="text" className="field-input display-only" placeholder="结束日期" readOnly />
                        </div>
                    </div>
                    <Field label="院系" placeholder="请输入院系" />
                    <Field label="专业" placeholder="请输入专业" />
                </div>
                <div className="action-link">
                    <Plus size={16} /> 添加教育经历
                </div>
            </Section>

            {/* 4. 实习经历 */}
            <Section title="实习经历">
                <div className="field-group" style={{ marginBottom: '24px' }}>
                    <label className="checkbox-label">
                        <input type="checkbox" name="no-internship" /> 无实习经历
                    </label>
                </div>

                <div className="experience-item">
                    <div className="experience-header">
                        <span>实习经历-1</span>
                        <span className="action-link delete">
                            <Trash2 size={15} style={{ marginRight: '4px' }} /> 删除经历
                        </span>
                    </div>
                    <Field label="公司" placeholder="请输入实习公司" />
                    <Field label="职位" placeholder="请输入职位" />
                    <div className="field-group">
                        <label className="field-label">描述</label>
                        <textarea className="field-input display-only" rows={3} placeholder="请描述你的实习职责和主要成就" readOnly></textarea>
                        <p className="field-tip">建议使用：动词 + 项目 + 结果 的方式描述</p>
                    </div>
                </div>
                <div className="action-link">
                    <Plus size={16} /> 添加实习经历
                </div>
            </Section>

            {/* 5. 项目经历 */}
            <Section title="项目经历">
                <div className="field-group">
                    <label className="checkbox-label">
                        <input type="checkbox" /> 无项目经历
                    </label>
                </div>
                <div className="experience-item">
                    <div className="experience-header">
                        <span>项目经历-1</span>
                        <span className="action-link delete"><Trash2 size={15} /> 删除项目</span>
                    </div>
                    <Field label="项目名称" placeholder="请输入项目名称" />
                    <Field label="担任角色" placeholder="例如：前端负责人、算法实习生" />
                    <div className="field-group">
                        <label className="field-label">项目描述</label>
                        <textarea className="field-input display-only" rows={3} placeholder="请输入项目背景及你的贡献" readOnly></textarea>
                    </div>
                </div>
                <div className="action-link"><Plus size={16} /> 添加项目经历</div>
            </Section>

            {/* 6. 获奖信息 */}
            <Section title="获奖信息">
                <div className="field-group">
                    <label className="checkbox-label"><input type="checkbox" /> 无获奖信息</label>
                </div>
                <div className="experience-item">
                    <div className="experience-header">
                        <span>获奖信息-1</span>
                        <span className="action-link delete"><Trash2 size={15} /> 删除</span>
                    </div>
                    <Field label="获奖类型" placeholder="请选择" type="select" />
                    <Field label="奖项名称" placeholder="请输入完整奖项名称" />
                    <Field label="获奖时间" placeholder="选择日期" />
                </div>
                <div className="action-link"><Plus size={16} /> 添加获奖信息</div>
            </Section>

            {/* 7. 技能信息 */}
            <Section title="技能信息">
                <div className="field-group">
                    <label className="field-label">外语考试/等级</label>
                    <div className="flex-row">
                        <select className="field-input display-only" style={{ width: '180px' }}>
                            <option>请选择考试类型</option>
                            <option>CET-4</option>
                            <option>CET-6</option>
                            <option>IELTS</option>
                        </select>
                        <input type="text" className="field-input display-only flex-1" placeholder="请填写分数/等级" readOnly />
                    </div>
                </div>
                <Field label="掌握语言" placeholder="例如：Java, Python, JavaScript" tip="多个语言请用逗号分隔" />
                <div className="field-group">
                    <label className="field-label">AI应用技能</label>
                    <textarea className="field-input display-only" rows={2} placeholder="描述你熟悉的AI工具（如 ChatGPT, Midjourney, Copilot）及应用场景" readOnly></textarea>
                </div>
            </Section>

            {/* 8. 作品或个人主页 */}
            <Section title="作品或个人主页">
                <div className="upload-box" style={{ padding: '30px 0', marginBottom: '20px' }}>
                    <p style={{ marginBottom: '12px', fontSize: '14px', color: '#64748b' }}>上传您的作品集或其他证明附件</p>
                    <button className="btn-upload-square">
                        <Plus size={24} />
                    </button>
                </div>
                <div className="field-group">
                    <label className="field-label">个人主页/作品链接</label>
                    <div className="flex-row align-center">
                        <LinkIcon size={18} color="#3b82f6" />
                        <input type="text" className="field-input display-only flex-1" placeholder="GitHub, 个人博客或作品在线预览链接" readOnly />
                    </div>
                </div>
                <div className="action-link"><Plus size={16} /> 添加链接</div>
            </Section>

            {/* 9. 资料证明人 */}
            <Section title="资料证明人">
                <p className="field-tip" style={{ marginBottom: '20px' }}>请提供 1-2 位可以核实您背景信息的推荐人</p>
                <Field label="证明人姓名" placeholder="姓名" />
                <Field label="证明人身份" placeholder="例如：导师、直属主管" />
                <Field label="联系电话" placeholder="联系电话" />
            </Section>

            {/* 10. 其他关键信息 */}
            <Section title="其他关键信息">
                <div className="field-group">
                    <label className="field-label">补充信息</label>
                    <textarea className="field-input display-only" rows={4} placeholder="你可以补充任何你想让面试官了解的信息，如：特殊的兴趣爱好、性格优势等" readOnly></textarea>
                </div>
            </Section>

            {/* 底部按钮区 */}
            <div className="form-actions" style={{ borderTop: '1px solid #f1f5f9', marginTop: '40px' }}>
                <button className="btn-primary">提交并预览</button>
                <button className="btn-default">保存草稿</button>
            </div>

        </div>
    );
}