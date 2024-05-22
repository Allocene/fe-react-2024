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

    const goToPage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            onPageChange(pageNumber);
        }
    };

    const goToPreviousPage = () => goToPage(currentPage - 1);
    const goToNextPage = () => goToPage(currentPage + 1);

    const renderPagination = () => {
        const pages = [];

        if (currentPage > 2) {
            pages.push(
                <li key={1}>
                    <Button onClick={() => goToPage(1)} className={styles.nonactive}>
                        1
                    </Button>
                </li>,
            );
            if (currentPage > 3) {
                pages.push(<li key="start-ellipsis">...</li>);
            }
        }

        if (currentPage > 1) {
            pages.push(
                <li key={currentPage - 1}>
                    <Button onClick={() => goToPage(currentPage - 1)} className={styles.nonactive}>
                        {currentPage - 1}
                    </Button>
                </li>,
            );
        }

        pages.push(
            <li key={currentPage}>
                <Button onClick={() => goToPage(currentPage)} className={styles.active}>
                    {currentPage}
                </Button>
            </li>,
        );

        if (currentPage < totalPages) {
            pages.push(
                <li key={currentPage + 1}>
                    <Button onClick={() => goToPage(currentPage + 1)} className={styles.nonactive}>
                        {currentPage + 1}
                    </Button>
                </li>,
            );
        }

        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                pages.push(<li key="end-ellipsis">...</li>);
            }
            pages.push(
                <li key={totalPages}>
                    <Button onClick={() => goToPage(totalPages)} className={styles.nonactive}>
                        {totalPages}
                    </Button>
                </li>,
            );
        }

        return pages;
    };

    return (
        <div className={styles.pagiBox}>
            <ul className={styles.pagination}>
                <li className={currentPage === 1 ? styles.disabled : ''}>
                    <Button
                        onClick={goToPreviousPage}
                        className={currentPage === 1 ? styles.disabledButton : styles.nonactive}
                        disabled={currentPage === 1}
                    >
                        &laquo;
                    </Button>
                </li>
                {renderPagination()}
                <li className={currentPage === totalPages ? styles.disabled : ''}>
                    <Button
                        onClick={goToNextPage}
                        className={currentPage === totalPages ? styles.disabledButton : styles.nonactive}
                        disabled={currentPage === totalPages}
                    >
                        &raquo;
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export { Pagination };
