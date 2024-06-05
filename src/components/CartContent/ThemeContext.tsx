import React, { createContext, useContext, useState } from 'react';

interface ThemeContextProps {
    isDarkMode: boolean;
    onThemeChange: (isDarkMode: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const handleThemeChange = () => {
        setIsDarkMode(isDarkMode);
    };

    return <ThemeContext.Provider value={{ isDarkMode, onThemeChange: handleThemeChange }}>{children}</ThemeContext.Provider>;
};
