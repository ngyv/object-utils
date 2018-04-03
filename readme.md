# object-utils [![Build Status](https://travis-ci.org/ngyv/object-utils.svg?branch=master)](https://travis-ci.org/ngyv/object-utils)

> Object getter setters


## Install

```
$ npm install @ngyv/object-utils
```


## Usage

```js
import objectUtils from '@ngyv/object-utils';

let car = {
  type: 'Fancy',
  manufactured: {
    country: 'Malaysia',
    year: 2018,
  },
};

objectUtils.get(car, 'manufactured.year');
//=> 2018

objectUtils.set(car, 'certification.year', 2017);
//=> {
//     type: 'Fancy',
//     manufactured: {
//       country: 'Malaysia',
//       year: 2018,
//     },
//     certification: {
//       year: 2017,
//     }
//   }

let anotherCar = {
  type: 'Mediocre',
  certification: false,
};

objectUtils.pluckSubset(anotherCar, car, car);
//=> {
//     type: 'Fancy',
//   }

objectUtils.difference(anotherCar, car);
//=> {
//     type: ['Mediocre', 'Fancy'],
//   }

objectUtils.mergeObject({ ate: true }, 'string', 10, [], { hashbrown: 'breakfast' });
//=> { ate: true, hashbrown: 'breakfast' }


let objectFunction = { sing() { this.lyrics = 'Hello,'; } };
let anotherObjectFunction = { sing() { this.lyrics += " it's me";  } };
const mergedObjectFunctions = objectUtils.mergeObject(objectFunction, anotherObjectFunction);

mergedObjectFunctions.sing();
mergedObjectFunctions.lyrics;
//=> "Hello, it's me"
//=>
```


## License

MIT © [Yvonne Ng](http://github.com/ngyv)
