const { extractIssueKey } = require("./extractIssueKey");
const { getIssue } = require("./getIssue");
const { updateIssue } = require("./updateIssue");

async function main() {
  const branchName = process.env.BRANCH_NAME;
  const targetStateId = process.env.TARGET_STATE_ID;

  if (!branchName) {
    throw new Error("BRANCH_NAME is required");
  }

  if (branchName === 'main') {
    console.log("Ignoring main branch commits from linear checks");
    return;
  }

  if (!targetStateId) {
    throw new Error("TARGET_STATE_ID is required");
  }

  const issueKey = extractIssueKey(branchName);

  console.log(`Issue Key: ${issueKey}`);

  const issue = await getIssue(issueKey);
  const currentState = await issue.state;
  
  if (currentState.name !== "Todo") {
    console.log("Issue already started");
    return;
  }

  console.log(`Current State: ${issue.stateId}`);

  if (issue.stateId === targetStateId) {
    console.log("Already in target state");
    return;
  }

  await updateIssue(issue, targetStateId);

  console.log("Issue updated successfully");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});