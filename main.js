#!/usr/bin/env node

const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const { rename } = require('./worker');
const status = require('./status');

const args = process.argv.slice(2);

const root = process.cwd();
const [input, output] = args.map(x => path.join(root, x));

const processFiles = (files, cur, max) => {
  if (!files.length) {
    status.finish();
    return;
  }
  const { artist, title, filename } = rename(files[0], cur, max);
  exec(`lame -b 320 '${path.join(input, files[0])}' '${path.join(output, filename)}' --ta '${artist}' --tt '${title}'`,
    () => processFiles(files.slice(1), cur + 1, max))
}

const files = fs.readdirSync(input);

status.init(files);

processFiles(files, 1, files.length);
