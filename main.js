const exec = require('child_process').exec;
const fs = require('fs');
const rename = require('./rename');
const format = require('./format');

const folder = '/Users/kolinsol/Desktop/_test/';

const processFiles = (files) => {
  if (!files.length) {
    format.finish();
    return;
  }
  const { artist, title, filename } = rename(files[0]);
  exec(`lame -b 320 "${folder}${files[0]}" "${folder}${filename}" --ta "${artist}" --tt "${title}"`,
    () => processFiles(files.slice(1)))
}

const files = fs.readdirSync(folder);

format.init(files);

processFiles(files);
