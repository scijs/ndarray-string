ndarray-string
==============
Turns a string into an [ndarray](https://github.com/mikolalysenko/ndarray)

## Example

```javascript
var ndstring = require("ndarray-string")

//Simple example:
var x = ndstring("foobar", [2,3])
console.log(ndstring.toString(x))

//Prints out:
//
//  ["foo", "bar"]
//


//Can also do fancier stuff.  For example, here are all rotations of "banana"
var y = ndstring("bananabanana", [6,6], [1,1])
console.log(ndstring.toString(y))

//Prints out:
//
//  [ 'banana', 'ananab', 'nanaba', 'anaban', 'nabana', 'abanan' ]
//
```

## Install

    npm install ndstring
    
## API

```javascript
var ndstring = require("ndarray-string")
```

### `ndstring(str[, shape, stride, offset])`
Constructs an ndarray view of str.  The values of the ndarray are the full unicode code points of `str`.  The resulting ndarray is a view of a 32 bit unsigned int typed array.

* `str` is the string which gets turned into an ndarray
* `shape` is the shape of the resulting ndarray
* `stride` is the stride of the ndarray
* `offset` is the offset

**Returns** An ndarray view of the code points of `str`

### `ndstring.toString(arr)`
Turns an ndarray view of a string into an array of strings.

* `arr` is an ndarray view of a string, for example created using the above method

**Returns** An array of native arrays of string with the same shape and stride as in the initial example.

## Credits
(c) 2013 Mikola Lysenko. MIT License