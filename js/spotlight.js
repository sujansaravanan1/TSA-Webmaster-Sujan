/* ============================================
   SPOTLIGHT SECTION - JavaScript
   Scroll animations + scroll-to-resource linking
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // --- Scroll-triggered fade-in for spotlight cards ---
    const spotlightCards = document.querySelectorAll('.spotlight-card');

    if (spotlightCards.length > 0) {
        const spotlightObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    spotlightObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px'
        });

        spotlightCards.forEach(function (card) {
            spotlightObserver.observe(card);
        });
    }
});

/**
 * Scrolls down to the resource directory and highlights the matching card.
 * Called from the "View in Directory" buttons in the spotlight section.
 *
 * @param {string} resourceTitle - The exact title of the resource to find
 */
function scrollToResource(resourceTitle) {
    // First, reset category filter to "All" so the card is visible
    var allBtn = document.querySelector('.category-btn[data-category="all"]');
    if (allBtn && !allBtn.classList.contains('active')) {
        allBtn.click();
    }

    // Clear search input
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
        // Trigger the input event so the filter resets
        searchInput.dispatchEvent(new Event('input'));
    }

    // Wait a tick for the DOM to re-render after filter reset
    setTimeout(function () {
        // Find the card with the matching title
        var cards = document.querySelectorAll('.resource-card');
        var targetCard = null;

        cards.forEach(function (card) {
            var title = card.querySelector('.card-title');
            if (title && title.textContent.trim() === resourceTitle) {
                targetCard = card;
            }
        });

        if (targetCard) {
            // Scroll to the card with offset for the fixed navbar
            var offset = targetCard.getBoundingClientRect().top + window.pageYOffset - 120;
            window.scrollTo({ top: offset, behavior: 'smooth' });

            // Highlight the card briefly
            targetCard.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
            targetCard.style.boxShadow = '0 0 0 4px rgba(109, 140, 95, 0.5), 0 12px 45px rgba(74, 103, 65, 0.2)';
            targetCard.style.borderColor = '#6d8c5f';

            // Also expand the card details
            var expandLink = targetCard.querySelector('.card-link');
            var expandedContent = targetCard.querySelector('.card-expanded-content');
            if (expandedContent && !expandedContent.classList.contains('active')) {
                expandLink.click();
            }

            // Remove highlight after 3 seconds
            setTimeout(function () {
                targetCard.style.boxShadow = '';
                targetCard.style.borderColor = '';
            }, 3000);
        }
    }, 150);
}