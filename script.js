// Grab all the navigation links
const navLinks = document.querySelectorAll('.nav-link');
// Grab all the page content elements
const pages = document.querySelectorAll('.page-content');

// 1. Listen for clicks on the header navigation menu
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        
        // Get the target page id from the custom 'data-page' attribute
        const targetPage = this.getAttribute('data-page');
        
        navigateTo(targetPage);
    });
});

// 2. The core navigation engine function
function navigateTo(pageId) {
    // Loop through all pages and hide them, then show the matching page
    pages.forEach(page => {
        page.classList.remove('active-page');
        if (page.id === `page-${pageId}`) {
            page.classList.add('active-page');
        }
    });

    // Loop through links and update which one looks "active" (underlined)
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Scroll smoothly back to the top of the new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
