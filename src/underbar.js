(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {

    if(n === undefined)
      return array[array.length - 1]

    return n === 0 ? [] : array.slice(-n)
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    for(let key in collection)
    {
      if(Array.isArray(collection) && isNaN(key))
        continue

      key = !isNaN(key) ? Number(key) : key
      iterator(collection[key], key, collection)
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    let filtered = []

    _.each(collection, (value) => {
      if(test(value))
        filtered.push(value)
    })

    return filtered
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, (value) => !test(value))
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    let clean = [], uniq = []

    _.each(array, (value) => {
      clean[value] = ''
    })

    _.each(clean, (value, key) => {
      uniq.push(key)
    })

    return uniq
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    let arr = []
    _.each(collection, (value) => {
      arr.push(iterator(value))
    })
    return arr
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    if(accumulator === undefined)
    {
      accumulator = collection[0]
      collection = collection.slice(1)
    }
    _.each(collection, (value) => {
      accumulator = iterator(accumulator, value)
    })

    return accumulator
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    iterator = iterator || _.identity
    return _.reduce(collection, (isEvery, item) => {
      if(!isEvery) {
        return false
      }
      return !!iterator(item)

    }, true)
    // TIP: Try re-using reduce() here.
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // I don't see how to reuse _.every without altering the declaration

    iterator = iterator || _.identity
    return _.reduce(collection, (isSome, item) => {
      if(isSome) {
        return true
      }
      return !!iterator(item)

    }, false)
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    if(arguments.length < 2)
      return obj

    let args = Array.from(arguments);
    _.each(args.slice(1), (propertyObj) => {
      _.each(propertyObj, (propertyValue, propertyKey) => {
        obj[propertyKey] = propertyValue
      })
    })

    return obj
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    if(arguments.length < 2)
      return obj

    let args = Array.from(arguments);
    _.each(args.slice(1), (propertyObj) => {
      _.each(propertyObj, (propertyValue, propertyKey) => {
        if(!obj.hasOwnProperty(propertyKey))
          obj[propertyKey] = propertyValue
      })
    })

    return obj
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    let hashMap = {}
    return function() {
      if(hashMap[JSON.stringify(arguments)] === undefined)
        hashMap[JSON.stringify(arguments)] = func.apply(this, arguments);

      return hashMap[JSON.stringify(arguments)]
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
      let args = Array.from(arguments).slice(2)
    setTimeout(() => {
      func.apply(this, args)
    }, wait)
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice()
  _.shuffle = function(array) {
    let arrayShuffled = array.slice(), randIndex, temp
    for(let swapIndex = arrayShuffled.length - 1; swapIndex > 0; swapIndex--)
    {
      randIndex = Math.floor(Math.random() * (swapIndex + 1))
      temp = arrayShuffled[swapIndex]
      arrayShuffled[swapIndex] = arrayShuffled[randIndex]
      arrayShuffled[randIndex] = temp
    }

    return arrayShuffled
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    let isFunc = typeof functionOrKey === 'function'
    return _.map(collection, (value) => {
      let func = isFunc ? functionOrKey : value[functionOrKey]
      return func.apply(value, args)
    })
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if(typeof iterator === 'string')
      return collection.sort((obj1, obj2) => obj1[iterator] > obj2[iterator])

    return collection.sort((obj1, obj2) => iterator(obj1) > iterator(obj2))
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    let arrOfArrays = Array.from(arguments),
        arrZipped = [],
        maxLength = 0

     _.each(arrOfArrays, (arr) => { // find max length of all arrays
       if(arr.length > maxLength) maxLength = arr.length
     })

     for(let column = 0; column < maxLength; column++)
     {
      arrZipped.push([])
      for(let row = 0; row < arrOfArrays.length; row++)
        arrZipped[column].push(arrOfArrays[row][column])
      }

      return arrZipped
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || []

    _.each(nestedArray, (element) => {
      if(Array.isArray(element))
        _.flatten(element, result)
      else
        result.push(element)
    })

    return result
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    let arrOfArrays = Array.from(arguments),
        arrIntersection = [],
        hashmap = {}

    _.each(arrOfArrays, (arr) => {
      _.each(arr, (element) => {
        hashmap[element] = hashmap[element] ? hashmap[element] + 1 : 1
      })
    })

    _.each(hashmap, (value, key) => {
      if(value > 1)
        arrIntersection.push(key)
    })

    return arrIntersection
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    let arrIntersection = _.intersection(array, _.flatten(Array.from(arguments).slice(1)))
    return _.filter(array, (element) => !_.contains(arrIntersection, element))
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    let isRunning = false
    return function() {
      if(isRunning)
       return
      isRunning = true
      func() // may take a little longer than wait depending on length of func
      setTimeout(() => {
        isRunning = false
      }, wait)
    }
  };
}());
