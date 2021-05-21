// can't be `bump-package-lock.ts` as it is invoked by `standard-version` as a
// custom updater

const detectIndent = require('detect-indent');
const detectNewline = require('detect-newline');
const stringifyPackage = require('stringify-package');

module.exports.readVersion = function (contents) {
  return JSON.parse(contents).packages[''].version;
};

module.exports.writeVersion = function (contents, version) {
  const json = JSON.parse(contents);
  const indent = detectIndent(contents).indent;
  const newline = detectNewline(contents);
  json.version = version;
  json.packages[''].version = version;
  return stringifyPackage(json, indent, newline);
};
