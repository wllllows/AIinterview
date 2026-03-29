import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Login from '../pages/Login'

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
        element: <Login />, 
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