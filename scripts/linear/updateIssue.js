async function updateIssue(issue, stateId) {
  await issue.update({
    stateId,
  });
}

module.exports = {
  updateIssue,
};