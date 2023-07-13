require("dotenv").config();
const { exec } = require("child_process");
const chalk = require("chalk");

function nmap(ipAddress) {
  const plusSign = chalk.cyan("[+]");
  console.log(
    `${plusSign} scanning ${ipAddress} \n${plusSign} -O flag provided`
  );
  const result = new Promise((resolve, reject) => {
    const command = `sudo nmap -O ${ipAddress}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(new Error(stderr));
      } else {
        resolve(stdout);
      }
    });
  });

  return result;
}

function parseNmapResponse(response) {
  const portsRegex = /(\d+)\/(\w+)\s+(\w+)\s+(\w+)/g;
  const osRegex = /No exact OS matches for host|OS:(.*)/;

  const ports = [];
  let os = "";

  let match;
  while ((match = portsRegex.exec(response)) !== null) {
    const [, portNumber, protocol, state, service] = match;
    ports.push({ port: parseInt(portNumber), protocol, state, service });
  }

  const osMatch = osRegex.exec(response);
  if (osMatch) {
    os = osMatch[1]?.trim() || "No exact OS matches for host";
  }

  return { ports, os };
}

async function getSystemData(ipAddress) {
  try {
    const data = await nmap(ipAddress);
    const parsedData = parseNmapResponse(data);
    return parsedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = getSystemData;
