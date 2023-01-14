const express = require("express");
const find = require("local-devices");
const getDevices = require("../functions/getDevices");
const getHostname = require("../functions/getHostname");
const scanner = require("../functions/scanner");
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

module.exports = router;
