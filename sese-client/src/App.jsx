import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Layout & Pages
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      // Renamed from articles to projects
      {
        path: 'projects',
        element: <ArticleListPage />,
      },
      {
        path: 'projects/:id',
        element: <ArticlePage />,
      },
      // Catch-all route to display NotFoundPage
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;