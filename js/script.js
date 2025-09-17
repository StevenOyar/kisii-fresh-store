// Cart functionality
let cart = [];
let cartCount = 0;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupLoadingScreen();
    setupHeaderScroll();
    setupMobileMenu();
    setupProductFilters();
    setupCartFunctionality();
    setupContactForm();
    setupNewsletterForm();
    setupScrollAnimations();
    setupBackToTop();
    setupQuickView();
}

// Loading screen functionality
function setupLoadingScreen() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 150);
            }
        }, 150);
    });
}

// Header scroll effect
function setupHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        const backToTop = document.getElementById('back-to-top');
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            if (backToTop) {
                backToTop.style.display = 'flex';
            }
        } else {
            header.classList.remove('scrolled');
            if (backToTop) {
                backToTop.style.display = 'none';
            }
        }
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

    if (mobileMenuToggle && mobileMenuOverlay) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuOverlay.style.display = 'flex';
            setTimeout(() => {
                mobileMenuOverlay.classList.add('active');
            }, 10);
        });
    }

    if (closeMobileMenuBtn) {
        closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when clicking on overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Close mobile menu when clicking navigation links
    const mobileNavLinks = document.querySelectorAll('.mobile-navigation a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function closeMobileMenu() {
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        setTimeout(() => {
            mobileMenuOverlay.style.display = 'none';
        }, 300);
    }
}

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back to top button
function setupBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }
}

// Product filtering 
function setupProductFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Cart 
function setupCartFunctionality() {
    const productForms = document.querySelectorAll('.product-form');
    
    productForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPriceText = productCard.querySelector('.product-price').textContent;
            const productPrice = parseFloat(productPriceText.replace('Ksh. ', ''));
            const quantity = parseInt(this.querySelector('select').value);
            
            if (quantity && quantity > 0 && quantity <= 5) {
                addToCart(productName, productPrice, quantity);
            } else {
                showToast('Please contact us for orders above 5 Kg', 'info');
            }
        });
    });
}

function addToCart(productName, price, quantity) {
    const totalPrice = price * quantity;
    
    cart.push({
        name: productName,
        price: price,
        quantity: quantity,
        total: totalPrice
    });
    
    cartCount += quantity;
    updateCartDisplay();
    
    // Add animation to cart icon
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.classList.add('cart-bounce');
        setTimeout(() => {
            cartIcon.classList.remove('cart-bounce');
        }, 600);
    }
    
    showToast(`Added ${quantity}kg of ${productName} to cart!`, 'success');
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Quick view 
function setupQuickView() {
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            showQuickView(productName, productPrice, productImage);
        });
    });
}

function showQuickView(name, price, image) {
    const modal = document.getElementById('quick-view-modal');
    const quickViewContent = document.getElementById('quick-view-content');
    
    if (modal && quickViewContent) {
        quickViewContent.innerHTML = `
            <div class="quick-view-product">
                <img src="${image}" alt="${name}" class="quick-view-image" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                <div class="quick-view-details">
                    <h3 style="color: rgb(2, 39, 125); margin-bottom: 0.5rem;">${name}</h3>
                    <p style="font-size: 1.3rem; font-weight: 700; color: rgb(30, 27, 27); margin-bottom: 1rem;">${price}</p>
                    <p style="color: #666; margin-bottom: 1.5rem;">Fresh, high-quality produce directly from local farms in Kisii County.</p>
                    <div class="quick-view-actions" style="display: flex; gap: 1rem; align-items: center;">
                        <select class="quick-view-quantity" style="padding: 0.5rem; border: 1px solid green; border-radius: 4px;">
                            <option value="1">1 Kg</option>
                            <option value="2">2 Kg</option>
                            <option value="3">3 Kg</option>
                            <option value="4">4 Kg</option>
                            <option value="5">5 Kg</option>
                        </select>
                        <button onclick="addToCartFromQuickView('${name}', ${parseFloat(price.replace('Ksh. ', ''))})" 
                                style="background: green; color: white; padding: 0.8rem 1.5rem; border: none; border-radius: 4px; font-weight: 600; cursor: pointer;">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function addToCartFromQuickView(productName, price) {
    const quantitySelect = document.querySelector('.quick-view-quantity');
    const quantity = parseInt(quantitySelect.value);
    
    addToCart(productName, price, quantity);
    closeQuickView();
}

function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Setup modal close functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-close')) {
        closeQuickView();
    }
    
    // Close modal when clicking on overlay
    if (e.target.classList.contains('modal')) {
        closeQuickView();
    }
});

// Contact form validation and submission
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitContactForm(e);
        });
    }
}

function submitContactForm(event) {
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone') ? formData.get('phone').trim() : '';
    const message = formData.get('message').trim();
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => {
        if (el) el.textContent = '';
    });
    
    // Validate name
    if (name.length < 2) {
        const nameError = document.getElementById('name-error');
        if (nameError) nameError.textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Validate email
    if (!isValidEmail(email)) {
        const emailError = document.getElementById('email-error');
        if (emailError) emailError.textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    // Validate phon
    if (phone && !isValidPhone(phone)) {
        const phoneError = document.getElementById('phone-error');
        if (phoneError) phoneError.textContent = 'Please enter a valid phone number';
        isValid = false;
    }
    
    // Validate message
    if (message.length < 10) {
        const messageError = document.getElementById('message-error');
        if (messageError) messageError.textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const submitBtn = form.querySelector('.submit-button');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            if (btnText) btnText.style.display = 'inline';
            if (btnLoading) btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            const successMessage = document.getElementById('success-message');
            if (successMessage) successMessage.style.display = 'block';
            form.reset();
            
            showToast('Message sent successfully!', 'success');
            
            setTimeout(() => {
                if (successMessage) successMessage.style.display = 'none';
            }, 5000);
        }, 2000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\-\(\)\s]{10,}$/;
    return phoneRegex.test(phone);
}



// Toast notifications
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Scroll animations using Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for stats counter animation
                if (entry.target.querySelector('.stat-number')) {
                    animateStats(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.fade-in, .slide-up, .product-card, .stat-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Animate statistics numbers
function animateStats(statsContainer) {
    const statNumbers = statsContainer.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const duration = 2000; // 2 seconds
        const increment = finalValue / (duration / 16); // 60fps
        let currentValue = 0;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(counter);
            }
            stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('%') ? '%' : '+');
        }, 16);
    });
}

// Smooth scrolling for all internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            closeMobileMenu(); // Close mobile menu if open
        }
    }
});

// Handle button click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        e.preventDefault();
        scrollToSection('items');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modals and overlays with Escape key
    if (e.key === 'Escape') {
        closeQuickView();
        closeMobileMenu();
    }
    
    // Navigate with arrow keys in product grid
    if (e.target.classList.contains('product-card') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        const productCards = Array.from(document.querySelectorAll('.product-card'));
        const currentIndex = productCards.indexOf(e.target);
        let nextIndex;
        
        if (e.key === 'ArrowLeft') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : productCards.length - 1;
        } else {
            nextIndex = currentIndex < productCards.length - 1 ? currentIndex + 1 : 0;
        }
        
        productCards[nextIndex].focus();
    }
});

// Make product cards focusable for keyboard navigation
document.querySelectorAll('.product-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const quickViewBtn = this.querySelector('.quick-view-btn');
            if (quickViewBtn) {
                quickViewBtn.click();
            }
        }
    });
});

// Debounced scroll handler
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

// debounced version
window.removeEventListener('scroll', setupHeaderScroll);
window.addEventListener('scroll', debounce(function() {
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        if (backToTop) backToTop.style.display = 'flex';
    } else {
        header.classList.remove('scrolled');
        if (backToTop) backToTop.style.display = 'none';
    }
}, 10));

// Newsletter subscription
function setupNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                showToast('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            } else {
                showToast('Please enter a valid email address', 'error');
            }
        });
    });
}

// Console log for debugging
console.log('Kisii Fresh website loaded successfully!');
