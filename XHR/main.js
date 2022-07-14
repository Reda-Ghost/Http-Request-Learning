// Result Content
const userContent = document.querySelector('.user-content');
const usersResult = document.querySelector('.all-user-content');
const githubUsersResult = document.querySelector('.github-user-content');

// Buttons
const userBtn = document.getElementById('get-user');
const allUsersBtn = document.getElementById('get-all');
const githubBtn = document.getElementById('get-github-users');

userBtn.addEventListener('click', getUserInfo);
allUsersBtn.addEventListener('click', getAllUserInfo);
githubBtn.addEventListener('click', getGithubUsers);

function getUserInfo() {
	const xhr = new XMLHttpRequest();

	xhr.onload = function () {
		if (this.status === 200) {
			const data = JSON.parse(this.responseText);
			const userOne = data[0];

			let result = '';

			for (const prop in userOne) {
				if (Object.hasOwnProperty.call(userOne, prop)) {
					const element = userOne[prop];
					result += `<li>${prop}: ${element}</li>`;
				}
			}
			userContent.innerHTML = `<ul> ${result} </ul>`;
		}
	};

	xhr.open('Get', 'data.json', true);
	xhr.send();
}

function getAllUserInfo() {
	const xhr = new XMLHttpRequest();

	xhr.onload = function () {
		if (this.status === 200) {
			const data = JSON.parse(this.responseText);

			let result = '';

			for (let i = 0; i < data.length; i++) {
				result += `<ul> 
					<li>Id: ${data[i].id}</li>
					<li>Name: ${data[i].name}</li>
					<li>Email: ${data[i].email}</li>
				</ul>`;
			}

			usersResult.innerHTML = result;
		}
	};

	xhr.open('Get', 'data.json', true);
	xhr.send();
}

function getGithubUsers() {
	const xhr = new XMLHttpRequest();

	xhr.onload = function () {
		if (this.status === 200) {
			const data = JSON.parse(this.responseText);

			let result = '';

			for (let i = 0; i < data.length; i++) {
				result += `<ul> 
					<li>Id: ${data[i].id}</li>
					<li>Name: ${data[i].login}</li>
					<li>
						<img src='${data[i].avatar_url}' class='responsive-img'>
					</li>
				</ul>`;
			}

			githubUsersResult.innerHTML = result;
		}
	};

	xhr.open('Get', 'https://api.github.com/users', true);
	xhr.send();
}
