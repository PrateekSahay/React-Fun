import React, { Suspense } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import About from './About';
import Home from './Home';

import Product from './Product';
import Nav from './Nav';
import './styles.css'

const HelpAPI = React.lazy(() => import('./HelpAPI'));
const HelpAPIAxios = React.lazy(() => import('./HelpAPIAxios'));

const RouterHome = () => {
  return (
    <BrowserRouter>
        <Nav />
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/help' Component={HelpAPI} />
            <Route path='/helpAxios' Component={HelpAPIAxios} />
            <Route path='/product/:id' element={<Product />} />
        </Routes>
        </Suspense>
    </BrowserRouter>    
  )
}

export default RouterHome