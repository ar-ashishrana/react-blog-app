import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home.jsx'
import { AuthLayout } from './components/index.js'
import Login from './pages/Login.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Signup from './pages/Signup.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children:[
      {
        path:'/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/posts',
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: '/post/:slug',
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        )
      }

    ]
  },
  {
    path:'/*',
    element: <NotFound />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  </StrictMode>,
)
