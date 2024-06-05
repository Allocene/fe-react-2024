// LayoutComponent.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../footer/Footer';
import Header from '../header/Header';

interface LayoutComponentProps {
    onThemeChange: (isDark: boolean) => void;
    isDarkMode: boolean;
}

const LayoutComponent: React.FC<LayoutComponentProps> = ({ onThemeChange, isDarkMode }) => (
    <>
        <Header onThemeChange={onThemeChange} isDarkMode={isDarkMode} />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
);

export default LayoutComponent;
