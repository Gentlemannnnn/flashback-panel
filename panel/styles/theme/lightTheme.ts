import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		background: {
			default: '#F8F9FA',
			paper: '#FFFFFF',
		},
		primary: {
			main: '#91BED4',
		},
		secondary: {
			main: '#5f4595',
		},
	},
	typography: {
		fontFamily: 'IBM Plex Sans, Roboto',
	},
});

export default lightTheme;
