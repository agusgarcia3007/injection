const dns = require("dns");

function getHostname(ip) {
  dns.reverse(ip, (err, hostnames) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      return;
    }
    console.log(`Hostname: ${hostnames[0]}`);
  });
}

module.exports = getHostname;
