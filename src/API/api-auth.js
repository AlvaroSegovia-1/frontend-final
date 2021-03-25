import { API_ROOT } from './api-config';

const email = async (user) => {
	try {
		let response = await fetch(`${API_ROOT}/auth/email/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(user)
		});
		return await response.json();
	} catch (err) {}
};

const forgotPWD = async (user) => {
	try {
		let response = await fetch(
			`${API_ROOT}/auth/forgotPassword/`,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(user)
			}
		);
		return await response.json();
	} catch (err) {}
};

const signin = async (user) => {
	try {
		let response = await fetch(`${API_ROOT}/auth/signin/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(user)
		});
		return await response.json();
	} catch (err) {}
};

const signout = async () => {
	try {
		let response = await fetch(
			`${API_ROOT}/auth/signout/`,
			{
				method: 'GET'
			}
		);
		return await response.json();
	} catch (err) {}
};

export { email, forgotPWD, signin, signout };
