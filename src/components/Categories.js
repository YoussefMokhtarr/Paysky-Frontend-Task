import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryToEdit, setCategoryToEdit] = useState(null); // Category being edited
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // Track if modal is open
    const [isAddingCategory, setIsAddingCategory] = useState(false); // Toggle between Add/Edit modals

    // Fetch categories on mount
    useEffect(() => {
        axios
            .get('https://fakestoreapi.com/products/categories')
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Handle adding a new category
    const handleAddCategory = () => {
        const newCategories = [...categories, newCategory];
        setCategories(newCategories);
        setNewCategory('');
        setIsModalOpen(false); // Close modal after adding
    };

    // Handle editing a category
    const handleEditCategory = () => {
        if (categoryToEdit) {
            const updatedCategories = categories.map((category) =>
                category === categoryToEdit.old ? categoryToEdit.new : category
            );
            setCategories(updatedCategories);
            setCategoryToEdit(null); // Reset editing mode
            setIsModalOpen(false); // Close modal after editing
        }
    };

    // Handle deleting a category
    const handleDeleteCategory = (category) => {
        setCategories(categories.filter((cat) => cat !== category));
    };

    return (
        <div>
            <h3>Categories</h3>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {/* Button to open Add Category modal */}
                    <button
                        className="btn btn-primary mb-3"
                        onClick={() => {
                            setIsAddingCategory(true); // Set flag to show Add Category modal
                            setIsModalOpen(true); // Open the modal
                        }}
                    >
                        Add Category
                    </button>

                    {/* Categories table */}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#808080' }}>ID</th>
                                <th style={{ backgroundColor: '#808080' }}>Category</th>
                                <th style={{ backgroundColor: '#808080' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={index}>
                                    <td style={{
                                        backgroundColor: '#AEC6CF'
                                    }}>{index + 1}</td>
                                    <td style={{
                                        backgroundColor: '#AEC6CF'
                                    }}>{category}</td>
                                    <td style={{
                                        backgroundColor: '#AEC6CF'
                                    }} className="d-flex justify-content-center">
                                        {/* Edit button */}
                                        <button
                                            className="btn btn-secondary btn-sm me-3"
                                            onClick={() => {
                                                setCategoryToEdit({ old: category, new: category }); // Set category to edit
                                                setIsAddingCategory(false); // Set flag for Edit Category
                                                setIsModalOpen(true); // Open modal for editing
                                            }}
                                        >
                                            Edit
                                        </button>
                                        {/* Remove button */}
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => handleDeleteCategory(category)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Modal for Add/Edit Category */}
                    {isModalOpen && (
                        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            {isAddingCategory ? 'Add Category' : 'Edit Category'}
                                        </h5>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="category" className="form-label">
                                                Category Name
                                            </label>
                                            <input
                                                type="text"
                                                id="category"
                                                className="form-control"
                                                value={isAddingCategory ? newCategory : categoryToEdit?.new}
                                                onChange={(e) =>
                                                    isAddingCategory
                                                        ? setNewCategory(e.target.value)
                                                        : setCategoryToEdit({ ...categoryToEdit, new: e.target.value })
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
                                            onClick={isAddingCategory ? handleAddCategory : handleEditCategory}
                                        >
                                            {isAddingCategory ? 'Add Category' : 'Update Category'}
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

export default Categories;
