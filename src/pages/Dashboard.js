import React, { useState } from 'react';
import Products from '../components/Products';
import Categories from '../components/Categories';
import "../styles/Dashboard.css";

const Dashboard = ({ onLogout }) => {
    const [activeSection, setActiveSection] = useState('');

    return (
        <div className="container-fluid">
            <div className="row vh-100">
                {/* Sidebar */}
                <aside className="col-md-3 bg-light border-end p-3">
                    <h4>Admin Panel</h4>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <button
                                className={`products-button ${activeSection === 'Products' ? 'active' : ''
                                    }`}
                                onClick={() => setActiveSection('Products')}
                            >
                                Products
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`categories-button ${activeSection === 'Categories' ? 'active' : ''
                                    }`}
                                onClick={() => setActiveSection('Categories')}
                            >
                                Categories
                            </button>
                        </li>
                    </ul>
                    <button className="btn btn-danger mt-5 w-100" onClick={onLogout}>
                        Log out
                    </button>
                </aside>


                <main className="col-md-9 p-4">
                    {activeSection === '' ? null : activeSection === 'Products' ? (
                        <Products />
                    ) : (
                        <Categories />
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
