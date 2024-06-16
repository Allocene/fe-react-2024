import React from 'react';

import styles from './loadingSpinner.module.css';

const LoadingSpinner = () => (
    <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
    </div>
);

export default LoadingSpinner;
