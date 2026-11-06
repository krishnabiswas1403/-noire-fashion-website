import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Heart, Instagram, Menu, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react'
import './styles.css'

const products = [
  { id: 1, name: 'The Sculpted Blazer', category: 'Clothing', price: 4890, oldPrice: null, tag: 'BESTSELLER', color: 'Stone', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Everyday Tailored Trouser', category: 'Clothing', price: 3290, oldPrice: null, tag: 'NEW IN', color: 'Charcoal', image: 'https://images.unsplash.com/photo-1506629905607-d9c297d9a6c4?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'The Form Shoulder Bag', category: 'Accessories', price: 5590, oldPrice: null, tag: '', color: 'Espresso', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Soft Structure Shirt', category: 'Clothing', price: 2790, oldPrice: 3290, tag: 'LIMITED', color: 'Ivory', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'The Weekend Knit', category: 'Clothing', price: 3590, oldPrice: null, tag: '', color: 'Oat', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Minimalist Leather Belt', category: 'Accessories', price: 1890, oldPrice: null, tag: '', color: 'Black', image: 'https://images.unsplash.com/photo-1624222247344-550fb8e7a6b6?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'The Longline Coat', category: 'Clothing', price: 7290, oldPrice: null, tag: 'EDITOR’S PICK', color: 'Mushroom', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=85' },
  { id: 8, name: 'Everyday Frame Sunglasses', category: 'Accessories', price: 2490, oldPrice: null, tag: '', color: 'Tortoise', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85' },
]
const money = n => `₹${n.toLocaleString('en-IN')}`

function App() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [filter, setFilter] = useState('All')
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [checkout, setCheckout] = useState(false)

  const visibleProducts = useMemo(() => products.filter(p =>
    (filter === 'All' || p.category === filter) &&
    `${p.name} ${p.color}`.toLowerCase().includes(search.toLowerCase())
  ), [filter, search])

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const toast = message => {
    setNotice(message)
    window.clearTimeout(window.__noireToast)
    window.__noireToast = window.setTimeout(() => setNotice(''), 2400)
  }
  const addToCart = product => {
    setCart(current => {
      const found = current.find(item => item.id === product.id)
      return found ? current.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...current, { ...product, qty: 1 }]
    })
    toast(`${product.name} added to your bag`)
  }
  const updateQty = (id, delta) => setCart(current => current.map(item => item.id === id ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0))
  const toggleWish = id => setWishlist(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id])

  const submitNewsletter = e => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast('Please enter a valid email address')
    setSubscribed(true)
  }

  return (
    <div className="site-shell">
      <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS OVER ₹5,000 <span>—</span> A LITTLE SOMETHING, ON US</div>
      <header className="header">
        <button className="icon-btn mobile-only" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={21}/></button>
        <nav className="desktop-nav"><a href="#collection">SHOP</a><a href="#story">OUR STORY</a><a href="#journal">THE JOURNAL</a></nav>
        <a className="wordmark" href="#top" aria-label="Noire home">NOIRE<span>®</span></a>
        <div className="header-actions">
          <button className="icon-btn search-toggle" aria-label="Search" onClick={() => setSearchOpen(v => !v)}><Search size={19}/></button>
          <button className="icon-btn wishlist-head" aria-label="Wishlist" onClick={() => { setFilter('All'); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }); toast(`${wishlist.length} saved piece${wishlist.length === 1 ? '' : 's'} in your wishlist`) }}><Heart size={19}/><span className="tiny-count">{wishlist.length}</span></button>
          <button className="icon-btn bag-button" aria-label="Shopping bag" onClick={() => setCartOpen(true)}><ShoppingBag size={19}/><span className="tiny-count">{cartCount}</span></button>
        </div>
      </header>

      {searchOpen && <div className="search-bar"><Search size={18}/><input autoFocus value={search} onChange={e => { setSearch(e.target.value); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }) }} placeholder="Search pieces, colours, details..." /><button onClick={() => { setSearch(''); setSearchOpen(false) }}><X size={18}/></button></div>}

      <main id="top">
        <section className="hero">
          <img className="hero-image" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90" alt="Editorial fashion campaign with contemporary styling"/>
          <div className="hero-shade"></div>
          <div className="hero-copy">
            <p className="eyebrow light">THE NEW STANDARD OF EVERYDAY</p>
            <h1>Less, but<br/><em>better.</em></h1>
            <p className="hero-sub">Considered pieces. Quiet confidence.<br/>A wardrobe that feels like you.</p>
            <a className="button button-light" href="#collection">EXPLORE THE COLLECTION <ArrowUpRight size={15}/></a>
          </div>
          <div className="hero-bottom"><span>01 / 03</span><span>THE AUTUMN EDIT — 2026</span><span>SCROLL TO DISCOVER <ArrowDown size={13}/></span></div>
        </section>

        <section className="intro section-pad">
          <p className="eyebrow">A NOTE ON STYLE</p>
          <h2>Style is not about being seen.<br/><em>It’s about being remembered.</em></h2>
          <p className="intro-text">NOIRE is a study in simplicity — timeless silhouettes, thoughtful details and pieces made to move with you. An intentional approach to getting dressed.</p>
        </section>

        <section className="collection section-pad" id="collection">
          <div className="section-heading">
            <div><p className="eyebrow">THE NOIRE EDIT</p><h2>Pieces to <em>keep.</em></h2></div>
            <a href="#collection" className="text-link" onClick={() => { setFilter('All'); setSearch('') }}>VIEW ALL PIECES <ArrowUpRight size={15}/></a>
          </div>
          <div className="filter-row">
            <div className="filters">{['All', 'Clothing', 'Accessories'].map(f => <button key={f} className={`filter ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>)}</div>
            <span className="result-count">{visibleProducts.length} PIECES</span>
          </div>
          {visibleProducts.length ? <div className="product-grid">
            {visibleProducts.map(product => <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.name} loading="lazy"/>
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <button className={`wish-btn ${wishlist.includes(product.id) ? 'wished' : ''}`} aria-label="Save to wishlist" onClick={() => toggleWish(product.id)}><Heart size={17} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}/></button>
                <button className="quick-add" onClick={() => addToCart(product)}>ADD TO BAG <Plus size={14}/></button>
              </div>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.color} · {product.category}</p></div><div className="price">{money(product.price)}{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div></div>
            </article>)}
          </div> : <div className="empty-search">No pieces found. Try another search.</div>}
        </section>

        <section className="campaign" id="story">
          <div className="campaign-image"><img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1300&q=85" alt="Minimal fashion editorial"/></div>
          <div className="campaign-copy"><p className="eyebrow">THE NOIRE PHILOSOPHY</p><h2>Made for the<br/><em>in-between.</em></h2><p>For slow mornings, long days and all the moments that make a life. We believe the best wardrobe is the one you reach for without thinking.</p><a href="#journal" className="text-link">GET TO KNOW US <ArrowUpRight size={15}/></a></div>
        </section>

        <section className="values section-pad">
          <div className="value-item"><span>01</span><h3>Thoughtful by design</h3><p>Clean lines and considered details, never excess.</p></div>
          <div className="value-item"><span>02</span><h3>Made to be worn</h3><p>Versatile pieces for the rhythm of real life.</p></div>
          <div className="value-item"><span>03</span><h3>Beyond the moment</h3><p>A point of view that outlasts a passing trend.</p></div>
        </section>

        <section className="journal" id="journal">
          <div className="journal-image"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1500&q=85" alt="Fashion journal editorial"/></div>
          <div className="journal-copy"><p className="eyebrow light">NOTES FROM NOIRE · VOL. 01</p><h2>The art of<br/><em>doing less.</em></h2><p>A softer approach to getting dressed. Discover our edit of enduring shapes, subtle textures and the beauty of a little restraint.</p><a href="#collection" className="button button-light">READ THE EDIT <ArrowUpRight size={15}/></a></div>
        </section>

        <section className="newsletter section-pad">
          <p className="eyebrow">A LETTER, OCCASIONALLY</p><h2>Good things, <em>in your inbox.</em></h2><p>First access to new arrivals, thoughtful edits and notes from our world.</p>
          {subscribed ? <div className="success-message"><Check size={18}/> You’re on the list. Welcome to NOIRE.</div> : <form className="newsletter-form" onSubmit={submitNewsletter}><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address" required/><button type="submit">SIGN ME UP <ArrowRight size={15}/></button></form>}
          <small>By subscribing, you agree to receive occasional updates from NOIRE.</small>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top"><div><a className="wordmark footer-logo" href="#top">NOIRE<span>®</span></a><p>Less, but better. Always.</p></div><div className="footer-links"><div><b>EXPLORE</b><a href="#collection">Shop all</a><a href="#story">Our story</a><a href="#journal">Journal</a></div><div><b>NEED HELP?</b><a href="mailto:hello@noire.example">Contact</a><a href="#footer-note">Shipping & returns</a><a href="#footer-note">FAQs</a></div><div><b>FOLLOW ALONG</b><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={14}/> Instagram</a><a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest <ArrowUpRight size={12}/></a></div></div></div>
        <div className="footer-bottom" id="footer-note"><span>© 2026 NOIRE STUDIO. ALL RIGHTS RESERVED.</span><span>MADE WITH INTENTION.</span><span>INDIA · INR ₹</span></div>
      </footer>

      {menuOpen && <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)}><div className="mobile-menu" onClick={e => e.stopPropagation()}><div className="mobile-menu-head"><a className="wordmark" href="#top">NOIRE<span>®</span></a><button className="icon-btn" onClick={() => setMenuOpen(false)}><X/></button></div><a onClick={() => setMenuOpen(false)} href="#collection">SHOP THE EDIT <ArrowUpRight size={15}/></a><a onClick={() => setMenuOpen(false)} href="#story">OUR STORY <ArrowUpRight size={15}/></a><a onClick={() => setMenuOpen(false)} href="#journal">THE JOURNAL <ArrowUpRight size={15}/></a></div></div>}

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-btn" aria-label="Close bag" onClick={() => setCartOpen(false)}><X/></button></div>
        {cart.length ? <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name}/><div className="cart-item-info"><h3>{item.name}</h3><p>{item.color}</p><strong>{money(item.price)}</strong><div className="qty-control"><button onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => updateQty(item.id, 1)} aria-label="Increase quantity"><Plus size={13}/></button></div></div><button className="remove-item" onClick={() => setCart(current => current.filter(x => x.id !== item.id))}>REMOVE</button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="button button-dark checkout-btn" onClick={() => setCheckout(true)}>CONTINUE TO CHECKOUT <ArrowRight size={15}/></button>{checkout && <div className="checkout-note"><Check size={16}/> Demo checkout — your bag is ready. No payment has been taken.</div>}</div></> : <div className="empty-cart"><ShoppingBag size={30}/><h3>Your bag is taking a breather.</h3><p>Find something you’ll love wearing.</p><button className="button button-dark" onClick={() => { setCartOpen(false); document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }) }}>EXPLORE THE EDIT</button></div>}
      </aside></div>}

      {notice && <div className="toast"><Check size={15}/>{notice}</div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
