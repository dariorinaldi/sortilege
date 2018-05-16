# sort-any-array
>## Sort arrays containing any data type by given field(s)!

## Installation

    npm i --save sort-any-aray

## Usage
All you need to do is importing `sort-any-array` and apply the function to any array of **consistent data**. 
Further options are allowed. 

    import _sort from 'sort-any-array';
    const myArray=["pineapple","apple","pen","penpineapple"];
   
    return _sort(myArray);
	-> ["apple","pen","penpinapple","pinapple"];
---
    import _sort from 'sort-any-array';
    const myArray=const items = [
	  { name: { text: "luke", value: 9172 } },
	  { name: { text: "andrew", value: 346 } },
	  { name: { text: "mary", value: 346 } },
	  { name: { text: "paul", value: 1346 } },
	  { name: { text: "andrew", value: 1246 } }
	];
	
    return _sort(myArray,{sortDir:'ASC',throwError:true});
	-> [
		{ name: { text: "andrew", value: 346 } },
		{ name: { text: "andrew", value: 1246 } },
		{ name: { text: "luke", value: 9172 } },
		{ name: { text: "mary", value: 346 } },
		{ name: { text: "paul", value: 1346 } }
	];


## Options
`sort-any-array` accepts an object of options to set direction of sorting, sorting parameter(s) and handling of errors.


      import _sort from 'sort-any-array';
      const myArray=const items = [
	  { name: { text: "luke", value: 9172 } },
	  { name: { text: "andrew", value: 346 } },
	  { name: { text: "mary", value: 346 } },
	  { name: { text: "paul", value: 1346 } },
	  { name: { text: "andrew", value: 1246 } }
	];
	
    return _sort(myArray,{sortDir:'DESC', sortBy:['name.text','name.value'],throwError:true});
	-> [
		{ name: { text: "paul", value: 1346 } },
		{ name: { text: "mary", value: 346 } },
		{ name: { text: "luke", value: 9172 } },
		{ name: { text: "andrew", value: 1246 } },
		{ name: { text: "andrew", value: 346 } },
	];
In the previous example our dataset is sorted in descending order, by text and value, and in case of errors in sorting (i.e. specified fields not found in dataset) throws an error in console.
### Options formatting
- `sortDir` : `string` -> defines direction of sorting
  - format: `"ASC"`,`"DESC"`
  - default value: `"ASC"`
  - fallback: `"ASC"`

- `sortBy` : `string` or `array of strings` (not used for array of numbers, array of strings). -> defines for which value(s) the array has to be sorted, first is most important, last least important
  - format: nested values are dot separated (e.g. `sortBy:["value.0.text","value.data"]`)
  - default value: `null`
  - fallback: first primitive (string or number) found in dataset

- `throwError` : `boolean` -> defines if we want to throw errors in console
    -  default value: `false`

