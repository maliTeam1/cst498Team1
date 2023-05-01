/**
 * Required External Modules
 */
const { getRandomValues } = require("crypto");
const express = require("express");
const { write, readFileSync,appendFileSync, writeFileSync } = require("fs");
 const path = require("path");
 const mysql = require('mysql');

 recommendationMap = {
  "PRODUCTIVITY": "https://www.youtube.com/results?search_query=how+to+be+more+productive",
  "GOALS": "https://www.youtube.com/results?search_query=Meeting+Your+Goals",
  "SCHOOL": "https://www.youtube.com/results?search_query=tips+for+school"
 }


/**
 * App Variables
 */

 const app = express();
 const port = process.env.PORT || "3000";

/**
 *  App Configuration
 */

 app.set("views", path.join(__dirname, "views"));
 app.set("view engine", "pug");

 /**
 *  App Configuration
 */

// const dotenv = require("dotenv")
// dotenv.config()


let submitLink
let submitMsg


////////////////////////////////////////////////////////////////////////// Connect to Database
//////////////////////////////////////////////////////////////////////////

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cst499!team1',
  database: 'cst499',
  port: 3306
});

connection.query('SELECT * FROM user_journal_entry', function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
  console.log("result: " + results)

  console.log("error" + error)
});

connection.query('INSERT INTO user_journal_entry (journal_id, user_first_name, user_last_name, journal_title, journal_entry_text, journal_tag_name, create_timestamp) VALUES ("1", "first", "last", "title", "text", "tag", current_timestamp) ', function (error, results, fields) {
  // error will be an Error if one occurred during the query
  // results will contain the results of the query
  // fields will contain information about the returned results fields (if any)
  console.log("result: " + results)

  if (error != null) {
    console.log("error: " + error)
  }
  
});



////////////////////////////////////////////////////////////////////////// Here are some helper functions
//////////////////////////////////////////////////////////////////////////
function journalSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const value = data.get('journalTitle');

  console.log('test:',{ value });
}
 


// define getSselectValues()

/**
 * Routes Definitions
 */

//  app.get("/", (req, res) => {
//     res.status(200).send("Thought Collector: Journaling with a Purpose");
//   });

/////////////////////////////////////////////////////////////////// This is our home route

function getValues(req) {
  return req.query
}

// This displays the home page to the user
app.get("/",async (req, res) => {
  submitMsg = ""
  submitLink = ""
  res.render("index", { title: "Home" });
});

// This is logic to handle values when user clicks submit
// google.com/submit
app.get("/submit",async (req, res) => {
  console.log("User submitted.")
  values = getValues(req)
  console.log("Here are your query params:", values)

  // write the values to a file
  write2File(values)
  recommendation = recommendationMap[values.tag]
  submitMsg = "Since you chose the " + values.tag + " tag, here's your recommendation: \n"
  submitLink = recommendation
  res.render("index", { submitMsg, submitLink})
});


/////////////////////////////////////////////////////////////////// This is our history route

function getHistory(){
  // read contents from file
  console.log("Reading Journal file.")

  let dataStr
  let dataArray

  try {
    dataStr = readFileSync("journal.txt", "utf8").trim()
    console.log(dataStr)
    dataArray = dataStr.split("\n")
    console.log("dis what my array look like: " + dataArray)
    console.log("File read sucessful")
  } catch (err) {
    console.error(err);
  }
  // return contents (string)
  return dataArray
}

// This displays history page to the user
app.get("/history",async (req, res) => {
  historyStrArray = getHistory(req)
  
  let objArray = []

  historyStrArray.forEach(element => {
    let obj = JSON.parse(element)
    console.log("object: %j ", obj)
    objArray.push(obj)
  });

  console.log("here's my history obj array: " + objArray)

  res.render("history", { content: objArray});
});





function write2File(values){
  console.log("Writing to file.")

  try {
    let jsonStr = JSON.stringify(values)
    console.log("heres my json: " + jsonStr)
    appendFileSync("journal.txt", jsonStr + "\n");
    console.log("file write successful")
  } catch(err){
    console.log(err);
  }

}


/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });