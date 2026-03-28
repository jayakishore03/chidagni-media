import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { intelligenceData } from '../data/newsData';

const ArticleDetail = () => {
    const { categoryId, articleId } = useParams();
    
    // Safety Fallbacks
    const catId = categoryId || 'politics';
    const catData = intelligenceData[catId] || intelligenceData['politics'];
    const article = catData.articles.find(a => a.id === articleId) || catData.articles[0];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [articleId]);

    if (!article) return <div style={{ padding: '100px', textAlign: 'center' }}>Intelligence Dossier Not Found.</div>;

    return (
        <main className="container article-view">
            <Link to={`/${catId}`} className="back-link">
                <i className="fas fa-arrow-left"></i> BACK TO {catId.toUpperCase()} SECTOR
            </Link>

            <article className="article-main-layout">
                <aside className="article-sidebar">
                    <div className="article-hero-img">
                        <img src={article.img} alt={article.title} />
                    </div>
                </aside>

                <div className="article-body-wrapper">
                    <header className="article-header">
                        <span className="badge">{article.meta} • Strategic Analysis</span>
                        <h1>{article.title}</h1>
                        
                        <div className="article-meta">
                            <span><i className="far fa-calendar-alt"></i> {article.date?.toUpperCase()}</span>
                            <span><i className="far fa-clock"></i> {article.readTime?.toUpperCase()}</span>
                        </div>
                        <div className="article-meta" style={{ marginTop: '-20px', borderTop: 'none' }}>
                            <span><i className="far fa-user"></i> ANALYST: {article.author?.toUpperCase()}</span>
                        </div>
                    </header>

                    <div className="article-content">
                        <p className="lead-text">
                            {article.fullBody.substring(0, 200)}...
                        </p>
                        
                        <p>
                            {article.fullBody}. As the global media landscape transitions into a decentralized era, Chidagni Media leads the charge in providing high-fidelity, verified information streams. Our investigative units have calibrated the primary datasets in this dossier to ensure absolute strategic accuracy for global decision-makers.
                        </p>

                        <h2>Dossier Intelligence Hub</h2>
                        
                        <p>
                            The integration of advanced neural networks at the administrative level has redefined how structural bottlenecks are addressed in 2026. This transformation is not just technological—it is cultural. We are seeing a complete pivot in the global reporting paradigm, where data velocity matches human intuition.
                        </p>

                        <blockquote>
                            <i className="fas fa-quote-left"></i>
                            <p>
                            "The future of global intelligence relies on the intersection of verified data and cinematic architecture."
                            </p>
                            <footer>— CHIDAGNI STRATEGIC COMMAND</footer>
                        </blockquote>

                        <p>
                            Looking ahead to the final quarter of 2026, we anticipate a stabilization of these high-velocity news cycles. Our future metrics indicate that institutions adopting these transparent, high-fidelity protocols will be the primary drivers of global economic stability.
                        </p>
                        
                        <div className="share-box">
                            <div className="share-label">
                                <h4>SHARE DOSSIER</h4>
                                <p>Distribute verified intelligence.</p>
                            </div>
                            <div className="share-icons">
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-linkedin"></i>
                                <i className="fab fa-whatsapp"></i>
                                <i className="fas fa-link"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
};

export default ArticleDetail;
