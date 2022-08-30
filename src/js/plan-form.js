/* form elements */
/* --- radio buttons --- */
const methodButtons = document.querySelectorAll('[data-method]');
const coffeeTypeButtons = document.querySelectorAll('[data-coffee-type]');
const quantityButtons = document.querySelectorAll('[data-quantity]');
const grindButtons = document.querySelectorAll('[data-grind]');
const frequencyButtons = document.querySelectorAll('[data-frequency]');
/* outputs */
const methodOutput = document.querySelector('#method-output');
const joinWord = document.querySelector('#join-word');
const coffeeTypeOutput = document.querySelector('#coffee-type-output');
const quantityOutput = document.querySelector('#quantity-output');
const grindPartOutput = document.querySelector('#grind-part-output');
const grindOutput = document.querySelector('#grind-output');
const frequencyOutput = document.querySelector('#frequency-output');

/* pricing spans */
const weekPricing = document.querySelector('#week-pricing');
const twoWeekPricing = document.querySelector('#two-week-pricing');
const monthPricing = document.querySelector('#month-pricing');
/* --- other --- */
const grindDetails = document.querySelector('#grind-option');
const grindDetailsSummary = grindDetails.querySelector('summary');
const planSubmitBtn = document.querySelector('#plan-creation-submit');
/* form elements end */

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
	joinWord.innerText = method === 'capsules' ? 'using' : 'as';
	methodOutput.innerText = method;
	preventCapsuleGrind(method);
};

/* handling details for grinding options using method chosen */
const preventCapsuleGrind = (method) => {
	const isCapsules = method === 'capsules';
	isCapsules ? grindDetails.removeAttribute('open') : null; // hide grind details if capsules chosen
	grindDetails.setAttribute('aria-disabled', isCapsules);
	grindDetails.toggleAttribute('data-disabled', isCapsules); // disabled styles for grind details accordion
	grindDetailsSummary.tabIndex = isCapsules ? -1 : 0; // prevent from tabbing if disabled
	grindPartOutput.toggleAttribute('data-hidden', isCapsules); // hide 'ground ala' text from summary
	grindOutput.toggleAttribute('data-hidden', isCapsules); // hide grind output from summary
};

const handleCoffeeTypeChoice = (e) => {
	coffeeType = e.target.dataset.coffeeType;
	coffeeTypeOutput.innerText = coffeeType;
};

const handleQuantityChoice = (e) => {
	quantity = e.target.dataset.quantity;
	quantityOutput.innerText = `${quantity}g`;
	insertPricingData(quantity);
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
	grindOutput.innerText = grind;
};

const handleFrequencyChoice = (e) => {
	frequency = e.target.dataset.frequency;
	frequencyOutput.innerText = `every ${frequency}`;
};

const radioButtonHandler = (e, handler) => {
	handler(e);
	handleSubmitBtnActivation();
};

const handleSubmitBtnActivation = () => {
	const methodChosen = method !== '';
	const coffeeTypeChosen = coffeeType !== '';
	const quantityChosen = quantity !== '';
	const grindChosen = method !== 'capsules' ? grind !== '' : true;
	const frequencyChosen = frequency !== '';
	const shouldActivate = methodChosen && coffeeTypeChosen && quantityChosen && grindChosen && frequencyChosen;
	planSubmitBtn.toggleAttribute('disabled', !shouldActivate);
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
