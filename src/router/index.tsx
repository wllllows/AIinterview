import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'

import Home from '../pages/Home'
import Questions from '../pages/Questions'
import Community from '../pages/Community'
import AIInterview from '../pages/AIInterview'
import ArticleDetail from '../pages/ArticleDetail' // 1. 引入新页面
import ProfileInfo from '../pages/ProfileInfo/ProfileInfo'

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
                path: 'ai',
                element: <AIInterview />,
            },
            {
                path: 'post/:id',
                element: <ArticleDetail />,
            },
            {
                path: '/profile',
                element: <ProfileInfo/>,
            }
        ],
    },
])

export default router