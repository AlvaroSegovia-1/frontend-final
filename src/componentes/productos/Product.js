import React, { useState, useEffect } from 'react';
import { Card, Typography, Image, Button } from 'antd';
import { email } from '../../API/api-auth.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { read, listRelated } from '../../API/api-product';
import { API_ROOT } from '../../API/api-config';
import Suggestions from './Suggestions';
import auth from '../auth/auth-helper';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: 30
	},
	flex: {
		display: 'flex'
	},
	card: {
		padding: '24px 40px 40px'
	},
	subheading: {
		margin: '24px',
		color: theme.palette.openTitle
	},
	price: {
		padding: '10px',
		margin: '16px 0px',
		display: 'flex',
		backgroundColor: '#93c5ae3d',
		fontSize: '1.3em',
		color: '#375a53'
	},
	media: {
		height: 200,
		display: 'inline-block',
		width: '50%',
		marginLeft: '24px'
	},
	icon: {
		verticalAlign: 'sub'
	},
	link: {
		color: '#3e4c54b3',
		fontSize: '0.9em'
	},
	addCart: {
		width: '35px',
		height: '35px',
		padding: '10px 12px',
		borderRadius: '0.25em',
		backgroundColor: '#5f7c8b'
	},
	action: {
		margin: '8px 24px',
		display: 'inline-block'
	}
}));

export default function Product({ match }) {
	console.log(match.params);
	const jwt = auth.isAuthenticated();
	const info = jwt.user;

	const handleButton = () => {
		email(info);
	};
	const classes = useStyles();
	const [
		product,
		setProduct
	] = useState([]);
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

	const imageUrl =
		product._id ? `${API_ROOT}/api/product/image/${product._id}` :
		`${API_ROOT}/api/product/defaultphoto`;
	return (
		<div className={classes.root}>
			<Grid container spacing={10}>
				<Grid item xs={7} sm={7}>
					<Card className={classes.card} elevation={10}>
						<div className={classes.flex}>
							<Image width={200} src={imageUrl} />
							<Card
								className={classes.media}
								image={imageUrl}
								title={product.name}
							/>
							<Typography component='p' variant='subtitle1'>
								{product.description}
								<br />
								<span className={classes.price}>
									{product.owner} €
								</span>
							</Typography>
						</div>
						{auth.isAuthenticated() && (
							<Button
								style={{ float: 'right' }}
								shape='round'
								onClick={handleButton}>
								enviar mis datos al vendedor
							</Button>
						)}
					</Card>
				</Grid>
				{suggestions.length > 0 && (
					<Grid item xs={5} sm={5}>
						<Suggestions
							products={suggestions}
							title='Related Products'
						/>
					</Grid>
				)}
			</Grid>
		</div>
	);
}
