const os = require("os");

function getBroadcastAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      const { address, netmask } = interface;
      if (interface.family === "IPv4" && !interface.internal) {
        const broadcast = getBroadcast(address, netmask);
        if (broadcast) return broadcast;
      }
    }
  }
}

function getBroadcast(address, netmask) {
  const network = getNetwork(address, netmask);
  let broadcast = "";
  for (let i = 0; i < 4; i++) {
    broadcast += (network[i] | (~netmask[i] >>> 0)).toString(2);
  }
  return broadcast;
}

function getNetwork(address, netmask) {
  const network = address.split(".").map((octet) => parseInt(octet));
  return network.map((octet, i) => octet & netmask[i]);
}

module.exports = getBroadcastAddress;
