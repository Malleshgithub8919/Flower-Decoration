import { useEffect, useRef, useState } from 'react';
import { images, photoCredits } from './data/images';

const phoneNumber = '+9162626111125';
const whatsappNumber = '9162626111125';
const emailAddress = 'ratnamflowerdecoration@gmail.com';
const galleryFilters = ['All', 'Wedding', 'Reception', 'Haldi', 'Mehendi', 'Birthday', 'Floral', 'Stage', 'Ceiling', 'Entrance'];

const features = [
  ['✳', 'Creative Designs', 'Unique, artistic concepts tailored to your personality and event theme.', 'blush'],
  ['❀', 'Premium Flowers', 'Only the freshest, highest-quality blooms sourced from trusted growers.', 'sage'],
  ['♧', 'Experienced Team', 'A skilled team with over a decade of luxury event decoration expertise.', 'cream'],
  ['✧', 'Customized Themes', 'Every decoration is designed from scratch to match your unique vision.', 'lavender'],
  ['♡', 'Attention to Detail', 'No detail is too small — we perfect every petal, light, and ribbon.', 'rose'],
  ['◷', 'On-Time Execution', 'Reliable setup and teardown with a commitment to punctuality.', 'sand'],
];

const processSteps = [
  ['Consultation', 'We discuss your vision, preferences, and budget to understand your dream event.'],
  ['Theme Selection', 'Choose from curated themes or let us create a custom theme just for you.'],
  ['Design Planning', 'Detailed design mockups and floor plans bring your decoration concept to life.'],
  ['Decoration Setup', 'Our team arrives on-site to set up every floral element with precision.'],
  ['Final Finishing', 'Last-minute touches and quality checks ensure everything is picture-perfect.'],
  ['Event Day', 'We stay on-site to manage decor throughout your event for a flawless experience.'],
];

const testimonials = [
  ['“Ratnaa Flowers transformed our wedding venue completely. Every detail was beautiful and perfectly executed. The mandap looked like something from a dream.”', 'Priya & Arjun Sharma', 'Wedding Decoration', 'PA'],
  ['“The reception hall was absolutely breathtaking. Guests could not stop talking about the floral arrangements and the stage setup. Truly premium quality.”', 'Ananya Reddy', 'Reception Decoration', 'AR'],
  ['“From the floral entrance to the stage, everything was magical. The team was professional, on time, and incredibly creative. Highly recommended.”', 'Kavya & Vikram Mehta', 'Engagement Decoration', 'KM'],
  ['“They made my daughter’s birthday unforgettable. The balloon and flower arrangements were colorful, elegant, and exactly what we wanted.”', 'Sneha Iyer', 'Birthday Decoration', 'SI'],
  ['“The haldi and mehendi setups were vibrant and full of life. Ratnaa understood our cultural requirements and delivered beyond expectations.”', 'Rohan & Divya Gupta', 'Haldi & Mehendi', 'RD'],
];

const socials = [
  ['Instagram', 'https://www.instagram.com/'],
  ['Facebook', 'https://www.facebook.com/'],
  ['YouTube', 'https://www.youtube.com/'],
  ['Pinterest', 'https://www.pinterest.com/'],
];

function SectionHeading({ eyebrow, title, text, light = false, align = '' }) {
  return (
    <div className={`section-heading ${align} ${light ? 'heading-light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function PageLoader({ loading }) {
  if (!loading) return null;
  return (
    <div className="page-loader" role="status" aria-label="Loading Ratnaa Flowers Decoration">
      <div className="loader-brand"><span>✿</span><strong>RATNAA<small>Flowers Decoration</small></strong></div>
      <i className="loader-rule" />
      <p>Creating Beautiful Spaces</p>
      <span className="loader-petal">✿</span>
    </div>
  );
}

function ScrollProgress() {
  const progressRef = useRef(null);
  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      progressRef.current?.style.setProperty('--scroll-progress', String(Math.min(1, Math.max(0, progress))));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateProgress();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="scroll-progress" ref={progressRef} aria-hidden="true" />;
}

function PremiumCursor() {
  const cursorRef = useRef(null);
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    let x = 0;
    let y = 0;
    const cursor = cursorRef.current;
    const onPointerMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          cursor?.style.setProperty('--cursor-x', `${x}px`);
          cursor?.style.setProperty('--cursor-y', `${y}px`);
          cursor?.classList.add('cursor-visible');
          frame = 0;
        });
      }
      const target = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      cursor?.classList.toggle('cursor-expanded', Boolean(target));
      if (cursor && target) cursor.dataset.label = target.getAttribute('data-cursor') || '';
      else if (cursor) cursor.dataset.label = '';
    };
    const onPointerLeave = () => cursor?.classList.remove('cursor-visible', 'cursor-expanded');
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return <div className="premium-cursor" ref={cursorRef} aria-hidden="true" />;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
      const sections = ['home', 'about', 'services', 'occasions', 'gallery', 'process', 'reviews', 'contact'];
      const current = sections
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .filter((section) => section.getBoundingClientRect().top <= 150)
        .pop();
      if (current) setActive(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [['Home', 'home'], ['About', 'about'], ['Services', 'services'], ['Occasions', 'occasions'], ['Gallery', 'gallery'], ['Process', 'process'], ['Reviews', 'reviews'], ['Contact', 'contact']];
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled || menuOpen ? 'is-solid' : ''}`}>
      <div className="nav-shell">
        <a href="#home" className="brand" onClick={closeMenu} aria-label="Ratnaa Flowers Decoration home">
          <span className="brand-flower">✿</span>
          <span className="brand-name">RATNAA<small>Flowers Decoration</small></span>
        </a>
        <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          <span /><span /><span />
        </button>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {links.map(([label, id], index) => <a key={id} style={{ '--nav-index': index }} className={active === id ? 'active' : ''} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <a className="nav-call" href={`tel:${phoneNumber}`}>Call Us</a>
          <a className="button button-gold nav-cta" href="#contact" data-cursor="OPEN">Plan Your Event <Arrow /></a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home" style={{ '--hero-image': `url("${images.hero.src}")` }}>
      <div className="hero-background" />
      <div className="hero-grain" />
      <div className="hero-content">
        <span className="hero-kicker"><i /> LUXURY FLORAL &amp; EVENT DECORATION</span>
        <h1><span className="hero-line hero-line-one">Creating beautiful spaces</span><span className="hero-line hero-line-two">with flowers <em>&amp; imagination.</em></span></h1>
        <p>Transforming weddings and celebrations into breathtaking floral experiences, crafted with passion, precision, and artistry.</p>
        <div className="hero-actions">
          <a href="#contact" className="button button-gold" data-cursor="OPEN">Plan My Event <Arrow /></a>
          <a href="#gallery" className="button button-outline">Explore Our Work <span>↓</span></a>
        </div>
        <div className="hero-proof"><span className="proof-seal">10<small>+</small></span><span><strong>A decade of thoughtful celebrations</strong><small>Locally rooted in Rajamahendravaram</small></span></div>
      </div>
      <div className="hero-caption"><span>01 — 04</span><i /> FLORAL STORIES, MADE PERSONAL</div>
      <a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><i><b /></i></a>
      <span className="hero-petal petal-one">✿</span><span className="hero-petal petal-two">✧</span><span className="hero-petal petal-three">❀</span>
    </section>
  );
}

function StudioPromise() {
  const promises = [
    ['01', 'Rajamahendravaram', 'Proudly local'],
    ['02', 'Made around you', 'Bespoke event styling'],
    ['03', 'A decade of craft', 'Thoughtful execution'],
  ];
  return (
    <section className="studio-promise" aria-label="Ratnaa studio highlights">
      <div className="promise-inner wrap">
        <span className="promise-intro">THE RATNAA PROMISE</span>
        {promises.map(([number, title, detail]) => (
          <div className="promise-item" key={number}>
            <span>{number}</span>
            <div><strong>{title}</strong><small>{detail}</small></div>
          </div>
        ))}
        <a href="#contact" className="promise-link">LET’S TALK <Arrow /></a>
      </div>
    </section>
  );
}

function Stats() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const values = [10, 500, 100, 100];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return undefined;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 1300, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCounts(values.map((value) => Math.round(value * eased)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started]);

  return <div className="stats-row" ref={ref}>{['Years Experience', 'Events Decorated', 'Wedding Venues', 'Happy Clients'].map((label, index) => <div className="stat" key={label}><strong>{counts[index]}{index === 3 ? '%' : '+'}</strong><span>{label}</span></div>)}</div>;
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="about-layout wrap">
        <div className="about-collage">
          <div className="collage-main"><img src={images.about.main.src} alt={images.about.main.alt} loading="lazy" decoding="async" /></div>
          <div className="collage-small"><img src={images.about.detail.src} alt={images.about.detail.alt} loading="lazy" decoding="async" /></div>
          <div className="collage-note"><span>Thoughtfully<br />bloomed</span><i>✿</i></div>
          <span className="collage-index">R / 2014</span>
        </div>
        <div className="about-copy">
          <SectionHeading eyebrow="OUR STORY" title={<>Creating beautiful spaces<br />with flowers <em>&amp; imagination.</em></>} />
          <p>At Ratnaa Flowers Decoration, we believe every celebration deserves to be extraordinary. For over a decade, we have been transforming venues into breathtaking floral experiences — from intimate gatherings to grand weddings.</p>
          <p>Our passion lies in blending traditional Indian aesthetics with contemporary design, creating decorations that are as unique as your story. Every petal is placed with intention, every arrangement crafted with love.</p>
          <a href="#contact" className="text-link">Discover our approach <Arrow /></a>
          <Stats />
        </div>
      </div>
    </section>
  );
}

function Services({ onEnquire }) {
  return (
    <section className="services section-pad" id="services">
      <div className="wrap">
        <SectionHeading eyebrow="WHAT WE OFFER" title={<>Our decoration <em>services.</em></>} text="From grand weddings to intimate celebrations, we craft bespoke floral experiences for every occasion." />
        <div className="services-grid">
          {images.services.map(({ title, description, icon, image: serviceImage }, index) => (
            <article className="service-card" key={title} style={{ '--card-order': index }}>
              <a className="service-image" href="#contact" onClick={() => onEnquire(title)} aria-label={`Enquire about ${title}`}><img src={serviceImage.src} alt={serviceImage.alt} loading="lazy" decoding="async" /><span className="service-number">0{index + 1}</span><span className="service-arrow"><Arrow /></span></a>
              <div className="service-info"><span className="service-icon">{icon}</span><h3>{title}</h3><p>{description}</p><button className="text-link" onClick={() => onEnquire(title)}>Enquire now <Arrow /></button></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyRatnaa() {
  return <section className="why-section section-pad"><div className="wrap"><SectionHeading eyebrow="THE RATNAA DIFFERENCE" title={<>Care in every detail.<br /><em>Beauty in every bloom.</em></>} text="We bring passion, precision, and artistry to every event we decorate." /><div className="features-grid">{features.map(([icon, title, description, tone]) => <article className={`feature-card ${tone}`} key={title}><span>{icon}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>;
}

function Occasions() {
  return (
    <section className="occasions section-pad" id="occasions">
      <div className="wrap">
        <SectionHeading eyebrow="CELEBRATE WITH US" title={<>A setting for <em>every story.</em></>} text="Whatever you are celebrating, we have the perfect floral design to make it unforgettable." />
        <div className="occasion-grid">{images.occasions.map(({ title, image: occasionImage }, index) => <a className="occasion-card" href="#contact" key={title} aria-label={`${title}: ${occasionImage.alt}`} style={{ '--occasion-image': `url("${occasionImage.src}")` }}><span className="occasion-index">0{index + 1}</span><strong>{title}</strong><span className="occasion-arrow"><Arrow /></span></a>)}</div>
      </div>
    </section>
  );
}

function Gallery({ filter, setFilter, filteredGallery, openLightbox }) {
  return (
    <section className="gallery-section section-pad" id="gallery">
      <div className="wrap">
        <SectionHeading eyebrow="DECORATION INSPIRATION" title={<>Ideas for <em>your celebration.</em></>} text="Explore licensed event photography for ideas, styles, and details to inspire your own celebration." />
        <div className="gallery-filters" role="group" aria-label="Filter gallery">{galleryFilters.map((item) => <button className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
        <div className="gallery-grid">{filteredGallery.map((item) => <button className="gallery-item" key={item.src} onClick={() => openLightbox(item)} aria-label={`View ${item.title}`} data-cursor="VIEW"><img src={item.src} alt={item.alt} loading="lazy" decoding="async" /><span className="gallery-overlay"><small>{item.category}</small><strong>{item.title}</strong><i><Arrow /></i></span></button>)}</div>
        <p className="photo-disclosure">Photos are provided for decoration inspiration and are not represented as Ratnaa’s own completed events. User-submitted image usage rights have not been verified. <a href="#photo-credits">View photo credits</a>.</p>
        <a href="#contact" className="button button-wine gallery-cta">Create something beautiful <Arrow /></a>
      </div>
    </section>
  );
}

function CaseStudy() {
  return <section className="case-study section-pad"><div className="case-layout wrap"><div className="case-photo"><img src={images.caseStudy.src} alt={images.caseStudy.alt} loading="lazy" decoding="async" /><span className="photo-label">DECOR INSPIRATION</span></div><div className="case-copy"><SectionHeading eyebrow="A CELEBRATION, REIMAGINED" title={<>Turning venues<br />into <em>experiences.</em></>} /><p>Discover floral details and traditional Indian wedding styling ideas that can help shape the look and feel of your own celebration.</p><dl className="case-facts"><div><dt>Inspiration</dt><dd>Indian Wedding</dd></div><div><dt>Style direction</dt><dd>Traditional Florals</dd></div><div><dt>Photography</dt><dd>Licensed reference</dd></div></dl><a href="#gallery" className="text-link">Explore decoration inspiration <Arrow /></a></div></div></section>;
}

function Process() {
  const gridRef = useRef(null);
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const bounds = grid.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.68 - bounds.top) / (bounds.height + window.innerHeight * 0.25)));
      grid.style.setProperty('--timeline-progress', String(progress));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return <section className="process section-pad" id="process"><div className="wrap"><SectionHeading eyebrow="HOW WE WORK" title={<>A thoughtful journey,<br /><em>beautifully delivered.</em></>} text="A seamless journey from your first consultation to the final moment of your event." /><div className="process-grid" ref={gridRef}>{processSteps.map(([title, description], index) => <article className="process-step" key={title}><span className="step-number">0{index + 1}</span><span className="step-marker" /><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>;
}

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const review = testimonials[current];
  const move = (delta) => setCurrent((value) => (value + delta + testimonials.length) % testimonials.length);
  let touchStart = 0;
  return (
    <section className="reviews section-pad" id="reviews">
      <div className="review-wrap wrap">
        <div className="review-aside"><SectionHeading eyebrow="CLIENT LOVE" title={<>Kind words,<br /><em>lovely memories.</em></>} text="The sweetest part of what we do is hearing how it made you feel." /><div className="review-controls"><button aria-label="Previous review" onClick={() => move(-1)}>←</button><div className="review-dots">{testimonials.map((item, index) => <button aria-label={`Show review ${index + 1}`} className={current === index ? 'current' : ''} key={item[1]} onClick={() => setCurrent(index)} />)}</div><button aria-label="Next review" onClick={() => move(1)}>→</button></div></div>
        <article key={current} className="review-card" onTouchStart={(event) => { touchStart = event.changedTouches[0].screenX; }} onTouchEnd={(event) => { const delta = touchStart - event.changedTouches[0].screenX; if (Math.abs(delta) > 50) move(delta > 0 ? 1 : -1); }}>
          <span className="quote-mark">“</span><div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>{review[0]}</blockquote><div className="review-author"><span className="review-avatar">{review[3]}</span><span><strong>{review[1]}</strong><small>{review[2]}</small></span><span className="review-counter">0{current + 1} / 0{testimonials.length}</span></div>
        </article>
      </div>
    </section>
  );
}

function Callout() {
  return <section className="callout"><div className="callout-background" style={{ '--callout-image': `url("${images.callout.src}")` }} /><div className="callout-content"><span className="eyebrow">LET’S CREATE MAGIC</span><h2>Let’s make your<br />celebration <em>bloom.</em></h2><p>Tell us your dream decoration and we’ll turn it into a beautiful reality.</p><div><a href="#contact" className="button button-gold">Plan My Event <Arrow /></a><a href={`tel:${phoneNumber}`} className="button button-outline">Call Us <span>↗</span></a></div></div></section>;
}

function Contact({ selectedEvent }) {
  const [eventType, setEventType] = useState(selectedEvent);
  const [status, setStatus] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    setEventType(selectedEvent);
    if (selectedEvent) formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selectedEvent]);

  const submitEnquiry = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      'Hello Ratnaa Flowers Decoration, I would like to enquire about an event.',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      `Event: ${data.get('event')}`,
      `Date: ${data.get('date')}`,
      `Details: ${data.get('details') || 'Not provided'}`,
    ].join('\n');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setStatus('Your enquiry is ready in WhatsApp. Send the message there and our team will be in touch.');
    form.reset();
    setEventType('');
  };

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="wrap">
        <SectionHeading eyebrow="GET IN TOUCH" title={<>Let’s plan your <em>event.</em></>} text="Share your celebration details and we’ll get back to you with a tailored decoration plan." />
        <div className="contact-layout">
          <div className="contact-details"><span className="contact-overline">REACH US DIRECTLY</span><h3>We’d love to hear<br />what you’re dreaming of.</h3><p>Call, email, or visit us — we’re here to make your celebration extraordinary.</p>
            <a className="contact-item" href={`tel:${phoneNumber}`}><span className="contact-icon">↗</span><span><small>PHONE</small><strong>+91 62626 11125</strong></span></a>
            <a className="contact-item" href={`mailto:${emailAddress}`}><span className="contact-icon">✉</span><span><small>EMAIL</small><strong>{emailAddress}</strong></span></a>
            <div className="contact-item"><span className="contact-icon">⌖</span><span><small>VISIT OUR STUDIO</small><strong>Ave Appa Rao Rd, near HP Petrol Pump,<br />Srinivas Nagar, Gandhipuram,<br />Rajamahendravaram, Andhra Pradesh 533103</strong></span></div>
            <div className="contact-item"><span className="contact-icon">◷</span><span><small>WORKING HOURS</small><strong>Mon – Sat: 9:00 AM – 8:00 PM</strong></span></div>
            <div className="follow-row"><small>FOLLOW OUR WORK</small><div>{socials.map(([name, href]) => <a href={href} target="_blank" rel="noreferrer" key={name}>{name}</a>)}<a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp</a></div></div>
          </div>
          <form className="enquiry-form" ref={formRef} onSubmit={submitEnquiry}>
            <div className="form-title"><span>START A CONVERSATION</span><h3>Tell us about your day.</h3></div>
            <div className="form-grid">
              <label>Full name<input name="name" type="text" placeholder="Your name" autoComplete="name" required /></label>
              <label>Phone number<input name="phone" type="tel" placeholder="Your phone" autoComplete="tel" pattern="[+]?[0-9 ()-]{10,18}" title="Enter a valid phone number" required /></label>
              <label>Email address<input name="email" type="email" placeholder="Your email" autoComplete="email" required /></label>
              <label>Event type<select name="event" value={eventType} onChange={(event) => setEventType(event.target.value)} required><option value="">Choose an occasion</option>{['Wedding Decoration', 'Reception Decoration', 'Engagement Decoration', 'Birthday Decoration', 'Haldi Decoration', 'Mehendi Decoration', 'Baby Shower Decoration', 'Corporate Event Decoration', 'Other'].map((option) => <option key={option}>{option}</option>)}</select></label>
              <label className="form-wide">Event date<input name="date" type="date" min={new Date().toISOString().split('T')[0]} required /></label>
              <label className="form-wide">Tell us about your event<textarea name="details" placeholder="Describe your dream decoration..." rows="4" /></label>
            </div>
            <button className="button button-wine form-submit" type="submit">Send Enquiry via WhatsApp <Arrow /></button>
            {status && <p className="form-status" role="status">{status}</p>}
            <p className="form-privacy">Your details are only used to help us plan your celebration.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-brand-col"><a href="#home" className="brand footer-brand"><span className="brand-flower">✿</span><span className="brand-name">RATNAA<small>Flowers Decoration</small></span></a><p>Luxury flower &amp; event decoration crafting beautiful memories for your most precious celebrations.</p><span className="footer-location">RAJAMAHENDRAVARAM, ANDHRA PRADESH</span></div>
        <div className="footer-col"><h3>Quick Links</h3><a href="#home">Home</a><a href="#about">About</a><a href="#services">Services</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></div>
        <div className="footer-col"><h3>Our Services</h3><a href="#services">Wedding Decoration</a><a href="#services">Floral Decoration</a><a href="#services">Reception Decoration</a><a href="#services">Stage Decoration</a></div>
        <div className="footer-col footer-contact"><h3>Get in Touch</h3><a href={`tel:${phoneNumber}`}>+91 62626 11125</a><a href={`mailto:${emailAddress}`}>{emailAddress}</a><span>Rajamahendravaram, Andhra Pradesh</span><div className="footer-socials">{socials.slice(0, 3).map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}>{name.slice(0, 1)}</a>)}<a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">W</a></div></div>
      </div>
      <details className="photo-credits wrap" id="photo-credits">
        <summary>Photo credits &amp; licenses</summary>
        <p>Photos are shown for visual reference only and are not represented as Ratnaa’s own event work. Stock photo sources and licenses are linked where available; usage rights for user-provided images have not been verified.</p>
        <ul>{photoCredits.map((item) => <li key={item.src}><strong>{item.title}</strong> — {item.credit}{item.sourceUrl && <>; <a href={item.sourceUrl} target="_blank" rel="noreferrer">photo source</a></>}{item.licenseUrl ? <>; <a href={item.licenseUrl} target="_blank" rel="noreferrer">{item.license}</a></> : `; ${item.license}`}.</li>)}</ul>
      </details>
      <div className="footer-bottom wrap"><span>© 2026 Ratnaa Flowers Decoration. All Rights Reserved.</span><span>Crafted with <i>♥</i> for celebrations that matter.</span></div>
    </footer>
  );
}

function FloatingContact() {
  return <div className="floating-contact"><a href={`tel:${phoneNumber}`} aria-label="Call Ratnaa Flowers Decoration"><span>☎</span><small>Call</small></a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="Chat with Ratnaa Flowers Decoration on WhatsApp"><span>◉</span><small>WhatsApp</small></a></div>;
}

function Lightbox({ item, index, count, onClose, onMove }) {
  const touchStart = useRef(0);
  useEffect(() => {
    if (!item) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onMove(1);
      if (event.key === 'ArrowLeft') onMove(-1);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('lightbox-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('lightbox-open');
    };
  }, [item, onClose, onMove]);
  if (!item) return null;
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${item.title} gallery image`} onClick={onClose} onTouchStart={(event) => { touchStart.current = event.changedTouches[0].screenX; }} onTouchEnd={(event) => { const delta = touchStart.current - event.changedTouches[0].screenX; if (Math.abs(delta) > 50) onMove(delta > 0 ? 1 : -1); }}><button className="lightbox-close" onClick={onClose} aria-label="Close gallery">×</button><button className="lightbox-nav lightbox-prev" onClick={(event) => { event.stopPropagation(); onMove(-1); }} aria-label="Previous image">←</button><figure onClick={(event) => event.stopPropagation()}><img src={item.src} alt={item.alt} /><figcaption><span>{item.category}</span>{item.title}<small>Photo: {item.credit}{item.sourceUrl && <> · <a href={item.sourceUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>Source</a></>}{item.licenseUrl ? <> · <a href={item.licenseUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>{item.license}</a></> : ` · ${item.license}`}</small></figcaption></figure><span className="lightbox-counter">{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span><button className="lightbox-nav lightbox-next" onClick={(event) => { event.stopPropagation(); onMove(1); }} aria-label="Next image">→</button></div>;
}

export default function App() {
  const [loading, setLoading] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [selectedEvent, setSelectedEvent] = useState('');
  const filteredGallery = filter === 'All' ? images.gallery : images.gallery.filter((item) => item.category === filter);
  const lightboxItem = lightboxIndex < 0 ? null : filteredGallery[lightboxIndex] || null;
  const openLightbox = (item) => setLightboxIndex(filteredGallery.findIndex((galleryItem) => galleryItem.src === item.src));
  const moveLightbox = (delta) => setLightboxIndex((index) => (index + delta + filteredGallery.length) % filteredGallery.length);
  const enquire = (title) => setSelectedEvent(title);

  useEffect(() => {
    if (!loading) return undefined;
    const timer = window.setTimeout(() => setLoading(false), 1150);
    return () => window.clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    const revealTargets = document.querySelectorAll([
      '.section-heading',
      '.collage-main',
      '.collage-small',
      '.about-copy > p',
      '.stats-row',
      '.service-card',
      '.feature-card',
      '.occasion-card',
      '.gallery-item',
      '.case-photo',
      '.case-copy',
      '.process-step',
      '.review-card',
      '.contact-item',
      '.enquiry-form',
    ].join(','));

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const siblingCounts = new Map();
    revealTargets.forEach((element) => {
      const parent = element.parentElement;
      const index = siblingCounts.get(parent) || 0;
      siblingCounts.set(parent, index + 1);
      element.classList.add('reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 75}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    revealTargets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const bounds = hero.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      const offset = Math.max(-70, Math.min(70, -bounds.top * 0.12));
      hero.style.setProperty('--hero-parallax', `${offset}px`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!hero || !finePointer.matches || reducedMotion.matches) return undefined;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (event) => {
      const bounds = hero.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
      if (!frame) frame = window.requestAnimationFrame(() => {
        hero.style.setProperty('--hero-pointer-x', `${pointerX}px`);
        hero.style.setProperty('--hero-pointer-y', `${pointerY}px`);
        frame = 0;
      });
    };
    const resetPointer = () => {
      hero.style.setProperty('--hero-pointer-x', '0px');
      hero.style.setProperty('--hero-pointer-y', '0px');
    };
    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', resetPointer);
    return () => {
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', resetPointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <>
    <PageLoader loading={loading} />
    <ScrollProgress />
    <Navbar />
    <main><Hero /><StudioPromise /><About /><Services onEnquire={enquire} /><WhyRatnaa /><Occasions /><Gallery filter={filter} setFilter={setFilter} filteredGallery={filteredGallery} openLightbox={openLightbox} /><CaseStudy /><Process /><Testimonials /><Callout /><Contact selectedEvent={selectedEvent} /></main>
    <Footer /><FloatingContact />
    <Lightbox item={lightboxItem} index={lightboxIndex} count={filteredGallery.length} onClose={() => setLightboxIndex(-1)} onMove={moveLightbox} />
    <PremiumCursor />
  </>;
}
