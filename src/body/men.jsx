import React, { useEffect, useState } from 'react';
import ProdukItem from './produkapi';

const ProductList = () => {
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
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
            <h1>Product List</h1>

            <div className='container mx-auto text-stone-50 min-h-screen gap-4 py-12'>
                {products && products.map((a, index) => (
                    <ProdukItem name={a.title} price={a.price} key={a.id} description={a.description} image={a.image}/>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
