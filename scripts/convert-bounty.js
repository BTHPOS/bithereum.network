var bitcoinjs     = require("../public/assets/js/bitcoinjs/bitcoinjs.min.js");
var fs            = require('fs');
var path          = require('path');
var filePath      = path.join(__dirname, 'bounty.txt');

let convert = function(address) {
    var bthaddress = "";
    try {
        var decoded = bitcoinjs.address.fromBase58Check(address);
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
        if (version) bthaddress = bitcoinjs.address.toBase58Check(decoded['hash'], version);
    }
    catch(e) {
    }
    return bthaddress
};

fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data) {
    var addresses = data.split("\n");
    var lines = [];
    lines.push("Old Addresses, New BTH Address")
    for (var address in addresses) {
        lines.push(addresses[address] + "," + convert(addresses[address]) + ",");
    }
    fs.writeFile(__dirname + "/bounty-converted.csv", lines.join("\n"));
});
