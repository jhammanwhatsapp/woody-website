/**
 * WOODY - Modern Furniture E-commerce
 * Main JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count from localStorage
    let cartCount = parseInt(localStorage.getItem('woodyCartCount') || '0');
    
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const cartCountEl = document.getElementById('cartCount');
    const cartIcon = document.getElementById('cartIcon');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    // Update cart display
    function updateCartDisplay() {
        cartCountEl.textContent = cartCount;
        localStorage.setItem('woodyCartCount', cartCount.toString());
    }
    
    // Sticky navbar on scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Add to cart functionality
    function addToCart(productName, price) {
        cartCount++;
        updateCartDisplay();
        
        // Visual feedback - briefly animate cart icon
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
        
        alert(`Item added to cart!\n\n${productName} - ₹${Number(price).toLocaleString('en-IN')}`);
    }
    
    // Mobile menu toggle
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    }
    
    // Close mobile menu when clicking a link
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
    
    // Event Listeners
    
    // Scroll event for sticky navbar
    window.addEventListener('scroll', handleScroll);
    
    // Add to Cart buttons
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productName = btn.getAttribute('data-product');
            const price = btn.getAttribute('data-price');
            addToCart(productName, price);
        });
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu on link click (smooth scroll handles navigation)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                closeMobileMenu();
            }
        });
    });
    
    // Search bar functionality (optional - basic)
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                alert(`Searching for "${query}"...\n\n(Search functionality can be enhanced with product filtering)`);
            } else {
                searchInput.focus();
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Initialize cart display on page load
    updateCartDisplay();
});
