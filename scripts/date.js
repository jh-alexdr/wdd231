// This file dynamically generates and displays the current date in the footer.
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Set last modified
    document.getElementById('lastModified').textContent =
        'Last Modification: ' + document.lastModified;
});