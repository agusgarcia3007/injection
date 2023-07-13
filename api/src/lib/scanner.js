const Evilscan = require("evilscan");

function scanner(ip, ports) {
  const options = {
    target: ip,
    port: ports ?? "0-1000",
    status: "O",
    banner: true,
  };

  console.log(options.port);

  let result = [];
  const scanner = new Evilscan(options);

  scanner.on("result", (data) => {
    console.log(data);
    result.push(data);
  });

  scanner.on("error", (err) => {
    throw err;
  });

  scanner.on("done", () => {
    return `nothing found fron ${ip}`;
  });

  return new Promise((resolve, reject) => {
    scanner.run((err, data) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = scanner;
