var proxy = require('redbird')({
    port: 80,
    secure: true,
    ssl: {
        port: 443,
        key: "./ssl/_.bithereum.network_private_key.key",
        cert: "./ssl/bithereum.network_ssl_certificate.cer",
    }
});

proxy.register("bithereum.network", "http://localhost:8000", {ssl: true});
proxy.register("node.bithereum.network", "http://localhost:8002", {ssl: false});
