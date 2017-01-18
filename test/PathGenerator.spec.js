'use strict';

// https://xgrommx.github.io/rx-book/

const test = require('tape');
const PathGenerator = require('./../PathGenerator');
const fixtureA = require('./../fixtures/a/page.json');
const fixtureB = require('./../fixtures/b/page.json');
const fixtureC = require('./../fixtures/c/page.json');

test('path generator', (t) => {

  const callback = (node) => (node.textContent || '').includes('RxJS has no');

  const results = [
    new PathGenerator(callback, fixtureA),
    new PathGenerator(callback, fixtureA, true)
  ];

  t.equal(
    Array.isArray(results[0][0]),
    false,
    '3rd param not specified should not return array of paths'
  );

  t.equal(
    Array.isArray(results[1][0]),
    false,
    '3rd param set to true should return array of paths, but this fixture only has one needle anyway'
  );

  t.end();

})
