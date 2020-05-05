const form = document.querySelector('.form');
const input = document.querySelector('.input');
const watermark = document.querySelector('.watermark');
const weatherNum = document.querySelector('.weather-num');
const toggle = document.querySelector('.toggle');
const spinner = document.querySelector('.spinner');
const error = document.querySelector('.error');

// Constant
const KELVIN = 273.15;

let isFahrentheit = false;
form.addEventListener('submit', (ev) => {
	ev.preventDefault();
	if (input.value === '') return;
	fetchWeather();
	form.reset();
});

input.addEventListener('keyup', ({ target }) => {
	watermark.textContent = target.value;
});

toggle.addEventListener('click', () => {
	if (!isFahrentheit) {
		const result = convertToFahrenheit(weatherNum.firstChild.data);
		renderFahrenheit(result);
		isFahrentheit = true;
	}
});

async function fetchWeather() {
	let data;
	const { value } = input;

	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=4f0d63d4a1e956fac34b08a7b0c9667f`,
		{
			mode: 'cors',
		},
	);

	if (response.status === 200) {
		data = await response.json();
		renderCelsius(data);
		spinner.classList.remove('spinner-active');
		error.textContent = '';
	} else {
		weatherNum.textContent = '';
		spinner.classList.add('spinner-active');
		setTimeout(() => {
			spinner.classList.remove('spinner-active');
			error.textContent = 'Request failed. Please try again.';
		}, 4000);
	}
}

function renderCelsius({ main: { temp } }) {
	const tempCelcius = Math.floor(Number(temp) - KELVIN);
	weatherNum.textContent = tempCelcius;
}

function renderFahrenheit(data) {
	weatherNum.textContent = data;
}

function convertToFahrenheit(tempCelcius) {
	const tempFahrenheit = (Number(tempCelcius) * 9) / 5 + 32;
	isFahrentheit = true;
	return tempFahrenheit;
}
