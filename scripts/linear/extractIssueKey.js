const ISSUE_REGEX = /([a-z]+-\d+)/i;

function extractIssueKey(text) {
  const match = text.match(ISSUE_REGEX);

  if (!match) {
    throw new Error(`Issue key not found in: ${text}`);
  }

  return match[1];
}

module.exports = {
  extractIssueKey,
};