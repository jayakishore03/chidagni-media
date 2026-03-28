import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { intelligenceData } from '../data/newsData';

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') || '';
    const [results, setResults] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (query) {
            const allArticles = [];
            Object.keys(intelligenceData).forEach(category => {
                intelligenceData[category].articles.forEach(article => {
                    if (
                        article.title.toLowerCase().includes(query.toLowerCase()) ||
                        article.fullBody.toLowerCase().includes(query.toLowerCase()) ||
                        article.meta.toLowerCase().includes(query.toLowerCase())
                    ) {
                        allArticles.push({ ...article, category });
                    }
                });
            });
            setResults(allArticles);
        }
    }, [query]);

    return (
        <div className="search-page container" style={{ padding: '100px 20px', minHeight: '80vh' }}>
            <div className="section-title">
                <h1>SEARCH<span> RESULTS</span></h1>
                <p>Intelligence query for: <strong>"{query}"</strong></p>
                <div style={{ marginTop: '10px', fontSize: '1rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                    {results.length} DOCUMENT(S) RETRIEVED
                </div>
            </div>

            {results.length > 0 ? (
                <div className="category-grid" style={{ marginTop: '50px' }}>
                    {results.map(art => (
                        <Link key={`${art.category}-${art.id}`} to={`/${art.category}/${art.id}`} className="card-category">
                            <img 
                                src={art.img} 
                                alt={art.title} 
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'; }}
                            />
                            <div className="card-category-body">
                                <span className="badge" style={{ position: 'absolute', top: '25px', left: '25px' }}>{art.category.toUpperCase()}</span>
                                <h3>{art.title}</h3>
                                <p>{art.fullBody.substring(0, 80)}...</p>
                                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px' }}>
                                    VIEW DOSSIER <i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '100px', border: '1px dashed var(--gray-300)', padding: '60px', borderRadius: '24px' }}>
                    <i className="fas fa-search" style={{ fontSize: '3rem', color: 'var(--gray-200)', marginBottom: '20px' }}></i>
                    <h3>No intelligence match found.</h3>
                    <p style={{ opacity: 0.6 }}>Try broader keywords or different nomenclature.</p>
                    <Link to="/" className="back-link" style={{ justifyContent: 'center', marginTop: '30px' }}>
                        RETURN TO HUB
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
