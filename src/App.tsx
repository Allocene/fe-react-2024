import { useState } from 'react';

import { About } from './components/About/About.tsx';
import { Footer } from './components/footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';
import { Products } from './components/Products/Products.tsx';
import { Page } from './pages.ts';

import './App.css';

const pageComponents: Record<Page, JSX.Element> = {
    [Page.ABOUT]: <About />,
    [Page.PRODUCTS]: <Products />,
};

function App() {
    const [currentPage, setCurrentPage] = useState<Page>(Page.PRODUCTS);

    const handlePageChange = (page: Page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Header onPageChange={handlePageChange} />
            {pageComponents[currentPage]}
            <Footer />
        </>
    );
}

export default App;
