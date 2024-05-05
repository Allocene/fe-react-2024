import React from 'react';

import Card from '@assets/cart.svg?react';

import { useCart } from '../CartContent/CartContent.tsx';

import styles from './cartIcon.module.css';

interface Props {
    onClick?: () => void;
}

const CartIcon: React.FC<Props> = ({ onClick }) => {
    const { totalClicks } = useCart();

    return (
        <div className={styles.cartIconContainer}>
            <Card onClick={onClick} style={{ stroke: '#111' }} />
            {totalClicks > 0 && <div className={styles.cartItem}>{totalClicks}</div>}
        </div>
    );
};

export { CartIcon };
