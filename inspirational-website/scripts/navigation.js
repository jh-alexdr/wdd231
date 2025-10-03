// This file manages the navigation menu, ensuring smooth transitions between pages.

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetPage = this.getAttribute('href');

            // Smooth scroll to the target page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Load the target page content
            loadPage(targetPage);
        });
    });

    function loadPage(page) {
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                document.querySelector('main').innerHTML = html;
                window.history.pushState({ page: page }, '', page);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    window.onpopstate = function(event) {
        if (event.state) {
            loadPage(event.state.page);
        }
    };
});