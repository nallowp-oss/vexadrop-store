    <!-- JS -->
    <script>
        /* â”€â”€ Product Catalog Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
        const PRODUCTS = [
            { cat: 'technology', tag: 'Laptop Â· Ultrabook', name: 'QuantumPad Pro 14"', desc: 'M4 chip. 20hr battery. Retina XDR. Featherweight carbon shell.', rating: 4.9, reviews: 312, zar: 'R 18,999', usd: '$999', eur: 'â‚¬919', gbp: 'Â£799', badge: 'Sold Out', img: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800' },
            { cat: 'technology', tag: 'Audio Â· ANC', name: 'SonicSync Pro Earbuds', desc: 'AI noise-cancellation. 24-bit lossless audio. Ergonomic fit.', rating: 4.8, reviews: 145, zar: 'R 4,999', usd: '$249', eur: 'â‚¬229', gbp: 'Â£199', badge: 'New', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800' },
            { cat: 'technology', tag: 'Wearable Â· Sync', name: 'Vexa Band Series 3', desc: 'Vitals tracking, haptic AI alerts. Titanium finish.', rating: 4.7, reviews: 218, zar: 'R 3,499', usd: '$179', eur: 'â‚¬165', gbp: 'Â£145', badge: '', img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fde0c?auto=format&fit=crop&q=80&w=800' },

            { cat: 'clothing', tag: 'Apparel Â· Hoodie', name: 'VexaDrop Hoodie Pro', desc: 'Heavyweight French terry. OEKO-TEX certified. Perfect fit.', rating: 4.9, reviews: 89, zar: 'R 1,899', usd: '$95', eur: 'â‚¬85', gbp: 'Â£75', badge: 'Limited', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
            { cat: 'clothing', tag: 'Apparel Â· Outerwear', name: 'Aero Shell Jacket', desc: 'Water-resistant, hyper-breathable shell. Stealth matte finish.', rating: 4.6, reviews: 62, zar: 'R 3,299', usd: '$165', eur: 'â‚¬150', gbp: 'Â£130', badge: '', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800' },
            { cat: 'clothing', tag: 'Apparel Â· Tee', name: 'Core Base Layer Tee', desc: 'Moisture-wicking modal blend. Athletic cut.', rating: 4.8, reviews: 340, zar: 'R 799', usd: '$39', eur: 'â‚¬35', gbp: 'Â£30', badge: '', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' },

            { cat: 'shoes', tag: 'Footwear Â· Sneakers', name: 'Vexa Strider XYZ', desc: 'Carbon-fibre plate drop-in. Dynamic cushioning. Street ready.', rating: 4.8, reviews: 104, zar: 'R 2,499', usd: '$125', eur: 'â‚¬115', gbp: 'Â£95', badge: 'Trending', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800' },
            { cat: 'shoes', tag: 'Footwear Â· Boots', name: 'Urban Trekker Boot', desc: 'Weatherproof suede. High-traction lug sole. Matte hardware.', rating: 4.7, reviews: 45, zar: 'R 3,899', usd: '$195', eur: 'â‚¬180', gbp: 'Â£155', badge: '', img: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800' },

            { cat: 'cosmetics', tag: 'Cosmetics Â· Serum', name: 'Aura Glow Serum', desc: 'Bio-active vitamin C. Hydrates and balances skin tone.', rating: 4.9, reviews: 520, zar: 'R 1,199', usd: '$59', eur: 'â‚¬55', gbp: 'Â£45', badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800' },
            { cat: 'cosmetics', tag: 'Cosmetics Â· Moisturizer', name: 'Hydro Barrier Cream', desc: 'Ceramide-rich formula. Fortifies the skin barrier instantly.', rating: 4.8, reviews: 211, zar: 'R 999', usd: '$49', eur: 'â‚¬45', gbp: 'Â£38', badge: '', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800' },

            { cat: 'furniture', tag: 'Furniture Â· Seating', name: 'Ergo Flow Chair', desc: 'Adaptive lumbar support. Mesh back. All-day productivity.', rating: 4.8, reviews: 88, zar: 'R 8,999', usd: '$449', eur: 'â‚¬415', gbp: 'Â£365', badge: '', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800' },
            { cat: 'furniture', tag: 'Furniture Â· Lighting', name: 'Lumina Arc Lamp', desc: 'Circadian-sync smart LED. Minimalist matte black profile.', rating: 4.7, reviews: 132, zar: 'R 3,199', usd: '$159', eur: 'â‚¬145', gbp: 'Â£129', badge: '', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800' }
        ];

        const STAR = `<svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
        const STAR_E = `<svg viewBox="0 0 20 20" class="empty"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;

        function renderStars(r) {
            const full = Math.floor(r);
            return STAR.repeat(full) + (full < 5 ? STAR_E.repeat(5 - full) : '');
        }

        function renderProducts() {
            const grid = document.getElementById('product-grid');
            if (!grid) return;
            const badgeColors = { 'Sold Out': '#ef4444', 'Limited': '#f59e0b', 'New': '#10b981', 'Trending': '#8b5cf6', 'Best Seller': '#f59e0b' };
            grid.innerHTML = PRODUCTS.map(p => {
                const badgeColor = badgeColors[p.badge] || '#38bdf8';
                const badge = p.badge ? `<span class="product-new-badge" style="background:${badgeColor};">${p.badge}</span>` : '';
                const isSoldOut = p.badge === 'Sold Out';
                const stockHTML = isSoldOut
                    ? `<span style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:#ef4444;">Sold Out</span>`
                    : `<button class="add-to-cart-btn" onclick="addToCart(event, '${p.name}', '${p.zar}', '${p.usd}', '${p.eur}', '${p.gbp}', '${p.img}')">Add to Cart</button>`;
                return `<div class="product-card scroll-reveal" data-category="${p.cat}">
                  ${badge}
                  <div class="product-img-wrap">
                    <img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;transition:transform 0.5s cubic-bezier(0.4,0,0.2,1);" loading="lazy" />
                    <!-- AI LIFESTYLE SLOT: Second image displayed on hover -->
                    <div class="shot-lifestyle" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.3);opacity:0;transition:opacity 0.4s;">
                        <span style="font-family:'Outfit',sans-serif;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#38bdf8;text-align:center;padding:12px;">AI Lifestyle<br>Shot Pending</span>
                    </div>
                  </div>
                  <div class="product-info">
                    <span class="product-tag">${p.tag}</span>
                    <div class="rating-stars">${renderStars(p.rating)}<span class="rating-value">${p.rating}</span><span class="rating-count">(${p.reviews})</span></div>
                    <h3 class="product-name">${p.name}</h3>
                    <p class="product-desc">${p.desc}</p>
                    <div class="product-footer">
                      <div class="product-price">
                        <span class="price-display" data-zar="${p.zar}" data-usd="${p.usd}" data-eur="${p.eur}" data-gbp="${p.gbp}">${p.zar}</span>
                      </div>
                      ${stockHTML}
                    </div>
                  </div>
                </div>`;
            }).join('');
            // Apply current currency
            if (typeof setCurrency === 'function') setCurrency(currentCurrency);

            // Re-apply refresh observers for dynamically added items if any
            if (window.revealObserver) {
                document.querySelectorAll('.product-card.scroll-reveal').forEach(el => window.revealObserver.observe(el));
            }
        }

        /* â”€â”€ Currency Switcher â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
        let currentCurrency = 'ZAR';
        document.querySelectorAll('.currency-btn').forEach(btn => {
            btn.addEventListener('click', () => { setCurrency(btn.dataset.currency); });
        });
        function setCurrency(currency) {
            currentCurrency = currency;
            document.querySelectorAll('.currency-btn').forEach(btn => {
                const isActive = btn.dataset.currency === currency;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-pressed', isActive);
            });
            const key = currency.toLowerCase();
            document.querySelectorAll('.price-display, .price-original').forEach(el => {
                if (el.dataset[key]) el.textContent = el.dataset[key];
            });
        }

        /* â”€â”€ Category Filter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
        function initCategoryFilter() {
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const filter = btn.dataset.filter;
                    document.querySelectorAll('#product-grid .product-card').forEach(card => {
                        if (filter === 'all' || card.dataset.category === filter) {
                            card.classList.remove('card-hidden');
                        } else {
                            card.classList.add('card-hidden');
                        }
                    });
                });
            });
        }

        /* â”€â”€ Initial Render â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
        renderProducts();
        initCategoryFilter();

        /* â”€â”€ Progressive Reveal (IO fallback for non-scroll-timeline browsers) â”€â”€ */
        const supportsScrollTimeline = CSS.supports('animation-timeline', 'view()');

        if (!supportsScrollTimeline) {
            // Fallback: IntersectionObserver for .scroll-reveal and .scrollytelling-panel
            const fallbackIO = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        fallbackIO.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-scale-in, .scrollytelling-panel').forEach(el => {
                fallbackIO.observe(el);
            });
        }

        // Legacy .reveal elements (hero content)
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => { entry.target.classList.add('visible'); }, entry.target.dataset.delay || 0);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach((el, i) => {
            if (el.closest('.product-grid')) { el.dataset.delay = (i % 2) * 120; }
            revealObserver.observe(el);
        });
        /* â”€â”€ Add to Cart & Cart State â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
        const cart = [];

        function addToCart(e, name, zar, usd, eur, gbp, img) {
            e.stopPropagation();
            const existing = cart.find(i => i.name === name);
            if (existing) { existing.qty++; }
            else { cart.push({ name, zar, usd, eur, gbp, img, qty: 1 }); }
            updateCartBadge();
            renderCartDrawer();
            openCart();
        }

        function updateCartBadge() {
            const total = cart.reduce((s, i) => s + i.qty, 0);
            document.getElementById('cart-count-badge').textContent = total;
        }

        function openCart() {
            document.getElementById('cart-drawer').classList.add('open');
            document.getElementById('cart-overlay').classList.add('open');
        }

        function closeCartDrawer() {
            document.getElementById('cart-drawer').classList.remove('open');
            document.getElementById('cart-overlay').classList.remove('open');
        }

        function renderCartDrawer() {
            const list = document.getElementById('cart-items-list');
            const summary = document.getElementById('cart-summary');
            if (!list) return;
            if (cart.length === 0) {
                list.innerHTML = `<div style="text-align:center;padding:60px 20px;color:#64748b;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 16px;display:block;opacity:0.4;"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                    <p style="font-family:'Outfit',sans-serif;font-weight:700;">Your cart is empty.</p></div>`;
                summary.style.display = 'none';
                return;
            }
            const cKey = currentCurrency.toLowerCase();
            list.innerHTML = cart.map((item, idx) => `
                <div style="display:flex;gap:14px;align-items:center;padding:16px 0;border-bottom:1px solid rgba(148,163,184,0.1);">
                    <img src="${item.img}" alt="${item.name}" style="width:64px;height:64px;border-radius:12px;object-fit:cover;flex-shrink:0;" />
                    <div style="flex:1;min-width:0;">
                        <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;color:#f1f5f9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</div>
                        <div style="font-size:13px;color:#38bdf8;font-weight:700;margin-top:2px;">${item[cKey]}</div>
                        <div style="display:flex;align-items:center;gap:10px;margin-top:8px;">
                            <button onclick="changeQty(${idx},-1)" style="width:26px;height:26px;border-radius:50%;background:rgba(30,41,59,0.8);border:1px solid rgba(148,163,184,0.2);color:#f1f5f9;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">âˆ’</button>
                            <span style="font-family:'Outfit',sans-serif;font-weight:700;font-size:13px;color:#f1f5f9;">${item.qty}</span>
                            <button onclick="changeQty(${idx},1)" style="width:26px;height:26px;border-radius:50%;background:rgba(30,41,59,0.8);border:1px solid rgba(148,163,184,0.2);color:#f1f5f9;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">+</button>
                        </div>
                    </div>
                    <button onclick="removeItem(${idx})" style="background:transparent;border:none;color:#64748b;cursor:pointer;padding:4px;flex-shrink:0;" aria-label="Remove item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>`).join('');
            summary.style.display = 'block';
        }

        function changeQty(idx, delta) {
            cart[idx].qty += delta;
            if (cart[idx].qty <= 0) cart.splice(idx, 1);
            updateCartBadge();
            renderCartDrawer();
        }

        function removeItem(idx) {
            cart.splice(idx, 1);
            updateCartBadge();
            renderCartDrawer();
        }
    </script>
    <style>
        /* AI Chat Widget */
        .chat-toggle {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1d4ed8 0%, #38bdf8 100%);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 999;
            box-shadow: 0 4px 20px rgba(56, 189, 248, 0.4);
            border: none;
            transition: transform 0.3s;
        }

        .chat-toggle:hover {
            transform: scale(1.1);
        }

        .ai-chat-widget {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 350px;
            height: 500px;
            border-radius: var(--radius-lg);
            display: flex;
            flex-direction: column;
            z-index: 1000;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
            transform: translateY(20px);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            background: rgba(15, 23, 42, 0.95);
            font-family: var(--font-body);
        }

        .ai-chat-widget.active {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }

        .chat-header {
            padding: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(30, 41, 59, 0.8);
        }

        .chat-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: var(--font-display);
            font-weight: 700;
            color: #fff;
        }

        .chat-close {
            background: transparent;
            border: none;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
            line-height: 1;
        }

        .chat-messages {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            font-size: 14px;
        }

        .chat-message {
            display: flex;
            flex-direction: column;
        }

        .chat-message.user {
            align-items: flex-end;
        }

        .chat-message.bot {
            align-items: flex-start;
        }

        .msg-bubble {
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 12px;
            line-height: 1.4;
            word-wrap: break-word;
        }

        .chat-message.user .msg-bubble {
            background: #38bdf8;
            color: #0f172a;
            border-bottom-right-radius: 2px;
        }

        .chat-message.bot .msg-bubble {
            background: #1e293b;
            color: #e2e8f0;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-bottom-left-radius: 2px;
        }

        .chat-input-area {
            padding: 12px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            gap: 8px;
            background: rgba(30, 41, 59, 0.8);
        }

        .chat-input-area input {
            flex: 1;
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 10px 14px;
            border-radius: 20px;
            color: #fff;
            outline: none;
        }

        .chat-input-area input:focus {
            border-color: #38bdf8;
        }

        .chat-send {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #1d4ed8;
            border: none;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s;
        }

        .chat-send:hover {
            background: #38bdf8;
            color: #0f172a;
        }

        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 4px 8px;
        }

        .typing-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #38bdf8;
            animation: typing 1.4s infinite ease-in-out both;
        }

        .typing-dot:nth-child(1) {
            animation-delay: -0.32s;
        }

        .typing-dot:nth-child(2) {
            animation-delay: -0.16s;
        }

        @keyframes typing {

            0%,
            80%,
            100% {
                transform: scale(0);
            }

            40% {
                transform: scale(1);
            }
        }

        /* Additional UI â€“ Add to Cart button, Cart Drawer, Checkout */
        .add-to-cart-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 10px 18px;
            background: linear-gradient(135deg, #1d4ed8 0%, #38bdf8 100%);
            color: #fff;
            border: none;
            border-radius: 100px;
            font-family: 'Outfit', sans-serif;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 12px rgba(29, 78, 216, 0.3);
        }

        .add-to-cart-btn:hover {
            transform: translateY(-2px) scale(1.04);
            box-shadow: 0 8px 24px rgba(56, 189, 248, 0.4);
        }

        .add-to-cart-btn:active {
            transform: scale(0.97);
        }

        /* Hero eyebrow & secondary button */
        .hero-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 18px;
            border-radius: 100px;
            background: rgba(30, 41, 59, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(148, 163, 184, 0.15);
            font-family: 'Outfit', sans-serif;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #38bdf8;
            margin-bottom: 24px;
        }

        .btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 16px 28px;
            border-radius: var(--radius-md, 12px);
            background: transparent;
            border: 1px solid rgba(148, 163, 184, 0.25);
            color: var(--text-secondary, #cbd5e1);
            font-family: 'Outfit', sans-serif;
            font-size: 15px;
            font-weight: 700;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(8px);
        }

        .btn-secondary:hover {
            background: rgba(30, 41, 59, 0.8);
            border-color: #38bdf8;
            color: #38bdf8;
            transform: translateY(-2px);
        }

        /* Cart Overlay & Drawer */
        #cart-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 1100;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
        }

        #cart-overlay.open {
            opacity: 1;
            pointer-events: auto;
        }

        #cart-drawer {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 420px;
            max-width: 100vw;
            background: #0f172a;
            border-left: 1px solid rgba(148, 163, 184, 0.12);
            z-index: 1200;
            display: flex;
            flex-direction: column;
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        #cart-drawer.open {
            transform: translateX(0);
        }

        .cart-drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 24px 24px 20px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        }

        .cart-drawer-title {
            font-family: 'Outfit', sans-serif;
            font-size: 18px;
            font-weight: 800;
            color: #f1f5f9;
            letter-spacing: -0.01em;
        }

        .cart-close-btn {
            background: transparent;
            border: none;
            color: #64748b;
            cursor: pointer;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            transition: background 0.2s, color 0.2s;
        }

        .cart-close-btn:hover {
            background: rgba(30, 41, 59, 0.6);
            color: #f1f5f9;
        }

        #cart-items-list {
            flex: 1;
            overflow-y: auto;
            padding: 8px 24px;
        }

        #cart-summary {
            padding: 20px 24px 28px;
            border-top: 1px solid rgba(148, 163, 184, 0.1);
            display: none;
        }

        .checkout-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #1d4ed8 0%, #38bdf8 100%);
            border: none;
            border-radius: 12px;
            color: #fff;
            font-family: 'Outfit', sans-serif;
            font-size: 16px;
            font-weight: 800;
            letter-spacing: -0.01em;
            cursor: pointer;
            transition: all 0.25s;
            box-shadow: 0 4px 20px rgba(29, 78, 216, 0.4);
        }

        .checkout-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 32px rgba(56, 189, 248, 0.5);
        }

        /* Checkout Modal */
        #checkout-modal {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1500;
            padding: 20px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
        }

        #checkout-modal.open {
            opacity: 1;
            pointer-events: auto;
        }

        .checkout-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
        }

        .checkout-panel {
            position: relative;
            z-index: 1;
            background: #0f172a;
            border: 1px solid rgba(148, 163, 184, 0.12);
            border-radius: 24px;
            width: 100%;
            max-width: 560px;
            max-height: 90vh;
            overflow-y: auto;
            padding: 36px;
        }

        .checkout-step {
            display: none;
        }

        .checkout-step.active {
            display: block;
        }

        .co-label {
            display: block;
            font-family: 'Outfit', sans-serif;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #64748b;
            margin-bottom: 6px;
            margin-top: 18px;
        }

        .co-input {
            width: 100%;
            padding: 13px 16px;
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(148, 163, 184, 0.15);
            border-radius: 10px;
            color: #f1f5f9;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
            box-sizing: border-box;
        }

        .co-input:focus {
            border-color: #38bdf8;
        }

        .co-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .co-btn {
            width: 100%;
            margin-top: 24px;
            padding: 16px;
            background: linear-gradient(135deg, #1d4ed8 0%, #38bdf8 100%);
            border: none;
            border-radius: 12px;
            color: #fff;
            font-family: 'Outfit', sans-serif;
            font-size: 15px;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.25s;
            box-shadow: 0 4px 16px rgba(29, 78, 216, 0.35);
        }

        .co-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 28px rgba(56, 189, 248, 0.45);
        }

        .co-back {
            background: transparent;
            border: 1px solid rgba(148, 163, 184, 0.2);
            color: #94a3b8;
            width: 100%;
            margin-top: 10px;
            padding: 13px;
            border-radius: 12px;
            font-family: 'Outfit', sans-serif;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
        }

        .co-back:hover {
            border-color: #38bdf8;
            color: #38bdf8;
        }

        .step-pills {
            display: flex;
            gap: 8px;
            align-items: center;
            margin-bottom: 28px;
        }

        .step-pill {
            flex: 1;
            height: 4px;
            border-radius: 100px;
            background: rgba(148, 163, 184, 0.15);
            transition: background 0.3s;
        }

        .step-pill.done {
            background: #38bdf8;
        }

        @media (max-width: 480px) {
            #cart-drawer {
                width: 100vw;
            }

            .checkout-panel {
                padding: 24px 20px;
            }

            .co-row {
                grid-template-columns: 1fr;
            }
        }
    </style>

    <!-- AI Concierge Widget Elements -->
    <div id="ai-chat-widget" class="ai-chat-widget glass">
        <div class="chat-header">
            <div class="chat-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" style="color: #38bdf8;">
                    <path d="m12 14 4-4" />
                    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                </svg>
                <span>Vexa Concierge</span>
            </div>
            <button id="close-chat" class="chat-close" aria-label="Close Chat">&times;</button>
        </div>
        <div id="chat-messages" class="chat-messages">
            <div class="chat-message bot">
                <div class="msg-bubble">I am Vexa, the AI architect. How may I assist your lifestyle augmentation today?
                </div>
            </div>
        </div>
        <div class="chat-input-area">
            <input type="text" id="chat-input" placeholder="Ask about products, stock, styles..." autocomplete="off">
            <button id="send-chat" class="chat-send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                </svg>
            </button>
        </div>
    </div>
    <button id="chat-toggle" class="chat-toggle glass" aria-label="Open AI Concierge">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    </button>

    <script>
        const chatToggle = document.getElementById('chat-toggle');
        const chatWidget = document.getElementById('ai-chat-widget');
        const closeChat = document.getElementById('close-chat');
        const chatInput = document.getElementById('chat-input');
        const sendChat = document.getElementById('send-chat');
        const chatMessages = document.getElementById('chat-messages');

        chatToggle.addEventListener('click', () => {
            chatWidget.classList.add('active');
            chatInput.focus();
        });

        closeChat.addEventListener('click', () => {
            chatWidget.classList.remove('active');
        });

        function appendMessage(sender, text) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${sender}`;
            const bubble = document.createElement('div');
            bubble.className = 'msg-bubble';
            bubble.textContent = text;
            msgDiv.appendChild(bubble);
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function appendTypingIndicator() {
            const id = 'typing-' + Date.now();
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message bot';
            msgDiv.id = id;
            msgDiv.innerHTML = `<div class="msg-bubble"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>`;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return id;
        }

        async function handleSend() {
            const query = chatInput.value.trim();
            if (!query) return;

            appendMessage('user', query);
            chatInput.value = '';

            const typingId = appendTypingIndicator();

            try {
                const response = await fetch('http://localhost:8000/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query })
                });

                const responseData = await response.json();
                document.getElementById(typingId).remove();

                if (responseData.response) {
                    appendMessage('bot', responseData.response);
                } else {
                    appendMessage('bot', "System anomaly. Vexa-Core unreachable.");
                }
            } catch (error) {
                console.error("Chat Error:", error);
                document.getElementById(typingId).remove();
                appendMessage('bot', "Connection to Vexa-Core failed. Subsystems offline.");
            }
        }

        sendChat.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    </script>

    <!-- â”€â”€ CART DRAWER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <div id="cart-overlay" onclick="closeCartDrawer()"></div>
    <aside id="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div class="cart-drawer-header">
            <span class="cart-drawer-title">Your Cart</span>
            <button class="cart-close-btn" onclick="closeCartDrawer()" aria-label="Close cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div id="cart-items-list"></div>
        <div id="cart-summary">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                <span
                    style="font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;color:#94a3b8;">Subtotal</span>
                <span id="cart-subtotal"
                    style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:800;color:#f1f5f9;"></span>
            </div>
            <div style="font-size:12px;color:#64748b;margin-bottom:16px;text-align:center;">Free global shipping Â· SA Â·
                USA Â· UK Â· EU</div>
            <button class="checkout-btn" onclick="openCheckout()">Proceed to Checkout â†’</button>
        </div>
    </aside>

    <!-- â”€â”€ CHECKOUT MODAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <div id="checkout-modal" role="dialog" aria-modal="true" aria-label="Checkout">
        <div class="checkout-backdrop" onclick="closeCheckout()"></div>
        <div class="checkout-panel">
            <div class="step-pills">
                <div class="step-pill done" id="pill-1"></div>
                <div class="step-pill" id="pill-2"></div>
                <div class="step-pill" id="pill-3"></div>
            </div>

            <!-- Step 1: Contact & Shipping -->
            <div class="checkout-step active" id="co-step-1">
                <div
                    style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;color:#f1f5f9;margin-bottom:4px;">
                    Contact & Shipping</div>
                <div style="font-size:14px;color:#64748b;">Shipping globally â€” SA Â· USA Â· UK Â· Europe</div>
                <label class="co-label" for="co-email">Email</label>
                <input class="co-input" type="email" id="co-email" placeholder="you@email.com" autocomplete="email" />
                <label class="co-label" for="co-name">Full Name</label>
                <input class="co-input" type="text" id="co-name" placeholder="Full name" autocomplete="name" />
                <div class="co-row">
                    <div>
                        <label class="co-label" for="co-country">Country</label>
                        <select class="co-input" id="co-country">
                            <option value="ZA">ðŸ‡¿ðŸ‡¦ South Africa</option>
                            <option value="US">ðŸ‡ºðŸ‡¸ United States</option>
                            <option value="GB">ðŸ‡¬ðŸ‡§ United Kingdom</option>
                            <option value="EU">ðŸ‡ªðŸ‡º Europe</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div>
                        <label class="co-label" for="co-zip">Postal Code</label>
                        <input class="co-input" type="text" id="co-zip" placeholder="7280" autocomplete="postal-code" />
                    </div>
                </div>
                <label class="co-label" for="co-address">Street Address</label>
                <input class="co-input" type="text" id="co-address" placeholder="123 Main St"
                    autocomplete="street-address" />
                <label class="co-label" for="co-city">City</label>
                <input class="co-input" type="text" id="co-city" placeholder="Cape Town"
                    autocomplete="address-level2" />
                <button class="co-btn" onclick="goToStep(2)">Continue to Payment â†’</button>
                <button class="co-back" onclick="closeCheckout()">â† Back to Cart</button>
            </div>

            <!-- Step 2: Payment -->
            <div class="checkout-step" id="co-step-2">
                <div
                    style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;color:#f1f5f9;margin-bottom:4px;">
                    Payment</div>
                <div style="font-size:14px;color:#64748b;">256-bit SSL Â· Secure transaction</div>
                <div
                    style="margin-top:18px;padding:14px 18px;background:rgba(30,41,59,0.6);border-radius:12px;border:1px solid rgba(148,163,184,0.12);display:flex;align-items:center;gap:12px;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" />
                        <path d="M1 10h22" />
                    </svg>
                    <span style="font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;color:#94a3b8;">Credit /
                        Debit Card</span>
                </div>
                <label class="co-label" for="co-card">Card Number</label>
                <input class="co-input" type="text" id="co-card" placeholder="4242 4242 4242 4242" maxlength="19"
                    autocomplete="cc-number" />
                <div class="co-row">
                    <div>
                        <label class="co-label" for="co-expiry">Expiry</label>
                        <input class="co-input" type="text" id="co-expiry" placeholder="MM / YY" maxlength="7"
                            autocomplete="cc-exp" />
                    </div>
                    <div>
                        <label class="co-label" for="co-cvc">CVC</label>
                        <input class="co-input" type="text" id="co-cvc" placeholder="123" maxlength="4"
                            autocomplete="cc-csc" />
                    </div>
                </div>
                <label class="co-label" for="co-cardholder">Cardholder Name</label>
                <input class="co-input" type="text" id="co-cardholder" placeholder="Name on card"
                    autocomplete="cc-name" />
                <button class="co-btn" onclick="goToStep(3)">Review Order â†’</button>
                <button class="co-back" onclick="goToStep(1)">â† Back</button>
            </div>

            <!-- Step 3: Review & Confirm -->
            <div class="checkout-step" id="co-step-3">
                <div
                    style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;color:#f1f5f9;margin-bottom:4px;">
                    Review Order</div>
                <div style="font-size:14px;color:#64748b;">Confirm your VexaDrop order</div>
                <div id="co-order-summary" style="margin-top:20px;"></div>
                <div
                    style="margin-top:16px;padding:16px;background:rgba(56,189,248,0.05);border:1px solid rgba(56,189,248,0.15);border-radius:12px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                        <span style="font-size:13px;color:#64748b;">Shipping</span>
                        <span style="font-size:13px;font-weight:700;color:#10b981;">FREE</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;">
                        <span
                            style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:800;color:#f1f5f9;">Total</span>
                        <span id="co-total-price"
                            style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:800;color:#38bdf8;"></span>
                    </div>
                </div>
                <button class="co-btn" onclick="placeOrder()">Place Order âœ“</button>
                <button class="co-back" onclick="goToStep(2)">â† Back</button>
            </div>

            <!-- Step 4: Success -->
            <div class="checkout-step" id="co-step-4" style="text-align:center;padding:20px 0;">
                <div
                    style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#1d4ed8,#38bdf8);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <div style="font-family:'Outfit',sans-serif;font-size:24px;font-weight:800;color:#f1f5f9;">Order
                    Confirmed!</div>
                <div style="font-size:15px;color:#64748b;margin-top:8px;line-height:1.6;">Your VexaDrop order is being
                    processed.<br>Tracking info will be sent to your email.</div>
                <button class="co-btn" style="margin-top:32px;" onclick="closeCheckout()">Continue Shopping</button>
            </div>
        </div>
    </div>

    <script>
        /* â”€â”€ Checkout Flow Logic â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
        let currentStep = 1;

        function openCheckout() {
            closeCartDrawer();
            renderOrderSummary();
            document.getElementById('checkout-modal').classList.add('open');
        }

        function closeCheckout() {
            document.getElementById('checkout-modal').classList.remove('open');
            if (currentStep === 4) {
                currentStep = 1;
                goToStep(1);
            }
        }

        function goToStep(step) {
            document.querySelectorAll('.checkout-step').forEach((s, i) => {
                s.classList.toggle('active', i === step - 1);
            });
            ['pill-1', 'pill-2', 'pill-3'].forEach((id, i) => {
                document.getElementById(id).classList.toggle('done', i < step);
            });
            currentStep = step;
            if (step === 3) renderOrderSummary();
        }

        function renderOrderSummary() {
            const cKey = currentCurrency.toLowerCase();
            const summary = document.getElementById('co-order-summary');
            if (!summary) return;
            summary.innerHTML = cart.map(item => `
                <div style="display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid rgba(148,163,184,0.08);">
                    <img src="${item.img}" style="width:48px;height:48px;border-radius:8px;object-fit:cover;flex-shrink:0;" />
                    <div style="flex:1;">
                        <div style="font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;color:#f1f5f9;">${item.name}</div>
                        <div style="font-size:12px;color:#64748b;">Qty: ${item.qty}</div>
                    </div>
                    <div style="font-family:'Outfit',sans-serif;font-size:13px;font-weight:800;color:#38bdf8;">${item[cKey]}</div>
                </div>`).join('');
            document.getElementById('co-total-price').textContent = cart[0] ? cart.map(i => i[cKey]).join(' + ') : 'â€”';
        }

        function placeOrder() {
            goToStep(4);
            cart.length = 0;
            updateCartBadge();
        }

        /* Update subtotal in cart drawer on open */
        const _origOpenCart = openCart;
        openCart = function () {
            _origOpenCart();
            const cKey = currentCurrency.toLowerCase();
            const el = document.getElementById('cart-subtotal');
            if (el && cart.length) el.textContent = cart.map(i => i[cKey]).join(' + ');
        };

        /* Render empty cart on init */
        renderCartDrawer();
    </script>
