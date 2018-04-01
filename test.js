import test from 'ava';
import utils from './lib';

test('Gets nested property in object with default delimiter', t => {
	const { get } = utils;
	const obj = {
		info: {
			name: 'Enno',
		},
	};
	t.is(get(obj, 'info.name'), obj.info.name);
});

test('Sets nested property on object with default delimiter', t => {
	const { setKeyString } = utils;
	let obj = {
		info: {
			name: 'Enno',
			hobby: 'Watching water ripples',
		},
	};
	setKeyString(obj, 'info.hobby', 'Swimming')
	t.is(obj.info.hobby, 'Swimming');
});

test('Sets object properties on object with default key formatter', t => {
	const { setObject } = utils;
	let obj = {
		info: {
			name: 'Enno',
		},
	};
	const person2 = {
		info: {
			hobby: 'Watching water ripples',
		},
		age: 10
	};
	setObject(obj, person2);
	t.is(obj.age, person2.age, 'Sets property one level deep');
	t.is(obj.info.hobby, person2.info.hobby, 'Sets property two levels deep');
});

test('Set value on object with keyString', t => {
	const { set } = utils;
	let obj = {
		info: {
			name: 'Enno',
		},
	};
	set(obj, 'info.age', 21);
	t.is(obj.info.age, 21);
});

test('Set value on object with object', t => {
	const { set } = utils;
	let obj = {
		info: {
			name: 'Enno',
		},
	};
	const person2 = {
		info: {
			hobby: 'Watching water ripples',
		},
		age: 10
	};
	const values = {
		info: undefined,
		name: 'Oneke',
		age: 19,
	}
	set(obj, person2);
	t.is(obj.info.hobby, person2.info.hobby, 'Sets value without "values"');
	set(obj, person2, values);
	t.is(obj.info, undefined, 'Sets value using "values"');
});

test('Pushes object in array', t => {
	const { pushObject } = utils;
	const obj = {
		name: 'Oneke',
	};
	const obj2 = {
		address: null,
	};
	let array = [obj];
	const pushedObject = pushObject(undefined, obj);
	t.deepEqual(pushedObject, [obj], 'Pushes object when array provided is not an array');
	const populatedArray = pushObject(array, obj2);
	t.deepEqual(populatedArray, [obj, obj2], 'Pushes object in populated array');
});

test('Plucks a subset of values from object with default key formatter', t => {
	const { pluckSubset } = utils;
	const subset = {
		name: 'Oneke',
		age: 19,
	};
	const superset = {
		name: 'Sundberg',
		age: 31,
		hobby: 'Swimming',
	};
	const pluckedObject = pluckSubset(subset, superset, superset);
	t.is(subset.name, 'Oneke', 'Does not modify original subset');
	t.is(superset.name, 'Sundberg', 'Does not modify original superset');
	t.deepEqual(pluckedObject, {name: 'Sundberg', age: 31}, 'Plucks a subset from the values provided');
});

test('Gets difference between two objects', t => {
	const { difference } = utils;
	const subset = {
		name: 'Oneke',
		age: 19,
	};
	const superset = {
		name: 'Sundberg',
		age: 31,
		hobby: 'Swimming',
	};
	const changes = difference(subset, superset);
	t.is(changes.hobby, undefined, 'Does not record changes in non-intersection of property keys');
	t.deepEqual(changes, { name: ['Oneke', 'Sundberg'], age: [19, 31] });
});
