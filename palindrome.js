
/**
 * Function to determine if a phrase, word, or input (provided as a string) is a palindrome
 * @param {string} input the given input to be checked 
 * @returns {boolean} true or false the input is a palindrome
 */
const isPalindrome = (input) => {
  // cleans the input by converting to lower case and removing whitespace
  const word = input.toLowerCase();
  // cleaning punctuation allows 'a man a plan a canal: Panama' example to pass
  const cleanWord = word.replaceAll(/[^a-zA-Z0-9]/g, '');

  let left = 0;
  let right = cleanWord.length - 1;

  // two pointer technique scans the input from either end for efficiency
  while (left < right) {
    if (cleanWord.charAt(left) !== cleanWord.charAt(right)) {
      return false;
    }
    left = left + 1;
    right = right - 1;
  }

  return true;
}

// testing a complicated phrase with whitespace, capitals, and punctuation
console.log(isPalindrome('a man a plan a canal: Panama'));

// empty string
console.log(isPalindrome(''));

// single character
console.log(isPalindrome('m'));

// typical palindrome
console.log(isPalindrome('mom'));

// numerical palindrome provided as a string
console.log(isPalindrome('404'));

// test failure, nonpalindrome
console.log(isPalindrome('not a palindrome'));
