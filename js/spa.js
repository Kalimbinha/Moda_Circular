const routes = {
    'feed': 'index..html',
    'profile': 'pages/profile.html',
    'settings': 'pages/settings.html',
    'saved': 'pages/saved.html'
};

function getMainContainer() {
    return document.querySelector('.main-content') || document.getElementById('spa-main');
}

function setActiveLink(href) {
    document.querySelectorAll('.side-link, .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && href && link.getAttribute('href').includes(href)) {
            link.classList.add('active');
        }
    });
}

function showLoader() {
    const main = getMainContainer();
    if (main) {
        main.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:300px;"><div class="loader"></div></div>';
    }
}

function loadPage(page) {
    showLoader();
    let url = routes[page] || routes['feed'];
    fetch(url)
        .then(res => res.text())
        .then(html => {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            let content = temp.querySelector('.main-content') || temp.querySelector('.profile-container') || temp.querySelector('.settings-container');
            const main = getMainContainer();
            if (main && content) {
                main.innerHTML = content.outerHTML;
                window.scrollTo({top:0,behavior:'smooth'});
                if(page === 'feed' && window.initFeedPage) window.initFeedPage();
                if(page === 'profile' && window.initProfilePage) window.initProfilePage();
                if(page === 'settings' && window.initSettingsPage) window.initSettingsPage();
                if(page === 'saved' && window.initSavedPage) window.initSavedPage();
            }
        });
}

function handleSpaNavigation(e) {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href && (href.includes('profile.html') || href.includes('settings.html') || href.includes('index..html') || href.includes('saved.html'))) {
        e.preventDefault();
        if (href.includes('profile')) loadPage('profile');
        else if (href.includes('settings')) loadPage('settings');
        else if (href.includes('saved')) loadPage('saved');
        else loadPage('feed');
        setActiveLink(href);
        history.pushState({page: href}, '', href);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', handleSpaNavigation);
    window.addEventListener('popstate', (e) => {
        const page = (e.state && e.state.page) || 'index..html';
        if (page.includes('profile')) loadPage('profile');
        else if (page.includes('settings')) loadPage('settings');
        else if (page.includes('saved')) loadPage('saved');
        else loadPage('feed');
    });
});

// Loader CSS
const style = document.createElement('style');
style.textContent = `
.loader {
  border: 6px solid #232526;
  border-top: 6px solid #1a73e8;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(style); 