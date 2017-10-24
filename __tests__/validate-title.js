/** Copyright (c) 2017 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env jest */

const t = require('assert');

const isValidTitle = require('../validate-title.js');

test('valid commits pass', () => {
  const valid = [
    'Update subsystem X for readability',
    'Refactor subsystem X for readability',
    'Update getting started documentation',
    'Remove deprecated methods',
    'Release version 1.0.0',
    'Merge pull request #123 from user/branch',
    'Add tests for X',
    'Delete thing',
    'Revert whatever',
  ];

  valid.forEach(msg => {
    t.equal(isValidTitle(msg), true);
  });
});

test('invalid commits fail', () => {
  const invalid = [
    'Revert',
    'fixed bug with Y',
    'changing behavior of X',
    'more fixes for broken stuff',
    'sweet new API methods',
    'UPDATE documentation',
    'Add a cool thing!',
    'I added tests for X',
    'Adding tests for X',
    'tea is good',
    'bottle it up entirely',
    'Add cool thing. Add another thing',
    `potato doesn't work`,
    'revert whatever',
  ];

  invalid.forEach(msg => {
    t.equal(isValidTitle(msg), false);
  });
});
