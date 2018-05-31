<img src="sortilege.png" width="60%" />

Sort arrays containing any data type by given field(s)!


[![NPM version](https://badge.fury.io/js/sortilege.svg)](http://badge.fury.io/js/sortilege)
[![Maintainability](https://api.codeclimate.com/v1/badges/b25fd10bf3b959010821/maintainability)](https://codeclimate.com/github/dariorinaldi/sortilege/maintainability)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

## Installation

**npm:**
`npm i -s sortilege`

**yarn:**
`yarn add sortilege`

**unpkg:**
`https://unpkg.com/sortilege`

## Usage

_Sortilege_ is a function which accepts an `array` to sort and an optional `options` object and returns a sorted array.

```javascript
const sorted = sortilege(array[, options])
```

The most basic example is about sorting a simple array of strings. It sorts in ascending order by default:

```javascript
import sort from "sortilege";

const simpleArray = ["pineapple", "apple", "banana", "pear"];

return sort(simpleArray);
// ["apple","banana","pear","pinapple"];
```

If an array of objects is passed in, when no options are specified, sortilege uses
the first non-object field it finds traversing the tree.

```javascript
const users = [
  { user: { name: "luke", age: 32 } },
  { user: { name: "andrew", age: 40 } },
  { user: { name: "mary", age: 43 } },
  { user: { name: "andrew", age: 29 } }
];

return sort(users);
// the field [name] is used to sort
// [
// { user: { name: "andrew", age: 43 } },
// { user: { name: "andrew", age: 29 } },
// { user: { name: "luke", age: 32 } },
// { user: { name: "mary", age: 43 } },
// ];
```

If an array of arrays is passed in, sortilege uses the 0th element of the children arrays to sort by.

```javascript
const users = [
  ["Mark", "Ross", 30, "Student"],
  ["Paul", "White", 29, "Student"],
  ["Jessica", "Bishop", 32, "Artist"]
];

return sort(users);
// the element with index 0 is used to sort by
// [
// ["Jessica", "Bishop", 32, "Artist"]
// ["Mark", "Ross", 30, "Student"],
// ["Paul", "White", 29, "Student"],
// ]
```

## Options

The `options` object is _optional_ and has the following structure:

```javascript
const options = {
  sortDir: string, // specifies the direction of sort. Possible values are ASC (default) and DESC
  sortBy: string | array[string], // specifies the field(s) to sort by. See above for more details.
  throwError: bool // specifies whether or not an error has to be thrown in case of issues
};
```

### sortDir

With `sortDir` you can specify the sort direction. It accepts both `"ASC"` and `"DESC"`. By default it is set to `"ASC"`.

```javascript
const users = [
  { user: { name: "luke", age: 32 } },
  { user: { name: "andrew", age: 40 } },
  { user: { name: "mary", age: 43 } },
  { user: { name: "andrew", age: 29 } }
];

return sort(users, { sortDir: "DESC" });
// the field [name] is used to sort
// [
// { user: { name: "luke", age: 32 } },
// { user: { name: "mary", age: 43 } },
// { user: { name: "andrew", age: 40 } },
// { user: { name: "andrew", age: 29 } }
// ];
```

In the previous example our array is sorted, in descending order, by the first valuable field which is `name`.

### sortBy

Specifies the field(s) the array is sorted by.

**It must refer to _non-object_ and _non-array_ field. It can have the following formats.**

---

#### Single field

It finds the field specified inside the object and sort by it.

```javascript
sortBy: "field";
```

Example:

```javascript
const users = [
  { id: 1, name: "luke", age: 32 },
  { id: 2, name: "andrew", age: 40 },
  { id: 3, name: "mary", age: 43 },
  { id: 4, name: "andrew", age: 29 }
];

return sort(users, { sortBy: "age", sortDir: "DESC" });
// [
// { id: 3, name: "mary", age: 43 },
// { id: 2, name: "andrew", age: 40 },
// { id: 1, name: "luke", age: 32 },
// { id: 4, name: "andrew", age: 29 },
// ]
```

It is possible to use `.` to access fields on nested objects. In this case just the last field in the path has to be a _non-object_ and _non-array_ type. It is recursive so there is no limit to the nesting levels.

```javascript
sortBy: "field.subfield";
```

Example:

```javascript
const users = [
  { id: 1, name: "luke", address: { city: { name: "Manchester", zipCode: "" } } },
  { id: 2, name: "andrew", address: { city: { name: "Berlin", zipCode: "" } } },
  { id: 3, name: "mary", address: { city: { name: "Paris", zipCode: "" } } },
  { id: 4, name: "andrew", address: { city: { name: "Bruxelles", zipCode: "" } } }
];

return sort(users, { sortBy: "address.city.name", sortDir: "DESC" });
// [
// { id: 3, name: "mary", address: { city:{ name: "Paris", zipCode: "" } } },
// { id: 1, name: "luke", address: { city:{ name: "Manchester", zipCode: "" } } },
// { id: 4, name: "andrew", address: { city:{ name: "Bruxelles", zipCode: "" } } },
// { id: 2, name: "andrew", address: { city:{ name: "Berlin", zipCode: "" } } },
// ]
```

In case of array of arrays, `sortBy` can specify the index of the element the array has to be sort by.

```javascript
const users = [
  ["Mark", "Ross", 30, "Student"],
  ["Paul", "White", 29, "Student"],
  ["Jessica", "Bishop", 32, "Artist"]
];

return sort(users, { sortBy: "2", sortDir: "DESC" });
// [
// ["Jessica", "Bishop", 32, "Artist"],
// ["Mark", "Ross", 30, "Student"],
// ["Paul", "White", 29, "Student"],
// ]
```
---
#### Multiple fields

It is possible to sort by multiple fields. To accomplish this, you can pass to sortBy an array of fields.
The order in the array is important: the leftmost field is the most important in the sort, the rightmost the less important.

```javascript
sortBy: ["field1", "field2", "field3.subfield"];
```

Example:

```javascript
const users = [
  { id: 1, name: "luke", address: { city: { name: "Paris", zipCode: "" } } },
  { id: 2, name: "andrew", address: { city: { name: "Bruxelles", zipCode: "" } } },
  { id: 3, name: "mary", address: { city: { name: "Manchester", zipCode: "" } } },
  { id: 4, name: "andrew", address: { city: { name: "Berlin", zipCode: "" } } }
];

return sort(users, { sortBy: ["name", "address.city.name"] });
// [
// { id: 4, name: "andrew", address: { city: { name: "Berlin", zipCode: "" } } }
// { id: 2, name: "andrew", address: { city: { name: "Bruxelles", zipCode: "" } } },
// { id: 1, name: "luke", address: { city: { name: "Paris", zipCode: "" } } },
// { id: 3, name: "mary", address: { city: { name: "Manchester", zipCode: "" } } },
// ]
```

### throwError

If `throwError` is set to false (default), in case of error `sortilege` fails silently and returns the passed array as is.
When `throwError` is set to true instead, an Error is thrown.
Example:

```javascript
const inconsistentUsers = [
  { id: 1, name: "luke", age: 32 },
  { id: 2, age: 40 },
  { id: 3, name: "mary", age: 43 },
  { id: 4, name: "andrew", age: 29 }
];

return sort(inconsistentUsers, {
  sortBy: "name",
  sortDir: "DESC",
  throwError: true
});
// Error: "Specified sortBy (name) has not been found on item { id: 2, age: 40 }"
```

## Changelog
[CHANGES.md](https://github.com/dariorinaldi/sortilege/blob/master/CHANGES.md)

## License

MIT © [Dario Rinaldi](https://github.com/dariorinaldi) & [Emiliano Costanzo](https://github.com/Emi-C)
