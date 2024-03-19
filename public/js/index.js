const header = document.querySelector('.header');
const currentURL = window.location.href;

const headerTabs = header.querySelectorAll('li > a');


headerTabs.forEach(tab => {
    if (tab.href === currentURL) {
        tab.classList.add('active');
    }
});
