import { useState } from 'react';

import styles from './searchbar.module.css';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    selectedOption: string;
    onSelect: (value: string, label: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, selectedOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.customSelect}>
            <div className={styles.selectedOption} onClick={() => setIsOpen(!isOpen)}>
                {selectedOption || 'Choose a sort'}
                <div className={`${styles.arrow} ${isOpen ? styles.open : ''}`}></div>
            </div>
            {isOpen && (
                <div className={styles.options}>
                    {options.map((option) => (
                        <span
                            key={option.value}
                            className={styles.option}
                            onClick={() => {
                                onSelect(option.value, option.label);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
