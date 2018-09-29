#!/usr/bin/env node

const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const argParser = require('command-line-args');
const { rename, test } = require('./worker');
const status = require('./status');

const optionsDefinition = [
  { name: 'mode', alias: 'm', type: String, defaultValue: 'rename' },
  { name: 'from', alias: 'f', type: String },
  { name: 'to', alias: 't', type: String }
];

const { mode, from, to } = argParser(optionsDefinition);

const root = process.cwd();
const input = path.join(root, from);
const output = path.join(root, to);

const renameFiles = (files, cur, max) => {
  if (!files.length) {
    status.finish();
    return;
  }
  const { artist, title, filename } = rename(files[0], cur, max);
  exec(`lame -b 320 '${path.join(input, files[0])}' '${path.join(output, filename)}' --ta '${artist}' --tt '${title}'`,
    () => renameFiles(files.slice(1), cur + 1, max))
}

const testFiles = (files, result) => {
  if (!files.length) {
    status.report(result);
    status.finish();
    return;
  }
  const testResult = test(files[0]);
  const newResult = testResult
    ? Object.assign(result, { success: result.success.concat(files[0]) })
    : Object.assign(result, { failure: result.failure.concat(files[0]) });
  return testFiles(files.slice(1), newResult);
}
  
const files = fs.readdirSync(input);

status.init(files, mode);

switch (mode) {
    case 'rename':
        renameFiles(files, 1, files.length);
        break;
    case 'test':
        testFiles(files, { success: [], failure: [] });
        break;
    default:
        throw new Error('Invalid mode');
}


