import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = ({ onNewCategoryAdded }) => {
    const [categories, setCategories] = useState([]);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios
            .get('https://fakestoreapi.com/products/categories')
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleAddCategory = () => {
        const newCategories = [...categories, newCategory];
        setCategories(newCategories);
        setNewCategory('');
        setIsModalOpen(false);

        // Pass only the new category to the Products component
        onNewCategoryAdded(newCategory);
    };

    const handleEditCategory = () => {
        if (categoryToEdit) {
            const updatedCategories = categories.map((category) =>
                category === categoryToEdit.old ? categoryToEdit.new : category
            );
            setCategories(updatedCategories);
            setCategoryToEdit(null);
            setIsModalOpen(false);
        }
    };

    const handleDeleteCategory = (category) => {
        setCategories(categories.filter((cat) => cat !== category));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCategories = categories.filter((category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h3>Categories</h3>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Search by category"
                            className="form-control"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <button
                        className="btn btn-primary mb-3"
                        onClick={() => {
                            setIsAddingCategory(true);
                            setIsModalOpen(true);
                        }}
                    >
                        Add Category
                    </button>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#808080' }}>ID</th>
                                <th style={{ backgroundColor: '#808080' }}>Category</th>
                                <th style={{ backgroundColor: '#808080' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.map((category, index) => (
                                <tr key={index}>
                                    <td style={{ backgroundColor: '#AEC6CF' }}>{index + 1}</td>
                                    <td style={{ backgroundColor: '#AEC6CF' }}>{category}</td>
                                    <td style={{ backgroundColor: '#AEC6CF' }} className="d-flex justify-content-center">
                                        <button
                                            className="btn btn-secondary btn-sm me-3"
                                            onClick={() => {
                                                setCategoryToEdit({ old: category, new: category });
                                                setIsAddingCategory(false);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            Edit
                                        </button>
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
