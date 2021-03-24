import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import '../layout/Card.css';

export default function SignBase({ onbasein, onbaseup }) {
	return (
		<div className='container'>
			<br />
			<h1>¡Bienvenido a WallaRock!</h1>
			<p>Registrate o inicia sesión</p>
			<br />
			<div className='container-buttons'>
				<Button
					shape='round'
					style={{
						background: '#3b5998',
						color: 'white'
					}}>
					Entrar con Facebook
				</Button>

				<Button
					shape='round'
					style={{
						background: '#db4437',
						color: 'white'
					}}>
					Entrar con Google
				</Button>

			</div>

			<br />
			{/* <p>o continua con tu email</p> */}

			<p>
				<Button as={Link} onClick={() => onbasein()}>
					Inicia sesión{' '}
				</Button>
				{`|`}
				<Button as={Link} onClick={() => onbaseup()}>
					Registrate
				</Button>
			</p>
		</div>
	);
}
