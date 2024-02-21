import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterForm'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import UserHome from '../layout/UserHome'
import ProductHome from '../layout/ProductHome'
import SerialHome from '../layout/SerialHome'
import NewWareHouse from '../layout/NewWareHouse'
import NewProduct from '../layout/NewProduct'
import NewSerialFrom from '../layout/NewSerialFrom'

const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      { index: true, element: <LoginForm /> },
      { path: '/register', element: <RegisterForm />}
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children : [
      { index: true, element: <UserHome /> },
      { path: '/new', element: <NewWareHouse />},
      { path: '/product', element: <ProductHome />},
      { path: '/addproduct', element: <NewProduct />},
      { path: '/serial', element: <SerialHome />},
      { path: '/addserial', element: <NewSerialFrom />},
    ]
  }
])

export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.id ? userRouter : guestRouter
  return (
    <RouterProvider router={finalRouter} />
  )
}
