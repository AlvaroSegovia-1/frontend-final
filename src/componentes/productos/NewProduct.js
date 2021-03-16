import React, { useState } from 'react';
import auth from '../auth/auth-helper';
import Icon from '@material-ui/core/Icon';
import { create } from '../../API/api-product';
import { Link, Redirect } from 'react-router-dom';
import {
	InputNumber,
	Button,
	Form,
	Select,
	Input,
	Typography,
	Space
} from 'antd';

export default function NewProduct({ match }) {
	const [
		values,
		setValues
	] = useState({
		name: '',
		description: '',
		image: '',
		category: '',
		quantity: 1,
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
	console.log(id);
	const handleChange = (name) => (event) => {
		console.log(event);
		const value =

				name === 'price' ? event :
				name === 'category' ? event :
				name === 'image' ? event.target.files[0] :
				event.target.value;
		setValues({ ...values, [name]: value });
	};
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

		create(
			{
				userId: id
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
				setValues({ ...values, error: '', redirect: true });
			}
		});
	};

	if (values.redirect) {
		return (
			<Redirect
				to={'/seller/shop/edit/' + match.params.userId}
			/>
		);
	}
	return (
		<div>
			<Form layout='vertical'>
				<Typography type='headline' component='h5'>
					INFORMACIÓN DE TU PRODUCTO
				</Typography>
				<Form.Item
					id='name'
					label='Qué estas vendiendo?'
					value={values.name}
					onChange={handleChange('name')}>
					<Input
						size='large'
						placeholder='En pocas palabras'
					/>
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
							id='category'
							value={values.estado}
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
				</Space>
				<Form.Item
					label='Description'
					rows='2'
					value={values.description}
					onChange={handleChange('description')}>
					<TextArea
						size='large'
						placeholder='Añade informacion relevante como estado, modelo, color...'
						rows={4}
					/>
				</Form.Item>
				<Form.Item label='Subir imagen'>
					<Space align='center'>
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
						<br />
						{values.error && (
							<Typography component='p' color='error'>
								<Icon color='error'>error</Icon>
								{values.error}
							</Typography>
						)}
					</Space>
				</Form.Item>
				<br />
				<br />
				<Space>
					<Form.Item {...tailLayout}>
						<Button
							type='primary'
							variant='contained'
							onClick={clickSubmit}>
							Enviar
						</Button>
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Link
							to={
								'/seller/shop/edit/' + match.params.userId
							}>
							<Button variant='contained'>Cancelar</Button>
						</Link>
					</Form.Item>
				</Space>
			</Form>
		</div>
	);
}
