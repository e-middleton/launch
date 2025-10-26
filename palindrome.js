

/**
 * Function to determine if a phrase, word, or input (provided as a string) is a palindrom
 * @param {string} input the given input to be checked (case sensitive)
 * @returns {boolean} true or false the input is a palindrom
 */
const isPalindrome = (input) => {
  let left = 0;
  let right = input.length - 1;

  // two pointer technique scans the input from either end for efficiency
  while (left < right) {
    if (input.charAt(left) !== input.charAt(right)) {
      return false;
    }
    left = left + 1;
    right = right - 1;
  }

  return true;
}

console.log(palindrome('')); // correctly returns true, the empty string is a palindrome
console.log(palindrome('m')); // single character is a palindrome
console.log(palindrome('mooooooooooooom'))
console.log(palindrome('ma')); // not a palindrome

console.log(palindrome('Mom'));