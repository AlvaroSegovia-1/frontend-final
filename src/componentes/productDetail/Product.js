import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import auth from '../auth/auth-helper';
import { read, listRelated } from '../../API/api-product';
// import { read } from '../../API/api-user';
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
import { EmailShareButton, EmailIcon } from 'react-share';
import {
	WhatsappShareButton,
	WhatsappIcon
} from 'react-share';
import Moment from 'react-moment';

import './detailproduct.css';

export default function Product({ match }) {
	console.log(match.params);
	console.log(match.params);
	const jwt = auth.isAuthenticated();
	const info = jwt.user;

	const handleButton = (info) => (event) => {
		console.log(info._id);

		const abortController = new AbortController();
		const signal = abortController.signal;

		read({ userId: info._id }, signal).then((data) => {
			console.log(data);
		});
	};

	const [
		product,
		setProduct
	] = useState({ shop: {} });
	const [
		suggestions,
		setSuggestions
	] = useState([]);
	const [
		error,
		setError
	] = useState('');

	useEffect(
		() => {
			const abortController = new AbortController();
			const signal = abortController.signal;

			read(
				{ productId: match.params.productId },
				signal
			).then((data) => {
				console.log(data);
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

	useEffect(
		() => {
			const abortController = new AbortController();
			const signal = abortController.signal;

			listRelated(
				{
					productId: match.params.productId
				},
				signal
			).then((data) => {
				if (data.error) {
					setError(data.error);
				}
				else {
					setSuggestions(data);
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


		product.owner === null ? console.log(null) :
		console.log(product.owner);

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
						{product.owner !== null && (
							<Button
								style={{ float: 'right' }}
								shape='round'
								onClick={handleButton(product.owner)}>
								enviar mis datos al vendedor
							</Button>
						)}
					</div>

					<div className='media'>
						<WhatsappShareButton
							url={`http://localhost:3001/product/${product._id}`}
							title={product.name}>
							<WhatsappIcon size={36} />
						</WhatsappShareButton>
					</div>
				</div>
			</div>
		</div>
	);
}
