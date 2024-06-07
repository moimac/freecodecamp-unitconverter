function ConvertHandler() {
  const units = ['L', 'gal', 'lbs', 'kg', 'mi', 'km'];
  const initials = ['l', 'g', 'k', 'm'];
  // const validatorRegex = /^\d+([/.]\d+)*(\/\d+)*([/.]\d+)*\d/;
  // const validatorRegex = /^\d+(\\.\d+)*(\/\d+)*(\\.\d+)*\d/;
  // const validatorRegex = /^\d+(\/\d+)(\\.\d)/;
  // const validatorRegex = /^\d+([.]\d+)*(\/\d+)*\d/;
  const validatorRegex = /^\d+(\/\d+)*\d/;

  this.getNum = function (input) {
    let result;
    // if (input.includes('//')) return;
    if ((input.match(/\//g) || []).length > 1) return "invalidNum";
    // console.log((input.match(/,/g) || []).length); //logs 3
    const cleanInput = input.replace(/[^0-9.\/]/g, '');
    if (cleanInput.length === 0) return 1
    result = eval(cleanInput)
    if (isNaN(result)) return "invalidNum";
    return result;
  };

  this.getUnit = function (input) {
    let result;
    const lowerInput = input.toLowerCase();
    // litres
    if (lowerInput[lowerInput.length - 1] === initials[0]) {
      result = units[0];
    }
    // gallons
    if (lowerInput[lowerInput.length - 3] === initials[1]) {
      result = units[1];
    }
    // pounds
    if (lowerInput[lowerInput.length - 3] === initials[0] && lowerInput.includes(units[2])) {
      result = units[2];
    }
    // kilograms
    if (lowerInput[lowerInput.length - 2] === initials[2] && lowerInput.includes(units[3])) {
      result = units[3];
    }
    // miles
    if (lowerInput[lowerInput.length - 2] === initials[3]) {
      result = units[4];
    }
    // kilometers
    if (lowerInput[lowerInput.length - 2] === initials[2] && lowerInput.includes(units[5])) {
      result = units[5];
    }
    if (result === undefined) return "invalidUnit";
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case units[0].toLowerCase():
        result = units[1];
        break;
      case units[1]:
        result = units[0];
        break;
      case units[2]:
        result = units[3];
        break;
      case units[3]:
        result = units[2];
        break;
      case units[4]:
        result = units[5];
        break;
      case units[5]:
        result = units[4];
        break;
      default:
        result = initUnit;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit) {
      case units[0]:
        result = 'liters';
        break;
      case units[1]:
        result = 'gallons';
        break;
      case units[2]:
        result = 'pounds';
        break;
      case units[3]:
        result = 'kilograms';
        break;
      case units[4]:
        result = 'miles';
        break;
      case units[5]:
        result = 'kilometers';
        break;
      default:
        result = initUnit;
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    if (initNum === 0) return 0;
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case units[0]:
        result = initNum / galToL;
        break;
      case units[1]:
        result = initNum * galToL;
        break;
      case units[2]:
        result = initNum * lbsToKg;
        break;
      case units[3]:
        result = initNum / lbsToKg;
        break;
      case units[4]:
        result = initNum * miToKm;
        break;
      case units[5]:
        result = initNum / miToKm;
        break;
    }

    return Math.round(result * 1e5) / 1e5;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    // let finalUnit = returnUnit;
    // if (returnUnit === 'l') finalUnit = 'L';
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };

}

module.exports = ConvertHandler;
