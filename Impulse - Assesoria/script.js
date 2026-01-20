// ==========================================
// IMPULSE ASSESSORIA - INTERACTIVE SCRIPTS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // HEADER SCROLL EFFECT
  // ==========================================
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // ==========================================
  // MOBILE MENU
  // ==========================================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
    
    // Close menu on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }
  
  // ==========================================
  // SCROLL ANIMATIONS
  // ==========================================
  const animatedElements = document.querySelectorAll('.fade-up');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => observer.observe(el));
  
  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counters.forEach(counter => animateCounter(counter));
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    counterObserver.observe(statsSection);
  }
  
  // ==========================================
  // FAQ ACCORDION
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // ==========================================
  // FORM HANDLING
  // ==========================================
  const leadForm = document.getElementById('leadForm');
  const heroLeadForm = document.getElementById('heroLeadForm');
  const successModal = document.getElementById('successModal');
  
  const handleFormSubmit = function(form) {
    return function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Log data (in production, send to server)
      console.log('Form submitted:', data);
      
      // Show success modal
      if (successModal) {
        successModal.classList.add('active');
      }
      
      // Reset form
      form.reset();
    };
  };
  
  if (leadForm) {
    leadForm.addEventListener('submit', handleFormSubmit(leadForm));
  }
  
  if (heroLeadForm) {
    heroLeadForm.addEventListener('submit', handleFormSubmit(heroLeadForm));
  }
  
  // ==========================================
  // PHONE INPUT MASK
  // ==========================================
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  
  phoneInputs.forEach(phoneInput => {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 11) {
        value = value.slice(0, 11);
      }
      
      if (value.length > 0) {
        value = '(' + value;
      }
      if (value.length > 3) {
        value = value.slice(0, 3) + ') ' + value.slice(3);
      }
      if (value.length > 10) {
        value = value.slice(0, 10) + '-' + value.slice(10);
      }
      
      e.target.value = value;
    });
  });
  
  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ==========================================
  // PARALLAX EFFECT FOR HERO
  // ==========================================
  const heroGlow = document.querySelector('.hero-glow');
  const heroGradient = document.querySelector('.hero-gradient');
  
  if (heroGlow && heroGradient) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      const rate = scrollY * 0.3;
      
      heroGlow.style.transform = `translateY(${rate}px)`;
      heroGradient.style.transform = `translateY(${rate * 0.5}px)`;
    });
  }
  
  // ==========================================
  // TRUST LOGOS INFINITE SCROLL (Optional)
  // ==========================================
  // This creates a subtle hover effect on trust logos
  const trustLogos = document.querySelectorAll('.trust-logo');
  
  trustLogos.forEach((logo, index) => {
    logo.style.animationDelay = `${index * 0.1}s`;
  });
  
});

// ==========================================
// MODAL FUNCTIONS
// ==========================================
function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ==========================================
// UTILITY: Debounce function
// ==========================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==========================================
// PRELOADER (Optional - add to HTML if needed)
// ==========================================
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.classList.add('loaded');
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }
});
