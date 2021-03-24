import React, { useEffect, useState } from 'react';
import {
	InputNumber,
	Button,
	Form,
	Select,
	Input,
	Typography,
	Space
} from 'antd';

import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import auth from './../auth/auth-helper';

import { makeStyles } from '@material-ui/core/styles';

import { read, update } from '../../API/api-product';
import { Link, Redirect } from 'react-router-dom';

import './nuevoproducto.css'

const useStyles = makeStyles((theme) => ({
	card: {
		margin: 'auto',
		textAlign: 'center',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
		maxWidth: 500,
		paddingBottom: theme.spacing(2)
	},
	title: {
		margin: theme.spacing(2),
		color: theme.palette.protectedTitle,
		fontSize: '1.2em'
	},
	error: {
		verticalAlign: 'middle'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 400
	},
	submit: {
		margin: 'auto',
		marginBottom: theme.spacing(2)
	},
	bigAvatar: {
		width: 60,
		height: 60,
		margin: 'auto'
	},
	input: {
		display: 'none'
	},
	filename: {
		marginLeft: '10px'
	}
}));

export default function EditProduct({ match }) {
	const classes = useStyles();
	const [
		values,
		setValues
	] = useState({
		name: '',
		description: '',
		image: '',
		category: '',
		quantity: '',
		price: '',
		redirect: false,
		error: ''
	});

	const { Option } = Select;
	const { TextArea } = Input;
	const tailLayout = {
		wrapperCol: {
			offset: 8,
			span: 16
		}
	};

	const jwt = auth.isAuthenticated();
	const id = jwt.user._id;
	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		read(
			{
				productId: match.params.productId
			},
			signal
		).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			}
			else {
				setValues({
					...values,
					id: data._id,
					name: data.name,
					description: data.description,
					category: data.category,
					quantity: data.quantity,
					price: data.price
				});
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);
	const clickSubmit = () => {
		let productData = new FormData();
		values.name && productData.append('name', values.name);
		values.description &&
			productData.append('description', values.description);
		values.image &&
			productData.append('image', values.image);
		values.category &&
			productData.append('category', values.category);
		values.quantity &&
			productData.append('quantity', values.quantity);
		values.price &&
			productData.append('price', values.price);

		update(
			{
				userId: id,
				productId: match.params.productId
			},
			{
				t: jwt.token
			},
			productData
		).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			}
			else {
				setValues({ ...values, redirect: true });
			}
		});
	};
	const handleChange = (name) => (event) => {
		const value =

				name === 'price' ? event :
				name === 'category' ? event :
				name === 'image' ? event.target.files[0] :
				event.target.value;
		setValues({ ...values, [name]: value });
	};
	const imageUrl =
		values.id ? `/api/product/image/${values.id}?${new Date().getTime()}` :
		'/api/product/defaultphoto';
	if (values.redirect) {
		return <Redirect to={`/user/${id}/product`} />;
	}
	return (
		<div className="subir-producto">
			<Form layout='vertical'>
				<Typography
					type='headline'
					component='h3'
					className={classes.title}>
					Editar producto
				</Typography>
				
				<Form.Item
					id='name'
					label='Qué estas vendiendo?'
					onChange={handleChange('name')}>
					<Input size='large' value={values.name} />
				</Form.Item>
				
				<Space>
					<Form.Item label='Categoría'>
						<Select
							id='category'
							value={values.category}
							defaultValue='Escoge un estado'
							onChange={handleChange('category')}
							style={{ width: 200 }}>
							<Option value='Coches'>Coches</Option>
							<Option value='Motos'>Motos</Option>
							<Option value='Motor y Accesorios'>
								Motor y Accesorios
							</Option>
							<Option value='Moda y Accesorios'>
								Moda y Accesorios
							</Option>
							<Option value='Inmobiliaria'>
								Inmobiliaria
							</Option>
							<Option value='TV, Audio y Foto'>
								TV, Audio y Foto
							</Option>
						</Select>
					</Form.Item>
					<Form.Item
						id='price'
						label='Precio'
						type='number'
						margin='normal'>
						<InputNumber
							min={0}
							max={10000000}
							value={values.price}
							onChange={handleChange('price')}
						/>
					</Form.Item>
					<Form.Item
						id='price'
						label='Moneda'
						type='number'
						margin='normal'>
						<Typography prefix='￥' suffix='RMB'>
							€ Euro
						</Typography>
					</Form.Item>
					<br />
					<Form.Item label='Estado'>
						<Select
							id='estado'
							value={values.estado}
							style={{ width: 200 }}>
							<Option value='Nuevo'>Nuevo</Option>
							<Option value='Como Nuevo'>Como Nuevo</Option>
							<Option value='En buen estado'>
								En buen estado
							</Option>
							<Option value='En condiciones aceptables'>
								En condiciones aceptables
							</Option>
							<Option value='Lo ha dado todo'>
								Lo ha dado todo
							</Option>
						</Select>
					</Form.Item>
				</Space>
				<Form.Item
					label='Description'
					rows='2'
					onChange={handleChange('description')}>
					<TextArea
						size='large'
						rows={3}
						value={values.description}
					/>
				</Form.Item>
				<Form.Item label='Cambiar imagen'>
					<Space align='center'>
						<br />
						<Avatar
							src={imageUrl}
							className={classes.bigAvatar}
						/>
						<br />
						<input
							accept='image/*'
							onChange={handleChange('image')}
							id='icon-button-file'
							type='file'
						/>
						<label />{' '}
						<span>
							{
								values.image ? values.image.name :
								''}
						</span>
					</Space>
				</Form.Item>
				
				<Space align='center'>
					{values.error && (
						<Typography component='p' color='error'>
							<Icon color='error' className={classes.error}>
								error
							</Icon>
							{values.error}
						</Typography>
					)}
				</Space>
				<Space>
					<Form.Item {...tailLayout}>
						<Button
							type='primary'
							shape='round'
							onClick={clickSubmit}>
							Enviar
						</Button>
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Link to={'/user/' + id + '/product'}>
							<Button shape='round'>Cancelar</Button>
						</Link>
					</Form.Item>
				</Space>
			</Form>
		</div>
	);
}
