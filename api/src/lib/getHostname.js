const dns = require("dns");

async function getHostname(ip) {
  try {
    const hostnames = await new Promise((resolve, reject) => {
      dns.reverse(ip, (err, hostnames) => {
        if (err) reject(err);
        else resolve(hostnames);
      });
    });
    console.log(`Hostname: ${hostnames[0]} for ${ip}`);
    return hostnames[0];
  } catch (err) {
    return "unknown";
  }
}

module.exports = getHostname;
