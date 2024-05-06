import React, { useState } from 'react';

import { Button } from '../Button/Button.tsx';

import styles from './pagination.module.css';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, onPageChange }: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getFirstPageIndex = (page: number) => Math.max(page - 1, 1);
    const getLastPageIndex = (firstPageIndex: number) => Math.min(firstPageIndex + 2, totalPages);
    const goToPage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            onPageChange(pageNumber);
        }
    };

    const goToPreviousPage = () => goToPage(currentPage - 1);
    const goToNextPage = () => goToPage(currentPage + 1);

    const firstPageIndex = getFirstPageIndex(currentPage);
    const lastPageIndex = getLastPageIndex(firstPageIndex);

    return (
        <div className={styles.pagiBox}>
            <ul className={styles.pagination}>
                <li className={currentPage === 1 ? 'disabled' : ''}>
                    <Button onClick={goToPreviousPage} className={styles.nonactive}>
                        &laquo;
                    </Button>
                </li>
                {Array.from({ length: totalItems }, (_, index) => index + 1)
                    .slice(firstPageIndex - 1, lastPageIndex)
                    .map((number) => (
                        <li key={number}>
                            <Button onClick={() => goToPage(number)} className={currentPage === number ? styles.active : styles.nonactive}>
                                {number}
                            </Button>
                        </li>
                    ))}
                <li className={currentPage === totalPages ? 'disabled' : ''}>
                    <Button onClick={goToNextPage} className={styles.nonactive}>
                        &raquo;
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export { Pagination };
