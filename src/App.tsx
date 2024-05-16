import React, { useEffect, useState } from 'react';

import { About } from './components/About/About.tsx';
import { CartProvider } from './components/CartContent/CartContent.tsx';
import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Products } from './components/Products/Products.tsx';
import { Page } from './pages.ts';

import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>(Page.PRODUCTS);
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            setIsDarkTheme(mediaQuery.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    useEffect(() => {
        document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
        localStorage.setItem('theme', JSON.stringify(isDarkTheme));
    }, [isDarkTheme]);

    const handlePageChange = (page: Page) => {
        setCurrentPage(page);
    };

    const handleThemeChange = (isDark: boolean) => {
        setIsDarkTheme(isDark);
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
