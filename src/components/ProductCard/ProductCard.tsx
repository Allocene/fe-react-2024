import React from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../CartContent/CartContent.tsx';
import { CartIcon } from '../CartIcon/CartIcon.tsx';
import type Product from '../ProductsInterface/ProductsInterface.tsx';

import styles from './productcard.module.css';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { setCartProducts } = useCart();

    const handleCartIconClick = () => {
        if (setCartProducts) {
            setCartProducts((previousCartProducts) => [...previousCartProducts, product]);
        } else {
            console.error('setCartProducts is not defined');
        }
    };

    return (
        <div key={product.id} className={styles.product}>
            <Link to={`/products/${product.id}`} className={styles.link}>
                {product.images && product.images.length > 0 && (
                    <img className={styles.image} src={product.images[0]} alt={product.title} />
                )}
                <h3 className={styles.title}>{product.title}</h3>
            </Link>
            <div className={styles.priceBox}>
                <p className={styles.price}>{product.price}</p>
                <CartIcon product={product} onClick={handleCartIconClick} />
            </div>
        </div>
    );
};

export { ProductCard };
