import '../layout/Card.css';
import {
	Form,
	Input,
	Typography,
	Button,
	Card
} from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import auth from './../auth/auth-helper';

import { signin, email } from '../../API/api-auth.js';
import Icon from '@material-ui/core/Icon';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
};

const Signin = ({ onSignin, onsingup }) => {
	const history = useHistory();

	const [
		values,
		setValues
	] = useState({
		email: '',
		password: '',
		error: ''
	});

	const couldSubmit = () => {
		return values.email && values.password;
	};

	const clickSubmit = () => {
		const user = {
			email: values.email || undefined,
			password: values.password || undefined
		};
		email(user);
		signin(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			}
			else {
				onSignin && onSignin();
				auth.authenticate(data, () => {
					setValues({
						...values,
						error: ''
					});

					history.push(`/user/${data.user._id}/product`);
				});
			}
		});
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	return (
		<div className='site-card-border-less-wrapper'>
			<Card
				title='¡Bienvenido de nuevo!'
				bordered={false}
				style={({ width: 300 }, { padding: 30 })}>
				<Form>
					<Form.Item
						id='email'
						value={values.email}
						onChange={handleChange('email')}>
						<Input
							size='large'
							placeholder='Dirección de email'
							prefix={<UserOutlined />}
						/>
					</Form.Item>

					<Form.Item
						id='password'
						value={values.password}
						onChange={handleChange('password')}>
						<Input.Password
							size='large'
							placeholder='Contraseña'
						/>
					</Form.Item>

					<Form.Item {...tailLayout}>
						{values.error && (
							<Typography component='p' color='error'>
								<Icon color='error'>error</Icon>
								{values.error}
							</Typography>
						)}
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button
							type='primary'
							htmlType='submit'
							disabled={!couldSubmit()}
							onClick={clickSubmit}
							shape='round'
							size='large'>
							Iniciar sesión
						</Button>
					</Form.Item>
				</Form>

				<Button as={Link}>Recuperar contraseña </Button>

				{/* {` |`}
				<Button as={Link} onClick={() => onsingup()}>
					Registrate
				</Button> */}
			</Card>
		</div>
	);
};

export default Signin;
