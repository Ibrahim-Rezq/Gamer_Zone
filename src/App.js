import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
    Home,
    Cart,
    Checkout,
    About,
    Products,
    SingleProduct,
    Error,
    PrivateRoute,
    AuthWrapper,
} from './pages'
function App() {
    return (
        <>
            <AuthWrapper>
                <BrowserRouter>
                    <Navbar />
                    <Sidebar />
                    <Routes>
                        <Route exact path='/' element={<Home />}></Route>
                        <Route exact path='/cart' element={<Cart />}></Route>
                        <Route
                            path='/checkout'
                            element={
                                <PrivateRoute>
                                    <Checkout />
                                </PrivateRoute>
                            }
                        ></Route>
                        <Route path='/about' element={<About />}></Route>
                        <Route
                            exact
                            path='/products'
                            element={<Products />}
                        ></Route>

                        <Route
                            exact
                            path='/products/:productId'
                            element={<SingleProduct />}
                        />
                        <Route path='/*' element={<Error />}></Route>
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </AuthWrapper>
        </>
    )
}

export default App
