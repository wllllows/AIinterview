import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'

import Home from '../pages/Home'
import Questions from '../pages/Questions'
import Community from '../pages/Community'
import AIInterview from '../pages/AIInterview'
import ArticleDetail from '../pages/ArticleDetail' // 1. 引入新页面

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
            /* 2. 新增文章详情路由 */
            {
                path: 'post/:id',
                element: <ArticleDetail />,
            },
        ],
    },
])

export default router