// This file handles the functionality for the responsive navigation menu

document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.getElementById('nav-button');
    const navBar = document.getElementById('nav-bar');
    navButton.addEventListener('click', () => {
        navBar.classList.toggle('open');
    });
});