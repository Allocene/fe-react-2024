import React from 'react';

import Card from '@assets/cart.svg?react';

import { useCart } from '../CartContent/CartContent.tsx';
import type Product from '../ProductsInterface/ProductsInterface.tsx';

import styles from './cartIcon.module.css';

interface Props {
    product: Product;
    onClick?: () => void;
}

const getAddedProductsCount = (currentProduct: Product, cartProducts: Product[]): number =>
    cartProducts.filter((product) => product.id === currentProduct.id).length;

const CartIcon: React.FC<Props> = ({ onClick, product }) => {
    const { cartProducts } = useCart();

    const productsCount = getAddedProductsCount(product, cartProducts);

    return (
        <div className={styles.cartIconContainer}>
            <Card onClick={onClick} className={styles.cart} />
            {productsCount > 0 && <div className={styles.cartItem}>{productsCount}</div>}
        </div>
    );
};

export { CartIcon };
