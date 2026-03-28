import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="logo">CHIDAGNI<span>MEDIA</span></div>
                        <p>India's high-intelligence digital news powerhouse. Delivering the architecture of global thought.</p>
                    </div>
                    
                    <div className="footer-links">
                        <h4>Intelligence Core</h4>
                        <Link to="/politics">Politics</Link>
                        <Link to="/business">Business</Link>
                        <Link to="/market-hub">Market Hub</Link>
                        <Link to="/tech">Tech & AI</Link>
                    </div>
                    
                    <div className="footer-links">
                        <h4>Network Resources</h4>
                        <Link to="/global-news">Global Intel</Link>
                        <Link to="/economy">Economy Hub</Link>
                        <Link to="/lifestyle">Prestige Life</Link>
                        <Link to="/sports">Sports Matrix</Link>
                    </div>

                    <div className="footer-links">
                        <h4>The Organization</h4>
                        <Link to="/about">About Core</Link>
                        <Link to="/careers">Careers</Link>
                        <Link to="/contact">Contact Profile</Link>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom container">
                <p>&copy; 2026 Chidagni Media Group. All Intelligence Modules Calibrated for Global Stability.</p>
            </div>
        </footer>
    );
};

export default Footer;
