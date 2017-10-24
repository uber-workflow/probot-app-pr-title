/** Copyright (c) 2017 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const isValidTitle = require('./validate-title.js');

module.exports = robot => {
  robot.on('pull_request.opened', check);
  robot.on('pull_request.edited', check);

  async function check(context) {
    const pr = context.payload.pull_request;
    const passed = isValidTitle(pr.title);
    setStatus(context, passed);
  }
};

function setStatus(context, passing) {
  const {github} = context;

  const status = passing
    ? {
        state: 'success',
        description: 'PR title is valid',
      }
    : {
        state: 'failure',
        description: 'PR title is invalid',
      };

  github.repos.createStatus(
    context.repo({
      ...status,
      sha: context.payload.pull_request.head.sha,
      context: 'probot/pr-title',
    }),
  );
}
