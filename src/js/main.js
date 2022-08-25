let toggleBtn;
let primaryNav;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	toggleBtn = document.querySelector('.toggle-btn');
	primaryNav = document.querySelector('#primary-nav');
};

const prepareDOMEvents = () => {
	toggleBtn.addEventListener('click', handleToggleBtn);
};

const handleToggleBtn = () => {
	toggleBtn.toggleAttribute('data-expanded');
	const expanded = toggleBtn.hasAttribute('data-expanded');
	primaryNav.toggleAttribute('data-expanded', expanded);
	toggleBtn.setAttribute('aria-expanded', expanded);
};

document.addEventListener('DOMContentLoaded', main);
