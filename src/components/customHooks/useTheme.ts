import { useEffect, useState } from 'react';

import { Theme } from '../../theme.ts';

const useTheme = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? JSON.parse(savedTheme) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            setIsDarkTheme(mediaQuery.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    useEffect(() => {
        document.body.className = isDarkTheme ? Theme.DARK : Theme.LIGHT;
        localStorage.setItem('theme', JSON.stringify(isDarkTheme));
    }, [isDarkTheme]);

    const handleThemeChange = (isDark: boolean) => {
        setIsDarkTheme(isDark);
    };

    return {
        isDarkTheme,
        handleThemeChange,
    };
};

export default useTheme;
