import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, editProduct, deleteProduct } from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null); // Product being edited
    const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // Track if modal is open
    const [isAddingProduct, setIsAddingProduct] = useState(false); // Toggle between Add/Edit modals

    // Fetch products on mount
    useEffect(() => {
        fetchProducts()
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Handle adding a new product
    const handleAddProduct = () => {
        addProduct(newProduct)
            .then((response) => {
                setProducts([...products, response.data]);
                setNewProduct({ title: '', price: '', description: '' });
                setIsModalOpen(false); // Close modal after adding
            })
            .catch((error) => console.error(error));
    };

    // Handle updating a product
    const handleEditProduct = () => {
        if (productToEdit) {
            editProduct(productToEdit.id, productToEdit)
                .then((response) => {
                    const updatedProducts = products.map((product) =>
                        product.id === response.data.id ? response.data : product
                    );
                    setProducts(updatedProducts);
                    setIsModalOpen(false); // Close modal after editing
                })
                .catch((error) => console.error(error));
        }
    };

    // Handle deleting a product
    const handleDeleteProduct = (id) => {
        deleteProduct(id)
            .then(() => {
                setProducts(products.filter((product) => product.id !== id));
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h3>Products</h3>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {/* Button to open Add Product modal */}
                    <button
                        className="btn btn-primary mb-3"
                        onClick={() => {
                            setIsAddingProduct(true); // Set flag to show Add Product modal
                            setIsModalOpen(true); // Open the modal
                        }}
                    >
                        Add Product
                    </button>

                    {/* Product table */}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#808080' }}>ID</th>
                                <th style={{ backgroundColor: '#808080' }}>Title</th>
                                <th style={{ backgroundColor: '#808080' }}>Price</th>
                                <th style={{ backgroundColor: '#808080' }}>Description</th>
                                <th style={{ backgroundColor: '#808080' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td style={{
                                        backgroundColor: '#AEC6CF'
                                    }}>{product.id}</td>
                                    <td style={{
                                        backgroundColor: '#AEC6CF'
                                    }}>{product.title}</td>
                                    <td style={{
                                        backgroundColor: '#AEC6CF'
                                    }}>${product.price}</td>
                                    <td style={{
                                        backgroundColor: '#AEC6CF'
                                    }}>{product.description}</td>
                                    <td style={{
                                        backgroundColor: '#AEC6CF'
                                    }}>
                                        {/* Edit button with margin-right */}
                                        <button
                                            className="btn btn-secondary btn-sm mb-3" // Added margin-right using me-3
                                            onClick={() => {
                                                setProductToEdit({ ...product }); // Set product to edit
                                                setIsAddingProduct(false); // Set flag for Edit Product
                                                setIsModalOpen(true); // Open modal for editing
                                            }}
                                        >
                                            Edit
                                        </button>
                                        {/* Remove button */}
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

                    {/* Modal for Add/Edit Product */}
                    {isModalOpen && (
                        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            {isAddingProduct ? 'Add Product' : 'Edit Product'}
                                        </h5>
                                        {/* Removed the "X" close button */}
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
