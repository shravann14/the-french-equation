// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Highlight the active nav link while scrolling
const sections = document.querySelectorAll('section[id]');
const links = navLinks.querySelectorAll('a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const current = navLinks.querySelector(`a[href="#${entry.target.id}"]`);
      if (current) current.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => sectionObserver.observe(section));

// Resource filter (All / Maths / French)
const filterButtons = document.querySelectorAll('.filter');
const resources = document.querySelectorAll('.resource');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    resources.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hide', !match);
    });
  });
});

// Fade-in animation on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Contact form: opens WhatsApp with a pre-filled message (no backend needed)
const form = document.getElementById('contactForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const subject = document.getElementById('subject').value;
  const grade = document.getElementById('grade').value.trim();
  const message = document.getElementById('message').value.trim();

  const text =
    `Bonjour! My name is ${name}.\n` +
    `I'm interested in: ${subject}\n` +
    (grade ? `Curriculum/Grade: ${grade}\n` : '') +
    (message ? `Message: ${message}` : '');

  const url = `https://wa.me/919940216060?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Resource popup: "Contact tutor to access"
const modal = document.getElementById('resourceModal');
const modalClose = document.getElementById('modalClose');
const modalContact = document.getElementById('modalContact');

function openModal() { modal.classList.add('show'); }
function closeModal() { modal.classList.remove('show'); }

resources.forEach(card => {
  card.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  });
});

modalClose.addEventListener('click', closeModal);
modalContact.addEventListener('click', closeModal);

// Close when clicking the dark background
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

// Close with the Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});