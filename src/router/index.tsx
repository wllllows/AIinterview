import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'

import Home from '../pages/Home'
import Questions from '../pages/Questions'
import Community from '../pages/Community'
import AIInterview from '../pages/AIInterview'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />, // ✅ 布局
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
        ],
    },
])

export default router