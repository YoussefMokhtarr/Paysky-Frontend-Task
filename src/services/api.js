import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export const fetchProducts = () => axios.get(`${API_URL}/products`);

export const fetchCategories = () => axios.get(`${API_URL}/products/categories`);

export const addProduct = (product) => axios.post(`${API_URL}/products`, product);

export const editProduct = (id, updatedProduct) => axios.put(`${API_URL}/products/${id}`, updatedProduct);

export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);

export const addCategory = (category) => axios.post(`${API_URL}/products/categories`, { category });

export const deleteCategory = (category) => axios.delete(`${API_URL}/products/categories/${category}`);