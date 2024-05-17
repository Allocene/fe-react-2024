import React from 'react';

import DividerIcon from '@assets/divider.svg?react';
import MoonIcon from '@assets/moon.svg?react';
import SunIcon from '@assets/sun.svg?react';

import styles from './colorswitch.module.css';

interface ColorSwitchProps {
    isDarkMode: boolean;
    onThemeChange: (isDarkMode: boolean) => void;
    className?: string;
}

const ColorSwitch: React.FC<ColorSwitchProps> = ({ className, isDarkMode, onThemeChange, ...restProps }) => {
    const toggleToLightTheme = () => {
        if (isDarkMode) {
            onThemeChange(false);
        }
    };

    const toggleToDarkTheme = () => {
        if (!isDarkMode) {
            onThemeChange(true);
        }
    };

    return (
        <div className={`${styles.colorSwitch} ${className}`} {...restProps}>
            <SunIcon className={`${styles.headerSun} ${isDarkMode ? '' : styles.active}`} onClick={toggleToLightTheme} />
            <DividerIcon className={styles.headerDivider} />
            <MoonIcon className={`${styles.headerMoon} ${isDarkMode ? styles.active : ''}`} onClick={toggleToDarkTheme} />
        </div>
    );
};

export { ColorSwitch };
