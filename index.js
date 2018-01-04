/** Copyright (c) 2017 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const validateTitle = require('./validate-title.js');

module.exports = robot => {
  robot.on('pull_request.opened', check);
  robot.on('pull_request.edited', check);
  robot.on('pull_request.synchronize', check);

  async function check(context) {
    const pr = context.payload.pull_request;
    const errors = validateTitle(pr.title);
    setStatus(context, errors);
  }
};

function setStatus(context, errors) {
  const {github} = context;

  const status =
    errors.length === 0
      ? {
          state: 'success',
          description: 'PR title is valid',
        }
      : {
          state: 'failure',
          description: 'PR title is invalid:\n' + errors.join('\n'),
        };

  github.repos.createStatus(
    context.repo({
      ...status,
      sha: context.payload.pull_request.head.sha,
      context: 'probot/pr-title',
    })
  );
}
