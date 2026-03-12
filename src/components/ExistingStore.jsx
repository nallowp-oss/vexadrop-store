import React, { useEffect } from 'react';

const ExistingStore = () => {
    useEffect(() => {
        // Here we would ideally Re-initialize any JS logic if it were in external files
        // Since main.js and index.html scripts were designed for static, we might need to 
        // ensure they run after mount if we moved them here.
        // For now, we're focusing on the Coming Soon gate.
    }, []);

    return (
        <div id="existing-store-root">
            {/* 
                The actual store content is being moved to this component 
                to satisfy the requirement of wrapping it in an 'if' statement.
            */}
            <header>
                <nav className="container">
                    <a href="#" className="nav-brand">VEXADROP</a>
                    <div className="nav-center">
                        <a href="#hero" className="glass-link">Home</a>
                        <a href="#products" className="glass-link">Shop</a>
                        <a href="#membership" className="glass-link">Membership</a>
                    </div>
                    <div className="nav-right">
                        <div id="global-shipping-badge" className="badge glass">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20" />
                            </svg>
                            <span>Global Shipping</span>
                        </div>
                        <div id="currency-switcher" className="glass">
                            <button className="currency-btn active">ZAR</button>
                            <button className="currency-btn">USD</button>
                        </div>
                        <div className="nav-icon-btn glass cart-count">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            <span className="cart-badge">0</span>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <section id="hero" className="parallax-container">
                    <div className="hero-blob hero-blob-1"></div>
                    <div className="hero-blob hero-blob-2"></div>
                    <div className="container hero-content hero-scroll-fade">
                        <div className="hero-eyebrow">
                            <span className="premium-pulse"></span>
                            AI-Engineered Lifestyle
                        </div>
                        <h2 className="hero-headline">
                            The Future of <br />
                            <span className="highlight">Autonomous</span> Comfort.
                        </h2>
                        <p className="hero-sub">
                            High-performance essentials curated for the global citizen. 
                            Built for the AI era, designed for pure human experience.
                        </p>
                        <div className="hero-cta-group">
                            <a href="#products" className="btn-primary">Shop The Collection</a>
                            <a href="#membership" className="btn-secondary">Join The Vexa Club</a>
                        </div>
                    </div>
                </section>

                <section id="products">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-eyebrow">Curated Drops</span>
                            <h2 className="section-title">The Active Edit</h2>
                        </div>
                        <div className="product-grid">
                            {/* Product cards would go here - simplified for brevity in this architectural step */}
                            <div className="text-center p-20 border border-white/10 rounded-3xl bg-white/5">
                                <p className="text-slate-400">Store items are preserved in the legacy build.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container">
                    <p>&copy; 2026 VEXADROP. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ExistingStore;
