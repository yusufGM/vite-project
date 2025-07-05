import React, { useEffect, useState } from 'react';
import ProdukItem from './produkapi';


const KidProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
            <div className='grid gap-5 sm:grid-cols-2'>
                {products && products.map((a, index) => (
                    <ProdukItem name={a.title} price={a.price} key={a.id}  image={a.image} />
                ))}
            </div>
        </div>
    );
};

export default KidProduct;
