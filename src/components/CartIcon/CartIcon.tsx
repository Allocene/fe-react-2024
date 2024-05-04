import React, { useState } from 'react';

import Card from '@assets/cart.svg?react';

import styles from './cartIcon.module.css';

interface CartProps {
    totalClicks: number;
    onClick?: () => void;
}

const CartIcon: React.FC<CartProps> = ({ onClick, totalClicks }) => {
    const [clicks, setClicks] = useState<number>(0);
    const [isCartActive, setIsCartActive] = useState<boolean>(false);

    const handleCartIconClick = () => {
        setClicks(clicks + 1);
        setIsCartActive(!isCartActive);
        onClick && onClick();
    };

    return (
        <div className={styles.cartIconContainer}>
            <Card onClick={handleCartIconClick} className={isCartActive ? styles.active : ''} style={{ stroke: '#111' }} />
            {clicks > 0 && <div className={styles.cartItem}>{clicks}</div>}
        </div>
    );
};

export { CartIcon };
