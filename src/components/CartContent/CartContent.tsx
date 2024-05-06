import React, { createContext, useContext, useEffect, useState } from 'react';

import type Product from '../ProductsInterface/ProductsInterface';

interface CartContextType {
    cartProducts: Product[];
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartProducts, setCartProducts] = useState<Product[]>(() => {
        const storedCartProducts = localStorage.getItem('cartProducts');
        return storedCartProducts ? JSON.parse(storedCartProducts) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }, [cartProducts]);

    return <CartContext.Provider value={{ cartProducts, setCartProducts }}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
