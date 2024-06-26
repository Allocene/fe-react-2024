import React, { useState } from 'react';

import type { FilterType } from '../../filterType.ts';
import { Button } from '../Button/Button';

import CustomSelect from './CustomSelect';

import styles from './searchbar.module.css';

const options = [
    { value: '', label: ' ' },
    { value: 'price', label: 'Price (High - Low)' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
];

interface SearchBarProps {
    onFilterChange: (filter: FilterType) => void;
    onSearchChange: (searchTerm: string) => void;
    onCategoryChange: (categories: string[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilterChange, onSearchChange, onCategoryChange }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [activeCategories, setActiveCategories] = useState<string[]>([]);

    const handleSelect = (value: string, label: string) => {
        setSelectedOption(label);
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
        const newCategories = activeCategories.includes(category)
            ? activeCategories.filter((cat) => cat !== category)
            : [...activeCategories, category];
        setActiveCategories(newCategories);
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
                <Button className={styles.serbutton} onClick={handleSearchButtonClick} />
            </div>
            <div className={styles.boxforsort}>
                <div className={styles.categories}>
                    <Button
                        className={`${styles.catbutton} ${activeCategories.includes('Electronics') ? styles.active : ''}`}
                        onClick={() => handleCategoryChange('Electronics')}
                    >
                        Electronics
                    </Button>
                    <Button
                        className={`${styles.catbutton} ${activeCategories.includes('Shoes') ? styles.active : ''}`}
                        onClick={() => handleCategoryChange('Shoes')}
                    >
                        Shoes
                    </Button>
                    <Button
                        className={`${styles.catbutton} ${activeCategories.includes('Clothes') ? styles.active : ''}`}
                        onClick={() => handleCategoryChange('Clothes')}
                    >
                        Clothes
                    </Button>
                </div>
                <div className={styles.sort}>
                    <p className={styles.text}>Sort by: </p>
                    <CustomSelect options={options} selectedOption={selectedOption} onSelect={handleSelect} />
                </div>
            </div>
        </div>
    );
};

export { SearchBar };
