const express = require("express");
const find = require("local-devices");
const getHostname = require("../functions/getHostname");
const getBroadcastAddress = require("../functions/getBroadcastAddress");
const scanner = require("../functions/scanner");
const dgram = require("dgram");
const router = express.Router();

router.get("/devices", async (req, res) => {
  try {
    const devices = await find();

    devices.map(async (device) => {
      device.name = await getHostname(device.ip);
    });

    res.send(devices);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
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

router.post("/alertone", (req, res) => {
  const message = req.body.message;
  const ip = req.body.ip;
  if (!message || !ip) {
    res.status(400).send("No message or IP provided");
    return;
  }

  const client = dgram.createSocket("udp4");

  client.send(message, 0, message.length, 3000, ip, (err) => {
    if (err) {
      console.log(`Error sending message to ${ip}: ${err}`);
      res.status(500).send(`Error sending message to ${ip}`);
    } else {
      console.log(`Sent message to ${ip}`);
      res.send(`Sent message to ${ip}`);
    }
    client.close();
  });
});

module.exports = router;
