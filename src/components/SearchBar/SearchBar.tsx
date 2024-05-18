import { useState } from 'react';

import { Button } from '../Button/Button';

import CustomSelect from './CustomSelect';

import styles from './searchbar.module.css';

const options = [
    { value: ' ', label: ' ' },
    { value: 'price', label: 'Price (High - Low)' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
];

const SearchBar = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelect = (value: string, label: string) => {
        setSelectedOption(label);
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
                    <CustomSelect options={options} selectedOption={selectedOption} onSelect={handleSelect} />
                </div>
            </div>
        </div>
    );
};

export { SearchBar };
