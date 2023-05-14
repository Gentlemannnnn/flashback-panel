import { IconButton, Avatar, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

interface Props {
	username: string;
	avatar?: string | null;
}

const Navbar = ({ username, avatar }: Props) => (
	<Toolbar disableGutters>
		<Grid container justifyContent="flex-end" alignItems="center" mr={2}>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography
					sx={{
						mr: 2,
						color: 'white',
						fontWeight: 700,
						fontFamily: 'monospace',
						filter: 'drop-shadow(0px 0px 9px #18c71b)',
					}}
				>
					Statuts connecté
					<RadioButtonCheckedIcon
						sx={{
							background: 'transparent',
							color: '#18c71b',
							marginLeft: '0.5rem',
							marginRight: '2rem',
							fontSize: '1.2rem',
							filter: 'drop-shadow(0px 0px 9px #18c71b)',
							verticalAlign: 'middle',
						}}
					/>
					{username}
				</Typography>

				<IconButton
					sx={{
						p: 0,
						mr: 2,
					}}
				>
					<Avatar alt={username} src={avatar} />
				</IconButton>
			</Box>
		</Grid>
	</Toolbar>
);

export default Navbar;
