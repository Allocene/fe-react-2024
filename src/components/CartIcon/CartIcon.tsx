import React, { useState } from 'react';

import styles from './cartIcon.module.css';

const CartIcon = () => {
    const [isCartActive, setIsCartActive] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);

    const handleCartIconClick = () => {
        setIsCartActive(!isCartActive);
        setCartItemCount(isCartActive ? 0 : 1);
    };

    return (
        <div className={styles.cartIconContainer}>
            <svg
                onClick={handleCartIconClick}
                className={isCartActive ? styles.active : ''}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15.1704 15.8227C14.0658 15.8227 13.1704 16.7759 13.1704 17.9517C13.1704 19.1275 14.0658 20.0807 15.1704 20.0807C16.275 20.0807 17.1704 19.1275 17.1704 17.9517C17.1704 16.7759 16.275 15.8227 15.1704 15.8227ZM15.1704 15.8227H7.46436C7.00329 15.8227 6.77234 15.8227 6.58252 15.7353C6.41507 15.6583 6.26979 15.5343 6.16395 15.3761C6.04531 15.1989 5.9976 14.9618 5.90315 14.4926L3.44189 2.26567C3.34525 1.78556 3.29628 1.54577 3.17627 1.36645C3.07043 1.20829 2.92518 1.08381 2.75773 1.00678C2.56787 0.919434 2.3382 0.919434 1.87694 0.919434H1.17041M4.17041 4.11298H17.0436C17.7654 4.11298 18.1259 4.11298 18.3682 4.27304C18.5804 4.41324 18.7357 4.63313 18.8035 4.88902C18.8808 5.18115 18.7814 5.55004 18.5814 6.28828L17.1968 11.398C17.0772 11.8393 17.0173 12.0596 16.896 12.2234C16.7889 12.368 16.6476 12.4811 16.4875 12.5506C16.3065 12.6291 16.0915 12.6291 15.6625 12.6291H5.90088M6.17041 20.0807C5.06584 20.0807 4.17041 19.1275 4.17041 17.9517C4.17041 16.7759 5.06584 15.8227 6.17041 15.8227C7.27498 15.8227 8.17041 16.7759 8.17041 17.9517C8.17041 19.1275 7.27498 20.0807 6.17041 20.0807Z"
                    stroke="#111111"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            {cartItemCount > 0 && <div className={styles.cartItem}>{cartItemCount}</div>}
        </div>
    );
};

export { CartIcon };
