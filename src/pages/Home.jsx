import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { intelligenceData } from '../data/newsData';

const Ticker = () => {
    const headlines = [
        "Supreme Court issues landmark ruling on Digital Privacy Rights 2026",
        "NIFTY 50 hits record high at 26,450 points",
        "New AI Policy announced for Indian Startups",
        "National Election Projections: AI Analytics Updated",
        "Global Infrastructure Summit: India Pledges Zero Emissions by 2050"
    ];

    return (
        <div className="breaking-ticker">
            <div className="container">
                <div className="ticker-container">
                    <div className="ticker-label">Breaking News</div>
                    <div className="ticker-content">
                        {headlines.map((h, i) => (
                            <React.Fragment key={i}>
                                {h} &nbsp;&bull;&nbsp;
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StockGraph = () => {
    const [data, setData] = useState([40, 35, 55, 45, 75, 65, 85, 80, 100, 95]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => [...prev.slice(1), prev[prev.length-1] + (Math.random() * 20 - 10)]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const points = data.map((val, i) => `${i * 10},${100 - val}`).join(' ');
    const pathData = `M ${points}`;

    return (
        <div className="stock-chart-container">
            <svg viewBox="0 0 90 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                <defs>
                    <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent-gold)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--accent-gold)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path 
                    d={pathData} 
                    className="chart-path"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                />
                <path d={`${pathData} L 90,100 L 0,100 Z`} className="chart-area" />
            </svg>
            <div style={{ position: 'absolute', top: 0, right: 0, textAlign: 'right' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-gold)' }}>27,452.10</div>
                <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.8rem' }}>+1.45% <i className="fas fa-caret-up"></i></div>
            </div>
        </div>
    );
};

const ElectionMap = () => {
    const regions = [
        { id: 'north', name: 'Northern Bloc', sentiment: 72, path: "M10,10 L30,5 L50,15 L45,35 L20,30 Z" },
        { id: 'west', name: 'Western Core', sentiment: 65, path: "M15,35 L40,40 L35,65 L10,60 Z" },
        { id: 'central', name: 'Central Matrix', sentiment: 81, path: "M45,40 L70,35 L75,60 L50,65 Z" },
        { id: 'south', name: 'Southern Grid', sentiment: 58, path: "M20,65 L55,70 L45,95 L15,90 Z" },
        { id: 'east', name: 'Eastern Corridor', sentiment: 69, path: "M75,20 L95,25 L90,50 L70,45 Z" }
    ];

    const [hovered, setHovered] = useState(null);

    return (
        <div style={{ position: 'relative' }}>
            <svg viewBox="0 0 100 100" className="election-map-svg">
                {regions.map(r => (
                    <motion.path
                        key={r.id}
                        d={r.path}
                        className="map-region"
                        style={{ fill: hovered === r.id ? 'var(--accent-gold)' : '' }}
                        onMouseEnter={() => setHovered(r.id)}
                        onMouseLeave={() => setHovered(null)}
                        whileHover={{ scale: 1.05 }}
                    />
                ))}
            </svg>
            <AnimatePresence>
                {hovered && (
                    <motion.div 
                        className="region-tooltip"
                        style={{ display: 'block', top: '10px', left: '10px' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <strong>{regions.find(r => r.id === hovered).name}</strong>
                        <div style={{ color: 'var(--accent-gold)', marginTop: '5px' }}>Support: {regions.find(r => r.id === hovered).sentiment}%</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const GDPComparison = () => {
    const [active, setActive] = useState(false);
    useEffect(() => {
        setTimeout(() => setActive(true), 500);
    }, []);

    const data = [
        { label: 'India', value: 8.4 },
        { label: 'ASEAN', value: 5.2 },
        { label: 'EU', value: 1.8 },
        { label: 'USA', value: 2.1 }
    ];

    return (
        <div className="gdp-grid">
            {data.map(d => (
                <div key={d.label} className="gdp-row">
                    <span className="gdp-label">{d.label}</span>
                    <div className="gdp-track">
                        <motion.div 
                            className="gdp-fill" 
                            initial={{ width: 0 }}
                            animate={{ width: active ? `${d.value * 10}%` : 0 }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                        />
                    </div>
                    <span className="gdp-value">{d.value}%</span>
                </div>
            ))}
        </div>
    );
};

const IntelligenceDashboard = () => {
    return (
        <section className="container data-dashboard">
            <div className="section-title">
                <h1>GLOBAL DATA INTELLIGENCE</h1>
                <p>Live metrics and spatial sentiment analytics from our primary observation nodes.</p>
            </div>

            <div className="dashboard-grid">
                <div className="data-card">
                    <div className="data-card-header">
                        <h3>NIFTY 50 Benchmark</h3>
                        <div className="live-badge"><div className="live-dot"></div> LIVE PROTOCOL</div>
                    </div>
                    <StockGraph />
                </div>

                <div className="data-card">
                    <div className="data-card-header">
                        <h3>Election Matrix 2026</h3>
                        <div className="live-badge"><div className="live-dot"></div> SPATIAL INTEL</div>
                    </div>
                    <ElectionMap />
                </div>

                <div className="data-card" style={{ gridColumn: 'span 1' }}>
                    <div className="data-card-header">
                        <h3>GDP Growth Velocity</h3>
                        <div className="live-badge">Q1 FORECAST</div>
                    </div>
                    <GDPComparison />
                </div>
                
                <div className="data-card" style={{ background: 'var(--primary-indigo)', color: 'var(--white)' }}>
                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--accent-gold)', marginBottom: '15px' }}>Dossier Verification</h2>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Our data streams are audited by triple-redundant neural consensus layers. Every data point on this dashboard is accurate within 0.001% of physical reality benchmarks.</p>
                    <button style={{ marginTop: '30px', background: 'var(--accent-gold)', border: 'none', padding: '15px 30px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', color: 'var(--primary-indigo)' }}>
                        ACCESS FULL AUDIT
                    </button>
                </div>
            </div>
        </section>
    );
};

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch featured articles from our intelligence grid
    const politicsArticles = intelligenceData['politics'].articles;
    const [activeTab, setActiveTab ] = useState("Trending Now");

    const tabData = {
        "Trending Now": [
            intelligenceData['politics'].articles[0],
            intelligenceData['tech'].articles[0],
            intelligenceData['business'].articles[0]
        ],
        "Editor Picks": [
            intelligenceData['markets'].articles[0],
            intelligenceData['economy'].articles[0],
            intelligenceData['international'].articles[1]
        ],
        "Explained (Deep Dive)": [
            intelligenceData['politics'].articles[1],
            intelligenceData['tech'].articles[1],
            intelligenceData['lifestyle'].articles[0]
        ]
    };

    const getCategoryByArticle = (article) => {
        for(let cat in intelligenceData) {
            if(intelligenceData[cat].articles.find(a => a.id === article.id)) return cat;
        }
        return 'politics';
    };

    return (
        <div className="home-view">
            <Ticker />

            <section className="hero-news container">
                <div className="news-grid-main">
                    {/* Featured Article - Intelligence Command Tile */}
                    <Link to={`/politics/${politicsArticles[0].id}`} className="card-featured">
                        <div className="card-featured-img">
                            <img src={politicsArticles[0].img} alt="Investigative Report" />
                        </div>
                        <div className="card-featured-content">
                            <span className="badge">Featured Dossier</span>
                            <h1>{politicsArticles[0].title}</h1>
                            <p>{politicsArticles[0].fullBody.substring(0, 140)}...</p>
                        </div>
                    </Link>

                    <aside className="news-stack">
                        <div className="section-title">
                            <h2 style={{ fontSize: '1.5rem', borderLeft: '3px solid var(--accent-gold)', paddingLeft: '12px', marginBottom: '10px' }}>Quick Intel</h2>
                        </div>
                        {politicsArticles.slice(1, 4).map(art => (
                            <Link key={art.id} to={`/politics/${art.id}`} className="card-small">
                                <div className="card-small-img">
                                    <img
                                        src={art.img}
                                        alt={art.title}
                                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800'; }}
                                    />
                                </div>
                                <div className="card-small-content">
                                    <span className="badge">{art.meta}</span>
                                    <h3>{art.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </aside>
                </div>
            </section>

            <section className="container intelligence-feed">
                <div className="tabs-nav">
                    {["Trending Now", "Editor Picks", "Explained (Deep Dive)"].map(tab => (
                        <button 
                            key={tab} 
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="tab-content">
                    <div className="feed-grid">
                        {tabData[activeTab].map((item, idx) => (
                            <Link key={idx} to={`/${getCategoryByArticle(item)}/${item.id}`} className="feed-item">
                                <div className="feed-item-img">
                                    <img src={item.img} alt={item.title} />
                                </div>
                                <div className="feed-item-body">
                                    <span className="feed-tag">{item.meta}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.fullBody.substring(0, 100)}...</p>
                                    <div style={{ color: 'var(--accent-gold)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px' }}>
                                        VIEW DOSSIER <i className="fas fa-arrow-right"></i>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <IntelligenceDashboard />

            <section className="container" style={{ marginTop: '50px' }}>
                <div className="analytics-card">
                    <div className="analytics-card-flex">
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Political Sentiment AI</h2>
                            <p style={{ opacity: 0.6 }}>Real-time analytics calibrated for 2026 election cycles.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '40px' }} className="mobile-stats">
                            <div className="stat-box"><span className="number">78%</span><div className="label">POSITIVE</div></div>
                            <div className="stat-box"><span className="number">28</span><div className="label">REGIONS</div></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container" style={{ marginTop: '100px' }}>
                <div className="section-title" style={{ marginBottom: '40px' }}>
                    <h2 style={{ borderLeft: '8px solid var(--accent-gold)', paddingLeft: '25px', fontSize: '2.2rem' }}>Sector Portfolios</h2>
                </div>
                <div className="category-grid">
                    {/* Unified Card Architecture */}
                    {Object.keys(intelligenceData).map(key => {
                        const art = intelligenceData[key].articles[0];
                        return (
                            <Link key={key} to={`/${key}`} className="card-category">
                                <img 
                                    src={art.img} 
                                    alt={art.title} 
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'; }}
                                />
                                <div className="card-category-body">
                                    <span className="badge" style={{ position: 'absolute', top: '25px', left: '25px' }}>{key.toUpperCase()}</span>
                                    <h3>{intelligenceData[key].title}</h3>
                                    <p>{art.fullBody.substring(0, 80)}...</p>
                                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px' }}>
                                        ACCESS SECTOR <i className="fas fa-chevron-right"></i>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Home;
