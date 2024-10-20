import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register'
import Brands from './components/Brands/Brands'
import Carts from './components/Carts/Carts'
import Orders from './components/Orders/Orders'
import Notfound from './components/Notfound/Notfound'
import UserContextProvider from './context/userContext'
import ProductDetails from './components/ProductDetails/ProductDetails';
import Contact from './components/Contact/Contact';
import AddProduct from './components/AddProduct/AddProduct'

import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'

let routers = createBrowserRouter([
  {path:'' , element:<Layout/> , children:[
    {index:true , element:<ProtectedRoutes><Products/></ProtectedRoutes>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'brands' , element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
    {path:'carts' , element:<ProtectedRoutes><Carts/></ProtectedRoutes>},
    {path:'orders' , element:<ProtectedRoutes><Orders/></ProtectedRoutes>},
    {path: '/products/:ProductId',  element:<ProductDetails/>},
    {path:'contact' , element:<Contact/>},
    { path: 'add-product', element: <ProtectedRoutes><AddProduct /></ProtectedRoutes> }, // New route for AddProduct

    {path:'*' , element:<Notfound/>}
  ]}
])

function App() {

  return (
    <>
    <UserContextProvider> 
    
    <RouterProvider router = {routers}></RouterProvider>

    </UserContextProvider>


   
    </>
  )
}

export default App
