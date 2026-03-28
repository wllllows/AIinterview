import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'

import Home from '../pages/Home'
import Questions from '../pages/Questions'
import Community from '../pages/Community'
import ArticleDetail from '../pages/ArticleDetail'
import ProfileInfo from '../pages/ProfileInfo'
import Interview from '../pages/Interview'
import InterviewSummary from '../pages/InterviewSummary'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />, 
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'questions',
                element: <Questions />,
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
                element: <Navigate to="/" replace />
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
    }
])

export default router