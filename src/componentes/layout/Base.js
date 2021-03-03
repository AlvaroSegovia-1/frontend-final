import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import './Base.css';

const { Header, Content, Footer } = Layout;

function Base({ children, title, ...props }) {
	return (
		<Layout className='layout'>
			<Header>
				<div className='logo' />
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={[
						'2'
					]}>
					<Menu.Item key='1'>nav 1</Menu.Item>
					<Menu.Item key='2'>nav 2</Menu.Item>
					<Menu.Item key='3'>nav 3</Menu.Item>
				</Menu>
			</Header>
			<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<div className='site-layout-content'>
					{children}
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				Ant Design ©2018 Created by Ant UED
			</Footer>
		</Layout>
	);
}

export default Base;
