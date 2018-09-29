const status = require('./status');

const prepare = (str) => {
    return str.replace(/(\[|\]|\(|\))/g,'').replace(/[ _]+/g, ' ');
}

const rename = (str, cur, max) => {
  status.process(str, cur, max);

  const [artist, rawTitle] = str.toLowerCase().split(/ +- +/);
  const preparedTitle = prepare(rawTitle);
  const title = preparedTitle
    .replace(/^([a-zA-Z0-9$ ]+?)( (feat|ft)\.? ?([a-zA-Z0-9$ ]+?( x [a-zA-Z0-9$ ]+?)*))?( (prod\.? ?by|prod)\.? ?([a-zA-Z0-9$ ]+?( x [a-zA-Z0-9$ ]+?)*))? *?(.mp3)$/,
      (...x) => {
        if (x[4] && x[8]) return `${x[1]} (w/ ${x[4]}) (p/ ${x[8]})`;
        if (x[4]) return `${x[1]} (w/ ${ x[4]})`;
        if (x[8]) return `${x[1]} (p/ ${ x[8]})`;
        return x[1];
      });
  return {
    artist,
    title,
    filename: `${artist} - ${title}.mp3`.replace(/\//g,'')
  }
}

module.exports = {
    rename
};
