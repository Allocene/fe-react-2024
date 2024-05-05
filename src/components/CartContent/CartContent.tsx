import React, { createContext, useContext, useState } from 'react';

interface CartContextType {
    totalClicks: number;
    setTotalClicks: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [totalClicks, setTotalClicks] = useState<number>(0);

    return <CartContext.Provider value={{ totalClicks, setTotalClicks }}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
