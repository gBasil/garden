module.exports = {
	dev: {
		// The static file serving for the archives
		static: {
			// Port to run the static server on
			port: 3001,
			// The URL that we redirect to from the dashboard
			// Put the url where you will see it here
			url: 'http://localhost:3001',
		},
		// The dashboard for managing everything
		dash: {
			// To configure the port in `package.json`, change the value for the `-p` flag in `dev:dash` and `start:dash` to your desired port

			// Where the dashboard will be found
			url: 'http://localhost:3000',
		}
	},
	// Same as above, but used in production. The same explanations in the comments apply here
	prod: {
		static: {
			port: 3001,
			url: 'http://localhost:3001',
		},
		dash: {
			url: 'http://localhost:3000',
		}
	},
};
