function anagrams(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const charFrequency = new Map();

  for (let char of str1) {
    charFrequency.set(char, (charFrequency.get(char) || 0) + 1);
  }

  for (let char of str2) {
    if (!charFrequency.has(char) || charFrequency.get(char) === 0) {
      return false;
    }
    charFrequency.set(char, charFrequency.get(char) - 1);
  }

  return true;
}


function commonElements(arr1, arr2) {
  const set = new Set(arr1);
  const result = [];

  for(let num of arr2) {
    if(set.has(num)) {
      result.push(num);
      set.delete(num);
    }
  }

  return result;
}


function duplicate(arr) {
  const seen = new Set();

  for (const num of arr) {
    if (seen.has(num)) {
      return num;
    }
    seen.add(num);
  }

  return undefined;
}


function twoSum(nums, target) {
  const seen = new Set();

  for(const num of nums) {
    const complement = target - num;

    if(seen.has(complement)) {
      return true;
    }

    seen.add(num);
  }

  return false;
}


function wordPattern(pattern, strings) {
  const charToStr = new Map();
  const strToChar = new Map();

  for(let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const str = strings[i];

    if(charToStr.has(char)) {
      if(charToStr.get(char) !== str) {
        return false;
      }
    } else {
      if(strToChar.has(str)) {
        return false;
      }

      charToStr.set(char, str);
      strToChar.set(str, char);
    }
  }

  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
