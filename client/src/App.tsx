import React from 'react';
import ProductList from "./components/productList/ProductList";
import Header from './components/header/Header';
import Sidebar from "./components/sideBar/SideBar";
import './App.css';

const App: React.FC = () => {
    return (
        <div className="app">
            <Header />
            <div className="app__main-content">
                <Sidebar />
                <ProductList />
            </div>
        </div>
    );
};

export default App;
