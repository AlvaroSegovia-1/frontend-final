import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Image } from 'antd';
import GridList from '@material-ui/core/GridList';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from 'react-router-dom';

import { API_ROOT } from '../../API/api-config';
export default function Products(props) {
	return (
		<div>
			{
				props.products ===
				undefined ? <span className='mensaje'>
					No hay anuncios que cumplan con la busqueda
				</span> :
				props.products.length > 0 ? <div>
					<GridList cellHeight={200} cols={2}>
						{props.products.map((product, i) => (
							<Card key={i}>
								<Link to={'/product/' + product._id}>
									<Image
										width={100}
										src={`${API_ROOT}/api/product/image/${product._id}`}
										alt={product.name}
									/>
								</Link>
								<GridListTileBar
									title={
										<Link to={'/product/' + product._id}>
											{product.name}
										</Link>
									}
									subtitle={<span>{product.price} €</span>}
								/>
							</Card>
						))}
					</GridList>
				</div> :
				props.searched && (
					<Typography>No products found! :(</Typography>
				)}
		</div>
	);
}
Products.propTypes = {
	products: PropTypes.array.isRequired,
	searched: PropTypes.bool.isRequired
};
