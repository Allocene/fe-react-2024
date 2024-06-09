import { mock } from './components/Products/mock.js';
import type Product from './components/ProductsInterface/ProductsInterface.tsx';

export const getProduct = async (id: string): Promise<Product | null> => {
    const product = mock.find((item) => item.id === Number.parseInt(id, 10));
    return product || null;
};
