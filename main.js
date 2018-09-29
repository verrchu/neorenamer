#!/usr/bin/env node

const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const argParser = require('command-line-args');
const { rename } = require('./worker');
const status = require('./status');

const optionsDefinition = [
  { name: 'mode', alias: 'm', type: String },
  { name: 'from', alias: 'f', type: String },
  { name: 'to', alias: 't', type: String }
];

const { mode, from, to } = argParser(optionsDefinition);

const root = process.cwd();
const input = path.join(root, from);
const output = path.join(root, to);

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
