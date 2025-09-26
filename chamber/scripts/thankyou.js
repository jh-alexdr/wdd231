// Get URL parameters and display required form data only
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);

    // Display required personal information
    const firstName = urlParams.get('first-name') || 'Not provided';
    const lastName = urlParams.get('last-name') || 'Not provided';
    const email = urlParams.get('email') || 'Not provided';
    const phone = urlParams.get('phone') || 'Not provided';

    // Display required organization information
    const orgName = urlParams.get('org-name') || 'Not provided';

    // Display the information
    document.getElementById('applicant-name').textContent = `${firstName} ${lastName}`;
    document.getElementById('email-display').textContent = email;
    document.getElementById('phone-display').textContent = phone;
    document.getElementById('org-name-display').textContent = orgName;

    // Format and display timestamp (required hidden field)
    const timestamp = urlParams.get('timestamp');
    if (timestamp) {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('timestamp-display').textContent = formattedDate;
    } else {
        document.getElementById('timestamp-display').textContent = 'Not available';
    }

    // Hide non-required fields from display
    const orgTitleRow = document.querySelector('#org-title-display').parentElement;
    const membershipRow = document.querySelector('#membership-display').parentElement;

    if (orgTitleRow) orgTitleRow.style.display = 'none';
    if (membershipRow) membershipRow.style.display = 'none';
});