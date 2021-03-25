import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Person from '@material-ui/icons/Person';
import DeleteUser from './DeleteUser';
import auth from './../auth/auth-helper';
import { readuser } from '../../API/api-user';
import { Redirect, Link } from 'react-router-dom';
import {
	/* Skeleton, */
	Typography,
	Divider,
	Avatar
} from 'antd';

const useStyles = makeStyles((theme) => ({
	root: theme.mixins.gutters({
		maxWidth: 600,
		margin: 'auto',
		padding: theme.spacing(3),
		marginTop: theme.spacing(5)
	}),
	title: {
		margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
		color: theme.palette.protectedTitle
	},
	stripe_connect: {
		marginRight: '10px'
	},
	stripe_connected: {
		verticalAlign: 'super',
		marginRight: '10px'
	}
}));

export default function Profile({ match }) {
	const classes = useStyles();
	const [
		user,
		setUser
	] = useState({});
	const [
		redirectToSignin,
		setRedirectToSignin
	] = useState(false);

	useEffect(
		() => {
			const jwt = auth.isAuthenticated();
			const abortController = new AbortController();
			const signal = abortController.signal;
			readuser(
				{
					userId: match.params.userId
				},
				{ t: jwt.token },
				signal
			).then((data) => {
				if (data && data.error) {
					setRedirectToSignin(true);
				}
				else {
					setUser(data);
				}
			});

			return function cleanup() {
				abortController.abort();
			};
		},
		[
			match.params.userId
		]
	);

	if (redirectToSignin) {
		return <Redirect to='/signin' />;
	}
	return (
		<Paper className={classes.root} elevation={4}>
			<Typography variant='h1' className={classes.title}>
				Perfil
			</Typography>
			<List dense>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<Person />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={user.name}
						secondary={user.email}
					/>{' '}
					{auth.isAuthenticated().user &&
					auth.isAuthenticated().user._id === user._id && (
						<ListItemSecondaryAction>
							<Link to={'/user/edit/' + user._id}>
								<IconButton
									aria-label='Edit'
									color='primary'>
									<Edit />
								</IconButton>
							</Link>
							<DeleteUser userId={user._id} />
						</ListItemSecondaryAction>
					)}
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText
						primary={
							'Joined: ' +
							new Date(user.created).toDateString()
						}
					/>
				</ListItem>
			</List>
		</Paper>
	);
}
