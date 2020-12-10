const { handler } = require("./dist");

process.env.LOG_LEVEL = "DEBUG";

handler("12345");
