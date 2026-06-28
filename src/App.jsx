import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LoginState from './Contex_API/LoginState';
import NotFound404 from './pages/NotFound404';
import UserAccount from './pages/UserAccount';
import AddProduct from './pages/AddProduct';
import CartPage from './pages/CartPage';
import FilterProduct from './pages/FilterProduct';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessFullyPlaced from './pages/OrderSuccessFullyPlaced.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import Deals from './pages/deals.jsx';
import ContactUS from './pages/ContackUS.jsx';


function App() {
  return (
    <LoginState>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/:id" element={<UserAccount/>} />
        <Route path='/add-products' element={<AddProduct/>}/>
        <Route path='/cart/:id' element={<CartPage/>}/>
        <Route path='/products' element={<FilterProduct/>}/>
        <Route path='/products/:id' element={<ProductDetailPage/>}/>
        <Route path='/checkoutpage/:id' element={<CheckoutPage/>}/>
        <Route path='/orders/:id' element={<OrdersPage/>}/>
        <Route path='/deals' element={<Deals/>}/>
        <Route path='/contact-us' element={<ContactUS/>}/>
        <Route path='/ordersuccessfully-placed' element={<OrderSuccessFullyPlaced/>}/>

        
        <Route path="*" element={<NotFound404/>} />

      </Routes>
    </LoginState>
  );
}

export default App;