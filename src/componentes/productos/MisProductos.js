import React, { useState, useEffect } from 'react';
import auth from '../auth/auth-helper';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider } from 'antd';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { listByShop } from '../../API/api-product';
import DeleteProduct from '../productos/DeleteProduct';
import { API_ROOT } from '../../API/api-config';
import { Typography } from 'antd';
const useStyles = makeStyles((theme) => ({
	products: {
		padding: '24px'
	},
	addButton: {
		float: 'right'
	},
	leftIcon: {
		marginRight: '8px'
	},
	title: {
		margin: theme.spacing(2),
		color: theme.palette.protectedTitle,
		fontSize: '1.2em'
	},
	subheading: {
		marginTop: theme.spacing(2),
		color: theme.palette.openTitle
	},
	cover: {
		width: 110,
		height: 100,
		margin: '8px'
	},
	details: {
		padding: '10px'
	}
}));

export default function MisProductos(props) {
	const classes = useStyles();
	const [
		products,
		setProducts
	] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		const jwt = auth.isAuthenticated();
		const id = jwt.user._id;

		listByShop(
			{
				userId: id
			},
			signal
		).then((data) => {
			if (data.error) {
			}
			else {
				setProducts(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	const removeProduct = (product) => {
		const updatedProducts = [
			...products
		];
		const index = updatedProducts.indexOf(product);
		updatedProducts.splice(index, 1);
		setProducts(updatedProducts);
	};

	return (
		<Card className={classes.products}>
			<Typography type='headline' component='h3'>
				Tus productos
			</Typography>
			<Typography type='headline' component='h7'>
				Aquí podrás subir productos, gestionar los que ya
				tienes.
			</Typography>
			<span className={classes.addButton}>
				<Link to={'/product'}>
					<Button
						icon={<PlusOutlined />}
						type='primary'
						shape='round'>
						Subir Producto
					</Button>
				</Link>
			</span>
			<br />
			<List>
				{products.map((product, i) => {
					return (
						<span key={i}>
							<ListItem>
								<CardMedia
									className={classes.cover}
									image={`${API_ROOT}/api/product/image/${product._id}`}
								/>
								<div className={classes.details}>
									<Typography
										type='headline'
										component='h3'>
										{product.name}
									</Typography>
									<Typography
										type='subheading'
										component='h5'>
										{' '}
										Precio: {product.price} €
									</Typography>
								</div>
								<ListItemSecondaryAction>
									<Link to={`/product/${product._id}/edit`}>
										<IconButton
											aria-label='Edit'
											color='primary'>
											<Edit />
										</IconButton>
									</Link>
									<DeleteProduct
										product={product}
										userId={props.userId}
										onRemove={removeProduct}
									/>
								</ListItemSecondaryAction>
							</ListItem>
							<Divider />
						</span>
					);
				})}
			</List>
		</Card>
	);
}
MisProductos.propTypes = {
	userId: PropTypes.string.isRequired
};
