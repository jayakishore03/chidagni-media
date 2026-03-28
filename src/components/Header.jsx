import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('chidagni-theme') || 'light');
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        document.documentElement.setAttribute('data-theme', theme);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('chidagni-theme', newTheme);
    };

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchActive(false);
            setSearchQuery('');
        }
    };

    const categories = [
        { name: 'Home', id: '' },
        { name: 'Market Hub', id: 'market-hub' },
        { name: 'Politics', id: 'politics' },
        { name: 'Business', id: 'business' },
        { name: 'Markets', id: 'markets' },
        { name: 'Tech & AI', id: 'tech' },
        { name: 'Economy', id: 'economy' },
        { name: 'International', id: 'international' },
        { name: 'Sports', id: 'sports' },
        { name: 'Lifestyle', id: 'lifestyle' }
    ];

    return (
        <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="logo">
                    <Link to="/">CHIDAGNI<span>MEDIA</span></Link>
                </div>

                <nav className={`nav-links ${mobileMenu ? 'active' : ''}`}>
                    {categories.map(cat => (
                        <Link
                            key={cat.id}
                            to={cat.id === '' ? '/' : `/${cat.id}`}
                            className={location.pathname === (cat.id === '' ? '/' : `/${cat.id}`) ? 'active' : ''}
                            onClick={() => setMobileMenu(false)}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </nav>

                <div className="header-tools">
                    <div className={`search-container ${searchActive ? 'active' : ''}`}>
                        {searchActive ? (
                            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    placeholder="Search Dossiers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="search-input"
                                />
                                {searchQuery.trim() ? (
                                    <button type="submit" className="search-btn"><i className="fas fa-search"></i></button>
                                ) : (
                                    <button type="button" className="search-btn" onClick={() => setSearchActive(false)}><i className="fas fa-times"></i></button>
                                )}
                            </form>
                        ) : (
                            <button className="search-btn" onClick={() => setSearchActive(true)} title="Search Database">
                                <i className="fas fa-search"></i>
                            </button>
                        )}
                    </div>
                    <button className="theme-btn" onClick={toggleTheme} title="Toggle Light/Dark Mode">
                        <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>
                    <div className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
                        <i className={`fas ${mobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
