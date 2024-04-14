let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    let scrollDirection = currentScroll > lastScrollTop ? 'down' : 'up';

    if (scrollDirection === 'down') {
        // Scroll down
        document.getElementById('site-header').classList.remove('show-header');
        document.getElementById('site-header').classList.add('hide-header');
    } else {
        // Scroll up
        document.getElementById('site-header').classList.remove('hide-header');
        document.getElementById('site-header').classList.add('show-header');
    }
    
    lastScrollTop = currentScroll;
}, false);
