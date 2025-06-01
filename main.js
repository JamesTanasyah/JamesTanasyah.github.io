const expandBtn = document.getElementById('expandBtn');
const profileContent = document.getElementById('profileContent');
const secondaryContent = document.getElementById('secondaryContent');

// Toggle profile expansion
expandBtn.addEventListener('click', () => {
    const isExpanding = expandBtn.textContent === 'ⓘ';
    
    if (isExpanding) {
        expandBtn.textContent = '↩';
        profileContent.classList.add('expanded');
        secondaryContent.style.display = 'none';
    } else {
        expandBtn.textContent = 'ⓘ';
        profileContent.classList.remove('expanded');
        secondaryContent.style.display = 'flex';
    }
});

// Age calculation
document.addEventListener('DOMContentLoaded', function() {
    const birthYear = 2003;
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    document.getElementById('ageDisplay').textContent = age;
});

// Scrollable cards functionality
const scrollableCards = document.getElementById('scrollableCards');
const scrollDots = document.querySelectorAll('.scroll-dot');
let currentCard = 0;

function scrollToCard(index) {
    currentCard = index;
    scrollableCards.style.transform = `translateX(-${currentCard * 100}%)`;
    
    scrollDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentCard);
    });
}

scrollDots.forEach(dot => {
    dot.addEventListener('click', () => {
        scrollToCard(parseInt(dot.dataset.index));
    });
});

// Panel toggle functionality
const leftToggle = document.getElementById('leftToggle');
const rightToggle = document.getElementById('rightToggle');
const leftPanel = document.getElementById('leftPanel');
const rightPanel = document.getElementById('rightPanel');

function togglePanel(panel) {
    panel.classList.toggle('expanded');
}

leftToggle.addEventListener('click', () => togglePanel(leftPanel));
rightToggle.addEventListener('click', () => togglePanel(rightPanel));

// Initialize
scrollToCard(0);
