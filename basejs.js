// ============================================
// FMS - Fisheries & Marine Science
// Complete JavaScript File
// ============================================

// 1. BUBBLES ANIMATION
const bubbleContainer = document.getElementById('bubbles');
for (let i = 0; i < 22; i++) {
  const b = document.createElement('div');
  b.className = 'bubble';
  const size = Math.random() * 28 + 6;
  b.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: ${Math.random() * 100}%;
    animation-duration: ${Math.random() * 14 + 10}s;
    animation-delay: ${Math.random() * 12}s;
  `;
  bubbleContainer.appendChild(b);
}

// 2. STICKY NAV ON SCROLL
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// 3. MOBILE MENU TOGGLE
document.getElementById('menuToggle').addEventListener('click', function () {
  document.getElementById('navLinks').classList.toggle('open');
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// 4. FADE-UP ON SCROLL (IntersectionObserver)
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

// 5. SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// 6. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`#navLinks a[href="#${sectionId}"]`);
    if (navLink) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('#navLinks a').forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
});

// 7. CONTACT FORM - TOAST NOTIFICATION
// Create toast element
const toast = document.createElement('div');
toast.id = 'toastNotif';
toast.style.cssText = `
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) translateY(80px);
  background: linear-gradient(135deg, #0a3d6b, #0072ff);
  color: #fff;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 8px 30px rgba(0, 114, 255, 0.4);
  z-index: 99999;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
`;
toast.innerHTML = `<span style="font-size:20px;">✅</span> Message sent successfully!`;
document.body.appendChild(toast);

function showToast() {
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(80px)';
  }, 3500);
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');

    // Button loading state
    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Simulate sending delay then show toast
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      btn.style.opacity = '1';
      contactForm.reset();
      showToast();
    }, 1000);
  });
}

// 8. BACK TO TOP BUTTON
const backToTop = document.createElement('button');
backToTop.innerHTML = '↑';
backToTop.id = 'backToTop';
backToTop.style.cssText = `
  position: fixed; bottom: 30px; right: 30px;
  width: 45px; height: 45px; border-radius: 50%;
  background: rgba(0, 150, 255, 0.7); color: white;
  border: none; font-size: 20px; cursor: pointer;
  display: none; z-index: 999;
  backdrop-filter: blur(6px);
  transition: opacity 0.3s ease;
`;
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 9. SCROLL PROGRESS BAR
const progressBar = document.createElement('div');
progressBar.id = 'scrollProgress';
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 3px;
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  width: 0%; z-index: 9999;
  transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// ============================================
// 10. FISH IMAGE POPUP / TOOLTIP ON HOVER & CLICK
// ============================================

// Create the popup element
const fishPopup = document.createElement('div');
fishPopup.id = 'fishPopup';
fishPopup.style.cssText = `
  position: fixed;
  background: rgba(4, 15, 40, 0.96);
  border: 1px solid rgba(0, 180, 255, 0.35);
  border-radius: 14px;
  padding: 18px 22px;
  max-width: 280px;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transform: translateY(8px) scale(0.97);
  transition: opacity 0.22s ease, transform 0.22s ease;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,180,255,0.1);
`;
document.body.appendChild(fishPopup);

// Track if popup is pinned (clicked)
let popupPinned = false;

function showFishPopup(card, x, y) {
  const num    = card.querySelector('.fish-card-num')?.innerText || '';
  const name   = card.querySelector('h4')?.innerText || '';
  const latin  = card.querySelector('.latin')?.innerText || '';
  const desc   = card.querySelector('p:not(.latin)')?.innerText || '';
  const tag    = card.querySelector('.fish-card-tag')?.innerText || '';
  const imgEl  = card.querySelector('.fish-card-img');
  const imgBg  = imgEl ? imgEl.style.backgroundImage : '';

  fishPopup.innerHTML = `
    <div style="
      width:100%; height:110px; border-radius:8px; margin-bottom:12px;
      background-image:${imgBg};
      background-size:cover; background-position:center;
    "></div>
    <div style="font-size:10px; color:rgba(0,180,255,0.7); letter-spacing:2px; margin-bottom:4px;">${num}</div>
    <div style="font-size:17px; font-weight:700; color:#fff; margin-bottom:2px;">${name}</div>
    <div style="font-size:12px; color:rgba(255,255,255,0.45); font-style:italic; margin-bottom:8px;">${latin}</div>
    <div style="font-size:12px; color:rgba(255,255,255,0.75); line-height:1.6; margin-bottom:10px;">${desc}</div>
    <span style="
      font-size:10px; color:rgba(0,180,255,0.85);
      border:1px solid rgba(0,180,255,0.3);
      padding:3px 9px; border-radius:20px; letter-spacing:1px;
    ">${tag}</span>
    ${popupPinned ? '<div style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:10px;text-align:center;">Click image again to close</div>' : ''}
  `;

  positionPopup(x, y);
  fishPopup.style.opacity = '1';
  fishPopup.style.transform = 'translateY(0) scale(1)';
  fishPopup.style.pointerEvents = popupPinned ? 'auto' : 'none';
}

function positionPopup(x, y) {
  const pw = 290, ph = 320;
  let left = x + 16;
  let top  = y - 60;

  if (left + pw > window.innerWidth - 10)  left = x - pw - 16;
  if (top + ph  > window.innerHeight - 10) top  = window.innerHeight - ph - 10;
  if (top < 10) top = 10;

  fishPopup.style.left = left + 'px';
  fishPopup.style.top  = top  + 'px';
}

function hideFishPopup() {
  if (popupPinned) return;
  fishPopup.style.opacity = '0';
  fishPopup.style.transform = 'translateY(8px) scale(0.97)';
}

// Attach events to each fish card image
document.querySelectorAll('.fish-card').forEach(card => {
  const imgDiv = card.querySelector('.fish-card-img');
  if (!imgDiv) return;

  // Change cursor on hover
  imgDiv.style.cursor = 'pointer';

  // HOVER — show tooltip
  imgDiv.addEventListener('mouseenter', (e) => {
    if (popupPinned) return;
    showFishPopup(card, e.clientX, e.clientY);
  });

  // MOVE — follow cursor
  imgDiv.addEventListener('mousemove', (e) => {
    if (popupPinned) return;
    positionPopup(e.clientX, e.clientY);
  });

  // MOUSE LEAVE — hide tooltip
  imgDiv.addEventListener('mouseleave', () => {
    hideFishPopup();
  });

  // CLICK — pin/unpin popup
  imgDiv.addEventListener('click', (e) => {
    if (popupPinned) {
      // Unpin and close
      popupPinned = false;
      fishPopup.style.opacity = '0';
      fishPopup.style.transform = 'translateY(8px) scale(0.97)';
      fishPopup.style.pointerEvents = 'none';
    } else {
      // Pin popup at click position
      popupPinned = true;
      showFishPopup(card, e.clientX, e.clientY);
    }
  });
});

// Click outside to close pinned popup
document.addEventListener('click', (e) => {
  if (popupPinned && !e.target.closest('.fish-card-img') && e.target !== fishPopup) {
    popupPinned = false;
    fishPopup.style.opacity = '0';
    fishPopup.style.transform = 'translateY(8px) scale(0.97)';
    fishPopup.style.pointerEvents = 'none';
  }
});