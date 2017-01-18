'use strict';

const parse5 = require('parse5');
const fs = require('fs');
const argv = process.argv.slice(2);
const cwd = process.cwd();
const path = require('path');
const targetHtmlFile = path.resolve(`${cwd}/${argv[0]}`);
const dest = path.resolve(`${cwd}/${argv[1]}`);

fs.readFile(targetHtmlFile, 'utf8', (err, str) => {

  if (err)
    return console.warn(err);

  let circular = [];
  const ast = parse5.parse(str);
  const json = JSON.stringify(ast, (k, v) => {
    if (typeof v === 'object' && v !== null) {
      if (circular.includes(v))
        return;
      circular.push(v);
    }
    return v;
  }, 2);

  fs.writeFile(dest, json, (err) => !err && console.log(`written to ${dest}`));

});
