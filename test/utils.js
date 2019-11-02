const { it, describe } = require('mocha');
const { assert } = require('chai');

const { sum, minmax } = require('../src/utils');


describe('Utils', () => {

  describe('#sum', () => {

    it('Returns sum of numbers provided in array', () => {
      assert.equal(sum([1, 2, 3, 4, 5]), 15);
    });

  });


  describe('#minmax', () => {

    it('Returns normalized value in new range', () => {
      assert.equal(minmax(5, 0, 10, 0, 100), 50);
    });

  });

});