import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products/categories')
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div>
            <h3>Categories</h3>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ul className="list-group mt-3">
                    {categories.map((category, index) => (
                        <li key={index} className="list-group-item">
                            {category}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Categories;
