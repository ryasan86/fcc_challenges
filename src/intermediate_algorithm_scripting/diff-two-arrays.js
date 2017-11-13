function diffArray(arr1, arr2) {
  var newArr = arr1.concat(arr2);
  function check(element) {
    if (arr1.indexOf(element) === -1 || arr2.indexOf(element) === -1) {
      return element;
    }
  }
  return newArr.filter(check);
}

function assertEqual(actual, expected) {
  var areEqualLength = actual.length === expected.length;
  var areEqualValues = actual.every((actuali, i) => {
    return actuali === expected[i];
  });
  if (areEqualLength && areEqualValues) {
    console.log('PASS');
  } else {
    console.log('FAIL');
    console.log(actual);
  }
}

assertEqual(
  diffArray(
    ['diorite', 'andesite', 'grass', 'dirt', 'pink wool', 'dead shrub'],
    ['diorite', 'andesite', 'grass', 'dirt', 'dead shrub']
  ),
  ['pink wool']
);