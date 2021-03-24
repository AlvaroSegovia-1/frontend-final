import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import ViewIcon from '@material-ui/icons/Visibility';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { API_ROOT } from '../../API/api-config';

import './suggestions.css'

const useStyles = makeStyles((theme) => ({

	root: theme.mixins.gutters({
		padding: theme.spacing(1),
		paddingBottom: 24,
		backgroundColor: '#80808024',
		with: '60%'
	}),

/* 	title: {
		margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
		color: theme.palette.openTitle,
		fontSize: '1.1em'
	}, */


	viewButton: {
		verticalAlign: 'middle'
	},

/* 	card: {
		width: '100%',
		display: 'inline-flex',
		position: 'center'
		marginTop:'20px'
		
	} */ 

	details: {
		display: 'inline-block',
		width: '100%'
	},
	content: {
		flex: '1 0 auto',
		padding: '16px 8px 0px'
	},
	cover: {
		width: '30%',
		height: 190,
		margin: '18px'
	},
	controls: {
		marginTop: '8px'
	},
	date: {
		color: 'rgba(0, 0, 0, 0.4)'
	},
	icon: {
		verticalAlign: 'sub'
	},
	iconButton: {
		width: '28px',
		height: '28px'
	},
	productTitle: {
		fontSize: '1.15em',
		marginBottom: '5px'
	},
	subheading: {
		color: 'rgba(88, 114, 128, 0.67)'
	},
	actions: {
		float: 'right',
		marginRight: '6px'
	},
	price: {
		display: 'inline',
		lineHeight: '3',
		paddingLeft: '8px',
		color: theme.palette.text.secondary
	}
}));

export default function Suggestions(props) {
	const classes = useStyles();

	return (
	<div>
		<Paper className="tarjeta" elevation={10}>

				<div className="titulo">
					Ultimos Productos en WallaRock
				</div>

				{props.products.map((item, i) => {
					
					return (
						<span key={i}>
							<div className="tarje-pequeña">

								{/* <div className="image is-4by3"> */}
								<CardMedia
									className={classes.cover}
									image={`${API_ROOT}/api/product/image/${item._id}`}
									/* alt="foto" */
									/* title={item.name} */
								/>

							{/* 	</div> */}

								
								<div className={classes.details}>
									
									<CardContent className={classes.content}>
																				
										{/* <Link to={'/product/' + item._id}>
										</Link>	 */}

										<div className="precio-2">
											{item.price} €
										</div>

											<div className="nombre"
											>
												{/*  variant='h3'
												component='h3'
												color='primary'  */}

												{item.name}

											</div>

										

										<div className="descripcion"
										>

										{item.name}

										</div>

										
										
										<div className="fecha"
											/* component='p' */
											>
											Agregado{' '}
											{new Date(
												item.created
											).toDateString()}
										</div>

									</CardContent>


									<div className={classes.controls}>
										
										


										
										<span className={classes.actions}>
											<Link to={'/product/' + item._id}>
												
												<IconButton color='secondary'>
													<ViewIcon
														className={classes.iconButton}
													/>
												</IconButton>
											</Link>
											
										</span>
									</div>
								</div>
							</div>

							<Divider />

						</span>
					);
				})}
			</Paper>
		</div>
	);
}

Suggestions.propTypes = {
	products: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired
};
