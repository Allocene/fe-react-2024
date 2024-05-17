import React, { useState } from 'react';

import { About } from './components/About/About.tsx';
import { CartProvider } from './components/CartContent/CartContent.tsx';
import useTheme from './components/customHooks/useTheme.ts';
import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Products } from './components/Products/Products.tsx';
import { Page } from './pages.ts';

import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>(Page.PRODUCTS);
    const { isDarkTheme, handleThemeChange } = useTheme();

    const handlePageChange = (page: Page) => {
        setCurrentPage(page);
    };

    const pageComponents = {
        [Page.ABOUT]: <About />,
        [Page.PRODUCTS]: <Products isDarkTheme={isDarkTheme} />,
    } as const;

    return (
        <>
            <CartProvider>
                <Header onPageChange={handlePageChange} onThemeChange={handleThemeChange} isDarkMode={isDarkTheme} />
                {pageComponents[currentPage]}
                <Footer />
            </CartProvider>
        </>
    );
}

export default App;
