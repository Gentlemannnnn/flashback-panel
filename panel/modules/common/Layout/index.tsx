import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Navbar from 'components/Navbar';
import React from 'react';

const PageContainer = styled(Box)({
	display: 'flex',
	width: '100%',
	height: '100%',
	justifyContent: 'start',
	alignItems: 'center',
	gap: '10px',
	flexDirection: 'column',
});

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
	<PageContainer>
		<Navbar username="aaron" />
		{children}
	</PageContainer>
);

export default Layout;
