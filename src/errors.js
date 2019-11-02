module.exports.RandomizerArgumentError = class RandomizerArgumentError extends Error {
  constructor(message) {
    super(`[Randomizer] Illegal argument provided: ${message}`);
  }
};
