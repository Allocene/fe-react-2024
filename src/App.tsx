// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { About } from './components/About/About';
import { CartProvider } from './components/CartContent/CartContent';
import { ThemeProvider } from './components/CartContent/ThemeContext';
import useTheme from './components/customHooks/useTheme';
import LayoutComponent from './components/LayoutComponent/LayoutComponent';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { Products } from './components/Products/Products';

import './App.css';

function App() {
    const { isDarkTheme, handleThemeChange } = useTheme();

    return (
        <Router>
            <ThemeProvider>
                <CartProvider>
                    <LayoutComponent onThemeChange={handleThemeChange} isDarkMode={isDarkTheme}>
                        <Routes>
                            <Route path="/" element={<About />} />
                            <Route path="/products" element={<Products isDarkTheme={isDarkTheme} />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </LayoutComponent>
                </CartProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
