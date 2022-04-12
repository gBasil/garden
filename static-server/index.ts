import express from 'express';
import config from '../src/helpers/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { asyncMiddleware } from 'middleware-async';
import serveFile from './helpers/serveFile';
import serveExternal from './helpers/serveExternal';
import setupCookies from './helpers/setupCookies';

const app = express();

app.use(
	cors({
		origin: config.dash.url,
	})
);
app.use(cookieParser());
app.use(express.json());

// Setup cookie for viewing files and redirect to home from ID
app.get('/view/:id', setupCookies);

// Handle everything else. I don't know why I used middleware...
app.use(
	asyncMiddleware(async (req, res, next) => {
		// Allow requests from the Next.js image loader (dashboard) to get through.
		// This is hacky and can be improved by creating a custom image loader
		if (serveExternal.check(req)) return serveExternal.handle(req, res);

		// If we have a cookie, serve the files from the folder or remove the cookie if the folder doesn't exist.
		if (serveFile.check(req)) return serveFile.handle(req, res);

		next();
	})
);

app.listen(config.static.port, () => console.log('Static server started'));
