const { handler } = require("./dist");

process.env.LOG_LEVEL = "DEBUG";

handler({
  requestId: "12345",
});
