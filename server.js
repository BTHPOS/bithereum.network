// Dependencies
var Boom    = require('boom');
var Joi     = require('joi');
var Path    = require('path');
var Hapi    = require('hapi');
var Vision 	= require('vision');
var Inert 	= require('inert');
var got 		= require('got');
var bitcoinjs = require("./public/assets/js/bitcoinjs/bitcoinjs.min.js");

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
			path: '/api/richlist',
			handler: function(request, reply)
			{
				    return {richlist: []};
			}
	});

	server.route({
			method: 'GET',
			path: '/api/circulating',
			handler: function(request, reply)
			{
				 return new Promise(function(accept, reject) {
					 	got("http://insight.bithereum.network/insight-api/status").then(function(response) {
					  		try {
										var data = JSON.parse(response.body);
										accept(data.info.circulating);
								}
								catch(e) {
										accept(0);
								}
				 		});
				});
			}
	});

	server.route({
			method: 'GET',
			path: '/api/status',
			handler: function(request, reply)
			{
				 return new Promise(function(accept, reject) {
					 	got("http://insight.bithereum.network/insight-api/status"").then(function(response) {
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
		path: '/api/convert/address',
		handler: function(request, reply)
		{
        var address = "";
        try {
            var decoded = bitcoinjs.address.fromBase58Check(request.query.address);
            var version = decoded['version']
            switch (version) {
              case 0:
                version = 25;
                break;
              case 25:
                version = 0;
                break;
              case 5:
                version = 40;
                break;
              case 40:
                version = 5;
                break;
              default:
                break;
            }
            if (version) address = bitcoinjs.address.toBase58Check(decoded['hash'], version);
        }
        catch(e) {
        }
        return {address:address};
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
				return reply.response(content.join("\n")).header('Content-Type', "text/plain");
		}
	});

	server.route({
		method: 'GET',
		path: '/configurations/pool/testnet/dc/{number}',
		handler: function(request, reply)
		{
				var content = [
						"maxgputemp 85",
						"globalminer lolminer",
						"stratumproxy enabled",
						"proxywallet THQdmn1rZHZoAevU2jRkLEKE9UfP74Ybpp",
						"proxypool1 pool-testnet.bithereum.network:3858",
						"lolminer=flags --profile ETHOS --usercfg /var/run/ethos/lolminer_config.json --overwritePersonal BethdPoW --coin AUTO144_5",
						"flags --cl-global-work 8192 --farm-recheck 200",
						"globalfan 85"
				];
				return reply.response(content.join("\n")).header('Content-Type', "text/plain");
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
