const exec = require('child_process').exec;
const fs = require('fs');
const rename = require('./rename');
const status = require('./status');

const args = process.argv.slice(2);

const root = '/Users/kolinsol/.dev/renamer';
const [input, output] = args.map(x => `${root}/_${x}/`);

const processFiles = (files) => {
  if (!files.length) {
    status.finish();
    return;
  }
  const { artist, title, filename } = rename(files[0]);
  exec(`lame -b 320 '${input}${files[0]}' '${output}${filename}' --ta '${artist}' --tt '${title}'`,
    () => processFiles(files.slice(1)))
}

const files = fs.readdirSync(input);

status.init(files);

processFiles(files);
