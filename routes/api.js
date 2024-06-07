'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  app.get("/api/convert", (req, res) => {
    const { input } = req.query;
    if (!input) {
      return res.send("invalid input");
    }
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === 'invalidNum' && initUnit === 'invalidUnit') {
      console.log('invalidNum && invalidUnit');
      res.send({ error: 'invalid number and unit' });
      return;
    }
    if (initNum === 'invalidNum') {
      console.log('invalidNum');
      res.send({ error: 'invalid number' });
      return;
    }
    if (initUnit === 'invalidUnit') {
      console.log('invalidUnit');
      res.send({ error: 'invalid unit' });
      return;
    }
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    const response = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    };
    console.log(response);
    res.send(response);
  });
};
