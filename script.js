const langMenu = document.querySelector('.lang-menu');
const selectedLang = document.getElementById('selectedLang');
const dropdown = document.querySelector('.lang-dropdown');


// Open / close language dropdown
selectedLang.addEventListener('click', function (event) {
    event.stopPropagation();
    langMenu.classList.toggle('active');
});


// Select a language
dropdown.addEventListener('click', function (event) {
    const link = event.target.closest('a');

    if (!link) return;

    event.preventDefault();
    event.stopPropagation();

    const selectedCode = link.dataset.lang;

    // Update the selected language at the top
    const selectedItem = link.parentElement;

    // Move the selected language to the top of the dropdown
    dropdown.prepend(selectedItem);

    // Update the language shown in the navigation
    const flag = selectedItem.querySelector('.lang-flag');
    const text = selectedItem.querySelector('.lang-text');

    selectedLang.innerHTML = `
        <span class="lang-flag ${flag.classList[1]}"></span>
        <span class="lang-text">${selectedCode === 'en' ? 'EN' :
                                  selectedCode === 'id' ? 'ID' :
                                  selectedCode === 'de' ? 'DE' :
                                  selectedCode === 'zh' ? '中文' :
                                  selectedCode === 'ja' ? '日本語' : selectedCode}</span>
    `;

    // Close dropdown
    langMenu.classList.remove('active');

    /*
     * Your existing language-changing code can go here.
     *
     * For example:
     * changeLanguage(selectedCode);
     */
});


// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    if (!langMenu.contains(event.target)) {
        langMenu.classList.remove('active');
    }
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
    document.getElementById('ageDisplay').textContent =": " + age;
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


const indicator = document.getElementById("statusIndicator");

/*
|--------------------------------------------------------------------------
| Placeholder
|--------------------------------------------------------------------------
| Later this value will come from your Google Calendar backend.
|
| Available values:
|   "online"
|   "busy"
|   "offline"
|--------------------------------------------------------------------------
*/

const portfolioStatus = "online";

updateStatus(portfolioStatus);

function updateStatus(status) {
    indicator.className = `status-indicator ${status}`;

    switch (status) {
        case "online":
            indicator.title = "Available";
            break;

        case "busy":
            indicator.title = "Busy";
            break;

        case "offline":
            indicator.title = "Offline";
            break;
    }
}


document.querySelectorAll(".nav-item[data-target]").forEach(item => {
    item.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.getElementById(this.dataset.target);

        document.querySelectorAll("details").forEach(detail => {
            if (detail !== target) {
                detail.open = false;
            }
        });

        target.open = true;

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});