import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'

// 🌟 1. 引入我们即将创建的过渡包裹页面，不需要直接引入 Login 了（它会在过渡页内部被引入）
import LandingTransition from '../pages/LandingTransition'

import Home from '../pages/Home'
import Mistakesbook from '../pages/Mistakesbook'
import Community from '../pages/Community'
import ArticleDetail from '../pages/ArticleDetail'
import ProfileInfo from '../pages/ProfileInfo'
import Interview from '../pages/Interview'
import InterviewSummary from '../pages/InterviewSummary'
import AIReview from '../pages/AIReview'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
    {
        path: '/login',
        // 🌟 2. 将原本的 <Login /> 替换为 <LandingTransition />
        element: <LandingTransition />, 
    },
    {
        path: '/app',
        element: <MainLayout />, 
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'mistakesbook',
                element: <Mistakesbook />,
            },
            {
                path: 'community',
                element: <Community />,
            },
            {
                path: 'post/:id',
                element: <ArticleDetail />,
            },
            {
                path: 'profile',
                element: <ProfileInfo />,
            },
            {
                path: 'ai',
                element: <Navigate to="/app" replace />
            }
        ],
    },
    {
        path: '/interview/start',
        element: <Interview />, 
    },
    {
        path: '/interview/summary',
        element: <InterviewSummary />, 
    },
    {
        path: '/interview/review',
        element: <AIReview />,
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />
    }
])

export default router