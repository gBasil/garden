import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, GeistProvider } from '@geist-ui/core';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<link
				rel='icon'
				href={`data:image/svg+xml,${encodeURI(
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🪴</text></svg>'
				)}`}
			></link>
			<GeistProvider>
				<CssBaseline />
				<Component {...pageProps} />
			</GeistProvider>
		</>
	);
};

export default App;
