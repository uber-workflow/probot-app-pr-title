const isValidTitle = require('./validate-title.js');

module.exports = robot => {
  robot.on('pull_request.opened', check);
  robot.on('pull_request.edited', check);

  async function check(context) {
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
      context: 'pr_title',
    }),
  );
}
