import {
	IconButton,
	Menu,
	MenuItem,
	Button,
	Tooltip,
	Avatar,
	styled,
	Grid,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

interface Props {
	username: string;
	avatar?: string;
}

const pages = ['Logs', 'Users', 'COnfig'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = ({ username, avatar }: Props) => (
	<AppBar
		position="static"
		style={{
			// background: 'rgb(80,16,128)',
			background:
				'linear-gradient(90deg, rgba(80,16,128,1) 0%, rgba(151,62,206,1) 50%, rgba(80,16,128,1) 100%); ',
		}}
	>
		<Toolbar disableGutters>
			<Grid container spacing={3}>
				<Grid item xs>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(page => (
							<Button
								key={page}
								// onClick={handleCloseNavMenu}
								sx={{
									my: 2,
									color: 'white',
									display: 'block',
									fontFamily: 'monospace',
								}}
							>
								{page}
							</Button>
						))}
					</Box>
				</Grid>
				<Grid
					item
					xs={6}
					display="flex"
					justifyContent="center"
					flexDirection="column"
				>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'white',
							textDecoration: 'none',
						}}
					>
						PANEL
					</Typography>
				</Grid>
				<Grid item xs display="flex" justifyContent="right">
					<Box sx={{ flexGrow: 0 }} display="flex" paddingRight="1em">
						<Tooltip title="Open settings">
							<IconButton sx={{ p: 0 }}>
								<Avatar alt={username} src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
					</Box>
				</Grid>
			</Grid>
		</Toolbar>
	</AppBar>
);

export default Navbar;
