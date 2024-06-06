import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { About } from './components/About/About';
import { CartProvider } from './components/CartContent/CartContent';
import { ThemeProvider } from './components/CartContent/ThemeContext';
import useTheme from './components/customHooks/useTheme';
import LayoutComponent from './components/LayoutComponent/LayoutComponent';
import PageNotFound from './components/PageNotFound/PageNotFound';
import ProductPage from './components/ProductPage/ProductPage';
import { Products } from './components/Products/Products';

import './App.css';

function App() {
    const { isDarkTheme, handleThemeChange } = useTheme();

    return (
        <Router basename="/fe-react-2024">
            <ThemeProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/" element={<LayoutComponent onThemeChange={handleThemeChange} isDarkMode={isDarkTheme} />}>
                            <Route index element={<About />} />
                            <Route path="products" element={<Products isDarkTheme={isDarkTheme} />} />
                            <Route path="products/:id" element={<ProductPage />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Route>
                    </Routes>
                </CartProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
