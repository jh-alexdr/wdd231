// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Set last modified date in footer
document.getElementById('last-modified').textContent = document.lastModified;

// Mobile menu toggle functionality
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('show');

        // Update aria-expanded attribute for accessibility
        const isExpanded = navMenu.classList.contains('show');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
}

// Set timestamp when form loads (for join page)
document.addEventListener('DOMContentLoaded', function () {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Modal functionality with keyboard accessibility
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close');
    let activeModal = null;

    // Open modal when Learn More button is clicked
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            openModal(this.getAttribute('data-modal'));
        });

        // Keyboard support for buttons
        btn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(this.getAttribute('data-modal'));
            }
        });
    });

    // Function to open modal with accessibility features
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            activeModal = modal;
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');

            // Focus management - focus on close button
            const closeBtn = modal.querySelector('.close');
            if (closeBtn) {
                closeBtn.focus();
            }

            // Trap focus within modal
            trapFocus(modal);
        }
    }

    // Function to close modal
    function closeModal(modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        activeModal = null;

        // Return focus to the button that opened the modal
        const triggeredBy = document.querySelector(`[data-modal="${modal.id}"]`);
        if (triggeredBy) {
            triggeredBy.focus();
        }
    }

    // Close modal when X is clicked
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            closeModal(this.closest('.modal'));
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (activeModal && event.target === activeModal) {
            closeModal(activeModal);
        }
    });

    // Keyboard navigation for modals
    document.addEventListener('keydown', function (e) {
        if (activeModal) {
            // Close modal with Escape key
            if (e.key === 'Escape') {
                closeModal(activeModal);
            }
        }
    });

    // Focus trap function for modal accessibility
    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', function (e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab - moving backwards
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab - moving forwards
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
});

// Enhanced form validation with accessibility improvements
const joinForm = document.querySelector('.join-form');
if (joinForm) {
    // Add real-time validation feedback
    const orgTitle = document.getElementById('org-title');
    if (orgTitle) {
        orgTitle.addEventListener('blur', function () {
            validateOrgTitle(this);
        });

        orgTitle.addEventListener('input', function () {
            // Clear error state when user starts typing
            clearFieldError(this);
        });
    }

    // Form submission validation
    joinForm.addEventListener('submit', function (e) {
        let isValid = true;

        // Validate organizational title
        if (orgTitle && orgTitle.value && orgTitle.value.length < 7) {
            e.preventDefault();
            showFieldError(orgTitle, 'Organizational title must be at least 7 characters long.');
            isValid = false;
        }

        // Focus on first error field
        if (!isValid) {
            const firstError = joinForm.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
        }
    });
}

// Validation helper functions
function validateOrgTitle(field) {
    if (field.value && field.value.length < 7) {
        showFieldError(field, 'Organizational title must be at least 7 characters long.');
        return false;
    }
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');

    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add new error message
    const errorMsg = document.createElement('span');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    errorMsg.setAttribute('role', 'alert');
    field.parentNode.appendChild(errorMsg);
}

function clearFieldError(field) {
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');

    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}