const express = require("express");
const find = require("local-devices");
const ip = require("ip");
const getHostname = require("../lib/getHostname");
const getSystemData = require("../lib/getOs");
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

router.get("/ip", async (req, res) => {
  const ipAddress = ip.address();
  res.send({ ipAddress });
});

router.get("/vuln", async (req, res) => {
  const ip = req.query.ip;
  if (ip) {
    try {
      const vuln = await getSystemData(ip);
      res.send(vuln);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(400).send("No IP provided");
  }
});

module.exports = router;
