import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const icons = [
        { icon: 'home', id: '' },
        { icon: 'chart-line', id: 'market-hub' },
        { icon: 'database', id: 'politics' },
        { icon: 'shield-alt', id: 'tech' },
        { icon: 'broadcast-tower', id: 'international' },
        { icon: 'cog', id: 'contact' }
    ];
    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-logo" style={{ marginBottom: '20px' }}><i className="fas fa-brain" style={{ color: 'var(--accent-gold)', fontSize: '1.5rem' }}></i></div>
            {icons.map((item, i) => (
                <Link key={i} to={item.id === '' ? '/' : `/${item.id}`} className={`sidebar-icon ${item.id === 'market-hub' ? 'active' : ''}`}>
                    <i className={`fas fa-${item.icon}`}></i>
                </Link>
            ))}
            <div style={{ marginTop: 'auto' }}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '12px', border: '2px solid var(--accent-gold)', objectFit: 'cover' }} />
            </div>
        </aside>
    );
};

const AreaChart = () => {
    const [points, setPoints] = useState([80, 60, 75, 30, 50, 20, 40, 10, 30, 55, 45, 70, 15]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setPoints(prev => [...prev.slice(1), Math.max(10, Math.min(90, prev[prev.length-1] + (Math.random() * 20 - 10)))]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const pathData = points.map((p, i) => `${i * 20},${p}`).join(' ');

    return (
        <svg viewBox="0 0 240 100" preserveAspectRatio="none" style={{ width: '100%', height: '120px', marginTop: '20px' }}>
            <motion.path 
                d={`M ${pathData}`} 
                fill="none" 
                stroke="var(--accent-gold)" 
                strokeWidth="3" 
                animate={{ d: `M ${pathData}` }}
                transition={{ duration: 0.5 }}
            />
            <path d={`M ${pathData} V 100 H 0 Z`} fill="url(#grad)" opacity="0.1" />
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'var(--accent-gold)', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'var(--accent-gold)', stopOpacity: 0 }} />
                </linearGradient>
            </defs>
        </svg>
    );
};

const Gauge = () => {
    const [offset, setOffset] = useState(75);
    const [val, setVal] = useState(12850);

    useEffect(() => {
        const interval = setInterval(() => {
            const delta = Math.floor(Math.random() * 200 - 100);
            setVal(v => Math.max(5000, v + delta));
            setOffset(prev => Math.max(50, Math.min(200, prev + (delta / 100))));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="gauge-container">
            <svg className="gauge-svg" viewBox="0 0 200 100">
                <path className="gauge-arc" d="M20,90 A80,80 0 0,1 180,90" />
                <motion.path 
                    className="gauge-fill" 
                    d="M20,90 A80,80 0 0,1 180,90" 
                    strokeDasharray="251" 
                    animate={{ strokeDashoffset: offset }} 
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <div style={{ position: 'absolute', bottom: '15px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>${val.toLocaleString()}</div>
                <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>ALLOCATED</div>
            </div>
        </div>
    );
};

const Heatmap = () => {
    const cells = Array.from({ length: 35 });
    const colors = ['rgba(197, 160, 89, 0.1)', 'rgba(197, 160, 89, 0.3)', 'rgba(197, 160, 89, 0.6)', 'rgba(197, 160, 89, 0.9)'];
    return (
        <div className="heatmap-grid">
            {cells.map((_, i) => (
                <div key={i} className="heatmap-cell" style={{ background: colors[Math.floor(Math.random() * colors.length)] }}></div>
            ))}
        </div>
    );
};

const Dashboard = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="dashboard-page">
            <Sidebar />
            
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h2>Market Intelligence <span style={{ color: 'var(--accent-gold)' }}>Dashboard</span></h2>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <i className="fas fa-search sidebar-icon"></i>
                        <i className="fas fa-bell sidebar-icon"></i>
                    </div>
                </header>

                <div className="dashboard-grid-layout">
                    {/* Top Row */}
                    <div className="widget-card">
                        <div className="widget-title">Intelligence Capital <i className="fas fa-ellipsis-h"></i></div>
                        <div className="widget-value">$25,230.88</div>
                        <div className="widget-trend">+12.56% this week</div>
                        <AreaChart />
                    </div>

                    <div className="widget-card">
                        <div className="widget-title">Resource Allocation <i className="fas fa-expand"></i></div>
                        <Gauge />
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', fontSize: '0.6rem' }}>
                            <span><i className="fas fa-circle" style={{ color: 'var(--accent-gold)', marginRight: '5px' }}></i> Intel</span>
                            <span><i className="fas fa-circle" style={{ color: '#475569', marginRight: '5px' }}></i> Ops</span>
                        </div>
                    </div>

                    <div className="widget-card">
                        <div className="widget-title">Access Card <i className="fas fa-arrow-up"></i></div>
                        <div className="premium-card-ui">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 800 }}>CHIDAGNI MEDIA</span>
                                <i className="fab fa-mastercard" style={{ fontSize: '1.5rem' }}></i>
                            </div>
                            <div style={{ fontSize: '1.1rem', letterSpacing: '2px', fontWeight: 600 }}>**** **** **** 5123</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                                <span>DEV CHIDAGNI</span>
                                <span>02/30</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '10px', borderRadius: '12px', fontSize: '0.7rem' }}>TOP UP</button>
                            <button style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '10px', borderRadius: '12px', fontSize: '0.7rem' }}>TRANSFER</button>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="widget-card">
                        <div className="widget-title">Operational Budget <span style={{ color: 'var(--accent-gold)', fontSize: '0.6rem' }}>WEEKLY</span></div>
                        <div style={{ height: '150px', display: 'flex', alignItems: 'flex-end', gap: '15px' }}>
                            {[60, 80, 40, 90, 55, 70, 85].map((h, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ height: 0 }} 
                                    animate={{ height: `${h + (Math.sin(Date.now() / 1000 + i) * 5)}%` }} 
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                    style={{ flex: 1, background: i % 2 === 0 ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)', borderRadius: '4px' }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="widget-card">
                        <div className="widget-title">Intelligence Heatmap <i className="fas fa-globe"></i></div>
                        <Heatmap />
                    </div>

                    <div className="widget-card" style={{ gridRow: 'span 2' }}>
                        <div className="widget-title">Recent Dossier Transfers <i className="fas fa-plus"></i></div>
                        <div className="trans-list">
                            {[
                                { name: 'Dossier #4521', date: '8 Aug, 11:55 AM', val: '-$12.89', status: 'success', icon: 'file-alt' },
                                { name: 'Global Intel Unit', date: '7 Aug, 8:25 AM', val: '-$102.56', status: 'failed', icon: 'building' },
                                { name: 'Neural Link API', date: '6 Aug, 9:44 AM', val: '-$10.99', status: 'success', icon: 'link' },
                                { name: 'Satellite Data', date: '5 Aug, 10:00 PM', val: '-$59.25', status: 'success', icon: 'satellite' },
                                { name: 'Encryption Key', date: '4 Aug, 1:52 PM', val: '+$80.89', status: 'success', icon: 'key' }
                            ].map((item, i) => (
                                <div key={i} className="trans-item">
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <div className="trans-icon"><i className={`fas fa-${item.icon}`}></i></div>
                                        <div className="trans-details">
                                            <h4>{item.name}</h4>
                                            <p>{item.date}</p>
                                        </div>
                                    </div>
                                    <div className="trans-amount">
                                        <div className="val">{item.val}</div>
                                        <div className="status" style={{ color: item.status === 'success' ? '#10b981' : '#ef4444' }}>{item.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Third Row Bottom Widgets */}
                    <div className="widget-card" style={{ gridColumn: 'span 2' }}>
                        <div className="widget-title">High-Priority Contacts <i className="fas fa-sync"></i></div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            {[
                                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
                                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
                                "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
                                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
                                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=150"
                            ].map((img, i) => (
                                <img key={i} src={img} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.05)', objectFit: 'cover' }} />
                            ))}
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px dotted #475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#475569' }}>+</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
