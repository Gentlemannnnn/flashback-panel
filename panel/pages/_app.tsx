import React from 'react';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import store from 'features';
import createEmotionCache from 'utils/createEmotionCache';
import lightTheme from 'styles/theme/lightTheme';
import 'styles/globals.css';
import Layout from 'modules/common/Layout';

const clientSideEmotionCache = createEmotionCache();

interface AppWithStyleCacheProps extends AppProps {
	emotionCache?: EmotionCache;
}

const App = ({
	Component,
	pageProps,
	emotionCache = clientSideEmotionCache,
}: AppWithStyleCacheProps) => (
	<Provider store={store}>
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={lightTheme}>
				<CssBaseline />
				<UserProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</UserProvider>
			</ThemeProvider>
		</CacheProvider>
	</Provider>
);

export default App;
