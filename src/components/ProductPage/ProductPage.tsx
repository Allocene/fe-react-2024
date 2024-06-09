import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getProduct } from '../../products.ts';
import { Button } from '../Button/Button.tsx';
import type Product from '../ProductsInterface/ProductsInterface.tsx';

import styles from './productPage.module.css';

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [mainImage, setMainImage] = useState<string | undefined>();

    useEffect(() => {
        if (id) {
            getProduct(id).then((data: Product | null) => {
                if (data && data.images) {
                    setProduct(data);
                    setMainImage(data.images[0]);
                }
            });
        }
    }, [id]);

    const handleImageClick = (image: string) => {
        setMainImage(image);
    };

    const handleBackClick = () => {
        navigate('/products');
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <main className={styles.main}>
            <div className={styles.productPage}>
                <Button className={styles.bBack} onClick={handleBackClick}>
                    Back
                </Button>
                <div className={styles.productImgBox}>
                    <div className={styles.additionalImages}>
                        {product?.images &&
                            product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={product?.title}
                                    className={styles.additionalImage}
                                    onClick={() => handleImageClick(image)}
                                />
                            ))}
                    </div>
                    <img src={mainImage} alt={product?.title} className={styles.productImage} />
                </div>
                <div className={styles.productText}>
                    <h1 className={styles.pth1}>{product?.title}</h1>
                    <Button className={styles.ptCategory}>{product?.category?.name}</Button>
                    <p className={styles.ptp}>{product?.description}</p>
                    <div className={styles.priceBox}>
                        <span className={styles.ptprice}>{product?.price} </span>
                        <Button className={styles.ptbutton}>Add to cart</Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
