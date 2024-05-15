// SearchBar.jsx
import { useState } from 'react';

import { Button } from '../Button/Button';

import styles from './searchbar.module.css';

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const options = [
        { value: ' ', label: ' ' },
        { value: 'price', label: 'Price (High - Low)' },
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
    ];

    const handleSelect = (value: string, label: string) => {
        setSelectedOption(label);
        setIsOpen(false);
    };

    return (
        <div className={styles.searchBar}>
            <div className={styles.searchfield}>
                <input className={styles.search} type="search" placeholder="Search..." />
                <Button className={styles.serbutton} />
            </div>
            <div className={styles.boxforsort}>
                <div className={styles.categories}>
                    <Button className={styles.catbutton}>Electronics</Button>
                    <Button className={styles.catbutton}>Shoes</Button>
                    <Button className={styles.catbutton}>Clothes</Button>
                </div>
                <div className={styles.sort}>
                    <p className={styles.text}>Sort by: </p>
                    <div className={styles.customSelect}>
                        <div className={styles.selectedOption} onClick={() => setIsOpen(!isOpen)}>
                            {selectedOption || 'Price (High - Low)'}
                            <div className={`${styles.arrow} ${isOpen ? styles.open : ''}`}></div>
                        </div>
                        {isOpen && (
                            <div className={styles.options}>
                                {options.map((option) => (
                                    <span
                                        key={option.value}
                                        className={styles.option}
                                        onClick={() => handleSelect(option.value, option.label)}
                                    >
                                        {option.label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { SearchBar };
