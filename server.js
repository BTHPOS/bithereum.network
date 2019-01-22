// Dependencies
var Boom    = require('boom');
var Joi     = require('joi');
var Path    = require('path');
var Hapi    = require('hapi');
var Vision 	= require('vision');
var Inert 	= require('inert');
var got 		= require('got');

// Template Engine
var Handlerbars = require('handlebars');
var HandlebarsLayouts = require('handlebars-layouts');
HandlebarsLayouts.register(Handlerbars);

// HTTP Server
var server = Hapi.server({
	 	port: 8000,
	  routes: {
			cors: {
				credentials: true
			}
	 }
});

// HTTP Server Initialization Configuration
var initialization = async function() {

	// Register modules
	await server.register(Vision);
	await server.register(Inert);

	// Setup view rendering
	server.views({
			engines: {
					html: {
						module: Handlerbars
					}
			},
			relativeTo: Path.join(__dirname, 'public'),
			path: './views',
			partialsPath: './views'
	});

	// Base HTTP route
	server.route({
			method: 'GET',
			path: '/',
			handler: function(request, reply)
			{
					return reply.view('embed-base', {});
			}
	});

	server.route({
			method: 'GET',
			path: '/api/getconnectioncount',
			handler: function(request, reply)
			{
				 return new Promise(function(accept, reject) {
					 	got("http://explorer.bithereum.network/api/getconnectioncount").then(function(response) {
					  		accept(response.body);
				 		});
				});
			}
	});
	server.route({
			method: 'GET',
			path: '/api/getblockcount',
			handler: function(request, reply)
			{
				 return new Promise(function(accept, reject) {
					  got("http://explorer.bithereum.network/api/getblockcount").then(function(response) {
								accept(response.body);
				 		});
				 });
			}
	});
	server.route({
			method: 'GET',
			path: '/api/getdifficulty',
			handler: function(request, reply)
			{
				 return new Promise(function(accept, reject) {
				 		got("http://explorer.bithereum.network/api/getdifficulty").then(function(response) {
								accept(response.body);
				 		});
				 });
			}
	});
	server.route({
			method: 'GET',
			path: '/api/getnetworkhashps',
			handler: function(request, reply)
			{
				 return new Promise(function(accept, reject) {
					 	got("http://explorer.bithereum.network/api/getnetworkhashps").then(function(response) {
								accept(response.body);
				 		});
				 });
			}
	});

	server.route({
		method: 'GET',
		path: '/bounty/stakes',
		handler: function(request, reply)
		{
				return reply.redirect("https://docs.google.com/spreadsheets/d/11WZwlfSV7YpnGfDm3WWTwH61QfWtL-7cvhybzHtRGMk/edit#gid=722524947");
		}
	});

	server.route({
		method: 'GET',
		path: '/bounty/check',
		handler: function(request, reply)
		{
				return reply.redirect("https://docs.google.com/spreadsheets/d/1mVNjigrzWPM0Zw2cxMjd0QsR5CE56ti7-H6lqfWpaps/edit?usp=sharing");
		}
	});

	server.route({
		method: 'GET',
		path: '/bounty/form',
		handler: function(request, reply)
		{
				return reply.redirect("https://docs.google.com/forms/d/e/1FAIpQLSfJkmKF-5SX1dM9Ne57SETBlvhX3OWyJ6dP8mSFkkAFsI1_2Q/viewform?c=0&w=1");
		}
	});

	server.route({
		method: 'GET',
		path: '/bounty/join',
		handler: function(request, reply)
		{
				return reply.redirect("http://t.me/BithereumBountyBot?start=start");
		}
	});

	server.route({
		method: 'GET',
		path: '/whitepaper',
		handler: function(request, reply)
		{
				return reply.redirect("/storage/whitepaper.pdf");
		}
	});

	server.route({
		method: 'GET',
		path: '/redeem/mew',
		handler: function(request, reply)
		{
				return reply.redirect("https://medium.com/@dondrey.taylor/how-to-redeem-your-bth-using-myetherwallet-97b6e0a0d250");
		}
	});

	server.route({
		method: 'GET',
		path: '/redeem/metamask',
		handler: function(request, reply)
		{
				return reply.redirect("https://medium.com/@dondrey.taylor/eth-holders-how-to-redeem-your-bth-using-metamask-849c381da87b");
		}
	});

	server.route({
		method: 'GET',
		path: '/redeem/jaxx',
		handler: function(request, reply)
		{
				return reply.redirect("https://medium.com/@dondrey.taylor/eth-holders-how-to-redeem-your-bth-using-jaxx-2dc9e9fec6de");
		}
	});

	server.route({
		method: 'GET',
		path: '/redeem/ledger',
		handler: function(request, reply)
		{
				return reply.redirect("https://medium.com/@dondrey.taylor/eth-holders-how-to-redeem-your-bth-using-ledger-wallet-fb9d706485dd");
		}
	});

	server.route({
		method: 'GET',
		path: '/redeem/imtoken',
		handler: function(request, reply)
		{
				return reply.redirect("https://medium.com/@dondrey.taylor/eth-holders-how-to-redeem-your-bth-using-imtoken-47b984f2cbe");
		}
	});

	server.route({
		method: 'GET',
		path: '/redeem/trezor',
		handler: function(request, reply)
		{
				return reply.redirect("https://medium.com/@dondrey.taylor/eth-holders-how-to-redeem-your-bth-using-trezor-8de9ec362e82");
		}
	});

	server.route({
		method: 'GET',
		path: '/mining/form',
		handler: function(request, reply)
		{
				return reply.redirect("https://docs.google.com/forms/d/e/1FAIpQLSfETri1L8RMeq9EWfCYTRIROu68-A1tSbQyVuKP-zbREwNvzQ/viewform");
		}
	});


	server.route({
		method: 'GET',
		path: '/configurations/pool/mainnet/dc/{number}',
		handler: function(request, reply)
		{
				var content = [
						"maxgputemp 85",
						"globalminer lolminer",
						"stratumproxy enabled",
						"proxywallet BDq64SKHij2b4Aiwpjwp72VCEoKeeVXZGP",
						"proxypool1 pool.bithereum.network:3857",
						"lolminer=flags --profile ETHOS --usercfg /var/run/ethos/lolminer_config.json --overwritePersonal BethdPoW --coin AUTO144_5",
						"flags --cl-global-work 8192 --farm-recheck 200",
						"globalfan 85"
				];
				return reply(content.join("\n")).header('Content-Type', "text/plain");
		}
	});

	// Handles public file routing
	server.route({
	    method: 'GET',
	    path: '/{param*}',
	    handler: {
	        directory: {
	            path: 'public',
	            listing: true
	        }
	    }
	});

	// Attempt to start the HTTP Server
	try {
			await server.start();
	}
	catch (err) {
			process.exit(1);
	}
};

// Initilize HTTP Server
initialization();
