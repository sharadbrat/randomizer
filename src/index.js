const { minmax, sum } = require('./utils');
const { RandomizerArgumentError } = require('./errors');


/**
 * @class Randomizer
 */
module.exports = class Randomizer {

  /**
   * @param options
   */
  constructor(options) {
    if (!options) {
      throw new RandomizerArgumentError('first argument must be provided');
    }

    if (!(options instanceof Array)) {
      throw new RandomizerArgumentError('first argument must be an Array');
    }

    this.options = options;
    this.weightsSum = sum(options.map(el => el[0]));
  }


  /**
   * @param {function} randomFn
   * @returns {*}
   */
  choose(randomFn = Math.random) {

    if (typeof randomFn !== 'function') {
      throw new RandomizerArgumentError('first argument must be a function')
    }

    const randomNumber = randomFn();

    if (typeof randomNumber !== 'number' || !(randomNumber >= 0 && randomNumber <= this.weightsSum)) {
      throw new RandomizerArgumentError(`provided function should return numeric value in range [0, ${this.weightsSum}]`)
    }

    const normalizedRandomNumber = minmax(randomNumber, 0, 1, 0, this.weightsSum);

    let prevResult = 0;

    for (let i = 0; i < this.options.length; i++) {
      const [weight, result] = this.options[i];

      const isRNMoreThanPrev = normalizedRandomNumber >= prevResult;
      const isRNLessThanNext = normalizedRandomNumber < prevResult + weight;

      if (isRNMoreThanPrev && isRNLessThanNext) {
        return result
      }

      prevResult += weight;
    }
  }

};
