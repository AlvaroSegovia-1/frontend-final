import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import auth from '../auth/auth-helper';
import { read } from '../../API/api-product';
import { readuser } from '../../API/api-user';
import { email } from '../../API/api-auth.js';
import { API_ROOT } from '../../API/api-config';
import {
	TwitterShareButton,
	TwitterIcon
} from 'react-share';
import {
	FacebookShareButton,
	FacebookIcon
} from 'react-share';

import {
	WhatsappShareButton,
	WhatsappIcon
} from 'react-share';
import Moment from 'react-moment';

import './detailproduct.css';

export default function Product({ match }) {
	const jwt = auth.isAuthenticated();
	const userlogged = jwt.user;

	const handleButton = (info) => (event) => {
		if (info.owner !== null) {
			const abortController = new AbortController();
			const signal = abortController.signal;

			readuser(
				{
					userId: info.owner._id
				},
				{ t: jwt.token },
				signal
			).then((data) => {
				info.seller = `${data.name}`;
				info.mailseller = `${data.email}`;
				info.mailshopper = `${userlogged.email}`;
				info.shopper = `${userlogged.name}`;

				email(info).then((mensaje) => {
					if (mensaje) {
						setMsg(`${mensaje.message}`);
					}
				});
			});
		}
	};

	const [
		product,
		setProduct
	] = useState([]);

	const [
		error,
		setError
	] = useState('');

	const [
		msg,
		setMsg
	] = useState('');

	useEffect(
		() => {
			const abortController = new AbortController();
			const signal = abortController.signal;

			read(
				{ productId: match.params.productId },
				signal
			).then((data) => {
				if (data.error) {
					setError(data.error);
				}
				else {
					setProduct(data);
				}
			});
			return function cleanup() {
				abortController.abort();
			};
		},
		[
			match.params.productId
		]
	);

	const imageUrl =
		product._id ? `${API_ROOT}/api/product/image/${product._id}` :
		`${API_ROOT}/api/product/defaultphoto`;

	return (
		<div className='pagina-fondo'>
			<div className='container-detail'>
				<div className='nav-detail'>
					<div className='avatar'>
						<div>
							<img src='/avatar-1.jpg' alt='avatar' />
						</div>
						<div className='nombre-detalle'>
							<div className='nombre-avatar' />
							<div className='producto'>1 Producto</div>
						</div>
					</div>

					<div className=''>
						<div>
							<strong>Tipo</strong>
						</div>
					</div>

					<div className=''>
						<div className='category'>
							<strong>Categoría</strong>
						</div>
					</div>
				</div>

				<div className='ima image is-4by2'>
					<img src={imageUrl} />
				</div>

				<div className='texto-detalle'>
					<p className='precio-2'>{product.price} € </p>
					<h1 className='title'>{product.name}</h1>
					<hr />
					<p>{product.description}</p> <hr />
					<div>
						Subido el&nbsp;
						<Moment format='DD/MM/YYYY HH:mm'>
							{product.createdAt}
						</Moment>
					</div>
				</div>

				<div className='container-abajo'>
					<div className='comparte'>
						Comparte este producto con tus amigos
					</div>

					<div className='media'>
						<TwitterShareButton
							url={`http://localhost:3001/product/${product._id}`}
							title={product.name}>
							<TwitterIcon size={36} />
						</TwitterShareButton>
					</div>

					<div className='media'>
						<FacebookShareButton
							url={`http://localhost:3001/product/${product._id}`}
							title={product.name}>
							<FacebookIcon size={36} />
						</FacebookShareButton>
					</div>

					<div className='media'>
						<WhatsappShareButton
							url={`http://localhost:3001/product/${product._id}`}
							title={product.name}>
							<WhatsappIcon size={36} />
						</WhatsappShareButton>
					</div>
					<div className='media'>
						{auth.isAuthenticated() && (
							<Button
								style={{ float: 'right' }}
								shape='round'
								onClick={handleButton(product)}>
								enviar mis datos al vendedor
							</Button>
						)}
						<br />
						<br />
						<p>{msg}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
