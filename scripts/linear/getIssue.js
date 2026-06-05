const { LinearClient } = require("@linear/sdk");

const linear = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
});

async function getIssue(issueKey) {
  const issue = await linear.issue(issueKey);

  if (!issue) {
    throw new Error(`Issue not found: ${issueKey}`);
  }

  return issue;
}

module.exports = {
  getIssue,
};