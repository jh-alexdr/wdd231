document.addEventListener('DOMContentLoaded', () => {
    // Visitor message logic
    const visitorMessage = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('chamberDiscoverLastVisit');
    const now = Date.now();
    let message = '';
    if (!lastVisit) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const diff = now - parseInt(lastVisit, 10);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (diff < 1000 * 60 * 60 * 24) {
            message = 'Back so soon! Awesome!';
        } else {
            message = `You last visited ${days} day${days === 1 ? '' : 's'} ago.`;
        }
    }
    visitorMessage.textContent = message;
    localStorage.setItem('chamberDiscoverLastVisit', now.toString());

    // Load cards from JSON
    fetch('data/discover.json')
        .then(response => response.json())
        .then(data => {
            const grid = document.getElementById('discover-grid');
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'discover-card';
                card.innerHTML = `
          <h2>${item.name}</h2>
          <figure>
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button class="learn-more">Learn more</button>
        `;
                grid.appendChild(card);
            });
        });
});
