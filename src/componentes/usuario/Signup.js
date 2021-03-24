import '../layout/Card.css';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Icon from '@material-ui/core/Icon';

import { create } from '../../API/api-user';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle
			disableTypography
			className={classes.root}
			{...other}>
			<Typography variant='h6'>{children}</Typography>
			{
				onClose ? <IconButton
					aria-label='close'
					className={classes.closeButton}
					onClick={onClose}>
					<CloseIcon />
				</IconButton> :
				null}
		</MuiDialogTitle>
	);
});
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
};

export default function Signup({ onSign }) {
	const [
		values,
		setValues
	] = useState({
		name: '',
		password: '',
		email: '',
		open: false,
		error: ''
	});

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const couldSubmit = () => {
		return values.name && values.email && values.password;
	};

	const clickSubmit = () => {
		const user = {
			name: values.name || undefined,
			email: values.email || undefined,
			password: values.password || undefined
		};
		create(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			}
			else {
				setValues({ ...values, error: '', open: true });
			}
		});
	};
	return (
		<div>
			<Card
				title='Regístrate en WallaRock'
				bordered={false}
				style={({ width: 300 }, { padding: 30 })}>
				<Form.Item
					id='name'
					value={values.name}
					onChange={handleChange('name')}>
					<Input
						size='large'
						placeholder='Nombre y apellidos'
						prefix={<UserOutlined />}
					/>
				</Form.Item>

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
						onClick={clickSubmit}>
						Crear una cuenta
					</Button>

				{/* 	<Button as={Link} onClick={() => onSign()}>
						Sign In
					</Button> */}

				</Form.Item>
			</Card>

			<Dialog
				open={values.open}
				disableBackdropClick={true}>
				<DialogTitle>Nueva Cuenta</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Cuenta creada.
					</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button
						color='primary'
						autoFocus='autoFocus'
						variant='contained'
						onClick={() => onSign()}>
						Sign in
					</Button>
				</DialogActions>

			</Dialog>
		</div>
	);
}
