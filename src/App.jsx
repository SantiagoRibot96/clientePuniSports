import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import ErrorPage from './components/ErrorPage/ErrorPage';
import ProductsDetail from './components/ProductsDetail/ProductsDetail';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Register from './components/Register/Register';
import UpdateProducts from './components/UpdateProducts/UpdateProducts';
import Ticket from './components/Ticket/Ticket';
import NewProduct from './components/NewProduct/NewProduct';
import UploadFiles from './components/UploadFiles/UploadFiles';
import { ContextProvider } from './context/SessionContext';
import MPButton from './components/MPButton/MPButton';

const App = () => {  
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Navbar/>

          <Routes>
            <Route path='/' element={ <Products/> } />
            <Route path='/product/:pid' element={ <ProductsDetail/> } />
            <Route path='/carrito' element={ <Cart/> } />
            <Route path='/comprar/:cid' element={ <Ticket/> } />
            <Route path='/updateProducts/:pid' element={ <UpdateProducts/> } />
            <Route path='/perfil' element={ <Profile/> } />
            <Route path='/misProductos' element={ <Products rol={true}/> }/>
            <Route path='/newProduct' element={ <NewProduct/> }/>
            <Route path='/productos' element={ <Products/> } />
            <Route path='/login' element={ <Login/> } />
            <Route path='/logout' element={ <Logout/> } />
            <Route path='/uploadFiles' element={ <UploadFiles/> } />
            <Route path='/registrarse' element={ <Register/> } />
            <Route path='/reset-password' element={ <ResetPassword/>}/>
            <Route path='/reset-password/:mail' element={ <ResetPassword/>}/>
            <Route path='*' element={ <ErrorPage/> } />
          </Routes>
        </ContextProvider> 
      </BrowserRouter>
    </>
  )
}

export default App