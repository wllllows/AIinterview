import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ArrowRight, CheckCircle, UserCircle, ChevronRight, FileText, Video, BarChart2, Monitor, Users, Building2, TrendingUp, Target, PhoneOff, Mic, UserCog, Code, Briefcase, Share2, ArrowLeft, X, Clock, MapPin, Briefcase as BriefcaseIcon, PhoneOff as PhoneOffIcon, Settings, Pause, Server, Sparkles, MessageSquarePlus } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import './Home.css';
import InterviewModal from '../components/InterviewModal';

// 面试配置弹窗组件（提取到外部避免重新挂载动画）
function InterviewConfigModal({
  show,
  config,
  onClose,
  onConfigChange,
  onConfirm,
}: {
  show: boolean;
  config: any;
  onClose: () => void;
  onConfigChange: (config: any) => void;
  onConfirm: () => void;
}) {
  if (!show) return null;

  const interviewTypes = [
    { id: 'oneToOne', name: '一对一面试', image: '/src/assets/OneToOne.png' },
    { id: 'oneToMany', name: '一对多面试', image: '/src/assets/OneToMany.png' },
    { id: 'manyToMany', name: '多对多面试', image: '/src/assets/ManyToMany.png' },
    { id: 'manyToOne', name: '多对一面试', image: '/src/assets/ManyToOne.png' },
  ];

  const personalities = [
    { id: 'professional', name: '专业严谨', desc: '注重专业知识和逻辑思维' },
    { id: 'friendly', name: '亲和友善', desc: '营造轻松愉快的面试氛围' },
    { id: 'pressure', name: '压力面试', desc: '考察抗压能力和应变能力' },
    { id: 'behavioral', name: '行为面试', desc: '关注过往经历和行为模式' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      animation: 'fadeIn 0.3s ease-out',
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        maxWidth: '720px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>
              面试参数配置
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b' }}>配置您的模拟面试环境</p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#f1f5f9',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
          >
            <X size={20} color="#64748b" />
          </button>
        </div>

        <div style={{ padding: '24px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                面试公司 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Building2 size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  value={config.company}
                  onChange={(e) => onConfigChange({ ...config, company: e.target.value })}
                  placeholder="例如：字节跳动"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                面试岗位 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <BriefcaseIcon size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  value={config.position}
                  onChange={(e) => onConfigChange({ ...config, position: e.target.value })}
                  placeholder="例如：前端开发工程师"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '12px' }}>
              面试难度
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { id: 'easy', name: '简单', color: '#22c55e' },
                { id: 'medium', name: '中等', color: '#3b82f6' },
                { id: 'hard', name: '困难', color: '#ef4444' },
              ].map((level) => (
                <button
                  key={level.id}
                  onClick={() => onConfigChange({ ...config, difficulty: level.id })}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    border: `2px solid ${config.difficulty === level.id ? level.color : '#e2e8f0'}`,
                    borderRadius: '10px',
                    backgroundColor: config.difficulty === level.id ? `${level.color}10` : '#fff',
                    color: config.difficulty === level.id ? level.color : '#64748b',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '12px' }}>
              面试形式
            </label>
            <div style={{ display: 'flex', gap: '12px', marginBottom: config.mode === 'online' ? '16px' : '0' }}>
              {[
                { id: 'online', name: '线上面试', icon: Monitor },
                { id: 'offline', name: '线下面试', icon: MapPin },
              ].map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => onConfigChange({ ...config, mode: mode.id })}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '14px 24px',
                      border: `2px solid ${config.mode === mode.id ? '#3b82f6' : '#e2e8f0'}`,
                      borderRadius: '10px',
                      backgroundColor: config.mode === mode.id ? '#eff6ff' : '#fff',
                      color: config.mode === mode.id ? '#3b82f6' : '#64748b',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={18} />
                    {mode.name}
                  </button>
                );
              })}
            </div>

            {config.mode === 'online' && (
              <div style={{ display: 'flex', gap: '12px', animation: 'slideDown 0.3s ease-out' }}>
                {[
                  { id: 'computer', name: '电脑端' },
                  { id: 'mobile', name: '手机端' },
                ].map((device) => (
                  <button
                    key={device.id}
                    onClick={() => onConfigChange({ ...config, device: device.id })}
                    style={{
                      flex: 1,
                      padding: '10px 20px',
                      border: `2px solid ${config.device === device.id ? '#3b82f6' : '#e2e8f0'}`,
                      borderRadius: '8px',
                      backgroundColor: config.device === device.id ? '#eff6ff' : '#fff',
                      color: config.device === device.id ? '#3b82f6' : '#64748b',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {device.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '12px' }}>
              面试类型
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {interviewTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => onConfigChange({ ...config, interviewType: type.id })}
                  style={{
                    padding: '16px 12px',
                    border: `2px solid ${config.interviewType === type.id ? '#3b82f6' : '#e2e8f0'}`,
                    borderRadius: '12px',
                    backgroundColor: config.interviewType === type.id ? '#eff6ff' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <img
                    src={type.image}
                    alt={type.name}
                    style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
                  />
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: config.interviewType === type.id ? '#3b82f6' : '#374151',
                  }}>
                    {type.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '12px' }}>
              考官性格
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {personalities.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onConfigChange({ ...config, personality: p.id })}
                  style={{
                    padding: '14px 16px',
                    border: `2px solid ${config.personality === p.id ? '#3b82f6' : '#e2e8f0'}`,
                    borderRadius: '10px',
                    backgroundColor: config.personality === p.id ? '#eff6ff' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 600, color: config.personality === p.id ? '#3b82f6' : '#374151', marginBottom: '4px' }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: '12px', color: config.personality === p.id ? '#60a5fa' : '#94a3b8' }}>
                    {p.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                预估时长（分钟）
              </label>
              <div style={{ position: 'relative' }}>
                <Clock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="number"
                  value={config.duration}
                  onChange={(e) => onConfigChange({ ...config, duration: parseInt(e.target.value) || 30 })}
                  min="10"
                  max="120"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              backgroundColor: config.useDefault ? '#eff6ff' : '#f8fafc',
              border: `2px solid ${config.useDefault ? '#3b82f6' : '#e2e8f0'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              <input
                type="checkbox"
                checked={config.useDefault}
                onChange={(e) => onConfigChange({ ...config, useDefault: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{
                fontSize: '14px',
                fontWeight: 500,
                color: config.useDefault ? '#3b82f6' : '#64748b',
              }}>
                使用默认配置
              </span>
            </label>
          </div>
        </div>

        <div style={{
          padding: '20px 32px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              backgroundColor: '#fff',
              color: '#64748b',
              fontSize: '14px',
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
            onClick={onConfirm}
            disabled={!config.company || !config.position}
            style={{
              padding: '12px 32px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: (!config.company || !config.position) ? '#cbd5e1' : '#3b82f6',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: (!config.company || !config.position) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: (!config.company || !config.position) ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)',
            }}
            onMouseEnter={(e) => {
              if (config.company && config.position) {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = (!config.company || !config.position) ? '#cbd5e1' : '#3b82f6';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            确认开始
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// 笔试配置弹窗组件
function WrittenTestConfigModal({
  show,
  config,
  onClose,
  onConfigChange,
  onConfirm,
}: {
  show: boolean;
  config: any;
  onClose: () => void;
  onConfigChange: (config: any) => void;
  onConfirm: () => void;
}) {
  if (!show) return null;

  const subjects = [
    { id: 'frontend', name: '前端基础', icon: Monitor },
    { id: 'algorithm', name: '算法', icon: Code },
    { id: 'aptitude', name: '行测', icon: Target },
    { id: 'backend', name: '后端基础', icon: Server },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      animation: 'fadeIn 0.3s ease-out',
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        maxWidth: '640px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>
              笔试参数配置
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b' }}>配置您的模拟笔试环境</p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#f1f5f9',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
          >
            <X size={20} color="#64748b" />
          </button>
        </div>

        <div style={{ padding: '24px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                目标公司 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Building2 size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  value={config.company}
                  onChange={(e) => onConfigChange({ ...config, company: e.target.value })}
                  placeholder="例如：字节跳动"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                目标岗位 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <BriefcaseIcon size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  value={config.position}
                  onChange={(e) => onConfigChange({ ...config, position: e.target.value })}
                  placeholder="例如：前端开发工程师"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '12px' }}>
              笔试科目
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {subjects.map((subject) => {
                const Icon = subject.icon;
                return (
                  <button
                    key={subject.id}
                    onClick={() => onConfigChange({ ...config, subject: subject.id })}
                    style={{
                      padding: '14px 10px',
                      border: `2px solid ${config.subject === subject.id ? '#3b82f6' : '#e2e8f0'}`,
                      borderRadius: '10px',
                      backgroundColor: config.subject === subject.id ? '#eff6ff' : '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Icon size={20} style={{ color: config.subject === subject.id ? '#3b82f6' : '#64748b' }} />
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: config.subject === subject.id ? '#3b82f6' : '#374151',
                    }}>
                      {subject.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '12px' }}>
              笔试难度
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { id: 'easy', name: '简单', color: '#22c55e' },
                { id: 'medium', name: '中等', color: '#3b82f6' },
                { id: 'hard', name: '困难', color: '#ef4444' },
              ].map((level) => (
                <button
                  key={level.id}
                  onClick={() => onConfigChange({ ...config, difficulty: level.id })}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    border: `2px solid ${config.difficulty === level.id ? level.color : '#e2e8f0'}`,
                    borderRadius: '10px',
                    backgroundColor: config.difficulty === level.id ? `${level.color}10` : '#fff',
                    color: config.difficulty === level.id ? level.color : '#64748b',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              限时（分钟）
            </label>
            <div style={{ position: 'relative' }}>
              <Clock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="number"
                value={config.duration}
                onChange={(e) => onConfigChange({ ...config, duration: parseInt(e.target.value) || 45 })}
                min="10"
                max="180"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        <div style={{
          padding: '20px 32px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              backgroundColor: '#fff',
              color: '#64748b',
              fontSize: '14px',
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
            onClick={onConfirm}
            disabled={!config.company || !config.position}
            style={{
              padding: '12px 32px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: (!config.company || !config.position) ? '#cbd5e1' : '#3b82f6',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: (!config.company || !config.position) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: (!config.company || !config.position) ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)',
            }}
            onMouseEnter={(e) => {
              if (config.company && config.position) {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = (!config.company || !config.position) ? '#cbd5e1' : '#3b82f6';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            开始笔试
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (hasScrolledRef.current) return;
    const shouldScroll = location.state?.scrollToFeatures || window.location.hash === '#features';
    if (shouldScroll) {
      hasScrolledRef.current = true;
      setTimeout(() => {
        const target = document.getElementById('features');
        if (target) {
          const targetY = target.offsetTop - 80; // 预留 header 空间
          const startY = window.scrollY;
          const distance = targetY - startY;
          const duration = 700;
          const startTime = performance.now();
          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

          const scroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, startY + distance * easeOutCubic(progress));
            if (progress < 1) {
              requestAnimationFrame(scroll);
            }
          };
          requestAnimationFrame(scroll);
        }
      }, 450);
    }
  }, [location]);

  const [currentView, setCurrentView] = useState<'home' | 'mockInterview' | 'writtenTest' | 'feedback'>('home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // 面试配置弹窗状态
  const [showInterviewConfig, setShowInterviewConfig] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewConfig, setInterviewConfig] = useState({
    company: '',
    position: '',
    difficulty: 'medium',
    mode: 'online',
    device: 'computer',
    interviewType: 'oneToOne',
    personality: 'professional',
    duration: 30,
    useDefault: false,
  });

  // 笔试配置弹窗状态
  const [showWrittenTestConfig, setShowWrittenTestConfig] = useState(false);
  const [writtenTestConfig, setWrittenTestConfig] = useState({
    company: '',
    position: '',
    subject: 'frontend',
    difficulty: 'medium',
    duration: 45,
  });

  // 笔试答题状态
  const [writtenTestAnswers, setWrittenTestAnswers] = useState<Record<string, any>>({});
  const [writtenTestSubmitted, setWrittenTestSubmitted] = useState(false);

  // 笔试倒计时：从 32:15 开始
  const WRITTEN_TOTAL_SECONDS = 32 * 60 + 15; // 1935
  const [writtenRemainingSec, setWrittenRemainingSec] = useState(WRITTEN_TOTAL_SECONDS);

  useEffect(() => {
    if (writtenRemainingSec <= 0) return;
    const timer = setInterval(() => {
      setWrittenRemainingSec(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatWrittenTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // 反馈指导页面状态
  const [feedbackTab, setFeedbackTab] = useState<'interview' | 'writtenTest'>('interview');
  const [feedbackView, setFeedbackView] = useState<'report' | 'chat'>('report');
  const [feedbackMessages, setFeedbackMessages] = useState<{ id: number; role: string; content: string }[]>([]);
  const [feedbackInput, setFeedbackInput] = useState('');
  const feedbackChatEndRef = useRef<HTMLDivElement>(null);
  const feedbackTextareaRef = useRef<HTMLTextAreaElement>(null);
  
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

  // 面试配置弹窗组件
  const handleInterviewConfirm = () => {
    setShowInterviewConfig(false);
    setIsAnimating(true);
    setCurrentView('mockInterview');
    window.scrollTo(0, 0);
    setTimeout(() => {
      setIsAnimating(false);
    }, 550);
  };

  // 笔试配置确认
  const handleWrittenTestConfirm = () => {
    setShowWrittenTestConfig(false);
    setIsAnimating(true);
    setCurrentView('writtenTest');
    window.scrollTo(0, 0);
    setTimeout(() => {
      setIsAnimating(false);
    }, 550);
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
          <div className="feature-card" onClick={() => navigate('/app/profile?tab=resume', { state: { direction: 'forward' } })} style={{ cursor: 'pointer' }}>
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
          <div className="feature-card" onClick={() => setShowWrittenTestConfig(true)} style={{ cursor: 'pointer' }}>
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
          <div className="feature-card hot" onClick={() => setShowInterviewModal(true)} style={{ cursor: 'pointer' }}>
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

          {/* Full Process
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
          </div> */}

          {/* Feedback */}
          <div className="feature-card" onClick={() => {
            setIsAnimating(true);
            setCurrentView('feedback');
            setFeedbackView('report');
            setFeedbackTab('interview');
            window.scrollTo(0, 0);
            setTimeout(() => {
              setIsAnimating(false);
            }, 550);
          }} style={{ cursor: 'pointer' }}>
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


      {/* 面试配置弹窗 */}
      {createPortal(
        <InterviewConfigModal
          show={showInterviewConfig}
          config={interviewConfig}
          onClose={() => setShowInterviewConfig(false)}
          onConfigChange={setInterviewConfig}
          onConfirm={handleInterviewConfirm}
        />,
        document.body
      )}

      {/* 笔试配置弹窗 */}
      {createPortal(
        <WrittenTestConfigModal
          show={showWrittenTestConfig}
          config={writtenTestConfig}
          onClose={() => setShowWrittenTestConfig(false)}
          onConfigChange={setWrittenTestConfig}
          onConfirm={handleWrittenTestConfirm}
        />,
        document.body
      )}

      {/* AI面试配置弹窗 */}
      <InterviewModal 
        open={showInterviewModal} 
        onClose={() => setShowInterviewModal(false)} 
      />

      {/* 模拟面试页面 */}
      {currentView === 'mockInterview' && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f8fafc',
            zIndex: 3000,
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.4s ease-out',
          }}
        >
          {/* 主体内容区 */}
          <main style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '280px 1fr 320px',
            gap: '16px',
            padding: '16px',
            overflow: 'hidden',
          }}>
            {/* 左侧：用户个人画面 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                height: '200px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '4px 10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#fff',
                  zIndex: 2,
                }}>
                  用户个人画面
                </div>
                <img 
                  src="/src/assets/user.jpg" 
                  alt="用户"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>

            {/* 中间：数字人主体区域 */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img 
                src="/src/assets/examiner.jpg" 
                alt="数字人面试官"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '10px 20px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '20px',
                color: '#fff',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '2px',
                }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: '3px',
                        height: '14px',
                        backgroundColor: '#3b82f6',
                        borderRadius: '2px',
                        animation: `soundWave 1s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
                <span>AI 正在说话...</span>
              </div>
            </div>

            {/* 右侧：计时器 + 对话记录 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
            }}>
              {/* 计时器 */}
              <div style={{
                padding: '16px',
                borderBottom: '1px solid #e2e8f0',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>计时器</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', fontFamily: 'monospace' }}>
                  05:32
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                  2024-03-27 14:32:18
                </div>
              </div>

              {/* 对话记录 */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                {/* AI 提问 */}
                <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
                  <div style={{
                    padding: '10px 14px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '10px',
                    borderTopLeftRadius: '2px',
                    fontSize: '13px',
                    color: '#1e293b',
                  }}>
                    提问：请简单介绍一下你自己
                  </div>
                </div>

                {/* 用户回答 */}
                <div style={{ alignSelf: 'flex-end', maxWidth: '85%' }}>
                  <div style={{
                    padding: '10px 14px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '10px',
                    borderTopRightRadius: '2px',
                    fontSize: '13px',
                    color: '#fff',
                  }}>
                    回答：我叫张三，毕业于杭州电子科技大学...
                  </div>
                </div>

                {/* 点击显示回答分数 */}
                <div style={{ alignSelf: 'flex-end', maxWidth: '85%' }}>
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: '#dcfce7',
                    border: '1px dashed #22c55e',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#16a34a',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}>
                    点击显示回答分数
                  </div>
                </div>

                {/* 面试官行为 */}
                <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#d97706',
                  }}>
                    面试官行为：点了点头
                  </div>
                </div>

                {/* AI 提问 */}
                <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
                  <div style={{
                    padding: '10px 14px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '10px',
                    borderTopLeftRadius: '2px',
                    fontSize: '13px',
                    color: '#1e293b',
                  }}>
                    提问：能详细说说你的项目经验吗？
                  </div>
                </div>

                {/* 用户回答 */}
                <div style={{ alignSelf: 'flex-end', maxWidth: '85%' }}>
                  <div style={{
                    padding: '10px 14px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '10px',
                    borderTopRightRadius: '2px',
                    fontSize: '13px',
                    color: '#fff',
                  }}>
                    回答：在上一家公司我主要负责...
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* 底部控制栏 */}
          <div style={{
            padding: '16px 24px',
            backgroundColor: '#fff',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            position: 'relative',
          }}>
            {/* 麦克风 */}
            <button style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: '1px solid #e2e8f0',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              <Mic size={24} color="#374151" />
            </button>

            {/* 暂停/继续 */}
            <button style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: '1px solid #e2e8f0',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              <Pause size={24} color="#374151" />
            </button>

            {/* 相关设置(弹窗) */}
            <button style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: '1px solid #e2e8f0',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              <Settings size={24} color="#374151" />
            </button>

            {/* 视频设置 */}
            <button style={{
              padding: '12px 20px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '14px',
              color: '#374151',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              <Video size={20} color="#374151" />
              视频设置
            </button>

            {/* 结束面试按钮 - 右下角 */}
            <button
              onClick={() => {
                setIsAnimating(true);
                setCurrentView('home');
                setTimeout(() => {
                  setIsAnimating(false);
                }, 550);
              }}
              style={{
                position: 'absolute',
                right: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ef4444';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <PhoneOffIcon size={18} />
              结束面试
            </button>
          </div>

          <style>{`
            @keyframes soundWave {
              0%, 100% { transform: scaleY(0.5); }
              50% { transform: scaleY(1); }
            }
          `}</style>
        </div>
      )}

      {/* 笔试模拟页面 */}
      {currentView === 'writtenTest' && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f8fafc',
            zIndex: 3000,
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.4s ease-out',
          }}
        >
          {/* Header */}
          <header style={{
            backgroundColor: '#fff',
            borderBottom: '1px solid #e2e8f0',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => {
                  setWrittenTestSubmitted(false);
                  setWrittenTestAnswers({});
                  handleBackToHome(true);
                }}
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
                返回
              </button>
              <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
                笔试模拟
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                {writtenTestConfig.company} · {writtenTestConfig.position}
              </div>
              <div style={{
                padding: '8px 16px',
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                color: '#3b82f6',
                fontFamily: 'monospace',
              }}>
                剩余 {formatWrittenTime(writtenRemainingSec)}
              </div>
            </div>
          </header>

          {/* 题目区域 */}
          <main style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
          }}>
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}>
              {/* 选择题 */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    选择题
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>第 1 题 / 共 6 题</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1e293b', marginBottom: '16px' }}>
                  在 React 中，useEffect 的依赖数组如果为空数组 []，它的执行时机是什么？
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { id: 'A', text: '每次组件重新渲染时都会执行一次' },
                    { id: 'B', text: '组件首次挂载（Mount）完成后执行一次，后续重新渲染不再执行' },
                    { id: 'C', text: '组件卸载（Unmount）时执行一次' },
                    { id: 'D', text: '组件更新（Update）时执行一次' },
                  ].map((option) => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: `2px solid ${writtenTestAnswers.q1 === option.id ? '#3b82f6' : '#e2e8f0'}`,
                        backgroundColor: writtenTestSubmitted
                          ? option.id === 'B'
                            ? '#dcfce7'
                            : writtenTestAnswers.q1 === option.id && option.id !== 'B'
                              ? '#fee2e2'
                              : '#fff'
                          : writtenTestAnswers.q1 === option.id
                            ? '#eff6ff'
                            : '#fff',
                        cursor: writtenTestSubmitted ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name="q1"
                        value={option.id}
                        checked={writtenTestAnswers.q1 === option.id}
                        onChange={() => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q1: option.id })}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        disabled={writtenTestSubmitted}
                      />
                      <span style={{ fontSize: '14px', color: '#374151' }}>{option.text}</span>
                    </label>
                  ))}
                </div>
                {writtenTestSubmitted && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: writtenTestAnswers.q1 === 'B' ? '#dcfce7' : '#fee2e2',
                    border: `1px solid ${writtenTestAnswers.q1 === 'B' ? '#86efac' : '#fecaca'}`,
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: writtenTestAnswers.q1 === 'B' ? '#16a34a' : '#ef4444',
                      marginBottom: '4px',
                    }}>
                      {writtenTestAnswers.q1 === 'B' ? '✅ 回答正确' : '❌ 回答错误'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      正确答案：B。空依赖数组告诉 React，这个 effect 不依赖于组件 state 或 props 中的任何值，因此它永远不需要在重渲染时重新运行。
                    </div>
                  </div>
                )}
              </div>

              {/* q4 */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    选择题
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>第 2 题 / 共 6 题</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1e293b', marginBottom: '16px' }}>
                  在 CSS 标准盒模型中，元素的 width 属性指的是哪个部分的宽度？
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { id: 'A', text: 'content + padding + border + margin' },
                    { id: 'B', text: 'content + padding + border' },
                    { id: 'C', text: 'content 的宽度' },
                    { id: 'D', text: 'padding 的宽度' },
                  ].map((option) => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: `2px solid ${writtenTestAnswers.q4 === option.id ? '#3b82f6' : '#e2e8f0'}`,
                        backgroundColor: writtenTestSubmitted
                          ? option.id === 'C'
                            ? '#dcfce7'
                            : writtenTestAnswers.q4 === option.id && option.id !== 'C'
                              ? '#fee2e2'
                              : '#fff'
                          : writtenTestAnswers.q4 === option.id
                            ? '#eff6ff'
                            : '#fff',
                        cursor: writtenTestSubmitted ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name="q4"
                        value={option.id}
                        checked={writtenTestAnswers.q4 === option.id}
                        onChange={() => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q4: option.id })}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        disabled={writtenTestSubmitted}
                      />
                      <span style={{ fontSize: '14px', color: '#374151' }}>{option.text}</span>
                    </label>
                  ))}
                </div>
                {writtenTestSubmitted && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: writtenTestAnswers.q4 === 'C' ? '#dcfce7' : '#fee2e2',
                    border: `1px solid ${writtenTestAnswers.q4 === 'C' ? '#86efac' : '#fecaca'}`,
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: writtenTestAnswers.q4 === 'C' ? '#16a34a' : '#ef4444',
                      marginBottom: '4px',
                    }}>
                      {writtenTestAnswers.q4 === 'C' ? '✅ 回答正确' : '❌ 回答错误'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      正确答案：C。在标准盒模型中，width 只包含 content 区域的宽度，不包括 padding、border 和 margin。
                    </div>
                  </div>
                )}
              </div>

              {/* q5 */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    选择题
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>第 3 题 / 共 6 题</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1e293b', marginBottom: '16px' }}>
                  以下哪个方法可以将多个 Promise 实例包装成一个新的 Promise，并在所有 Promise 都成功后才 resolve？
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { id: 'A', text: 'Promise.race()' },
                    { id: 'B', text: 'Promise.all()' },
                    { id: 'C', text: 'Promise.any()' },
                    { id: 'D', text: 'Promise.resolve()' },
                  ].map((option) => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: `2px solid ${writtenTestAnswers.q5 === option.id ? '#3b82f6' : '#e2e8f0'}`,
                        backgroundColor: writtenTestSubmitted
                          ? option.id === 'B'
                            ? '#dcfce7'
                            : writtenTestAnswers.q5 === option.id && option.id !== 'B'
                              ? '#fee2e2'
                              : '#fff'
                          : writtenTestAnswers.q5 === option.id
                            ? '#eff6ff'
                            : '#fff',
                        cursor: writtenTestSubmitted ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name="q5"
                        value={option.id}
                        checked={writtenTestAnswers.q5 === option.id}
                        onChange={() => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q5: option.id })}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        disabled={writtenTestSubmitted}
                      />
                      <span style={{ fontSize: '14px', color: '#374151' }}>{option.text}</span>
                    </label>
                  ))}
                </div>
                {writtenTestSubmitted && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: writtenTestAnswers.q5 === 'B' ? '#dcfce7' : '#fee2e2',
                    border: `1px solid ${writtenTestAnswers.q5 === 'B' ? '#86efac' : '#fecaca'}`,
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: writtenTestAnswers.q5 === 'B' ? '#16a34a' : '#ef4444',
                      marginBottom: '4px',
                    }}>
                      {writtenTestAnswers.q5 === 'B' ? '✅ 回答正确' : '❌ 回答错误'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      正确答案：B。Promise.all() 接收一个 Promise 数组，当所有 Promise 都成功时返回结果数组；Promise.race() 返回最快完成的那个。
                    </div>
                  </div>
                )}
              </div>

              {/* q6 */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    选择题
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>第 4 题 / 共 6 题</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1e293b', marginBottom: '16px' }}>
                  在 JavaScript 严格模式下，普通函数中 this 的默认值是什么？
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { id: 'A', text: 'window' },
                    { id: 'B', text: 'undefined' },
                    { id: 'C', text: 'null' },
                    { id: 'D', text: '函数本身' },
                  ].map((option) => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: `2px solid ${writtenTestAnswers.q6 === option.id ? '#3b82f6' : '#e2e8f0'}`,
                        backgroundColor: writtenTestSubmitted
                          ? option.id === 'B'
                            ? '#dcfce7'
                            : writtenTestAnswers.q6 === option.id && option.id !== 'B'
                              ? '#fee2e2'
                              : '#fff'
                          : writtenTestAnswers.q6 === option.id
                            ? '#eff6ff'
                            : '#fff',
                        cursor: writtenTestSubmitted ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name="q6"
                        value={option.id}
                        checked={writtenTestAnswers.q6 === option.id}
                        onChange={() => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q6: option.id })}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        disabled={writtenTestSubmitted}
                      />
                      <span style={{ fontSize: '14px', color: '#374151' }}>{option.text}</span>
                    </label>
                  ))}
                </div>
                {writtenTestSubmitted && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: writtenTestAnswers.q6 === 'B' ? '#dcfce7' : '#fee2e2',
                    border: `1px solid ${writtenTestAnswers.q6 === 'B' ? '#86efac' : '#fecaca'}`,
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: writtenTestAnswers.q6 === 'B' ? '#16a34a' : '#ef4444',
                      marginBottom: '4px',
                    }}>
                      {writtenTestAnswers.q6 === 'B' ? '✅ 回答正确' : '❌ 回答错误'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      正确答案：B。在严格模式下，普通函数调用时 this 不再默认指向 window，而是 undefined。
                    </div>
                  </div>
                )}
              </div>

              {/* q7 */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    选择题
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>第 5 题 / 共 6 题</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1e293b', marginBottom: '16px' }}>
                  以下代码的输出顺序是什么？<br />console.log('1');<br />setTimeout(() =&gt; console.log('2'), 0);<br />Promise.resolve().then(() =&gt; console.log('3'));<br />console.log('4');
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { id: 'A', text: '1 2 3 4' },
                    { id: 'B', text: '1 4 3 2' },
                    { id: 'C', text: '1 4 2 3' },
                    { id: 'D', text: '1 3 4 2' },
                  ].map((option) => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: `2px solid ${writtenTestAnswers.q7 === option.id ? '#3b82f6' : '#e2e8f0'}`,
                        backgroundColor: writtenTestSubmitted
                          ? option.id === 'B'
                            ? '#dcfce7'
                            : writtenTestAnswers.q7 === option.id && option.id !== 'B'
                              ? '#fee2e2'
                              : '#fff'
                          : writtenTestAnswers.q7 === option.id
                            ? '#eff6ff'
                            : '#fff',
                        cursor: writtenTestSubmitted ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name="q7"
                        value={option.id}
                        checked={writtenTestAnswers.q7 === option.id}
                        onChange={() => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q7: option.id })}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        disabled={writtenTestSubmitted}
                      />
                      <span style={{ fontSize: '14px', color: '#374151' }}>{option.text}</span>
                    </label>
                  ))}
                </div>
                {writtenTestSubmitted && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: writtenTestAnswers.q7 === 'B' ? '#dcfce7' : '#fee2e2',
                    border: `1px solid ${writtenTestAnswers.q7 === 'B' ? '#86efac' : '#fecaca'}`,
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: writtenTestAnswers.q7 === 'B' ? '#16a34a' : '#ef4444',
                      marginBottom: '4px',
                    }}>
                      {writtenTestAnswers.q7 === 'B' ? '✅ 回答正确' : '❌ 回答错误'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      正确答案：B。同步代码先执行（1, 4），然后微任务 Promise（3），最后宏任务 setTimeout（2），所以顺序是 1 4 3 2。
                    </div>
                  </div>
                )}
              </div>

              {/* q8 */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    选择题
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>第 6 题 / 共 6 题</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1e293b', marginBottom: '16px' }}>
                  HTTP/2 相比 HTTP/1.1 的主要改进不包括以下哪一项？
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { id: 'A', text: '多路复用（Multiplexing）' },
                    { id: 'B', text: '头部压缩（Header Compression）' },
                    { id: 'C', text: '服务器推送（Server Push）' },
                    { id: 'D', text: '强制使用 TLS 加密' },
                  ].map((option) => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: `2px solid ${writtenTestAnswers.q8 === option.id ? '#3b82f6' : '#e2e8f0'}`,
                        backgroundColor: writtenTestSubmitted
                          ? option.id === 'D'
                            ? '#dcfce7'
                            : writtenTestAnswers.q8 === option.id && option.id !== 'D'
                              ? '#fee2e2'
                              : '#fff'
                          : writtenTestAnswers.q8 === option.id
                            ? '#eff6ff'
                            : '#fff',
                        cursor: writtenTestSubmitted ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name="q8"
                        value={option.id}
                        checked={writtenTestAnswers.q8 === option.id}
                        onChange={() => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q8: option.id })}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        disabled={writtenTestSubmitted}
                      />
                      <span style={{ fontSize: '14px', color: '#374151' }}>{option.text}</span>
                    </label>
                  ))}
                </div>
                {writtenTestSubmitted && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: writtenTestAnswers.q8 === 'D' ? '#dcfce7' : '#fee2e2',
                    border: `1px solid ${writtenTestAnswers.q8 === 'D' ? '#86efac' : '#fecaca'}`,
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: writtenTestAnswers.q8 === 'D' ? '#16a34a' : '#ef4444',
                      marginBottom: '4px',
                    }}>
                      {writtenTestAnswers.q8 === 'D' ? '✅ 回答正确' : '❌ 回答错误'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      正确答案：D。HTTP/2 支持多路复用、头部压缩和服务器推送，但并不强制要求使用 TLS（虽然主流浏览器都要求 HTTPS）。
                    </div>
                  </div>
                )}
              </div>

              {/* 填空题 */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#8b5cf6',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    填空题
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>第 1 题 / 共 3 题</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1e293b', marginBottom: '16px' }}>
                  HTTP 状态码 301 表示
                  <input
                    type="text"
                    value={writtenTestAnswers.q2 || ''}
                    onChange={(e) => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q2: e.target.value })}
                    disabled={writtenTestSubmitted}
                    placeholder="请填写"
                    style={{
                      width: '140px',
                      margin: '0 8px',
                      padding: '6px 12px',
                      border: writtenTestSubmitted
                        ? (writtenTestAnswers.q2 || '').trim().toLowerCase().includes('永久')
                          ? '2px solid #22c55e'
                          : '2px solid #ef4444'
                        : '2px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: writtenTestSubmitted
                        ? (writtenTestAnswers.q2 || '').trim().toLowerCase().includes('永久')
                          ? '#dcfce7'
                          : '#fee2e2'
                        : '#fff',
                    }}
                  />
                  重定向，302 表示
                  <input
                    type="text"
                    value={writtenTestAnswers.q2b || ''}
                    onChange={(e) => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q2b: e.target.value })}
                    disabled={writtenTestSubmitted}
                    placeholder="请填写"
                    style={{
                      width: '140px',
                      margin: '0 8px',
                      padding: '6px 12px',
                      border: writtenTestSubmitted
                        ? (writtenTestAnswers.q2b || '').trim().toLowerCase().includes('临时')
                          ? '2px solid #22c55e'
                          : '2px solid #ef4444'
                        : '2px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: writtenTestSubmitted
                        ? (writtenTestAnswers.q2b || '').trim().toLowerCase().includes('临时')
                          ? '#dcfce7'
                          : '#fee2e2'
                        : '#fff',
                    }}
                  />
                  重定向。
                </h3>
                {writtenTestSubmitted && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor:
                      ((writtenTestAnswers.q2 || '').trim().toLowerCase().includes('永久') &&
                       (writtenTestAnswers.q2b || '').trim().toLowerCase().includes('临时'))
                        ? '#dcfce7'
                        : '#fee2e2',
                    border: `1px solid ${
                      ((writtenTestAnswers.q2 || '').trim().toLowerCase().includes('永久') &&
                       (writtenTestAnswers.q2b || '').trim().toLowerCase().includes('临时'))
                        ? '#86efac'
                        : '#fecaca'
                    }`,
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color:
                        ((writtenTestAnswers.q2 || '').trim().toLowerCase().includes('永久') &&
                         (writtenTestAnswers.q2b || '').trim().toLowerCase().includes('临时'))
                          ? '#16a34a'
                          : '#ef4444',
                      marginBottom: '4px',
                    }}>
                      {((writtenTestAnswers.q2 || '').trim().toLowerCase().includes('永久') &&
                        (writtenTestAnswers.q2b || '').trim().toLowerCase().includes('临时'))
                        ? '✅ 回答正确'
                        : '❌ 回答错误'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      正确答案：301 是永久重定向（Moved Permanently），302 是临时重定向（Found/Moved Temporarily）。
                    </div>
                  </div>
                )}
              </div>

              {/* q9/q9b */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#8b5cf6',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    填空题
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>第 2 题 / 共 3 题</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1e293b', marginBottom: '16px' }}>
                  在 JavaScript 中，typeof null 的结果是
                  <input
                    type="text"
                    value={writtenTestAnswers.q9 || ''}
                    onChange={(e) => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q9: e.target.value })}
                    disabled={writtenTestSubmitted}
                    placeholder="请填写"
                    style={{
                      width: '140px',
                      margin: '0 8px',
                      padding: '6px 12px',
                      border: writtenTestSubmitted
                        ? (writtenTestAnswers.q9 || '').trim().toLowerCase().includes('object')
                          ? '2px solid #22c55e'
                          : '2px solid #ef4444'
                        : '2px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: writtenTestSubmitted
                        ? (writtenTestAnswers.q9 || '').trim().toLowerCase().includes('object')
                          ? '#dcfce7'
                          : '#fee2e2'
                        : '#fff',
                    }}
                  />
                  ，而 typeof [] 的结果是
                  <input
                    type="text"
                    value={writtenTestAnswers.q9b || ''}
                    onChange={(e) => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q9b: e.target.value })}
                    disabled={writtenTestSubmitted}
                    placeholder="请填写"
                    style={{
                      width: '140px',
                      margin: '0 8px',
                      padding: '6px 12px',
                      border: writtenTestSubmitted
                        ? (writtenTestAnswers.q9b || '').trim().toLowerCase().includes('object')
                          ? '2px solid #22c55e'
                          : '2px solid #ef4444'
                        : '2px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: writtenTestSubmitted
                        ? (writtenTestAnswers.q9b || '').trim().toLowerCase().includes('object')
                          ? '#dcfce7'
                          : '#fee2e2'
                        : '#fff',
                    }}
                  />
                  。
                </h3>
                {writtenTestSubmitted && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor:
                      ((writtenTestAnswers.q9 || '').trim().toLowerCase().includes('object') &&
                       (writtenTestAnswers.q9b || '').trim().toLowerCase().includes('object'))
                        ? '#dcfce7'
                        : '#fee2e2',
                    border: `1px solid ${
                      ((writtenTestAnswers.q9 || '').trim().toLowerCase().includes('object') &&
                       (writtenTestAnswers.q9b || '').trim().toLowerCase().includes('object'))
                        ? '#86efac'
                        : '#fecaca'
                    }`,
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color:
                        ((writtenTestAnswers.q9 || '').trim().toLowerCase().includes('object') &&
                         (writtenTestAnswers.q9b || '').trim().toLowerCase().includes('object'))
                          ? '#16a34a'
                          : '#ef4444',
                      marginBottom: '4px',
                    }}>
                      {((writtenTestAnswers.q9 || '').trim().toLowerCase().includes('object') &&
                        (writtenTestAnswers.q9b || '').trim().toLowerCase().includes('object'))
                        ? '✅ 回答正确'
                        : '❌ 回答错误'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      正确答案：typeof null 返回 &quot;object&quot; 是 JavaScript 的历史 bug；typeof [] 也返回 &quot;object&quot;，因为数组是对象的一种。
                    </div>
                  </div>
                )}
              </div>

              {/* q10/q10b */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#8b5cf6',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    填空题
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>第 3 题 / 共 3 题</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1e293b', marginBottom: '16px' }}>
                  CSS 中，position:
                  <input
                    type="text"
                    value={writtenTestAnswers.q10 || ''}
                    onChange={(e) => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q10: e.target.value })}
                    disabled={writtenTestSubmitted}
                    placeholder="请填写"
                    style={{
                      width: '140px',
                      margin: '0 8px',
                      padding: '6px 12px',
                      border: writtenTestSubmitted
                        ? (writtenTestAnswers.q10 || '').trim().toLowerCase().includes('absolute')
                          ? '2px solid #22c55e'
                          : '2px solid #ef4444'
                        : '2px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: writtenTestSubmitted
                        ? (writtenTestAnswers.q10 || '').trim().toLowerCase().includes('absolute')
                          ? '#dcfce7'
                          : '#fee2e2'
                        : '#fff',
                    }}
                  />
                  可以使元素相对于其最近的定位祖先元素进行定位，position:
                  <input
                    type="text"
                    value={writtenTestAnswers.q10b || ''}
                    onChange={(e) => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q10b: e.target.value })}
                    disabled={writtenTestSubmitted}
                    placeholder="请填写"
                    style={{
                      width: '140px',
                      margin: '0 8px',
                      padding: '6px 12px',
                      border: writtenTestSubmitted
                        ? (writtenTestAnswers.q10b || '').trim().toLowerCase().includes('fixed')
                          ? '2px solid #22c55e'
                          : '2px solid #ef4444'
                        : '2px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: writtenTestSubmitted
                        ? (writtenTestAnswers.q10b || '').trim().toLowerCase().includes('fixed')
                          ? '#dcfce7'
                          : '#fee2e2'
                        : '#fff',
                    }}
                  />
                  可以使元素相对于视口固定。
                </h3>
                {writtenTestSubmitted && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor:
                      ((writtenTestAnswers.q10 || '').trim().toLowerCase().includes('absolute') &&
                       (writtenTestAnswers.q10b || '').trim().toLowerCase().includes('fixed'))
                        ? '#dcfce7'
                        : '#fee2e2',
                    border: `1px solid ${
                      ((writtenTestAnswers.q10 || '').trim().toLowerCase().includes('absolute') &&
                       (writtenTestAnswers.q10b || '').trim().toLowerCase().includes('fixed'))
                        ? '#86efac'
                        : '#fecaca'
                    }`,
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color:
                        ((writtenTestAnswers.q10 || '').trim().toLowerCase().includes('absolute') &&
                         (writtenTestAnswers.q10b || '').trim().toLowerCase().includes('fixed'))
                          ? '#16a34a'
                          : '#ef4444',
                      marginBottom: '4px',
                    }}>
                      {((writtenTestAnswers.q10 || '').trim().toLowerCase().includes('absolute') &&
                        (writtenTestAnswers.q10b || '').trim().toLowerCase().includes('fixed'))
                        ? '✅ 回答正确'
                        : '❌ 回答错误'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      正确答案：absolute 定位相对于最近的定位祖先，fixed 定位相对于浏览器视口固定。
                    </div>
                  </div>
                )}
              </div>

              {/* 简答题 */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#f59e0b',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    简答题
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>第 1 题 / 共 2 题</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1e293b', marginBottom: '16px' }}>
                  在不使用第三方库的前提下，如何设计一个虚拟列表（Virtual List）来解决长列表渲染卡顿问题？请简述核心思路。
                </h3>
                <textarea
                  value={writtenTestAnswers.q3 || ''}
                  onChange={(e) => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q3: e.target.value })}
                  disabled={writtenTestSubmitted}
                  placeholder="请输入您的答案..."
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: writtenTestSubmitted
                      ? (writtenTestAnswers.q3 || '').trim().length > 20
                        ? '2px solid #22c55e'
                        : '2px solid #ef4444'
                      : '2px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    backgroundColor: writtenTestSubmitted
                      ? (writtenTestAnswers.q3 || '').trim().length > 20
                        ? '#dcfce7'
                        : '#fee2e2'
                      : '#fff',
                  }}
                />
                {writtenTestSubmitted && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#3b82f6',
                      marginBottom: '8px',
                    }}>
                      参考答案
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                      核心思路是「只渲染可视区域内的 DOM 节点」。具体步骤：
                      <br />1. 外层容器设置 overflow: auto 并监听 onScroll 事件；
                      <br />2. 根据每行固定高度计算总高度撑开滚动条；
                      <br />3. 在滚动事件中通过 scrollTop 计算当前可视区域的起始索引和结束索引；
                      <br />4. 只渲染这几十个 DOM 节点，并利用绝对定位推到正确的位置。
                    </div>
                  </div>
                )}
              </div>

              {/* q11 */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#f59e0b',
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    简答题
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>第 2 题 / 共 2 题</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#1e293b', marginBottom: '16px' }}>
                  请简述浏览器从输入 URL 到页面渲染完成的主要过程。
                </h3>
                <textarea
                  value={writtenTestAnswers.q11 || ''}
                  onChange={(e) => !writtenTestSubmitted && setWrittenTestAnswers({ ...writtenTestAnswers, q11: e.target.value })}
                  disabled={writtenTestSubmitted}
                  placeholder="请输入您的答案..."
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: writtenTestSubmitted
                      ? (writtenTestAnswers.q11 || '').trim().length > 20
                        ? '2px solid #22c55e'
                        : '2px solid #ef4444'
                      : '2px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    backgroundColor: writtenTestSubmitted
                      ? (writtenTestAnswers.q11 || '').trim().length > 20
                        ? '#dcfce7'
                        : '#fee2e2'
                      : '#fff',
                  }}
                />
                {writtenTestSubmitted && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#3b82f6',
                      marginBottom: '8px',
                    }}>
                      参考答案
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                      浏览器主要经历以下过程：1. DNS 解析获取 IP 地址；2. 建立 TCP 连接；3. 发送 HTTP 请求；4. 服务器返回 HTML；5. 浏览器解析 HTML 构建 DOM 树；6. 解析 CSS 构建 CSSOM；7. 合并为渲染树；8. 布局（Layout）计算元素位置；9. 绘制（Paint）到屏幕上。
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* 底部操作栏 */}
          <div style={{
            padding: '16px 24px',
            backgroundColor: '#fff',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
          }}>
            {!writtenTestSubmitted ? (
              <button
                onClick={() => {
                  setWrittenTestSubmitted(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  padding: '12px 48px',
                  border: 'none',
                  borderRadius: '10px',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                提交试卷
              </button>
            ) : (
              <button
                onClick={() => {
                  setWrittenTestSubmitted(false);
                  setWrittenTestAnswers({});
                  handleBackToHome(true);
                }}
                style={{
                  padding: '12px 48px',
                  border: 'none',
                  borderRadius: '10px',
                  backgroundColor: '#22c55e',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#16a34a';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#22c55e';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                确认返回
              </button>
            )}
          </div>
        </div>
      )}

      {/* 反馈指导页面 */}
      {currentView === 'feedback' && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f8fafc',
            zIndex: 3000,
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.4s ease-out',
          }}
        >
          {feedbackView === 'report' ? (
            <>
              {/* Report Header */}
              <header style={{
                backgroundColor: '#fff',
                borderBottom: '1px solid #e2e8f0',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button
                    onClick={() => {
                      setFeedbackView('report');
                      setFeedbackTab('interview');
                      handleBackToHome(true);
                    }}
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
                    返回首页
                  </button>
                  <select
                    value={feedbackTab}
                    onChange={(e) => setFeedbackTab(e.target.value as 'interview' | 'writtenTest')}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                      fontSize: '14px',
                      color: '#374151',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    <option value="interview">面试报告</option>
                    <option value="writtenTest">笔试报告</option>
                  </select>
                </div>
                <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
                  反馈指导
                </h1>
                <div style={{ width: '100px' }} />
              </header>

              {/* Report Content */}
              <main style={{
                flex: 1,
                overflowY: 'auto',
                padding: '32px',
              }}>
                <div style={{
                  maxWidth: '1200px',
                  margin: '0 auto',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '32px',
                }}>
                  {/* Left Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Score */}
                    <div style={{
                      backgroundColor: '#fff',
                      borderRadius: '16px',
                      padding: '32px',
                      border: '1px solid #e2e8f0',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '16px', color: '#64748b', marginBottom: '8px' }}>
                        {feedbackTab === 'interview' ? '面试总得分' : '笔试总得分'}
                      </div>
                      <div style={{
                        fontSize: '72px',
                        fontWeight: 700,
                        color: feedbackTab === 'interview' ? '#3b82f6' : '#8b5cf6',
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                      }}>
                        {feedbackTab === 'interview' ? '95' : '86'}
                      </div>
                    </div>

                    {/* Radar Chart */}
                    <div style={{
                      backgroundColor: '#fff',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid #e2e8f0',
                      height: '320px',
                    }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          cx="50%"
                          cy="50%"
                          outerRadius="70%"
                          data={feedbackTab === 'interview' ? [
                            { subject: '专业知识', score: 85, fullMark: 100 },
                            { subject: '面试策略', score: 70, fullMark: 100 },
                            { subject: '态度软实力', score: 95, fullMark: 100 },
                            { subject: '基础表现', score: 88, fullMark: 100 },
                            { subject: '语言表达', score: 92, fullMark: 100 },
                          ] : [
                            { subject: '选择题', score: 90, fullMark: 100 },
                            { subject: '填空题', score: 75, fullMark: 100 },
                            { subject: '简答题', score: 82, fullMark: 100 },
                          ]}
                        >
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar
                            name="Score"
                            dataKey="score"
                            stroke={feedbackTab === 'interview' ? '#3b82f6' : '#8b5cf6'}
                            fill={feedbackTab === 'interview' ? '#3b82f6' : '#8b5cf6'}
                            fillOpacity={0.15}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Highlights */}
                    <div style={{
                      backgroundColor: '#fff',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid #e2e8f0',
                    }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
                        {feedbackTab === 'interview' ? '面试亮点' : '笔试亮点'}
                      </h3>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '18px' }}>
                        {(feedbackTab === 'interview' ? [
                          '专业基础扎实，能够清晰阐述底层逻辑。',
                          '沟通表达流畅，面对压力问题不怯场。',
                          '对公司业务有提前调研，态度积极。',
                        ] : [
                          '前端基础概念掌握牢固，React 生命周期理解到位。',
                          'HTTP 协议基础知识扎实，能区分常见状态码。',
                          '简答题思路清晰，具备性能优化意识。',
                        ]).map((item, i) => (
                          <li key={i} style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Improvements */}
                    <div style={{
                      backgroundColor: '#fff',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid #e2e8f0',
                    }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
                        可改进的地方
                      </h3>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '18px' }}>
                        {(feedbackTab === 'interview' ? [
                          '部分算法题解题思路不够优化，需要补充时间复杂度分析。',
                          '对于过往项目的难点挖掘不够深，显得过于平铺直叙。',
                          '提问环节的问题略显宽泛，可以更聚焦于团队核心业务。',
                          '面试后半程语速偏快，需要注意节奏控制。',
                        ] : [
                          '填空题对 301/302 语义细节掌握不够精准，需加强记忆。',
                          '简答题缺少对不定高度虚拟列表的扩展思考。',
                          '答题速度偏慢，选择题耗时过长，需提升熟练度。',
                          '部分专业术语表述不够规范，建议多阅读技术文档。',
                        ]).map((item, i) => (
                          <li key={i} style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Meeting Notes */}
                    <div style={{
                      backgroundColor: '#fff',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid #e2e8f0',
                    }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', marginBottom: '16px' }}>
                        会议纪要
                      </h3>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '18px' }}>
                        {(feedbackTab === 'interview' ? [
                          '一面面试官主要考察了 React 原理和网络协议。',
                          '二面将侧重于架构设计和项目实战经验。',
                          'HR 确认了目前的薪资期望和最快到岗时间。',
                          '需要在一周内补充一份过往的开源项目代码样例。',
                        ] : [
                          '笔试时长 32 分钟，提前 13 分钟交卷。',
                          '选择题正确率 90%，填空题正确率 75%。',
                          '建议加强对 HTTP 状态码和性能优化方案的记忆。',
                          '通过分数线为 80 分，当前成绩达到通过标准。',
                        ]).map((item, i) => (
                          <li key={i} style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </main>

              {/* AI Chat Button */}
              <div style={{
                position: 'fixed',
                bottom: '32px',
                right: '32px',
              }}>
                <button
                  onClick={() => setFeedbackView('chat')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    backgroundColor: '#fff',
                    color: '#1e293b',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1e293b';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = '#1e293b';
                  }}
                >
                  与AI对话
                  <ChevronRight size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Chat Header */}
              <header style={{
                backgroundColor: '#fff',
                borderBottom: '1px solid #e2e8f0',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <button
                  onClick={() => {
                    setFeedbackView('report');
                    setFeedbackTab('interview');
                    handleBackToHome(true);
                  }}
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
                  返回首页
                </button>
                <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b' }}>
                  AI 反馈 · {feedbackTab === 'interview' ? '面试' : '笔试'}
                </h1>
                <div style={{ width: '100px' }} />
              </header>

              {/* Chat Layout */}
              <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '320px 1fr',
                overflow: 'hidden',
              }}>
                {/* Left Sidebar */}
                <div style={{
                  backgroundColor: '#fff',
                  borderRight: '1px solid #e2e8f0',
                  padding: '24px',
                  overflowY: 'auto',
                }}>
                  <button
                    onClick={() => setFeedbackView('report')}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      marginBottom: '24px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc',
                      color: '#374151',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#eff6ff';
                      e.currentTarget.style.borderColor = '#3b82f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    ← 返回报告
                  </button>

                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#16a34a', marginBottom: '10px' }}>
                      {feedbackTab === 'interview' ? '面试亮点' : '笔试亮点'}
                    </h4>
                    <ol style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {(feedbackTab === 'interview' ? [
                        '专业基础扎实，能够清晰阐述底层逻辑。',
                        '沟通表达流畅，面对压力问题不怯场。',
                      ] : [
                        '前端基础概念掌握牢固。',
                        '具备性能优化意识。',
                      ]).map((item, i) => (
                        <li key={i} style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#ef4444', marginBottom: '10px' }}>
                      可改进的地方
                    </h4>
                    <ol style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {(feedbackTab === 'interview' ? [
                        '部分算法题解题思路不够优化。',
                        '对于过往项目的难点挖掘不够深。',
                      ] : [
                        '填空题对语义细节掌握不够精准。',
                        '简答题缺少扩展思考。',
                      ]).map((item, i) => (
                        <li key={i} style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#3b82f6', marginBottom: '10px' }}>
                      会议纪要
                    </h4>
                    <ol style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {(feedbackTab === 'interview' ? [
                        '一面考察了 React 原理和网络协议。',
                        '需在一周内补充开源代码样例。',
                      ] : [
                        '笔试时长 32 分钟，提前交卷。',
                        '当前成绩达到通过标准。',
                      ]).map((item, i) => (
                        <li key={i} style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Right Chat Area */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}>
                  {/* Chat Messages */}
                  <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '24px',
                  }}>
                    {feedbackMessages.length === 0 ? (
                      <div style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94a3b8',
                      }}>
                        <Sparkles size={48} strokeWidth={1.5} style={{ marginBottom: '16px' }} />
                        <h2 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '8px' }}>向我提问吧</h2>
                        <p style={{ fontSize: '14px', marginBottom: '24px' }}>
                          任何{feedbackTab === 'interview' ? '面试' : '笔试'}中没发挥好的问题，都可以随时问我
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {(feedbackTab === 'interview' ? [
                            "帮我详细复盘一下微前端那道题",
                            "针对'可改进的地方'第一点，能给我个标准答案吗？",
                            "如果重面一次，我该怎么做自我介绍？",
                          ] : [
                            "帮我详细解析一下 useEffect 的执行时机",
                            "301 和 302 到底有什么区别？",
                            "不定高度的虚拟列表应该怎么实现？",
                          ]).map((prompt, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                const newUserMsg = { id: Date.now(), role: 'user', content: prompt };
                                setFeedbackMessages((prev) => [...prev, newUserMsg]);
                                setTimeout(() => {
                                  setFeedbackMessages((prev) => [...prev, {
                                    id: Date.now() + 1,
                                    role: 'ai',
                                    content: `好的！关于这个问题，核心要点有三点。首先${feedbackTab === 'interview' ? '要理清思路' : '要理解概念'}，其次是...（这里是 AI 详细的解答）。`,
                                  }]);
                                }, 1200);
                              }}
                              style={{
                                padding: '10px 16px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                color: '#64748b',
                                fontSize: '13px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#3b82f6';
                                e.currentTarget.style.color = '#3b82f6';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.color = '#64748b';
                              }}
                            >
                              <MessageSquarePlus size={14} style={{ marginRight: '8px', display: 'inline' }} />
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
                        {feedbackMessages.map((msg) => (
                          <div
                            key={msg.id}
                            style={{
                              display: 'flex',
                              gap: '12px',
                              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            }}
                          >
                            {msg.role === 'ai' && (
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: '#eff6ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}>
                                <Sparkles size={16} style={{ color: '#3b82f6' }} />
                              </div>
                            )}
                            <div style={{
                              padding: '12px 16px',
                              borderRadius: '12px',
                              maxWidth: '70%',
                              fontSize: '14px',
                              lineHeight: 1.6,
                              backgroundColor: msg.role === 'user' ? '#3b82f6' : '#fff',
                              color: msg.role === 'user' ? '#fff' : '#1e293b',
                              border: msg.role === 'user' ? 'none' : '1px solid #e2e8f0',
                              borderTopRightRadius: msg.role === 'user' ? '4px' : '12px',
                              borderTopLeftRadius: msg.role === 'ai' ? '4px' : '12px',
                            }}>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                        <div ref={feedbackChatEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <div style={{
                    padding: '20px 24px',
                    backgroundColor: '#fff',
                    borderTop: '1px solid #e2e8f0',
                  }}>
                    <div style={{
                      maxWidth: '800px',
                      margin: '0 auto',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-end',
                    }}>
                      <textarea
                        ref={feedbackTextareaRef}
                        value={feedbackInput}
                        onChange={(e) => {
                          setFeedbackInput(e.target.value);
                          if (feedbackTextareaRef.current) {
                            feedbackTextareaRef.current.style.height = 'auto';
                            feedbackTextareaRef.current.style.height = `${Math.min(feedbackTextareaRef.current.scrollHeight, 120)}px`;
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (!feedbackInput.trim()) return;
                            const newUserMsg = { id: Date.now(), role: 'user', content: feedbackInput };
                            setFeedbackMessages((prev) => [...prev, newUserMsg]);
                            setFeedbackInput('');
                            if (feedbackTextareaRef.current) {
                              feedbackTextareaRef.current.style.height = 'auto';
                            }
                            setTimeout(() => {
                              setFeedbackMessages((prev) => [...prev, {
                                id: Date.now() + 1,
                                role: 'ai',
                                content: '收到！我来为你详细分析一下这个问题。从本质上来说...',
                              }]);
                            }, 1200);
                          }
                        }}
                        placeholder="有问题就问我..."
                        rows={1}
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '10px',
                          fontSize: '14px',
                          outline: 'none',
                          resize: 'none',
                          maxHeight: '120px',
                        }}
                      />
                      <button
                        onClick={() => {
                          if (!feedbackInput.trim()) return;
                          const newUserMsg = { id: Date.now(), role: 'user', content: feedbackInput };
                          setFeedbackMessages((prev) => [...prev, newUserMsg]);
                          setFeedbackInput('');
                          if (feedbackTextareaRef.current) {
                            feedbackTextareaRef.current.style.height = 'auto';
                          }
                          setTimeout(() => {
                            setFeedbackMessages((prev) => [...prev, {
                              id: Date.now() + 1,
                              role: 'ai',
                              content: '收到！我来为你详细分析一下这个问题。从本质上来说...',
                            }]);
                          }, 1200);
                        }}
                        disabled={!feedbackInput.trim()}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: feedbackInput.trim() ? '#3b82f6' : '#e2e8f0',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: feedbackInput.trim() ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s',
                          flexShrink: 0,
                        }}
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
                      AI 可能会产生误导性信息，复盘结果仅供参考。
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}