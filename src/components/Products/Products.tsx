import React, { useMemo, useState } from 'react';

import { FilterType } from '../../filterType.ts';
import { Pagination } from '../Pagination/Pagination';
import { ProductCard } from '../ProductCard/ProductCard';
import type Product from '../ProductsInterface/ProductsInterface.tsx';
import { SearchBar } from '../SearchBar/SearchBar';

import { mock } from './mock';

import styles from './products.module.css';

const itemsPerPage = 8;

const filterProducts = (products: Product[], filter: FilterType, searchQuery: string, selectedCategories: string[]) =>
    products
        .filter((product) => !searchQuery || product.title?.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => selectedCategories.length === 0 || selectedCategories.includes(product.category?.name ?? ''))
        .sort((a, b) => {
            switch (filter) {
                case FilterType.PRICE: {
                    return (b.price ?? 0) - (a.price ?? 0);
                }
                case FilterType.NEWEST: {
                    return new Date(b.creationAt ?? '').getTime() - new Date(a.creationAt ?? '').getTime();
                }
                case FilterType.OLDEST: {
                    return new Date(a.creationAt ?? '').getTime() - new Date(b.creationAt ?? '').getTime();
                }
                default: {
                    return 0;
                }
            }
        });

export const Products: React.FC<{ isDarkTheme: boolean }> = ({ isDarkTheme }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState<FilterType>(FilterType.PRICE);
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

    const handleFilterChange = (selectedFilter: FilterType) => {
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
                    <ProductCard key={item.id ?? ''} product={item} />
                ))}
            </div>
            <Pagination totalItems={filteredItems.length} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
        </main>
    );
};
