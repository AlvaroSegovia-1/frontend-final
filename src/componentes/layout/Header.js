import React, { useState } from 'react';
import {
	Avatar,
	Button,
	Col,
	Divider,
	Row,
	Input,
	Space,
	Image
} from 'antd';

import { Modal } from 'react-responsive-modal';
import Signin from '../auth/Signin';
import Signup from '../usuario/Signup';
import SignBase from '../auth/SignBase';
import { list } from '../../API/api-product';
import Products from '../productos/Products';
import auth from '../auth/auth-helper';
import 'antd/dist/antd.css';
/* import './Base.css'; */
import './header.css';
import 'react-responsive-modal/styles.css';

import {
	PlusOutlined,
	UserOutlined,
	S,
	AppstoreAddOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Header() {
	const history = useHistory();
	const { Search } = Input;

	const [
		values,
		setValues
	] = useState({
		category: '',
		search: '',
		results: [],
		searched: false
	});

	const handleChange = (name) => (event) => {
		const info = event.target.value;
		console.log(info);
		setValues({
			...values,
			[name]: event.target.value
		});
		history.push({
			path: '/'
		});
	};
	const search = () => {
		console.log(values.search);
		if (values.search) {
			list({
				search: values.search,
				category: values.category
			}).then((data) => {
				if (data.error) {
					console.log(data);
				}
				else {
					setValues({
						...values,
						results: data,
						searched: true
					});
				}
				history.push({
					pathname: '/',
					state: data
				});
			});
		}
	};

	const enterKey = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			console.log('pase por aca');
			search();
		}
	};
	const [
		signbase,
		setSignbase
	] = React.useState(false);

	const [
		signin,
		setSignin
	] = React.useState(false);

	const [
		signup,
		setSignup
	] = React.useState(false);

	const [
		open,
		setOpen
	] = React.useState(false);

	const handleNuevoProducto = () => {

			!auth.isAuthenticated() ? handleClickOpen() :
			history.push(`/product`);
	};

	const handleProfile = () => {
		const jwt = auth.isAuthenticated();
		const id = jwt.user._id;
		history.push(`/user/${id}`);
	};

	const handleClickOpen = () => {
		setSignbase(true);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSignup(false);
		setSignin(false);
	};

	const handleSignin = () => {
		setOpen(false);
		setSignup(false);
		setSignin(false);
	};

	const handleSignup = () => {
		setSignup(true);
		setSignin(false);
		setSignbase(false);
	};

	const handleSign = () => {
		setSignup(false);
		setSignin(true);
		setSignbase(false);
	};

	const handleMyProducts = () => {
		const jwt = auth.isAuthenticated();
		const id = jwt.user._id;
		history.push(`/user/${id}/product`);
	};

	const handleHome = () => {
		history.push('/');
	};

	return (
		<div className='bajo-navbar'>
			<navbar className='navbar'>

									
					<Col flex='auto' >
						<a href='#' onClick={handleHome}>
							<img 
								className="logo2"
								width={180}
								src='./Logo-wallarock-2.png'
								flex='auto'
								/* preview={false} */
							/>
						</a>
					</Col>

					<Col  flex='auto' >
						{' '}
						<br />
					</Col>
					
					<Col flex='auto' >
						<Search
							onKeyDown={enterKey}
							onChange={handleChange('search')}
							placeholder='Busca un articulo'
							onSearch={search}
							enterButton
							type='danger'
							color='red'
							className='logo'

						/>
					</a>
				</Col>

				<Col flex='auto'>
					{' '}
					<br />
				</Col>

				<Col flex='auto'>
					<Search
						onKeyDown={enterKey}
						onChange={handleChange('search')}
						placeholder='Busca un articulo'
						onSearch={search}
						enterButton
						type='danger'
						color='red'
						className='logo'
					/>
				</Col>

				<Col flex='auto' className='bot-subir'>
					<Button
						className='logo'
						icon={<PlusOutlined />}
						type='danger'
						shape='round'
						onClick={handleNuevoProducto}
						style={{ float: 'right' }}>
						Subir Producto
					</Button>
				</Col>

				{auth.isAuthenticated() && (
					<Col flex='auto'>
						<Link
							className='red'
							onClick={handleMyProducts}>
							<Avatar icon={<AppstoreAddOutlined />} /> Mis
							Productos
						</Link>
					</Col>
				)}

				{auth.isAuthenticated() && (
					<Col flex='auto'>
						<Link className='red' onClick={handleProfile}>
							<Avatar icon={<UserOutlined />} /> Mi Cuenta
						</Link>
					</Col>
				)}

				{
					!auth.isAuthenticated() ? <Col flex='auto'>
						<Button
							style={{ float: 'right' }}
							shape='round'
							onClick={handleClickOpen}>
							Regístrate o inicia sesión
						</Button>
					</Col> :
					<Col className='bot-cerrar'>
						<Button
							danger
							type='dashed'
							style={{ float: 'right' }}
							shape='round'
							onClick={() => {
								handleSignin();
								auth.clearJWT(() => history.push('/'));
							}}>
							Cerrar Sesión
						</Button>
					</Col>}
			</navbar>

			<Divider className='divider' />
			<Divider className='divider' />

			<Modal open={open} onClose={handleClose}>
				{signbase && (
					<SignBase
						onbasein={handleSign}
						onbaseup={handleSignup}
					/>
				)}
				{signin && (
					<Signin
						onSignin={handleSignin}
						onsingup={handleSignup}
					/>
				)}
				{signup && <Signup onSign={handleSign} />}
			</Modal>
		</div>
	);
}
