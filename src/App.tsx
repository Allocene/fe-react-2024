import { useState } from 'react';

import { About } from './components/About/About.tsx';
import { CartProvider } from './components/CartContent/CartContent.tsx';
import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Products } from './components/Products/Products.tsx';
import { Page } from './pages.ts';

import './App.css';

const pageComponents = {
    [Page.ABOUT]: <About />,
    [Page.PRODUCTS]: <Products />,
} as const;

function App() {
    const [currentPage, setCurrentPage] = useState<Page>(Page.PRODUCTS);

    const handlePageChange = (page: Page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <CartProvider>
                <Header onPageChange={handlePageChange} />
                {pageComponents[currentPage]}
                <Footer />
            </CartProvider>
        </>
    );
}

export default App;
