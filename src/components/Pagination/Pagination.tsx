import React from 'react';

import { Button } from '../Button/Button.tsx';
import usePagination from '../customHooks/usePagination.ts';

import styles from './pagination.module.css';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, onPageChange }: PaginationProps) => {
    const { currentPage, totalPages, goToPage, goToPreviousPage, goToNextPage } = usePagination({ totalItems, itemsPerPage, onPageChange });

    const renderPagination = () => {
        const pages = [];

        const addPageButton = (page: number, active: boolean) => {
            pages.push(
                <li key={page}>
                    <Button onClick={() => goToPage(page)} className={active ? styles.active : styles.nonactive}>
                        {page}
                    </Button>
                </li>,
            );
        };

        if (currentPage > 2) {
            addPageButton(1, false);
            if (currentPage > 3) {
                pages.push(<li key="start-ellipsis">...</li>);
            }
        }

        if (currentPage > 1) {
            addPageButton(currentPage - 1, false);
        }

        addPageButton(currentPage, true);

        if (currentPage < totalPages) {
            addPageButton(currentPage + 1, false);
        }

        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                pages.push(<li key="end-ellipsis">...</li>);
            }
            addPageButton(totalPages, false);
        }

        return pages;
    };

    const renderNavButton = (isDisabled: boolean, onClick: () => void, label: string) => (
        <li className={isDisabled ? styles.disabled : ''}>
            <Button onClick={onClick} className={isDisabled ? styles.disabledButton : styles.nonactive} disabled={isDisabled}>
                {label}
            </Button>
        </li>
    );

    return (
        <div className={styles.pagiBox}>
            <ul className={styles.pagination}>
                {renderNavButton(currentPage === 1, goToPreviousPage, '«')}
                {renderPagination()}
                {renderNavButton(currentPage === totalPages, goToNextPage, '»')}
            </ul>
        </div>
    );
};

export { Pagination };
