interface Category {
    id: number;
    name: string;
    image: string;
}

interface Product {
    id?: number;
    title?: string;
    price?: number;
    description?: string;
    images?: string[];
    category?: Category;
    creationAt?: string;
}

export default Product;
