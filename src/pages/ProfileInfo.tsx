import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText, Zap, BarChart2 } from 'lucide-react';
import GrowthTab from './GrowthTab';
import LearningTab from './LearningTab';
import ResumeForm from './ResumeForm';
import './ProfileInfo.css';

export default function ProfileCenter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = (searchParams.get('tab') as 'growth' | 'learning' | 'resume' | null) || 'growth';
    const [activeTab, setActiveTab] = useState<'growth' | 'learning' | 'resume'>(initialTab);

    useEffect(() => {
        const tabFromUrl = searchParams.get('tab') as 'growth' | 'learning' | 'resume' | null;
        if (tabFromUrl && ['growth', 'learning', 'resume'].includes(tabFromUrl) && tabFromUrl !== activeTab) {
            setActiveTab(tabFromUrl);
        }
    }, [searchParams]);

    return (
        <div className="profile-center-container">
            {/* 顶部标题与导航 */}
            <div className="profile-header-aligned">
                <div className="header-titles">
                    <div className="title-row">
                        <h1 className="page-title">成长看板</h1>
                    </div>
                    <p className="page-subtitle">记录你的每一次蜕变与能力沉淀</p>
                </div>

                <div className="segmented-control">
                    <button className={`segment-btn ${activeTab === 'growth' ? 'active' : ''}`} onClick={() => { setActiveTab('growth'); setSearchParams({ tab: 'growth' }); }}>
                        <BarChart2 size={14} style={{ marginRight: '4px' }} /> 能力洞察
                    </button>
                    <button className={`segment-btn ${activeTab === 'learning' ? 'active' : ''}`} onClick={() => { setActiveTab('learning'); setSearchParams({ tab: 'learning' }); }}>
                        <Zap size={14} style={{ marginRight: '4px' }} /> 突破路径
                    </button>
                    <button className={`segment-btn ${activeTab === 'resume' ? 'active' : ''}`} onClick={() => { setActiveTab('resume'); setSearchParams({ tab: 'resume' }); }}>
                        <FileText size={14} style={{ marginRight: '4px' }} /> 个人档案
                    </button>
                </div>
            </div>

            {/* 动态渲染子组件 */}
            <div className="profile-content">
                {activeTab === 'growth' && <GrowthTab />}
                {activeTab === 'learning' && <LearningTab />}
                {activeTab === 'resume' && <ResumeForm />}
            </div>
        </div>
    );
}