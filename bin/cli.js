const parse5 = require('parse5');
const fs = require('fs');
const argv = process.argv.slice(2);
const cwd = process.cwd();
const path = require('path');
const PathGenerator = require('./../PathGenerator');

const targetHtmlFile = path.resolve(`${cwd}/${argv[0]}`);
const dest = path.resolve(`${cwd}/${argv[1]}`);
