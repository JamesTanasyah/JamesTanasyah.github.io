document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progressBar');
    
    let lastScroll = 0;
    const ribbon = document.getElementById('ribbon');
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    window.addEventListener('scroll', function() {
        updateProgressBar();
        handleRibbonVisibility();
        updateActiveNavLink();
    });
    
    window.addEventListener('mousemove', function(e) {
        if (e.clientY < 50) {
            ribbon.classList.remove('hidden');
        }
    });
    
    initTypewriterEffect();
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    function updateProgressBar() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollProgress + '%';
    }
    
    function handleRibbonVisibility() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            ribbon.classList.remove('hidden');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            ribbon.classList.add('hidden');
        } else {
            // Scrolling up
            ribbon.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    }
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    function initTypewriterEffect() {
        typewriterElements.forEach(el => {
            // Save the original HTML structure
            const originalHtml = el.innerHTML;
            // Get just the text content (without HTML tags)
            const textContent = el.textContent;
            // Clear the element
            el.innerHTML = '';
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < textContent.length) {
                    // Reconstruct the HTML up to the current character
                    let reconstructedHtml = '';
                    let charCount = 0;
                    let insideTag = false;
                    let currentTag = '';
                    
                    // Process the original HTML character by character
                    for (let j = 0; j < originalHtml.length; j++) {
                        const char = originalHtml[j];
                        
                        if (char === '<') {
                            insideTag = true;
                            currentTag = char;
                        } else if (char === '>') {
                            insideTag = false;
                            currentTag += char;
                            reconstructedHtml += currentTag;
                            currentTag = '';
                        } else if (insideTag) {
                            currentTag += char;
                        } else {
                            if (charCount < i) {
                                reconstructedHtml += char;
                                charCount++;
                            } else {
                                // We've reached the current typing position
                                break;
                            }
                        }
                    }
                    
                    // Add the current character
                    if (i < textContent.length && !insideTag) {
                        reconstructedHtml += textContent[i];
                    }
                    
                    // Update the element's HTML
                    el.innerHTML = reconstructedHtml;
                    i++;
                } else {
                    // Typing complete - restore the full original HTML
                    el.innerHTML = originalHtml;
                    clearInterval(typing);
                }
            }, 50);
        });
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            message: form.querySelector('#message').value
        };
    
        fetch('https://your-serverless-function-url.com/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        })
        .catch(error => {
            alert('Error sending message: ' + error.message);
            console.error('Error:', error);
        });
    }
});