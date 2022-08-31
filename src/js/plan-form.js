/* form elements */
/* --- radio buttons --- */
const methodButtons = document.querySelectorAll('[data-method]');
const coffeeTypeButtons = document.querySelectorAll('[data-coffee-type]');
const quantityButtons = document.querySelectorAll('[data-quantity]');
const grindButtons = document.querySelectorAll('[data-grind]');
const frequencyButtons = document.querySelectorAll('[data-frequency]');
/* outputs */
const summaryText = document.querySelector('#summary-text');
const modalSummaryText = document.querySelector('#modal-summary-text');
/* pricing spans */
const weekPricing = document.querySelector('#week-pricing');
const twoWeekPricing = document.querySelector('#two-week-pricing');
const monthPricing = document.querySelector('#month-pricing');
/* modal */
const checkoutModal = document.querySelector('#checkout-modal');
const closeModalBtn = checkoutModal.querySelector('#modal-close-button');
const modalCheckoutPrice = checkoutModal.querySelector('#modal-checkout-price');
const modalButtonCheckoutPrice = checkoutModal.querySelector('#button-modal-checkout-price');
/* --- other --- */
const grindDetails = document.querySelector('#grind-option');
const grindDetailsSummary = grindDetails.querySelector('summary');
const planSubmitBtn = document.querySelector('#plan-creation-submit');
/* form elements end */

const SUMMARY_PLACEHOLDER = '_____';
const PRICING_DATA = {
	250: {
		week: 7.2,
		twoWeeks: 9.6,
		month: 12.0,
	},
	500: {
		week: 13.0,
		twoWeeks: 17.5,
		month: 22.0,
	},
	1000: {
		week: 22.0,
		twoWeeks: 32.0,
		month: 42.0,
	},
};

let method = '';
let coffeeType = '';
let quantity = '';
let grind = '';
let frequency = '';

/* radio buttons handling */
const handleMethodChoice = (e) => {
	method = e.target.dataset.method;
	preventCapsuleGrind(method);
	insertSummary();
};

/* handling details for grinding options using method chosen */
const preventCapsuleGrind = (method) => {
	const isCapsules = method === 'capsules';
	isCapsules ? grindDetails.removeAttribute('open') : null; // hide grind details if capsules chosen
	grindDetails.setAttribute('aria-disabled', isCapsules);
	grindDetails.toggleAttribute('data-disabled', isCapsules); // disabled styles for grind details accordion
	grindDetailsSummary.tabIndex = isCapsules ? -1 : 0; // prevent from tabbing if disabled
};

const handleCoffeeTypeChoice = (e) => {
	coffeeType = e.target.dataset.coffeeType;
	insertSummary();
};

const handleQuantityChoice = (e) => {
	quantity = e.target.dataset.quantity;
	insertPricingData(quantity);
	insertSummary();
};

/* inserting pricings into frequency details radio buttons */
const insertPricingData = (quantity) => {
	const { week, twoWeeks, month } = PRICING_DATA[quantity];
	weekPricing.innerText = `$${week.toFixed(2)}`;
	twoWeekPricing.innerText = `$${twoWeeks.toFixed(2)}`;
	monthPricing.innerText = `$${month.toFixed(2)}`;
};

const handleGrindChoice = (e) => {
	grind = e.target.dataset.grind;
	insertSummary();
};

const handleFrequencyChoice = (e) => {
	frequency = e.target.dataset.frequency;
	insertSummary();
};

const radioButtonHandler = (e, handler) => {
	handler(e);
	handleSubmitBtnActivation();
};

/* summary text creation */
const insertSummary = () => {
	summaryText.innerHTML = createSummary();
};

const insertModalSummary = () => {
	modalSummaryText.innerHTML = createSummary();
};

const createSummary = () => {
	const methodText = createMethodPart();
	const coffeeTypeText = createCoffeTypePart();
	const quantityText = createQuantityPart();
	const grindText = createGrindPart();
	const frequencyText = createFrequencyPart();

	return `“I drink coffee ${methodText}, with a ${coffeeTypeText} type of bean. ${quantityText}, ${grindText}sent to me ${frequencyText}.”`;
};

const createMethodPart = () => {
	if (method === '') return createSpan();
	const joinWord = method === 'capsules' ? 'using' : 'as';
	return `${joinWord} ${createSpan(method)}`;
};

const createCoffeTypePart = () => {
	const type = coffeeType || SUMMARY_PLACEHOLDER;
	return createSpan(type);
};

const createQuantityPart = () => {
	if (quantity === '') return createSpan();
	const quantityText = `${quantity}g`;
	return createSpan(quantityText);
};

const createGrindPart = () => {
	if (method === 'capsules') return '';
	const grindText = `ground ala ${grind ? createSpan(grind) : createSpan()}, `;
	return grindText;
};

const createFrequencyPart = () => {
	if (frequency === '') return createSpan();
	const frequencyText = `every ${frequency}`;
	return createSpan(frequencyText);
};

const createSpan = (text = SUMMARY_PLACEHOLDER) => {
	return `<span>${text}</span>`;
};

/* submit button activation */
const handleSubmitBtnActivation = () => {
	const methodChosen = method !== '';
	const coffeeTypeChosen = coffeeType !== '';
	const quantityChosen = quantity !== '';
	const grindChosen = method !== 'capsules' ? grind !== '' : true;
	const frequencyChosen = frequency !== '';
	const shouldActivate = methodChosen && coffeeTypeChosen && quantityChosen && grindChosen && frequencyChosen;
	planSubmitBtn.toggleAttribute('disabled', !shouldActivate);
};

/* submit button handling */
const handleSubmitBtn = (e) => {
	e.preventDefault();
	showModal();
	insertCheckoutPrice();
};

const insertCheckoutPrice = () => {
	const checkoutPrice = calculatePrice();
	modalCheckoutPrice.innerText = `$${checkoutPrice}/month`;
	modalButtonCheckoutPrice.innerText = `$${checkoutPrice}/mo`;
};

const calculatePrice = () => {
	switch (frequency) {
		case 'week':
			return (4 * PRICING_DATA[quantity].week).toFixed(2);
		case '2 weeks':
			return (2 * PRICING_DATA[quantity].twoWeeks).toFixed(2);
		case 'month':
			return (1 * PRICING_DATA[quantity].month).toFixed(2);
		default:
			return '0.00';
	}
};

/* modal handling */
const showModal = () => {
	checkoutModal.classList.add('visible');
	document.body.classList.add('modal-dropshadow');
	insertModalSummary();
	closeModalBtn.focus();
};

const closeModal = () => {
	checkoutModal.classList.remove('visible');
	document.body.classList.remove('modal-dropshadow');
};

/* radio buttons handlers */
methodButtons.forEach((button) => button.addEventListener('click', (e) => radioButtonHandler(e, handleMethodChoice)));
coffeeTypeButtons.forEach((button) =>
	button.addEventListener('click', (e) => radioButtonHandler(e, handleCoffeeTypeChoice))
);
quantityButtons.forEach((button) =>
	button.addEventListener('click', (e) => radioButtonHandler(e, handleQuantityChoice))
);
grindButtons.forEach((button) => button.addEventListener('click', (e) => radioButtonHandler(e, handleGrindChoice)));
frequencyButtons.forEach((button) =>
	button.addEventListener('click', (e) => radioButtonHandler(e, handleFrequencyChoice))
);

/* grind details handling */
grindDetailsSummary.addEventListener('click', (e) => {
	e.preventDefault();
	if (grindDetails.hasAttribute('data-disabled')) return;
	grindDetails.open = !grindDetails.open;
});

/* submit button */
planSubmitBtn.addEventListener('click', handleSubmitBtn);
/* modal */
closeModalBtn.addEventListener('click', closeModal);
