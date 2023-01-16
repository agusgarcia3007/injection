const { exec } = require("child_process");

function disconect(req, res) {
  const os = process.platform;
  const command =
    os === "win32"
      ? `arp -d ${req.query.ip}`
      : `networksetup -removepreferredwirelessnetwork en0 ${req.query.mac}`;
  try {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        res.status(500).send(err);
      } else if (stderr) {
        res.status(500).send(stderr);
      } else if (stdout) {
        res.send(`Device ${req.query.ip || req.query.mac} disconnected`);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = disconect;
