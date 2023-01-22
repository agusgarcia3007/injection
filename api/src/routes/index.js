const express = require("express");
const find = require("local-devices");
const ip = require("ip");
const dgram = require("dgram");
const getHostname = require("../functions/getHostname");
const getBroadcastAddress = require("../functions/getBroadcastAddress");
const scanner = require("../functions/scanner");
const disconect = require("../functions/disconnect");
const router = express.Router();

router.get("/devices", async (req, res) => {
  try {
    const devices = await find({ skipNameResolution: true });

    devices.map(async (device) => {
      device.name = await getHostname(device.ip);
    });

    res.send(devices);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/ip", async (req, res) => {
  const ipAddress = ip.address();
  res.send({ ipAddress });
});

router.get("/vuln", async (req, res) => {
  const ip = req.query.ip;
  const ports = req.query.ports;
  if (ip) {
    try {
      const vuln = await scanner(ip, ports);
      res.send(vuln);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(400).send("No IP provided");
  }
});

// not working yet
router.get("/disconnect", (req, res) => {
  try {
    disconect(req, res);
  } catch (error) {
    res.status(500).send(error);
  }
});

// alerts (future feature)
router.post("/alert", async (req, res) => {
  const message = req.body.message;
  try {
    if (!message) {
      res.status(400).send("No message provided");
      return;
    }
    const devices = await find();
    const broadcastAddress = getBroadcastAddress();
    const client = dgram.createSocket("udp4");
    client.bind(() => {
      client.setBroadcast(true);
    });

    devices.forEach((device) => {
      client.send(message, 0, message.length, 3000, broadcastAddress, (err) => {
        if (err) {
          console.log(`Error sending message to ${device.ip}: ${err}`);
          return;
        }
        console.log(`Sent message to ${device.ip}`);
      });
    });
    res.send(`Alert sent to ${devices.length} devices`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;