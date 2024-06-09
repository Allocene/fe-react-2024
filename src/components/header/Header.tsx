// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Додай імпорт Link з react-router-dom

import CartIconWhite from '@assets/cart.svg?react';
import logoutIcon from '@assets/Log_Out.svg';
import logoMA from '@assets/logoMA.svg';
import useraddIcon from '@assets/useradd.svg';

import { Button } from '../Button/Button.tsx';
import { useCart } from '../CartContent/CartContent.tsx';
import { ColorSwitch } from '../ColorSwitch/ColorSwitch.tsx';
import Image from '../Image/Image.tsx';

import styles from './header.module.css';

interface HeaderProps {
    onThemeChange: (isDarkMode: boolean) => void;
    isDarkMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onThemeChange, isDarkMode }) => {
    const { cartProducts } = useCart();

    const totalClicks = cartProducts.length;

    return (
        <header className={`${styles.header} ${isDarkMode ? styles.darkMode : ''}`}>
            <div className={styles.headerBox}>
                <div className={styles.headSection}>
                    <Image src={logoMA} alt="logo" className="headerLogo" />
                    <ColorSwitch className={styles.colorSwitch} onThemeChange={onThemeChange} isDarkMode={isDarkMode} />
                </div>
                <div className={styles.navSection}>
                    <ul className={styles.navList}>
                        <li>
                            <Link to="/" className={styles.li}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className={styles.li}>
                                Products
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.headSection}>
                    <div className={styles.cart}>
                        <CartIconWhite style={{ stroke: '#FFF' }} />
                        {totalClicks > 0 && <div className={styles.totalItems}>{totalClicks}</div>}
                    </div>
                    <div className={styles.burgerMenu}>
                        <div className={styles.burgerLine} />
                        <div className={styles.burgerLine} />
                    </div>
                    <div className={styles.buttons}>
                        <Button disabled className={styles.loginBut} imgSrc={logoutIcon}>
                            Login
                        </Button>
                        <Button disabled className={styles.singupBut} imgSrc={useraddIcon}>
                            Sing up
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
