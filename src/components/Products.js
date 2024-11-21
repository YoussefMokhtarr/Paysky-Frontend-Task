import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, editProduct, deleteProduct } from '../services/api';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);
    const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', category: '' });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Fetch products
        fetchProducts()
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        // Fetch categories
        axios
            .get('https://fakestoreapi.com/products/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleAddProduct = () => {
        addProduct(newProduct)
            .then((response) => {
                setProducts([...products, response.data]);
                setNewProduct({ title: '', price: '', description: '', category: '' });
                setIsModalOpen(false);
            })
            .catch((error) => console.error(error));
    };

    const handleEditProduct = () => {
        if (productToEdit) {
            editProduct(productToEdit.id, productToEdit)
                .then((response) => {
                    const updatedProducts = products.map((product) =>
                        product.id === response.data.id ? response.data : product
                    );
                    setProducts(updatedProducts);
                    setIsModalOpen(false);
                })
                .catch((error) => console.error(error));
        }
    };

    const handleDeleteProduct = (id) => {
        deleteProduct(id)
            .then(() => {
                setProducts(products.filter((product) => product.id !== id));
            })
            .catch((error) => console.error(error));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredProducts = products.filter((product) => {
        const matchesTitle = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesTitle && matchesCategory;
    });

    return (
        <div>
            <h3>Products</h3>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Search by title"
                            className="form-control mb-2"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <select
                            className="form-control"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className="btn btn-primary mb-3"
                        onClick={() => {
                            setIsAddingProduct(true);
                            setIsModalOpen(true);
                        }}
                    >
                        Add Product
                    </button>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#808080' }}>ID</th>
                                <th style={{ backgroundColor: '#808080' }}>Title</th>
                                <th style={{ backgroundColor: '#808080' }}>Price</th>
                                <th style={{ backgroundColor: '#808080' }}>Description</th>
                                <th style={{ backgroundColor: '#808080' }}>Category</th>
                                <th style={{ backgroundColor: '#808080' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td style={{ backgroundColor: '#AEC6CF' }}>{product.id}</td>
                                    <td style={{ backgroundColor: '#AEC6CF' }}>{product.title}</td>
                                    <td style={{ backgroundColor: '#AEC6CF' }}>${product.price}</td>
                                    <td style={{ backgroundColor: '#AEC6CF' }}>{product.description}</td>
                                    <td style={{ backgroundColor: '#AEC6CF' }}>{product.category}</td>
                                    <td style={{ backgroundColor: '#AEC6CF' }}>
                                        <button
                                            className="btn btn-secondary btn-sm mb-3"
                                            onClick={() => {
                                                setProductToEdit({ ...product });
                                                setIsAddingProduct(false);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {isModalOpen && (
                        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            {isAddingProduct ? 'Add Product' : 'Edit Product'}
                                        </h5>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                className="form-control"
                                                value={isAddingProduct ? newProduct.title : productToEdit.title}
                                                onChange={(e) =>
                                                    isAddingProduct
                                                        ? setNewProduct({ ...newProduct, title: e.target.value })
                                                        : setProductToEdit({ ...productToEdit, title: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="price" className="form-label">
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                id="price"
                                                className="form-control"
                                                value={isAddingProduct ? newProduct.price : productToEdit.price}
                                                onChange={(e) =>
                                                    isAddingProduct
                                                        ? setNewProduct({ ...newProduct, price: e.target.value })
                                                        : setProductToEdit({ ...productToEdit, price: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                id="description"
                                                className="form-control"
                                                value={isAddingProduct ? newProduct.description : productToEdit.description}
                                                onChange={(e) =>
                                                    isAddingProduct
                                                        ? setNewProduct({ ...newProduct, description: e.target.value })
                                                        : setProductToEdit({ ...productToEdit, description: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="category" className="form-label">
                                                Category
                                            </label>
                                            <select
                                                id="category"
                                                className="form-control"
                                                value={isAddingProduct ? newProduct.category : productToEdit.category}
                                                onChange={(e) =>
                                                    isAddingProduct
                                                        ? setNewProduct({ ...newProduct, category: e.target.value })
                                                        : setProductToEdit({ ...productToEdit, category: e.target.value })
                                                }
                                            >
                                                {categories.map((category, index) => (
                                                    <option key={index} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={isAddingProduct ? handleAddProduct : handleEditProduct}
                                        >
                                            {isAddingProduct ? 'Add Product' : 'Update Product'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Products;
