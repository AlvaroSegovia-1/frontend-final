import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Products from '../productos/Products';

import { listLatest } from '../../API/api-product';

import Suggestions from '../productos/Suggestions';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: 30
	}
}));

export default function Home({ history }) {
	console.log(history.location.state);

	const classes = useStyles();

	const [
		productos,
		setProductos
	] = useState([]);

	const [
		suggestions,
		setSuggestions
	] = useState([]);

	useEffect(
		() => {
			const info = history.location.state;

			if (info) {
				setProductos(info);
			}
			else {
				console.log(info);
			}
		},
		[
			history.location.state
		]
	);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		listLatest(signal).then((data) => {
			if (data.error) {
				console.log(data.error);
			}
			else {
				setSuggestions(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

	return (
		<div className={classes.root}>
			<Products products={productos} />
			<Suggestions products={suggestions} />
		</div>
	);
}
