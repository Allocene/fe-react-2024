import React, { useState } from 'react';

import type { FilterType } from '../../filterType';
import { Button } from '../Button/Button';

import CustomSelect from './CustomSelect';

import styles from './searchbar.module.css';

const options = [
    { value: '', label: ' ' },
    { value: 'Price (High - Low)', label: 'Price (High - Low)' },
    { value: 'Newest', label: 'Newest' },
    { value: 'Oldest', label: 'Oldest' },
];

interface SearchBarProps {
    onFilterChange: (filter: FilterType) => void;
    onSearchChange: (searchTerm: string) => void;
    onCategoryChange: (categories: string[]) => void;
    selectedFilter: FilterType;
    selectedCategories: string[];
    searchQuery: string;
    onPriceMinChange: (minPrice: number | null) => void;
    onPriceMaxChange: (maxPrice: number | null) => void;
    priceMin: number | null;
    priceMax: number | null;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onFilterChange,
    onSearchChange,
    onCategoryChange,
    selectedFilter,
    selectedCategories,
    searchQuery,
    onPriceMinChange,
    onPriceMaxChange,
    priceMin,
    priceMax,
}) => {
    const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchQuery);

    const handleSelect = (value: string, label: string) => {
        onFilterChange(value as FilterType);
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchTerm(event.target.value);
    };

    const handleSearchButtonClick = () => {
        onSearchChange(localSearchTerm);
    };

    const handleSearchInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearchButtonClick();
        }
    };

    const handleCategoryChange = (category: string) => {
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((cat) => cat !== category)
            : [...selectedCategories, category];
        onCategoryChange(newCategories);
    };

    return (
        <div className={styles.searchBar}>
            <div className={styles.searchfield}>
                <input
                    className={styles.search}
                    type="search"
                    placeholder="Search..."
                    value={localSearchTerm}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleSearchInputKeyDown}
                />
                <Button className={styles.serbutton} onClick={handleSearchButtonClick}></Button>
            </div>
            <div className={styles.boxforsort}>
                <div className={styles.categories}>
                    <Button
                        className={`${styles.catbutton} ${selectedCategories.includes('Electronics') ? styles.active : ''}`}
                        onClick={() => handleCategoryChange('Electronics')}
                    >
                        Electronics
                    </Button>
                    <Button
                        className={`${styles.catbutton} ${selectedCategories.includes('Shoes') ? styles.active : ''}`}
                        onClick={() => handleCategoryChange('Shoes')}
                    >
                        Shoes
                    </Button>
                    <Button
                        className={`${styles.catbutton} ${selectedCategories.includes('Clothes') ? styles.active : ''}`}
                        onClick={() => handleCategoryChange('Clothes')}
                    >
                        Clothes
                    </Button>
                </div>
                <div className={styles.sort}>
                    <p className={styles.text}>Sort by: </p>
                    <CustomSelect options={options} selectedOption={selectedFilter} onSelect={handleSelect} />
                </div>
            </div>
        </div>
    );
};

export { SearchBar };
