const btnEl = document.getElementById('get-name');

btnEl.addEventListener('click', fetchData);

function fetchData() {
	fetch('https://randomuser.me/api/')
		.then((res) => res.json())
		.then((data) => {
			const user = data.results[0];
			const {
				name: { title, first, last },
				email,
				dob: { age },
				phone,
				location: { city, state, country },
				gender,
			} = user;

			const div_element = document.createElement('div');
			div_element.setAttribute('class', 'user-content');

			let output = `<ul>
					<li class='name'> ${title} ${first} ${last}</li>
					<li class='email'>${email}</li>
					<li class='age'>Age: ${age} years old</li>
					<li class='gender'>Gender: ${gender}</li>
					<li class='phone'>Phone: ${phone}</li>
					<li class='location'>Location: ${country}</li>
				</ul>`;

			div_element.innerHTML = output;

			document.querySelector('.container').append(div_element);
		});
}

btnEl.addEventListener('dblclick', fetchJsonData);

let output2 = '';
function fetchJsonData() {
	fetch('https://jsonplaceholder.typicode.com/photos')
		.then((response) => response.json())
		.then((data) => {
			for (let i = 0; i < 20; i++) {
				const { url } = data[i];
				output2 += `<img src='${url}' width='222' height='222'>`;
			}
			document.querySelector('.container').innerHTML = output2;
		});
}

document.getElementById('form-el').addEventListener('submit', sendForm);

function sendForm(event) {
	event.preventDefault();

	const titleValue = document.getElementById('title').value;
	const bodyValue = document.getElementById('body').value;

	if (titleValue && bodyValue) {
		fetch('https://jsonplaceholder.typicode.com/photos', {
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ title: titleValue, body: bodyValue }),
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	}
}
