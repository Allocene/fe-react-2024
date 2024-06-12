import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { FilterType } from '../../filterType.ts';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.tsx';
import { Pagination } from '../Pagination/Pagination';
import { ProductCard } from '../ProductCard/ProductCard';
import type Product from '../ProductsInterface/ProductsInterface.tsx';
import { SearchBar } from '../SearchBar/SearchBar';

import styles from './products.module.css';

const itemsPerPage = 8;

const filterProducts = (products: Product[], filter: FilterType, searchQuery: string, selectedCategories: string[]) =>
    products
        .filter((product) => !searchQuery || product.title?.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => selectedCategories.length === 0 || selectedCategories.includes(product.category?.name ?? ''))
        .sort((a, b) => {
            if (filter === FilterType.PRICE) {
                return (b.price ?? 0) - (a.price ?? 0);
            }
            if (filter === FilterType.NEWEST) {
                return new Date(b.creationAt ?? '').getTime() - new Date(a.creationAt ?? '').getTime();
            }
            if (filter === FilterType.OLDEST) {
                return new Date(a.creationAt ?? '').getTime() - new Date(b.creationAt ?? '').getTime();
            }
            return 0;
        });

export const Products = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState(FilterType.PRICE);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://ma-backend-api.mocintra.com/api/v1/products?limit=50');
                const productsData = response.data.products;
                if (Array.isArray(productsData)) {
                    setProducts(productsData);
                } else {
                    throw new TypeError('Invalid data format');
                }
            } catch (error_) {
                console.error('Error fetching products:', error_);
                setError(null);
            }
            setIsLoading(false);
        };

        fetchProducts();
    }, []);

    const filteredItems = filterProducts(products, filter, searchQuery, selectedCategories);

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

    let content;

    if (isLoading) {
        content = <LoadingSpinner />;
    } else if (error) {
        content = <p>{error}</p>;
    } else if (filteredItems.length === 0) {
        content = <LoadingSpinner />; // content = <p className={styles.noProducts}>No products</p>;
    } else {
        content = (
            <>
                <div className={styles.products}>
                    {currentItems.map((item) => (
                        <ProductCard key={item.id ?? ''} product={item} />
                    ))}
                </div>
                <Pagination totalItems={filteredItems.length} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
            </>
        );
    }

    return (
        <main className={`${styles.main} ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <SearchBar onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} onCategoryChange={handleCategoryChange} />
            {content}
        </main>
    );
};
