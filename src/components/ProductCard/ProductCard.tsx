import React from 'react';

import { useCart } from '../CartContent/CartContent.tsx';
import { CartIcon } from '../CartIcon/CartIcon.tsx';
import type Product from '../ProductsInterface/ProductsInterface.tsx';

import styles from './productcard.module.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { /* setTotalClicks, */ setCartProducts } = useCart();

    const handleCartIconClick = () => {
        // setTotalClicks((previousTotalClicks) => previousTotalClicks + 1);
        setCartProducts((previousCartProducts) => [...previousCartProducts, product]);
    };

    return (
        <div key={product.id} className={styles.product}>
            {product.images && product.images.length > 0 && <img className={styles.image} src={product.images[0]} alt={product.title} />}
            <h3 className={styles.title}>{product.title}</h3>
            <div className={styles.priceBox}>
                <p className={styles.price}>{product.price}</p>
                <CartIcon product={product} onClick={handleCartIconClick} />
            </div>
        </div>
    );
};

export { ProductCard };
