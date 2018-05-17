
# sortilege

## Sort arrays containing any data type by given field(s)!

[![GitHub version](https://badge.fury.io/gh/dariorinaldi%2Fsort-everything.svg)](https://badge.fury.io/gh/dariorinaldi%2Fsort-everything)
[![NPM version](https://badge.fury.io/js/sortilege.svg)](http://badge.fury.io/js/sortilege)
[![Coverage Status](https://coveralls.io/repos/dariorinaldi/sort-everything/badge.svg)](https://coveralls.io/r/boennemann/badges)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

### Installation

**npm:**
`npm i -s sortilege`

**yarn:**
`yarn add sortilege`

**cdn:**
`work in progress`

  
---
### Usage

All you need to do is importing `sortilege` and apply the function to any array of **consistent data**.

Further options are allowed.
  
```es6
import sort from "sortilege";
    
const simpleArray = ["pineapple","apple","pen","penpineapple"];
    
return sort(mySimpleArray); 
// ["apple","pen","penpinapple","pinapple"];
```

You can sort an array of objects. If no options are specified, sortilege uses 
the first non-object field it finds traversing the tree.
	
```es6
const objectsArray = [
	{ name: { text: "luke", value: 9172 } },
	{ name: { text: "andrew", value: 346 } },
	{ name: { text: "mary", value: 346 } },
	{ name: { text: "andrew", value: 1246 } }
];
    
return sort(objectsArray);
// sortilege used the field [text] to sort
// [
//    { name: { text: "andrew", value: 346 } },
//    { name: { text: "andrew", value: 1246 } },
//    { name: { text: "luke", value: 9172 } },
//    { name: { text: "mary", value: 346 } },
// ];
```

### Options

`sortilege` accepts an object of options to set direction of sorting, sorting parameter(s) and handling of errors.

    import _sort from 'sortilege';
	const myArray = [
	 { name: { text: "luke", value: 9172 } },
	 { name: { text: "andrew", value: 346 } },
	 { name: { text: "mary", value: 346 } },
	 { name: { text: "andrew", value: 1246 } }
	];

	return _sort(myArray,{sortDir:'DESC', sortBy:['name.text','name.value'],throwError:true});
    -> [
	 { name: { text: "mary", value: 346 } },
	 { name: { text: "luke", value: 9172 } },
	 { name: { text: "andrew", value: 1246 } },
	 { name: { text: "andrew", value: 346 } },
	];

In the previous example our dataset is sorted in descending order, by text and value, and in case of errors in sorting (i.e. specified fields not found in dataset) throws an error in console.

---
### Options formatting

-  `sortDir` : `string` -> defines direction of sorting
	- format: `"ASC"`,`"DESC"`
	- default value: `"ASC"`
	- fallback: `"ASC"`

  
-  `sortBy` : `string` or `array of strings` (not used for array of numbers, array of strings). -> defines for which value(s) the array has to be sorted, first is most important, last least important
	- format: nested values are dot separated (e.g. `sortBy:["value.0.text","value.data"]`)
	- default value: `null`
	- fallback: first primitive (string or number) found in dataset descending the data tree


-  `throwError` : `boolean` -> defines if we want to throw errors in console
	- default value: `false`
