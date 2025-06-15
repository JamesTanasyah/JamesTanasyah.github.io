const expandBtn = document.getElementById('expandBtn');
const profileContent = document.getElementById('profileContent');
const secondaryContent = document.getElementById('secondaryContent');

document.addEventListener('DOMContentLoaded', function() {
    const langMenu = document.querySelector('.lang-menu');
    const selectedLang = document.getElementById('selectedLang');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-dropdown a');
    const rightPanel = document.getElementById('rightPanel');
    
    // Toggle dropdown on click
    langMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Close all other dropdowns first
        document.querySelectorAll('.lang-menu.active').forEach(menu => {
            if (menu !== langMenu) menu.classList.remove('active');
        });
        
        langMenu.classList.toggle('active');
        
        // Position dropdown based on panel state
        if (rightPanel.classList.contains('expanded')) {
            langDropdown.style.left = 'calc(100vw - 70px)';
        } else {
            langDropdown.style.left = 'calc(100vw - 35px)';
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        langMenu.classList.remove('active');
    });
    
    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            const flagClass = this.querySelector('.lang-flag').className;
            const langText = this.querySelector('.lang-text').textContent;
            
            // Update selected language display
            selectedLang.innerHTML = `
                <span class="${flagClass}"></span>
                <span class="lang-text">${lang.toUpperCase()}</span>
            `;
            
            // Here you would change the site language
            console.log('Language changed to:', lang);
            
            // Close dropdown
            langMenu.classList.remove('active');
        });
    });
    
    // Adjust on window resize
    window.addEventListener('resize', function() {
        if (langMenu.classList.contains('active')) {
            langMenu.click(); // Close and reopen to reposition
            langMenu.click();
        }
    });
});

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
