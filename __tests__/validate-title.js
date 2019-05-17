/** Copyright (c) 2017 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env jest */

const t = require('assert');

const validateTitle = require('../validate-title.js');

test('valid commits pass', () => {
  const valid = [
    'Implement some arbitrary thing',
    'Introduce some arbitrary thing',
    'Update subsystem X for readability',
    'Refactor subsystem X for readability',
    'Update getting started documentation',
    'Remove deprecated methods',
    'Release version 1.0.0',
    'Merge pull request #123 from user/branch',
    'Add tests for X',
    'Delete thing',
    'Revert whatever',
    `Expose "ignore" and "fetch" as instance methods`,
    'Refactor some arbitrary thing',
    'Release some arbitrary thing',
    'Revert some arbitrary thing',
    'Restore some arbitrary thing',
    'Recycle some arbitrary thing',
    'Repeat some arbitrary thing',
    'Rebuild some arbitrary thing',
    'Reconcile some arbitrary thing',
    'Record some arbitrary thing',
    'Redefine some arbitrary thing',
    'Recover some arbitrary thing',
    'Rename some arbitrary thing',
    'Reset some arbitrary thing',
    'Restructure some arbitrary thing',
    'Resolve some arbitrary thing',
    'Upgrade some arbitrary thing',
    'Pin Dockerfile node:8.9.0 image digest',
    'Configure Renovate',
    'Enforce some arbitrary thing',
    'Set some arbitrary thing',
    'Disable some arbitrary thing',
    'Log some arbitrary thing',
    'Track some arbitrary thing',
    'Run some arbitrary thing',
    'Clean up some arbitrary thing',
    'Restore some arbitrary thing',
    'Preserve some arbitrary thing',
    'Sync pr from other repo',
    '[package-name] Fix bug',
    '[sync] Copy some feature over',
  ];

  valid.forEach(msg => {
    t.equal(validateTitle(msg).length, 0, `"${msg}", was expected to be valid`);
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
    'Implement some arbitrary thing with a period.',
  ];

  invalid.forEach(msg => {
    t.notEqual(validateTitle(msg).length, 0);
  });
});
