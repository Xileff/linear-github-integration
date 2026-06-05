const { extractIssueKey } = require("./extractIssueKey");
const { getIssue } = require("./getIssue");
const { updateIssue } = require("./updateIssue");

async function main() {
  const branchName = process.env.BRANCH_NAME;
  const targetStateId = process.env.TARGET_STATE_ID;

  if (!branchName) {
    throw new Error("BRANCH_NAME is required");
  }

  if (branchName === "main") {
    console.log("Ignoring main branch");
    return;
  }

  if (!targetStateId) {
    throw new Error("TARGET_STATE_ID is required");
  }

  console.log("Branch name : ", branchName)

  const issueKey = extractIssueKey(branchName);

  console.log(`Issue Key: ${issueKey}`);

  const issue = await getIssue(issueKey);

  const currentState = await issue.state;

  console.log(
    `Current State: ${currentState.name} (${currentState.id})`
  );

  if (currentState.id === targetStateId) {
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