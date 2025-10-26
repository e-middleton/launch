// Write a function that will tell me if a phrase, word, or input (provided as a string) is a palindrome.

// function declaration for a method to determine if an input is a palindrome
// input is case sensitive, so "mom" evaluates to a palindrome, but "Mom" will not.
const palindrome = input => {
    let left = 0;
    let right = input.length - 1;

    // two pointers approach to scan the input, one pointer begins at the left end while the other begins at the right
    while (left < right) {

        if (input.charAt(left) != input.charAt(right)) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

console.log(palindrome('')); // correctly returns true, the empty string is a palindrome
console.log(palindrome('m')); // single character is a palindrome
console.log(palindrome('mooooooooooooom'))
console.log(palindrome('ma')); // not a palindrome

console.log(palindrome('Mom'));