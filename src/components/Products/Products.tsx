import { useCallback, useEffect, useRef, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import type { AxiosError } from 'axios';
import axios from 'axios';

import { FilterType } from '../../filterType';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Pagination } from '../Pagination/Pagination';
import { ProductCard } from '../ProductCard/ProductCard';
import type Product from '../ProductsInterface/ProductsInterface';
import { SearchBar } from '../SearchBar/SearchBar';

import 'react-toastify/dist/ReactToastify.css';
import styles from './products.module.css';

interface GetProductsParameters {
    offsett?: number;
    limit?: number;
    search?: string;
    categories?: string;
    filter?: FilterType;
    price_min?: number;
    price_max?: number;
}

export const getProducts = async ({
    offset = 0,
    limit = 10,
    search,
    categories,
    filter,
    price_min,
    price_max,
}: GetProductsParameters): Promise<Product[]> => {
    try {
        const response = await axios.get<{ products: Product[]; total: number }>('https://ma-backend-api.mocintra.com/api/v1/products', {
            params: {
                offset,
                limit,
                search,
                categories,
                filter,
                price_min,
                price_max,
            },
        });

        return response.data.products;
    } catch (error) {
        throw new Error((error as AxiosError)?.message);
    }
};

export type Maybe<T> = T | undefined | null;

interface UseServerMutationProps<Data> {
    defaultValue?: Maybe<Data>;
}

enum Status {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    idle = 'idle',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    pending = 'pending',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    resolved = 'resolved',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    rejected = 'rejected',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const useMutation = <TData, TError = Error>(
    // eslint-disable-next-line unicorn/no-object-as-default-parameter
    { defaultValue = null }: UseServerMutationProps<TData> = { defaultValue: null },
) => {
    const initialDefaultValue = useRef<TData>(defaultValue);
    const [data, setData] = useState<Maybe<TData>>(defaultValue);
    const [status, setStatus] = useState<Status>(Status.idle);

    const trigger = useCallback(
        (promise: Promise<TData>): Promise<TData | TError> => {
            if (!promise || !promise.then) {
                throw new Error(
                    // eslint-disable-next-line max-len
                    `The argument passed to useServerMutation().trigger must be a promise. Maybe a function that's passed isn't returning anything?`,
                );
            }

            setStatus(Status.pending);
            return promise
                .then((payload) => {
                    setStatus(Status.resolved);
                    setData(payload);
                    return payload;
                })
                .catch((error) => {
                    setStatus(Status.rejected);
                    return error;
                })
                .finally(() => {
                    setStatus(Status.idle);
                });
        },
        [setStatus, setData],
    );

    const reset = useCallback(() => {
        setData(initialDefaultValue.current);
        setStatus(Status.idle);
    }, [setData, setStatus]);

    return {
        isIdle: status === Status.idle,
        isLoading: status === Status.pending,
        isError: status === Status.rejected,
        isSuccess: status === Status.resolved,
        data,
        status,
        trigger,
        reset,
    };
};

const useGetProducts = (parameters: GetProductsParameters) => {
    const { trigger, data, isError, isLoading } = useMutation<Product[]>();

    useQueryParameters();

    useEffect(() => {
        trigger(getProducts(parameters));
    }, []);

    return {
        products: data,
        isError,
        isLoading,
    };
};

export const useQueryParameters = (): GetProductsParameters => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParameter, setSearchParameter] = useState('');
    const [categoryParameter, setCategoryParameter] = useState('');
    const [filterParameter, setFilterParameter] = useState<FilterType>(FilterType.PRICE);
    const [priceMinParameter, setPriceMinParameter] = useState<number | null>(null);
    const [priceMaxParameter, setPriceMaxParameter] = useState<number | null>(null);

    useEffect(() => {
        const parameters = new URLSearchParams(location.search);
        const search = parameters.get('search') || '';
        const categories = parameters.get('categories') || '';
        const filter = (parameters.get('filter') || FilterType.PRICE) as FilterType;
        const priceMin = parameters.get('price_min') ? Number(parameters.get('price_min')) : null;
        const priceMax = parameters.get('price_max') ? Number(parameters.get('price_max')) : null;

        setSearchParameter(search);
        setCategoryParameter(categories);
        setFilterParameter(filter);
        setPriceMinParameter(priceMin);
        setPriceMaxParameter(priceMax);
    }, [location.search]);

    const updateQueryParameters = (
        search: string,
        categories: string[],
        filter: FilterType,
        minPrice: number | null,
        maxPrice: number | null,
    ) => {
        const parameters = new URLSearchParams();
        if (search) parameters.set('search', search);
        if (categories.length > 0) parameters.set('categories', categories.join(','));
        parameters.set('filter', filter);
        if (minPrice !== null) parameters.set('price_min', minPrice.toString());
        if (maxPrice !== null) parameters.set('price_max', maxPrice.toString());
        navigate({ search: parameters.toString() });
    };

    return {
        searchParameter,
        categoryParameter,
        filterParameter,
        priceMinParameter,
        priceMaxParameter,
        updateQueryParameters,
    };
};

const itemsPerPage = 8;

const filterProducts = (products: Product[], filter: FilterType, searchQuery: string, selectedCategories: string[]) =>
    products
        .filter((product) => !searchQuery || product.title?.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => selectedCategories.length === 0 || selectedCategories.includes(product.category?.name ?? ''))
        .sort((a, b) => {
            if (filter === FilterType.PRICE) {
                return (b.price ?? 0) - (a.price ?? 0);
            }
            if (filter === FilterType.NEWEST) {
                return new Date(b.creationAt ?? '').getTime() - new Date(a.creationAt ?? '').getTime();
            }
            if (filter === FilterType.OLDEST) {
                return new Date(a.creationAt ?? '').getTime() - new Date(b.creationAt ?? '').getTime();
            }
            return 0;
        });

export const useProductsState = () => {
    const navigate = useNavigate();
    // const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState(FilterType.PRICE);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceMin, setPriceMin] = useState<number | null>(null);
    const [priceMax, setPriceMax] = useState<number | null>(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
    // const [hasMore, setHasMore] = useState(true);
    // const [isMobile, setIsMobile] = useState(false);

    const updateQueryParameters = (
        search: string,
        categories: string[],
        filter: FilterType,
        minPrice: number | null,
        maxPrice: number | null,
    ) => {
        const parameters = new URLSearchParams();
        if (search) parameters.set('search', search);
        if (categories.length > 0) parameters.set('categories', categories.join(','));
        parameters.set('filter', filter);
        if (minPrice !== null) parameters.set('price_min', minPrice.toString());
        if (maxPrice !== null) parameters.set('price_max', maxPrice.toString());
        navigate({ search: parameters.toString() });
    };

    return {
        state: {
            currentPage,
            selectedFilter,
            searchQuery,
            selectedCategories,
            priceMin,
            priceMax,
        },
        handlePageChange: (pageNumber: number) => {
            setCurrentPage(pageNumber);
        },
        handleFilterChange: (newFilter: FilterType) => {
            setSelectedFilter(newFilter);
            setCurrentPage(1);
            updateQueryParameters(searchQuery, selectedCategories, newFilter, priceMin, priceMax);
        },
        handleSearchChange: (searchTerm: string) => {
            setSearchQuery(searchTerm);
            setCurrentPage(1);
            updateQueryParameters(searchTerm, selectedCategories, selectedFilter, priceMin, priceMax);
        },
        handleCategoryChange: (categories: string[]) => {
            setSelectedCategories(categories);
            setCurrentPage(1);
            updateQueryParameters(searchQuery, categories, selectedFilter, priceMin, priceMax);
        },
        handlePriceMinChange: (minPrice: number | null) => {
            setPriceMin(minPrice);
            setCurrentPage(1);
            updateQueryParameters(searchQuery, selectedCategories, selectedFilter, minPrice, priceMax);
        },
        handlePriceMaxChange: (maxPrice: number | null) => {
            setPriceMax(maxPrice);
            setCurrentPage(1);
            updateQueryParameters(searchQuery, selectedCategories, selectedFilter, priceMin, maxPrice);
        },
    };
};

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
};

export const Products = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
    // const [products, setProducts] = useState<Product[]>([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [selectedFilter, setSelectedFilter] = useState(FilterType.PRICE);
    // const [searchQuery, setSearchQuery] = useState('');
    // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    // const [priceMin, setPriceMin] = useState<number | null>(null);
    // const [priceMax, setPriceMax] = useState<number | null>(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
    // const [hasMore, setHasMore] = useState(true);
    // const [isMobile, setIsMobile] = useState(false);
    const isMobile = useIsMobile();

    const parameters = useQueryParameters();
    const { isLoading, isError, products } = useGetProducts(parameters);

    const {
        handlePageChange,
        handleFilterChange,
        handleSearchChange,
        handleCategoryChange,
        handlePriceMinChange,
        handlePriceMaxChange,
        state: { currentPage, selectedFilter, searchQuery, selectedCategories, priceMin, priceMax },
    } = useProductsState();

    // const location = useLocation();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     import { useEffect, useState } from 'react';
    //     import { useLocation, useNavigate } from 'react-router-dom';

    //     import { FilterType } from '../../filterType';

    //     setSearchQuery(searchParameter);
    //     setSelectedCategories(categoryParameter ? categoryParameter.split(',') : []);
    //     setSelectedFilter(filterParameter);
    //     setPriceMin(priceMinParameter);
    //     setPriceMax(priceMaxParameter);

    //     const fetchProducts = async () => {
    //         setIsLoading(true);
    //         setError(null);
    //         try {
    //             const response = await axios.get('https://ma-backend-api.mocintra.com/api/v1/products', {
    //                 params: {
    //                     limit: 50,
    //                     search: searchParameter,
    //                     categories: categoryParameter,
    //                     filter: filterParameter,
    //                     price_min: priceMinParameter,
    //                     price_max: priceMaxParameter,
    //                 },
    //             });
    //             const productsData = response.data.products;
    //             if (Array.isArray(productsData)) {
    //                 setProducts(productsData);
    //             } else {
    //                 throw new TypeError('Invalid data format');
    //             }
    //         } catch (error_) {
    //             console.error('Error fetching products:', error_);
    //             setError('Failed to fetch products');
    //             toast.error('Failed to fetch products');
    //         }
    //         setIsLoading(false);
    //     };

    //     fetchProducts();

    //     // Check if the device is a mobile
    //     setIsMobile(window.innerWidth < 768);

    //     const handleResize = () => {
    //         setIsMobile(window.innerWidth < 768);
    //     };

    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, [location.search]);

    const filteredItems = filterProducts(products || [], selectedFilter, searchQuery, selectedCategories);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // const fetchMoreData = async () => {
    //     if (currentItems.length >= filteredItems.length) {
    //         setHasMore(false);
    //         return;
    //     }

    //     try {
    //         const response = await axios.get(`https://ma-backend-api.mocintra.com/api/v1/products`, {
    //             params: {
    //                 limit: 50,
    //                 page: currentPage + 1,
    //                 search: searchQuery,
    //                 categories: selectedCategories.join(','),
    //                 filter: selectedFilter,
    //                 price_min: priceMin,
    //                 price_max: priceMax,
    //             },
    //         });
    //         const newProductsData = response.data.products;
    //         if (Array.isArray(newProductsData) && newProductsData.length > 0) {
    //             setProducts([...products, ...newProductsData]);
    //             setCurrentPage(currentPage + 1);
    //         } else {
    //             setHasMore(false);
    //         }
    //     } catch (error_) {
    //         console.error('Error fetching more products:', error_);
    //         toast.error('Error fetching more products');
    //     }
    // };

    // const handlePageChange = (pageNumber: number) => {
    //     setCurrentPage(pageNumber);
    // };

    // const handleFilterChange = (newFilter: FilterType) => {
    //     setSelectedFilter(newFilter);
    //     setCurrentPage(1);
    //     updateQueryParameters(searchQuery, selectedCategories, newFilter, priceMin, priceMax);
    // };

    // const handleSearchChange = (searchTerm: string) => {
    //     setSearchQuery(searchTerm);
    //     setCurrentPage(1);
    //     updateQueryParameters(searchTerm, selectedCategories, selectedFilter, priceMin, priceMax);
    // };

    // const handleCategoryChange = (categories: string[]) => {
    //     setSelectedCategories(categories);
    //     setCurrentPage(1);
    //     updateQueryParameters(searchQuery, categories, selectedFilter, priceMin, priceMax);
    // };

    // const handlePriceMinChange = (minPrice: number | null) => {
    //     setPriceMin(minPrice);
    //     setCurrentPage(1);
    //     updateQueryParameters(searchQuery, selectedCategories, selectedFilter, minPrice, priceMax);
    // };

    // const handlePriceMaxChange = (maxPrice: number | null) => {
    //     setPriceMax(maxPrice);
    //     setCurrentPage(1);
    //     updateQueryParameters(searchQuery, selectedCategories, selectedFilter, priceMin, maxPrice);
    // };

    // const updateQueryParameters = (
    //     search: string,
    //     categories: string[],
    //     filter: FilterType,
    //     minPrice: number | null,
    //     maxPrice: number | null,
    // ) => {
    //     const parameters = new URLSearchParams();
    //     if (search) parameters.set('search', search);
    //     if (categories.length > 0) parameters.set('categories', categories.join(','));
    //     parameters.set('filter', filter);
    //     if (minPrice !== null) parameters.set('price_min', minPrice.toString());
    //     if (maxPrice !== null) parameters.set('price_max', maxPrice.toString());
    //     navigate({ search: parameters.toString() });
    // };

    let content;

    if (isLoading) {
        content = <LoadingSpinner />;
    } else if (isError) {
        // TODO: handle it
        content = <p>{'error'}</p>;
    } else if (filteredItems.length === 0) {
        content = <p className={styles.noProducts}>No products</p>;
    } else {
        content = (
            <>
                <div className={styles.products}>
                    {currentItems.map((item, index) => (
                        <ProductCard key={`${item.id}-${index}`} product={item} />
                    ))}
                </div>
                {!isMobile && <Pagination totalItems={filteredItems.length} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />}
                {/* {isMobile && (
                    // <InfiniteScroll dataLength={currentItems.length} next={fetchMoreData} hasMore={hasMore} loader={<LoadingSpinner />}>
                    <InfiniteScroll dataLength={currentItems.length} next={() => {}} hasMore={false} loader={<LoadingSpinner />}>
                        {currentItems.map((item, index) => (
                            <ProductCard key={`${item.id}-${index}`} product={item} />
                        ))}
                    </InfiniteScroll>
                )} */}
            </>
        );
    }

    return (
        <main className={`${styles.main} ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <SearchBar
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
                selectedFilter={selectedFilter}
                selectedCategories={selectedCategories}
                searchQuery={searchQuery}
                onPriceMinChange={handlePriceMinChange}
                onPriceMaxChange={handlePriceMaxChange}
                priceMin={priceMin}
                priceMax={priceMax}
            />
            {content}
            <ToastContainer />
        </main>
    );
};
