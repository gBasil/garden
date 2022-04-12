import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

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
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<Component {...pageProps} />
					</Hydrate>
				</QueryClientProvider>
			</GeistProvider>
		</>
	);
};

export default App;
