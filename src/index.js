require("module-alias/register");
require("dotenv").config();
const { serverConfig } = require("@config");
const { mongoService } = require("@services");

const server = require("./server");

(async () => {
  try {
    // Connect DB
    await mongoService.connect();

    // Start Server
    server.listen(serverConfig.port, () => {
      console.info(`Server listening on port ${serverConfig.port}`);
    });
  } catch {
    console.error("Couldn't start the server");
  }
})();
