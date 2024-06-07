import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';

interface ThemeContextProps {
    isDarkMode: boolean;
    onThemeChange: () => void;
}

interface ThemeProviderProps {
    children: ReactNode;
}

const defaultThemeContext: ThemeContextProps = {
    isDarkMode: false,
    onThemeChange: () => {},
};

const ThemeContext = createContext<ThemeContextProps>(defaultThemeContext);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext shoud use inside ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const handleThemeChange = () => {
        setIsDarkMode((previousMode) => !previousMode);
    };

    return <ThemeContext.Provider value={{ isDarkMode, onThemeChange: handleThemeChange }}>{children}</ThemeContext.Provider>;
};
