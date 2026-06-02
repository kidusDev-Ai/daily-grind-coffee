// ================= 1. MULTI-PAGE NAVIGATION SYSTEM =================
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page-content');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPage = this.getAttribute('data-page');
        navigateTo(targetPage);
    });
});

function navigateTo(pageId) {
    pages.forEach(page => {
        page.classList.remove('active-page');
        if (page.id === `page-${pageId}`) {
            page.classList.add('active-page');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ================= 2. DEEP INTERACTIVE ORDER SYSTEM =================
// Dynamically create a Cart Modal overlay in HTML via JavaScript
const cartModal = document.createElement('div');
cartModal.id = 'cart-modal';
cartModal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.85); display: none; justify-content: center;
    align-items: center; z-index: 2000; font-family: 'Poppins', sans-serif;
`;
document.body.appendChild(cartModal);

// Make all Menu Items and Product Cards clickable for ordering
const menuItems = document.querySelectorAll('.menu-item, .product-card');

menuItems.forEach(item => {
    // Add a hover effect cursor so the user knows it's clickable
    item.style.cursor = 'pointer';
    
    item.addEventListener('click', function() {
        // Automatically extract the item name and price from the HTML text
        const itemName = this.querySelector('h3, h4').innerText;
        const itemPrice = this.querySelector('.price, .prod-price').innerText;
        
        openOrderOverlay(itemName, itemPrice);
    });
});

function openOrderOverlay(name, price) {
    cartModal.innerHTML = `
        <div style="background: #1c1a18; border: 2px solid #c5a880; padding: 40px; border-radius: 12px; max-width: 450px; width: 90%; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            <span style="color: #c5a880; font-size: 0.8rem; letter-spacing: 2px;">YOUR ORDER</span>
            <h2 style="color: #f5f5f5; margin: 15px 0 5px 0; font-size: 1.8rem;">${name}</h2>
            <p style="color: #c5a880; font-weight: bold; font-size: 1.2rem; margin-bottom: 25px;">Total: ${price}</p>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <button id="place-order-btn" style="background: #c5a880; color: #121110; border: none; padding: 14px; font-weight: bold; border-radius: 25px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px;">Confirm & Pay</button>
                <button id="close-modal-btn" style="background: transparent; color: #a6a19c; border: 1px solid #333; padding: 10px; border-radius: 25px; cursor: pointer;">Cancel</button>
            </div>
        </div>
    `;
    
    cartModal.style.display = 'flex';

    // Handle Closing the Order Window
    document.getElementById('close-modal-btn').addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Handle Simulated Successful Checkout Payment
    document.getElementById('place-order-btn').addEventListener('click', () => {
        const box = cartModal.querySelector('div');
        box.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 10px;">☕</div>
            <h2 style="color: #f5f5f5; margin-bottom: 10px;">Order Placed!</h2>
            <p style="color: #a6a19c; font-size: 0.9rem; line-height: 1.5; margin-bottom: 25px;">Your fresh batch is being prepared by our roasters. Thank you for choosing The Daily Grind!</p>
            <button id="final-close-btn" style="background: #c5a880; color: #121110; border: none; padding: 12px 30px; font-weight: bold; border-radius: 25px; cursor: pointer;">Awesome</button>
        `;
        
        document.getElementById('final-close-btn').addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    });
}
