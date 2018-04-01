'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propUtils = require('@ngyv/prop-utils');

var _lodash = require('lodash.camelcase');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.intersection');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = function get(obj, keys) {
  var delimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';

  return keys.split(delimiter).reduce(function (obj, key) {
    return obj[key];
  }, obj);
};

var setKeyString = function setKeyString(obj, keyString, value) {
  var delimiter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';

  keyString.split(delimiter).reduce(function (obj, key, index, array) {
    if (index === array.length - 1) {
      obj[key] = value;
    }
    return obj[key];
  }, obj);
  return obj;
};

var setObject = function setObject(obj, setObj) {
  var keyFormatter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _lodash2.default;

  Object.keys(setObj).forEach(function (key) {
    obj[keyFormatter(key)] = setObj[key];
  });
  return obj;
};

var set = function set(obj, keyStringObject, values) {
  var keysType = (0, _propUtils.identify)(keyStringObject);
  if (keysType === _propUtils.types.string) {
    return setKeyString(obj, keyStringObject, values);
  } else if (keysType === _propUtils.types.object) {
    values = values || keyStringObject;
    return setObject(obj, values);
  }
};

var pushObject = function pushObject(array, object) {
  if (!Array.isArray(array)) {
    array = [];
  }
  array.push(object);
  return array;
};

/**
 * [pluckObject gets one level deep of objects' keys intersection]
 * @param  {[object]} subset     [the subset of keys]
 * @param  {[object]} superset   [the superset of keys]
 * @param  {[object]} setValues    [the values that should be set on object returned]
 * @param  {[function]} keyFormatter [i.e. camelcase]
 * @return {[object]}
 */
var pluckSubset = function pluckSubset(subset, superset, setValues) {
  var keyFormatter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _lodash2.default;

  var subsetKeys = Object.keys(subset);
  var supersetKeys = Object.keys(superset);
  return (0, _lodash4.default)(subsetKeys, supersetKeys).reduce(function (newObject, key) {
    newObject[keyFormatter(key)] = setValues[key];
    return newObject;
  }, {});
};

/**
 * The order and references of result values are determined by the first object.
 * [difference between two objects]
 * @param  {[object]} objA
 * @param  {[object]} objB
 * @return { key: [beforeValue, afterValue] }      [difference of both objects by keys]
 */
var difference = function difference(objA, objB) {
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  return (0, _lodash4.default)(keysA, keysB).reduce(function (difference, key) {
    if (!(0, _propUtils.isEqual)(objA[key], objB[key])) {
      difference[key] = [objA[key], objB[key]];
    }
    return difference;
  }, {});
};

exports.default = {
  get: get,
  setKeyString: setKeyString,
  setObject: setObject,
  set: set,
  pushObject: pushObject,
  pluckSubset: pluckSubset,
  difference: difference
};