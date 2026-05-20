const menu = {
  tortas: [
    { name: 'Torta de jamón', desc: 'Jamón de pierna, queso panela, lechuga y jitomate', price: 45, imgs: ['https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop'] },
    { name: 'Torta de pierna', desc: 'Pierna de cerdo adobada, guacamole y frijoles', price: 50, imgs: ['https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop'] },
  ],
  desayunos: [
    { name: 'Huevos al gusto', desc: 'Huevos estrellados, revueltos o a la mexicana', price: 45, imgs: ['https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop'] },
    { name: 'Chilaquiles verdes', desc: 'Totopos bañados en salsa verde, crema y queso', price: 65, imgs: ['https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=400&h=300&fit=crop'] },
    { name: 'Hot cakes', desc: 'Stack de 3 hot cakes con miel y mantequilla', price: 55, imgs: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop'] },
  ],
  comida: [
    { name: 'Comida corrida', desc: 'Guisado del día, arroz, frijoles y tortillas', price: 75, imgs: ['https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop'] },
    { name: 'Mole con pollo', desc: 'Pechuga de pollo bañada en mole poblano con arroz', price: 85, imgs: ['https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop'] },
    { name: 'Pechuga empanizada', desc: 'Pechuga empanizada con ensalada y papas', price: 80, imgs: ['https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop'] },
  ],
  postres: [
    { name: 'Flan napolitano', desc: 'Flan cremoso con caramelo', price: 35, imgs: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'] },
    { name: 'Gelatina de mosaico', desc: 'Gelatina de leche con cuadros de colores', price: 25, imgs: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop'] },
    { name: 'Pastel de chocolate', desc: 'Rebanada de pastel de chocolate con chantillín', price: 45, imgs: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'] },
    { name: 'Arroz con leche', desc: 'Arroz con leche tradicional canela y pasas', price: 30, imgs: ['https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop'] },
  ],
  antojitos: [
    { name: 'Sopes', desc: 'Sopes de masa con frijoles, crema, queso y salsa', price: 20, imgs: ['https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop'] },
    { name: 'Taquitos de suadero argentino', desc: 'Taquitos de suadero argentino', price: 122, imgs: [
      'https://plus.unsplash.com/premium_photo-1681406994498-e2f24136108c?q=80&w=687&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop'
    ]},
  ],
};

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

function render() {
  let idCounter = 1;
  for (const [cat, items] of Object.entries(menu)) {
    const grid = document.getElementById(`grid-${cat}`);
    grid.innerHTML = items.map(item => {
      const id = idCounter++;
      const multi = item.imgs.length > 1;
      return `
        <div class="card visible">
          <div class="carousel" data-current="0">
            ${item.imgs.map((img, i) => `
              <img src="${img}" alt="${escapeHtml(item.name)}" loading="lazy"
                class="carousel-img ${i === 0 ? 'active' : ''}">
            `).join('')}
            ${multi ? `
              <button class="carousel-btn carousel-prev" onclick="moveCarousel(this, -1)">&#10094;</button>
              <button class="carousel-btn carousel-next" onclick="moveCarousel(this, 1)">&#10095;</button>
              <div class="carousel-dots">
                ${item.imgs.map((_, i) => `
                  <span class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(this, ${i})"></span>
                `).join('')}
              </div>
            ` : ''}
          </div>
          <div class="card-body">
            <h3>${escapeHtml(item.name)}</h3>
            <p class="desc">${escapeHtml(item.desc)}</p>
            <div class="card-footer">
              <span class="price">$${item.price.toFixed(2)}</span>
              <button class="btn-cart" onclick="addToCart(${id}, '${escapeHtml(item.name)}', ${item.price})">
                <i class="fas fa-plus"></i> Agregar
              </button>
            </div>
          </div>
        </div>`;
    }).join('');
  }
}

render();

// ── Carousel ──
function moveCarousel(btn, dir) {
  const carousel = btn.closest('.carousel');
  const imgs = carousel.querySelectorAll('.carousel-img');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let current = parseInt(carousel.dataset.current);
  imgs[current].classList.remove('active');
  if (dots.length) dots[current].classList.remove('active');
  current = (current + dir + imgs.length) % imgs.length;
  imgs[current].classList.add('active');
  if (dots.length) dots[current].classList.add('active');
  carousel.dataset.current = current;
}
function goToSlide(dot, idx) {
  const carousel = dot.closest('.carousel');
  const imgs = carousel.querySelectorAll('.carousel-img');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let current = parseInt(carousel.dataset.current);
  imgs[current].classList.remove('active');
  dots[current].classList.remove('active');
  imgs[idx].classList.add('active');
  dots[idx].classList.add('active');
  carousel.dataset.current = idx;
}

// ── Sidebar ──
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.querySelector('.sidebar-overlay').classList.toggle('show');
}
document.querySelectorAll('.sidebar a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('open');
    document.querySelector('.sidebar-overlay').classList.remove('show');
  });
});
(function() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.sidebar a');
  if (!sections.length) return;
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  });
})();

// ── Cart ──
let cart = JSON.parse(localStorage.getItem('comidaCart') || '[]');

function saveCart() {
  localStorage.setItem('comidaCart', JSON.stringify(cart));
renderCart();

// ── Contact (EmailJS) ──
emailjs.init('m202FJpgz8JlMhJrh');

function sendContact() {
  const btn = document.getElementById('btnContactSend');
  const name = document.getElementById('contactName').value.trim();
  const phone = document.getElementById('contactPhone').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const error = document.getElementById('contactError');
  const errorText = document.getElementById('contactErrorText');
  const success = document.getElementById('contactSuccess');

  error.style.display = 'none';
  success.style.display = 'none';

  if (!name || !phone || !message) {
    errorText.textContent = 'Se deben llenar todos los campos del formulario.';
    error.style.display = 'flex';
    setTimeout(() => { error.style.display = 'none'; }, 4000);
    return;
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorText.textContent = 'Ingresa un correo electrónico válido.';
    error.style.display = 'flex';
    setTimeout(() => { error.style.display = 'none'; }, 4000);
    return;
  }

  btn.disabled = true;
  btn.classList.add('loading');

  const params = {
    to_email: 'arturo.resendiz@grupopabsa.com',
    name: name,
    phone: phone,
    email: email || 'No proporcionado',
    message: message
  };

  emailjs.send('service_9m5rcfq', 'template_cfgl7gs', params)
    .then(() => {
      success.style.display = 'flex';
      setTimeout(() => { success.style.display = 'none'; }, 4000);
      document.getElementById('contactName').value = '';
      document.getElementById('contactPhone').value = '';
      document.getElementById('contactEmail').value = '';
      document.getElementById('contactMessage').value = '';
    })
    .catch(() => {
      alert('Error al enviar el mensaje. Intenta de nuevo.');
    })
    .finally(() => {
      btn.disabled = false;
      btn.classList.remove('loading');
    });
}
}

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  saveCart();
  showToast('✓ ' + name + ' agregado');
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
  }
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const badge = document.getElementById('cartBadge');
  const totalEl = document.getElementById('cartTotal');
  const btn = document.getElementById('btnWhatsapp');

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  badge.textContent = totalItems;
  badge.classList.toggle('show', totalItems > 0);
  totalEl.textContent = '$' + totalPrice.toFixed(2);
  btn.disabled = totalItems === 0;

  if (totalItems === 0) {
    container.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${escapeHtml(item.name)}</h4>
        <div class="item-price">$${item.price.toFixed(2)}</div>
      </div>
      <div class="cart-item-qty">
        <button onclick="changeQty(${item.id}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
    </div>
  `).join('');
}

function toggleCart() {
  const overlay = document.getElementById('cartOverlay');
  overlay.classList.toggle('active');
}

function sendToWhatsApp() {
  if (cart.length === 0) return;
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  let msg = '¡Hola! Quiero hacer un pedido:\n';
  cart.forEach(item => {
    msg += `\n• ${item.qty}x ${item.name} — $${(item.price * item.qty).toFixed(2)}`;
  });
  msg += `\n\n📦 Total: $${total.toFixed(2)}`;
  window.open(`https://wa.me/521234567890?text=${encodeURIComponent(msg)}`, '_blank');
}

function showToast(text) {
  const el = document.getElementById('cartToast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 2000);
}

renderCart();
