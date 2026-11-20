import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Crown, Menu, MessageCircle,
  Minus, Plus, ShoppingBag, X, Instagram, Check, ChevronDown, ShieldCheck
} from 'lucide-react'
import './styles.css'

const WHATSAPP_NUMBER = '' // Add the client's WhatsApp number in international format, digits only.

const products = [
  { id: 'tee', name: 'Signature Graphic Tee', category: 'Tops', tag: 'CORE PIECE', image: '/images/summer-campaign.jpg', position: '50% 64%', description: 'The signature GROOTMAN 2.0 graphic tee. A statement piece built around the crown.' },
  { id: 'vest', name: 'Summer Statement Vest', category: 'Tops', tag: 'SUMMER COLLECTION', image: '/images/summer-campaign.jpg', position: '18% 58%', description: 'A bold sleeveless look from the GROOTMAN 2.0 summer direction.' },
  { id: 'shorts', name: 'Signature Training Shorts', category: 'Bottoms', tag: 'SUMMER COLLECTION', image: '/images/summer-campaign.jpg', position: '20% 85%', description: 'Sport-inspired shorts with a confident streetwear attitude.' },
  { id: 'hoodie', name: 'Crown Graphic Hoodie', category: 'Tops', tag: 'STATEMENT PIECE', image: '/images/apparel-lineup.jpg', position: '18% 35%', description: 'A heavyweight visual statement with the crowned gorilla identity.' },
  { id: 'cap', name: 'GROOTMAN Snapback', category: 'Headwear', tag: 'EVERYDAY ESSENTIAL', image: '/images/summer-campaign.jpg', position: '46% 91%', description: 'Finish the fit with the signature GROOTMAN 2.0 crown mark.' },
  { id: 'tracksuit', name: 'Signature Tracksuit', category: 'Sets', tag: 'CO-ORDINATED LOOK', image: '/images/apparel-lineup.jpg', position: '84% 72%', description: 'A coordinated look for a clean, confident streetwear fit.' },
  { id: 'bag', name: 'GROOTMAN Utility Bag', category: 'Accessories', tag: 'ON THE MOVE', image: '/images/summer-campaign.jpg', position: '90% 70%', description: 'Carry the identity beyond the fit with a branded everyday bag.' },
  { id: 'beanie', name: 'Crown Knit Beanie', category: 'Headwear', tag: 'COLD-WEATHER ESSENTIAL', image: '/images/apparel-lineup.jpg', position: '70% 42%', description: 'A clean cold-weather staple with the GROOTMAN signature.' },
]

const categories = ['All pieces', 'Tops', 'Bottoms', 'Sets', 'Headwear', 'Accessories']

function App() {
  const [activeCategory, setActiveCategory] = useState('All pieces')
  const [bag, setBag] = useState([])
  const [selected, setSelected] = useState(null)
  const [size, setSize] = useState('Not sure yet')
  const [quantity, setQuantity] = useState(1)
  const [bagOpen, setBagOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState('')

  const filtered = useMemo(() => activeCategory === 'All pieces'
    ? products : products.filter(p => p.category === activeCategory), [activeCategory])

  const addToBag = () => {
    if (!selected) return
    setBag(current => {
      const found = current.find(item => item.id === selected.id && item.size === size)
      if (found) return current.map(item => item.id === selected.id && item.size === size ? { ...item, quantity: item.quantity + quantity } : item)
      return [...current, { ...selected, size, quantity }]
    })
    setSelected(null)
    setSize('Not sure yet')
    setQuantity(1)
    setToast('Added to your bag')
    window.setTimeout(() => setToast(''), 2400)
  }

  const updateQuantity = (id, itemSize, delta) => {
    setBag(current => current
      .map(item => item.id === id && item.size === itemSize ? { ...item, quantity: item.quantity + delta } : item)
      .filter(item => item.quantity > 0))
  }

  const orderMessage = (items) => {
    const lines = items.map((item, index) =>
      `${index + 1}. ${item.name}\n   Size: ${item.size}\n   Quantity: ${item.quantity}`
    ).join('\n\n')
    return `Hi GROOTMAN 2.0 👑\n\nI'd like to enquire about the following items:\n\n${lines}\n\nPlease confirm pricing, availability and delivery options.\n\nThank you.`
  }

  const openWhatsApp = (items) => {
    const message = encodeURIComponent(orderMessage(items))
    const url = WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
      : `https://wa.me/?text=${message}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const navTo = (id) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="site-shell">
      <div className="announcement"><span>GROOTMAN 2.0</span><i /> BUILT DIFFERENT. BORN TO LEAD. <i /><span>THE NEW STANDARD</span></div>
      <header className="header">
        <button className="mobile-menu icon-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button>
        <a className="wordmark" href="#home" onClick={e => {e.preventDefault(); navTo('home')}}>
          <span className="wordmark-crown"><Crown size={17} /></span>
          <span>GROOTMAN <b>2.0</b></span>
        </a>
        <nav className={mobileOpen ? 'nav nav-open' : 'nav'}>
          <a href="#shop" onClick={e => {e.preventDefault(); navTo('shop')}}>SHOP</a>
          <a href="#story" onClick={e => {e.preventDefault(); navTo('story')}}>OUR STANDARD</a>
          <a href="#campaign" onClick={e => {e.preventDefault(); navTo('campaign')}}>CAMPAIGN</a>
          <a href="#contact" onClick={e => {e.preventDefault(); navTo('contact')}}>CONTACT</a>
        </nav>
        <button className="bag-button" onClick={() => setBagOpen(true)} aria-label="Open shopping bag">
          <ShoppingBag size={17} /><span>BAG</span><b>{bag.reduce((n, item) => n + item.quantity, 0)}</b>
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" />
          <div className="hero-vignette" />
          <div className="hero-content">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
              <div className="eyebrow"><span className="eyebrow-line" /> THE GROOTMAN STANDARD <span className="eyebrow-line" /></div>
              <h1>BUILT<br /><em>DIFFERENT.</em></h1>
              <div className="hero-bottom">
                <p>Not made to blend in.<br />Made to stand for something.</p>
                <button className="gold-button" onClick={() => navTo('shop')}>EXPLORE THE COLLECTION <ArrowUpRight size={17} /></button>
              </div>
            </motion.div>
          </div>
          <div className="hero-index"><span>01</span><i /> 03</div>
          <div className="hero-side-note">WEAR IT. OWN IT.</div>
          <div className="hero-scroll"><ArrowDownRight size={16} /> SCROLL TO DISCOVER</div>
        </section>

        <section className="ticker" aria-label="Brand statement">
          <div className="ticker-track">{Array.from({length: 4}).map((_, i) => <span key={i}>GROOTMAN 2.0 <b>✦</b> PREMIUM STREETWEAR <b>✦</b> BUILT DIFFERENT <b>✦</b> BORN TO LEAD <b>✦</b></span>)}</div>
        </section>

        <section className="intro section-pad" id="story">
          <div className="section-kicker">01 / THE IDENTITY</div>
          <div className="intro-grid">
            <h2>STYLE IS<br /><span>AN ATTITUDE.</span></h2>
            <div className="intro-copy">
              <p className="lead">GROOTMAN 2.0 is more than what you wear. It's how you carry yourself.</p>
              <p>Rooted in confidence, individuality and the drive to move forward. Every piece is an expression of a mindset: stay focused, stay fresh and never settle for ordinary.</p>
              <a className="text-link" href="#campaign" onClick={e => {e.preventDefault(); navTo('campaign')}}>DISCOVER THE MINDSET <ArrowUpRight size={16}/></a>
            </div>
          </div>
          <div className="intro-rule"><span>G</span><i /> <span>2.0</span></div>
        </section>

        <section className="shop-section section-pad" id="shop">
          <div className="section-heading">
            <div><div className="section-kicker">02 / THE COLLECTION</div><h2>THE PIECES.</h2></div>
            <p>Find your fit. Make it yours.<br />The GROOTMAN collection.</p>
          </div>
          <div className="filters" role="tablist" aria-label="Filter products">
            {categories.map(cat => <button key={cat} className={activeCategory === cat ? 'filter active' : 'filter'} onClick={() => setActiveCategory(cat)}>{cat}</button>)}
          </div>
          <motion.div layout className="product-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, index) => (
                <motion.article className="product-card" key={product.id} layout initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}} transition={{duration:.28, delay:index*.025}}>
                  <button className="product-image-button" onClick={() => {setSelected(product); setSize('Not sure yet')}} aria-label={`View ${product.name}`}>
                    <div className="product-image" style={{backgroundImage:`url(${product.image})`, backgroundPosition:product.position}} />
                    <span className="product-tag">{product.tag}</span>
                    <span className="quick-view">QUICK VIEW <ArrowUpRight size={14}/></span>
                  </button>
                  <div className="product-info">
                    <div><h3>{product.name}</h3><span>{product.category}</span></div>
                    <button className="product-add" onClick={() => {setSelected(product); setSize('Not sure yet')}} aria-label={`Enquire about ${product.name}`}><Plus size={18}/></button>
                  </div>
                  <div className="price-note">PRICE & AVAILABILITY ON ENQUIRY</div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="catalogue-note"><ShieldCheck size={16}/> Product availability, sizing and pricing are confirmed directly with the GROOTMAN 2.0 team.</div>
        </section>

        <section className="campaign" id="campaign">
          <div className="campaign-photo" />
          <div className="campaign-overlay" />
          <div className="campaign-content">
            <div className="section-kicker">03 / THE MINDSET</div>
            <div className="campaign-title">STAY<br /><span>GROOTMAN.</span></div>
            <p>Stay cool. Stay fresh. Stay focused.<br />Keep moving like you mean it.</p>
            <button className="outline-button" onClick={() => navTo('shop')}>FIND YOUR PIECE <ArrowUpRight size={16}/></button>
          </div>
          <div className="campaign-caption">SAME VISION. BIGGER MOVES.</div>
        </section>

        <section className="values section-pad">
          <div className="section-kicker">04 / THE CODE</div>
          <div className="values-grid">
            {[['01','CONFIDENCE','Own your presence.'],['02','DISCIPLINE','Stay focused on the goal.'],['03','BROTHERHOOD','Rise by lifting each other.'],['04','PROGRESS','Keep becoming more.']].map(([n,t,d]) => <div className="value" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </section>

        <section className="contact-band" id="contact">
          <div><div className="section-kicker">05 / MAKE YOUR MOVE</div><h2>YOUR NEXT<br /><span>FAVOURITE FIT.</span></h2></div>
          <div className="contact-action"><p>Got your eye on something?<br />Let's get you sorted.</p><button className="gold-button" onClick={() => openWhatsApp([{name:'General clothing enquiry',size:'Not specified',quantity:1}])}><MessageCircle size={17}/> CHAT TO THE TEAM <ArrowUpRight size={16}/></button></div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a className="footer-brand" href="#home" onClick={e=>{e.preventDefault();navTo('home')}}><Crown size={24}/><span>GROOTMAN <b>2.0</b></span></a>
          <p>BUILT DIFFERENT.<br />BORN TO LEAD.</p>
          <div className="footer-links"><a href="#shop" onClick={e=>{e.preventDefault();navTo('shop')}}>SHOP</a><a href="#story" onClick={e=>{e.preventDefault();navTo('story')}}>OUR STANDARD</a><a href="#contact" onClick={e=>{e.preventDefault();navTo('contact')}}>CONTACT</a></div>
          <a className="social-link" href="#" onClick={e=>e.preventDefault()} aria-label="Instagram link to be added"><Instagram size={19}/></a>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} GROOTMAN 2.0. ALL RIGHTS RESERVED.</span><span>WEAR IT. OWN IT.</span><a href="#home" onClick={e=>{e.preventDefault();navTo('home')}}>BACK TO TOP ↑</a></div>
      </footer>

      <AnimatePresence>
        {selected && <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}>
          <motion.div className="product-modal" initial={{opacity:0,y:20,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12,scale:.98}}>
            <button className="modal-close icon-button" onClick={()=>setSelected(null)} aria-label="Close"><X/></button>
            <div className="modal-image" style={{backgroundImage:`url(${selected.image})`,backgroundPosition:selected.position}}/>
            <div className="modal-details">
              <div className="section-kicker">{selected.tag}</div>
              <h2>{selected.name}</h2>
              <p>{selected.description}</p>
              <div className="price-note modal-price">PRICE & AVAILABILITY ON ENQUIRY</div>
              <label className="field-label" htmlFor="size">SIZE / FIT</label>
              <div className="select-wrap"><select id="size" value={size} onChange={e=>setSize(e.target.value)}><option>Not sure yet</option>{['XS','S','M','L','XL','XXL','One size'].map(s=><option key={s}>{s}</option>)}</select><ChevronDown size={16}/></div>
              <div className="quantity-row"><span>QUANTITY</span><div><button onClick={()=>setQuantity(q=>Math.max(1,q-1))}><Minus size={15}/></button><b>{quantity}</b><button onClick={()=>setQuantity(q=>Math.min(20,q+1))}><Plus size={15}/></button></div></div>
              <button className="gold-button modal-add" onClick={addToBag}>ADD TO BAG <Plus size={17}/></button>
              <button className="modal-whatsapp" onClick={()=>openWhatsApp([{...selected,size,quantity}])}><MessageCircle size={17}/> ENQUIRE ON WHATSAPP</button>
              <small>We'll confirm actual sizes, pricing and availability with you.</small>
            </div>
          </motion.div>
        </div>}
      </AnimatePresence>

      <AnimatePresence>
        {bagOpen && <div className="drawer-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setBagOpen(false)}}>
          <motion.aside className="bag-drawer" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'tween',duration:.28}}>
            <div className="drawer-head"><div><span className="section-kicker">YOUR SELECTION</span><h2>THE BAG <small>({bag.reduce((n,i)=>n+i.quantity,0)})</small></h2></div><button className="icon-button" onClick={()=>setBagOpen(false)} aria-label="Close bag"><X/></button></div>
            {bag.length === 0 ? <div className="empty-bag"><ShoppingBag size={34}/><h3>NOTHING IN THE BAG. YET.</h3><p>Find a piece that speaks to you.</p><button className="gold-button" onClick={()=>{setBagOpen(false);navTo('shop')}}>EXPLORE THE COLLECTION <ArrowRight size={16}/></button></div> :
              <><div className="bag-items">{bag.map(item=><div className="bag-item" key={`${item.id}-${item.size}`}><div className="bag-thumb" style={{backgroundImage:`url(${item.image})`,backgroundPosition:item.position}}/><div className="bag-item-info"><h3>{item.name}</h3><span>Size: {item.size}</span><div className="bag-quantity"><button onClick={()=>updateQuantity(item.id,item.size,-1)}><Minus size={13}/></button><b>{item.quantity}</b><button onClick={()=>updateQuantity(item.id,item.size,1)}><Plus size={13}/></button></div></div><button className="remove-item" onClick={()=>updateQuantity(item.id,item.size,-item.quantity)} aria-label="Remove item"><X size={15}/></button></div>)}</div><div className="drawer-bottom"><p>Pricing and availability will be confirmed by the GROOTMAN 2.0 team.</p><button className="gold-button" onClick={()=>openWhatsApp(bag)}><MessageCircle size={17}/> SEND ORDER ON WHATSAPP <ArrowUpRight size={16}/></button><button className="clear-bag" onClick={()=>setBag([])}>CLEAR BAG</button></div></>}
          </motion.aside>
        </div>}
      </AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="toast" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}><Check size={16}/>{toast}</motion.div>}</AnimatePresence>
      <a className="floating-whatsapp" href={WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : 'https://wa.me/'} target="_blank" rel="noreferrer" aria-label="WhatsApp GROOTMAN 2.0"><MessageCircle size={21}/></a>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
