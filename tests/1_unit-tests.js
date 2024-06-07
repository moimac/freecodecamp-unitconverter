const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite("Input number Validation", function () {
    test("should correctly read a whole number input.", function () {
      assert.equal(convertHandler.getNum("123"), 123);
    });
    test("should correctly read a decimal number input.", function () {
      assert.equal(convertHandler.getNum("123.45"), 123.45);
    });
    test("should correctly read a fractional input.", function () {
      assert.equal(convertHandler.getNum("123/45"), eval("123/45"));
    });
    test("should correctly read a fractional input with a decimal.", function () {
      assert.equal(convertHandler.getNum("123.4/567.8"), eval("123.4/567.8"));
    });

  });
  suite("Wrong input number Validation", function () {
    // convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    test("should correctly return an error on a double-fraction", function () {
      assert.equal(convertHandler.getNum("3/2/3"), "invalidNum");
    });
    // convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    test("should correctly default to a numerical input of 1", function () {
      assert.equal(convertHandler.getNum("kg"), 1);
    });
  });

  suite("Input unit Validation", function () {

    // convertHandler should correctly read each valid input unit.
    test("should correctly read each valid input unit", function () {
      assert.equal(convertHandler.getUnit("l"), "L");
      assert.equal(convertHandler.getUnit("gal"), "gal");
      assert.equal(convertHandler.getUnit("mi"), "mi");
      assert.equal(convertHandler.getUnit("km"), "km");
      assert.equal(convertHandler.getUnit("lbs"), "lbs");
      assert.equal(convertHandler.getUnit("kg"), "kg");
    });
    // convertHandler should correctly return an error for an invalid input unit.
    test("should correctly return an error for an invalid input unit", function () {
      assert.equal(convertHandler.getUnit("Lit"), 'invalidUnit');
      assert.equal(convertHandler.getUnit("g"), 'invalidUnit');
      assert.equal(convertHandler.getUnit("m"), 'invalidUnit');
      assert.equal(convertHandler.getUnit("k"), 'invalidUnit');
      assert.equal(convertHandler.getUnit("lb"), 'invalidUnit');
      assert.equal(convertHandler.getUnit("kgs"), 'invalidUnit');
    });
    // convertHandler should return the correct return unit for each valid input unit.
    test("should return the correct return unit for each valid input unit", function () {
      assert.equal(convertHandler.getReturnUnit("l"), "gal");
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    })
  });
  suite("Spell-out unit Validation", function () {
    // convertHandler should correctly return the spelled-out string unit for each valid input unit.
    test("should correctly return the spelled-out string unit for each valid input unit", function () {
      assert.equal(convertHandler.spellOutUnit("L"), "liters");
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
      assert.equal(convertHandler.spellOutUnit("mi"), "miles");
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
      assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
      assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    });

  });
  suite("Conversion Validation", function () {
    // convertHandler should correctly convert gal to L.
    test("should correctly convert gal to L", function () {
      assert.equal(convertHandler.convert(10, "gal"), 37.8541);
    });
    // convertHandler should correctly convert L to gal.
    test("should correctly convert L to gal", function () {
      assert.equal(convertHandler.convert(10, "L"), 2.64172);
    });
    // convertHandler should correctly convert mi to km.
    test("should correctly convert mi to km", function () {
      assert.equal(convertHandler.convert(10, "mi"), 16.0934);
    });
    // convertHandler should correctly convert km to mi.
    test("should correctly convert km to mi", function () {
      assert.equal(convertHandler.convert(10, "km"), 6.21373);
    });
    // convertHandler should correctly convert lbs to kg.
    test("should correctly convert lbs to kg", function () {
      assert.equal(convertHandler.convert(10, "lbs"), 4.53592);
    });
    // convertHandler should correctly convert kg to lbs.
    test("should correctly convert kg to lbs", function () {
      assert.equal(convertHandler.convert(10, "kg"), 22.04624);
    });
  });
});