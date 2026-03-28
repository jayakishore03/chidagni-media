import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { intelligenceData } from '../data/newsData';

const Category = () => {
    const { categoryId } = useParams();
    const data = intelligenceData[categoryId] || intelligenceData['politics'];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [categoryId]);

    return (
        <main className="container category-page">
            <div className="section-title">
                <h1>{data.title}</h1>
                <p>High-fidelity dossiers calibrated for global decision-makers.</p>
            </div>

            <div className="category-grid">
                {data.articles.map((article) => (
                    <Link key={article.id} to={`/${categoryId}/${article.id}`} className="card-category">
                        <img
                            src={article.img}
                            alt={article.title}
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'; }}
                        />
                        <div className="card-category-body">
                            <span className="badge" style={{ position: 'absolute', top: '25px', left: '25px' }}>{article.meta}</span>
                            <h3>{article.title}</h3>
                            <p>{article.fullBody.substring(0, 100)}...</p>
                            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px' }}>
                                VIEW DOSSIER <i className="fas fa-chevron-right"></i>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default Category;
