const { it, describe } = require('mocha');
const { assert } = require('chai');

const Randomizer = require('../src/index');
const { RandomizerArgumentError } = require('../src/errors');


describe('Randomizer', () => {

  const defaultWeights = [
    [3, 'A'],
    [5, 'B'],
    [2, 'C'],
  ];


  const weightsVariants = [
    [
      [1, 'A'],
      [1, 'B'],
      [1, 'C'],
      [1, 'D'],
    ],
    [
      [1, 'A'],
      [1, 'B'],
    ],
  ];


  describe('#constructor', () => {

    it('Expects constructor argument to exist', () => {
      assert.throws(() => new Randomizer(), RandomizerArgumentError);
    });


    it('Expects constructor argument to be an array type', () => {
      assert.throws(() => new Randomizer({ a: 'a' }), RandomizerArgumentError);
    });


    it('Save sum of weights in property', () => {
      assert.equal(new Randomizer(defaultWeights).weightsSum, 10);
    });

  });


  describe('#choose', () => {

    it('Expects argument to be a function', () => {
      const r = new Randomizer(defaultWeights);

      assert.throws(() => r.choose('not a function'), RandomizerArgumentError);
    });


    it('Expects argument to be a function that returns numeric value', () => {
      const r = new Randomizer(defaultWeights);

      assert.throws(() => r.choose(() => 'not a number'), RandomizerArgumentError);
    });


    it('Calculates correctly for OK weights', () => {

      weightsVariants.forEach(weights => {

        const r = new Randomizer(weights);


        let sum = 0;

        weights.forEach(el => {
          const [weight, result] = el;

          const expectedResult = (sum + (weight / 2)) / r.weightsSum;

          assert.equal(r.choose(() => expectedResult), result);

          sum += weight;
        });

      });

    });

  });


});