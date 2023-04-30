import { useUser } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Navbar from 'components/Navbar/navbar';
import Sidebar from 'components/Navbar/sidebar';
import React from 'react';

const PageContainer = styled(Box)({
	display: 'flex',
	width: '100%',
	height: '100%',
	flexDirection: 'row',
	gap: "2em"
});

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	const { user } = useUser();
	return (
		<PageContainer>
			<Box sx={{
				flexGrow: 3,
				color: "white",
				fontSize: "1.5rem",
				background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%), radial-gradient(circle, rgba(51,19,62,1) 0%, rgba(48,18,59,1) 16%, rgba(45,17,56,1) 43%, rgba(34,13,42,1) 69%, rgba(23,8,28,1) 100%)",
				width: "100%",
				maxWidth: "25rem",

			}}
			>
				{<Sidebar />}

			</Box>

			<Box sx={{ flexGrow: 3 }} gap="2em" display="flex" flexDirection="column" >

				<Box height="5em"
					sx={{
						background: "rgba(61, 17, 91, 1)",
						flexDirection: "column",
						borderRadius: "6px",
						marginRight: "3em",

					}}

				>
					{<Navbar username={user?.name || ''} avatar={user?.picture} />}
				</Box>
				<Box
					sx={{


						background: "radial-gradient(circle, rgba(139, 61, 181, 1) 0%, rgba(104, 32, 147, 1) 26%, rgba(61, 17, 91, 1) 83%, rgba(47, 14, 69, 1) 97%)",
					}}
				>
					{children}
				</Box>
			</Box>
		</PageContainer >
	);
};

export default Layout;
