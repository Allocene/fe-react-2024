import React, { createContext, useContext, useState } from 'react';

import type Product from '../ProductsInterface/ProductsInterface';

interface CartContextType {
    // totalClicks: number;
    // setTotalClicks: React.Dispatch<React.SetStateAction<number>>;
    cartProducts: Product[];
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const [totalClicks, setTotalClicks] = useState<number>(0);
    const [cartProducts, setCartProducts] = useState<Product[]>([]);

    return (
        <CartContext.Provider value={{ /*  totalClicks, setTotalClicks, */ cartProducts, setCartProducts }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
