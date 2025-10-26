
// function declaration for a function that determines
// the correct output for a numerical input num, counting from 1 - num (inclusive)
const yeeHaw = num => {

  for (let i = 1; i <= num; i++) {
    let result = "";

    if (i % 3 == 0) {       // divisible by 3
      result = result.concat("yee");
    } 
    if (i % 4 == 0) {       // divisible by 4
      result = result.concat("haw");
    }
    
    result ? console.log(result) : console.log(i); // if the string has been assigned, print string result, else print number
  }
}

yeeHaw(12); // test case including numbers, yee, haw, and yeehaw outputs