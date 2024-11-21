import React, { useState } from 'react';
import Products from '../components/Products';
import Categories from '../components/Categories';
import "../styles/Dashboard.css";

const Dashboard = ({ onLogout }) => {
    const [activeSection, setActiveSection] = useState('');

    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <aside className="col-md-3 border-end p-3" style={{ backgroundColor: '#061E47' }}>
                    <h4 style={{ color: 'white' }}>Admin Panel</h4>
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
                    <button className="btn mt-5 w-100 logout-btn" onClick={onLogout}>
                        Log out
                    </button>
                </aside>


                <main className="col-md-9 p-4" style={{ backgroundColor: '#cccbca' }}>
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
