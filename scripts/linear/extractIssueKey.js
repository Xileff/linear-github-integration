const ISSUE_REGEX = /([A-Z]+-\d+)/;

function extractIssueKey(text) {
  const match = text.match(ISSUE_REGEX);

  console.log("text : ", text)

  if (!match) {
    throw new Error(`Issue key not found in: ${text}`);
  }

  return match[1];
}

module.exports = {
  extractIssueKey,
};