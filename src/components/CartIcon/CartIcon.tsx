import React, { useState } from 'react';

import Card from '@assets/cart.svg?react';

import styles from './cartIcon.module.css';

const CartIcon = () => {
    const [isCartActive, setIsCartActive] = useState<boolean>(false);
    const [cartItemCount, setCartItemCount] = useState<number>(0);

    const handleCartIconClick = () => {
        setIsCartActive(!isCartActive);
        setCartItemCount(isCartActive ? 0 : 1);
    };

    return (
        <div className={styles.cartIconContainer}>
            <Card onClick={handleCartIconClick} className={isCartActive ? styles.active : ''} style={{ stroke: '#111' }} />
            {cartItemCount > 0 && <div className={styles.cartItem}>{cartItemCount}</div>}
        </div>
    );
};

export { CartIcon };
