import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import ArticleDetail from './pages/ArticleDetail';
import Dashboard from './pages/Dashboard';

import SearchResults from './pages/SearchResults';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/market-hub" element={<Dashboard />} />
          <Route path="/:categoryId" element={<Category />} />
          <Route path="/:categoryId/:articleId" element={<ArticleDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
