

/**
 * Function that only accepts a number, 
 * and returns an array that counts up to that number from 1
 * but every multiple of 3 is 'yee' and every multiple of 4 is 'haw'
 * every multiple of both is 'yeehaw'
 * @param {number} num 
 * @returns {Array} the numbers and strings resulting from counting up to the input number.
 */
const yeeHaw = (num) => {

  if(typeof(num) !== 'number') {
    throw new Error('Input must be a number');
  }

  const result = [];

  for (let i = 1; i <= num; i++) {
    let temp = '';

    if(i % 3 === 0) {       // divisible by 3
      temp = temp.concat('yee');
    } 
    if(i % 4 === 0) {       // divisible by 4
      temp = temp.concat('haw');
    }
    
    // checks if the string has been assigned, if not, pushes the number
    temp ? result.push(temp) : result.push(i); 
  }

  return result;
}

// test case including numbers, yee, haw, and yeehaw outputs
console.log(yeeHaw(15)); 

// test case for 0
console.log(yeeHaw(0));

// test case for invalid input
try {
  // WILL FAIL, EMPTY INPUT
  yeeHaw(); 
} catch (error) {
  // gives warning about the input not being a number
  console.error(error);
}