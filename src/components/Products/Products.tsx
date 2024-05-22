import React, { useMemo, useState } from 'react';

import { Pagination } from '../Pagination/Pagination';
import { ProductCard } from '../ProductCard/ProductCard';
import { SearchBar } from '../SearchBar/SearchBar';

import { mock } from './mock';

import styles from './products.module.css';

const itemsPerPage = 8;

interface ProductsProps {
    isDarkTheme: boolean;
}

const filterProducts = (products: typeof mock, filter: string, searchQuery: string, selectedCategories: string[]) => {
    let filteredProducts = products;

    if (searchQuery) {
        filteredProducts = filteredProducts.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter((product) => selectedCategories.includes(product.category.name));
    }

    switch (filter) {
        case 'price': {
            return filteredProducts.sort((a, b) => b.price - a.price);
        }
        case 'newest': {
            return filteredProducts.sort((a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime());
        }
        case 'oldest': {
            return filteredProducts.sort((a, b) => new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime());
        }
        default: {
            return filteredProducts;
        }
    }
};

export const Products: React.FC<ProductsProps> = ({ isDarkTheme }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const filteredItems = useMemo(
        () => filterProducts(mock, filter, searchQuery, selectedCategories),
        [filter, searchQuery, selectedCategories],
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (selectedFilter: string) => {
        setFilter(selectedFilter);
        setCurrentPage(1);
    };

    const handleSearchChange = (searchTerm: string) => {
        setSearchQuery(searchTerm);
        setCurrentPage(1);
    };

    const handleCategoryChange = (categories: string[]) => {
        setSelectedCategories(categories);
        setCurrentPage(1);
    };

    return (
        <main className={`${styles.main} ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <SearchBar onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} onCategoryChange={handleCategoryChange} />
            <div className={styles.products}>
                {currentItems.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
            <Pagination totalItems={filteredItems.length} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
        </main>
    );
};
