const os = require("os");
const { exec } = require("child_process");

function getDevices() {
  if (os.platform() === "win32") {
    exec("arp -a", (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  } else {
    exec("arp-scan --localnet", (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  }
}

module.exports = getDevices;
