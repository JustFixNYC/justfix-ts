#! /usr/bin/env node

const { main } = require("../dist/cli.bundle.js");

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
