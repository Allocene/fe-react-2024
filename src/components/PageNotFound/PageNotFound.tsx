import React from 'react';
import { Link } from 'react-router-dom';

import styles from './pagenf.module.css';

const PageNotFound: React.FC = () => (
    <div className={styles.notfoundblock}>
        <h1 className={styles.nfh1}>Page Not Found</h1>
        <p className={styles.nfp}>The page you are looking for does not exist.</p>
        <Link to="/" className={styles.nfbutton}>
            Go to About Page
        </Link>
    </div>
);

export default PageNotFound;
