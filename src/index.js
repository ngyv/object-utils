import { types, identify, isEqual, compareType } from '@ngyv/prop-utils';
import camelcase from 'lodash.camelcase';
import intersection from 'lodash.intersection';

const get = function (obj, keys, delimiter = '.') {
  return keys.split(delimiter).reduce((obj, key) => {
    return obj[key];
  }, obj);
};

const setKeyString = function (obj, keyString, value, delimiter = '.') {
  keyString.split(delimiter).reduce((obj, key, index, array) => {
    if (index === array.length - 1) {
      obj[key] = value;
    }
    return obj[key];
  }, obj);
  return obj;
};

const setObject = function (obj, setObj, keyFormatter = camelcase) {
  Object.keys(setObj).forEach(key => {
    obj[keyFormatter(key)] = setObj[key];
  });
  return obj;
};

const set = function (obj, keyStringObject, values) {
  const keysType = identify(keyStringObject);
  if (keysType === types.string) {
    return setKeyString(obj, keyStringObject, values);
  } else if (keysType === types.object) {
    values = values || keyStringObject
    return setObject(obj, values);
  }
};

const pushObject = function (array, object) {
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
const pluckSubset = function (subset, superset, setValues, keyFormatter = camelcase) {
  const subsetKeys = Object.keys(subset);
  const supersetKeys = Object.keys(superset);
  return intersection(subsetKeys, supersetKeys).reduce((newObject, key) => {
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
const difference = function (objA, objB) {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  return intersection(keysA, keysB).reduce((difference, key) => {
    if (!isEqual(objA[key], objB[key])) {
      difference[key] = [objA[key], objB[key]];
    }
    return difference;
  }, {});
};

/**
 * Merges objects that stacks object functions with same key instead of overriding the previous
 * @return {[object]}
 */
const mergeObject = function () {
  let newObject = {};
  [...arguments].forEach((toMergeObject) => {
    // only want to merge objects
    const toMergeObjectType = identify(toMergeObject);
    if (toMergeObjectType !== types.object) { return; }

    Object.keys(toMergeObject).forEach((option) => {
      const newObjectPropertyType = identify(newObject[option]);
      const toMergePropertyType = identify(toMergeObject[option]);

      if (newObjectPropertyType === types.function && toMergePropertyType === types.function) {
        const originalFunc = newObject[option];
        newObject[option] = function(...args) {
          originalFunc.call(newObject, ...args); // so that the function can access the whole object
          toMergeObject[option].call(newObject, ...args);
        };
      } else {
        newObject[option] = toMergeObject[option];
      }
    });
  });
  return newObject;
}

export default {
  get,
  setKeyString,
  setObject,
  set,
  pushObject,
  pluckSubset,
  difference,
  mergeObject
}
