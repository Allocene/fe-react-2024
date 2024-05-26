import { useEffect, useState } from 'react';

interface UsePaginationProps {
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (pageNumber: number) => void;
}

const usePagination = ({ totalItems, itemsPerPage, onPageChange }: UsePaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [totalItems]);

    const goToPage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            onPageChange(pageNumber);
        }
    };

    const goToPreviousPage = () => goToPage(currentPage - 1);
    const goToNextPage = () => goToPage(currentPage + 1);

    return {
        currentPage,
        totalPages,
        goToPage,
        goToPreviousPage,
        goToNextPage,
    };
};

export default usePagination;
