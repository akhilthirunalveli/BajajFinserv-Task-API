const express = require("express");
const app = express();
app.use(express.json());

// My Details 
const FULL_NAME = "AkhilThirunalveli";  
const DOB = "05092004";       // format: ddmmyyyy
const EMAIL = "thirunalveliakhilbhaskar@vitbhopal.ac.in";
const ROLL_NUMBER = "22BET10003";

//
function alternatingCapsReverse(str) {
  let reversed = str.split("").reverse().join("");
  return reversed
    .split("")
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const inputArray = req.body.data;

    let even = [];
    let odd = [];
    let alphabets = [];
    let specials = [];
    let sum = 0;
    let allAlphabets = [];

    for (let item of inputArray) {
      if (!isNaN(item) && item.trim() !== "") {
        // numbers
        let num = parseInt(item, 10);
        if (!isNaN(num)) {
          if (num % 2 === 0) even.push(item.toString());
          else odd.push(item.toString());
          sum += num;
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // alphabets
        alphabets.push(item.toUpperCase());
        allAlphabets.push(item);
      } else {
        // special characters
        specials.push(item);
      }
    }

    const concatString = alternatingCapsReverse(allAlphabets.join(""));

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphabets,
      special_characters: specials,
      sum: sum.toString(),
      concat_string: concatString,
    });
  } catch (error) {
    return res.status(500).json({ is_success: false, error: error.message });
  }
});

// For local dev
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
