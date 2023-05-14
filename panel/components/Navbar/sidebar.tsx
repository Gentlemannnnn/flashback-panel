import AnnouncementIcon from '@mui/icons-material/Announcement';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupsIcon from '@mui/icons-material/Groups';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';

const pages = [
	{ title: 'Logs', icon: <AnnouncementIcon /> },
	{ title: 'Users', icon: <AssignmentIndIcon /> },
	{ title: 'Config', icon: <AdminPanelSettingsIcon /> },
	{
		title: 'Discord FA',
		icon: <GroupsIcon />,
		href: 'https://discord.com/channels/964304693130063892/964304693146833005',
	},
	{
		title: 'Discord Jobs',
		icon: <GroupsIcon />,
		href: 'https://discord.com/channels/965403855686885427/1078282773384671285',
	},
	{ title: 'Déconnexion', icon: <LogoutIcon />, href: '/api/auth/logout' },
];

const Sidebar = () => (
	<Grid item xs={3}>
		<Box
			display="flex"
			justifyContent="center"
			textAlign="match-parent"
			alignItems="center"
			sx={{
				background:
					'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%), radial-gradient(circle, rgba(99,44,131,1) 0%, rgba(94,41,124,1) 16%, rgba(88,37,117,1) 43%, rgba(70,27,95,1) 69%, rgba(47,14,69,1) 100%)',
			}}
		>
			<img
				src="https://media.discordapp.net/attachments/1095382416828407880/1101236139639193620/detoure.png"
				alt="logo"
				width="25%"
			/>

			<Typography
				sx={{
					fontWeight: '700 ',
					fontFamily: 'monospace',
					fontSize: '25px',
				}}
			>
				FlashBackFa Logs
			</Typography>
		</Box>

		<Box>
			{pages.map(page => (
				<Button
					key={page.title}
					sx={{
						'my': 2,
						'position': 'relative',
						'fontFamily': 'monospace',
						'fontWeight': 700,
						'textDecoration': 'none',
						'width': '90%',
						'height': '3em',
						'color': '#f0e9e9',
						'justifyContent': 'left',
						'alignItems': 'center',
						'background':
							'linear-gradient(90deg, rgb(255 255 255 / 5%) 0%, rgb(159 67 67 / 0%) 100%)',
						'transition': 'all 0.3s ease-in',
						'fontSize': '16px',
						'margin': '1rem',
						'&:hover': {
							background: '#f0e9e9',
							color: '#000000 ',
							boxShadow: '0 0 50px #f0e9e9',
						},
					}}
					href={page.href ? page.href : '#'}
				>
					<span
						className="icon"
						style={{
							marginRight: '2rem',
							alignItems: 'center',
							display: 'flex',
						}}
					>
						{page.icon}
					</span>
					{page.title}
				</Button>
			))}
		</Box>
	</Grid>
);

export default Sidebar;
