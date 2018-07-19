const debugEnabled = process.env.APP_DEBUG || 'true';
function log() {
  if (!debugEnabled) return;
  console.log(...arguments);
  return arguments[0];
}

module.exports = {
  log
};
