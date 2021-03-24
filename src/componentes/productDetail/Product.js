import React, { useState, useEffect } from 'react';
//import { Card, Typography, Image } from 'antd';

// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { read, listRelated } from '../../API/api-product';
import { API_ROOT } from '../../API/api-config';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { EmailShareButton, EmailIcon  } from 'react-share';
import { WhatsappShareButton, WhatsappIcon  } from 'react-share';
import Moment from 'react-moment';

// import Suggestions from '../Suggestions';
// import AddToCart from '../../carro/AddToCart';

import './detailproduct.css'

/* const useStyles = makeStyles((theme) => ({
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
})); */



export default function Product({ match }) {
	console.log(match.params);

	/* const classes = useStyles(); */

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
			<>			
				<div className="pagina-fondo">
					
				 <div className="container-detail">
	  
	  
				   <div className="nav-detail">
	  
				 
							  <div className="avatar">
									<div>
									<img src="/avatar-1.jpg" alt="avatar"></img> 
									</div>
									<div className="nombre"> 
										  <div className="nombre-avatar">

										  {/* <strong>{user.name}</strong> */}

										  </div>
										  <div className="producto">
											  1 Producto
										  </div>
									</div>
							  </div>
	  
											   
	  
					 
						  <div className="">
							 <div>
							   <strong>Tipo</strong>
							 </div>
							{/* {advert.type} */}
						  </div>
	  
	  
						  <div className="">
							<div className="category">
							  <strong>Categoría</strong> 
							</div>

								{/* {product.category.map(tag => (
								  <span key={tag} >
									{tag}
								  </span>
								))} */}

						  </div>

	  
						{/*   <div >
						  <img src="/valoraciones.png" alt="logochat"></img> 
						  </div>
	  
						  <div className="chat">
							 <img src="/logo-chat.png" alt="logochat"></img> 
						  </div> */}
	  
				  </div>
								 {/* is-4by3 */}

						  <div className="ima image is-4by2">
						  		<img
								  src={imageUrl}
							   />
						  </div>
	  
	  
	  
	  
						{/* <div className="image is-4by3">
							<img
							  src={
								advert.photo.startsWith('/images')
								  ? `${advert.photo}`
								  : `${advert.photo}`
								  }
								  alt="Placeholder"
							  />
						</div> */}
							  
					<div className="texto-detalle">
						<p className="precio">{product.price} € </p>  
	  
						<h1 className="title">{product.name}</h1> 
	  
									 
	  
						<hr/> 
	  
						   <p>{product.description}</p>{' '}
	  
						<hr/>         
	  
						 <div> 
							  Subido el&nbsp;  

							  <Moment format="DD/MM/YYYY HH:mm">
								{product.createdAt} 
							  </Moment>
							  
							  </div> 
	  
						  </div>
	  
						  
	  
						 
						  <div className="container-abajo">
	  
								<div className="comparte">
								  Comparte este producto con tus amigos
								</div>
	  
								<div className="media">
									<TwitterShareButton

									/* url={`http://localhost:3001/product/${product.className.replace(
										/\s+/g, '-', )}/${product._id}`}  */

									title={product.name}
									>

									<TwitterIcon size={36} />
									</TwitterShareButton> 
								</div>
	  
								<div className="media">
								<FacebookShareButton

								  /* url={`http://localhost:3001/product/${product.name.replace(
									/\s+/g, '-', )}/${product._id}`} */

								  title={product.name}
								>
								  <FacebookIcon size={36} />
								</FacebookShareButton> 
								</div>
	  
								<div className="media">
								<EmailShareButton

								  /* url={`http://localhost:3001/product/${product.name.replace(
									/\s+/g, '-', )}/${product._id}`} */

								  title={product.name}
								>
								  <EmailIcon size={36} />
								</EmailShareButton> 
								</div>
	  
								<div className="media">
								<WhatsappShareButton

								  /* url={`http://localhost:3001/product/${product.name.replace(
									/\s+/g, '-', )}/${product._id}`} */

								  title={product.name}
								>
								  <WhatsappIcon size={36} />
								</WhatsappShareButton> 
								</div>
	  	  
						  </div>

		 
					</div>
	  
				</div>
			  
			</>
		  );







	/* return (
		<div className={classes.root}>

			<Grid container spacing={10}>
				<Grid item xs={7} sm={7}>
					<Card className={classes.card} elevation={10}>
						<Card
							subheader={

									product.quantity > 0 ? 'Con stock' :
									'Sin existencias'
							}
							action={
								<span className={classes.action}>
									<AddToCart
										cartStyle={classes.addCart}
										item={product}
									/>
								</span>
							}
						/>
						<div className={classes.flex}>
							<Image width={400} src={imageUrl} />
							<Card
								className={classes.media}
								image={imageUrl}
								title={product.name}
							/>
							<Typography component='p' variant='subtitle1'>
								{product.description}
								<br />
								<span className={classes.price}>
									{product.price} €
								</span>
							</Typography>
						</div>
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
	); */




}
