// index.js

/**
 * Required External Modules
 */
const { getRandomValues } = require("crypto");
const express = require("express");
const { write, readFileSync,appendFileSync, writeFileSync } = require("fs");
 const path = require("path");


 recommendationMap = {
  "PRODUCTIVITY": "https://www.youtube.com/results?search_query=how+to+be+more+productive",
  "GOALS": "https://www.youtube.com/results?search_query=Meeting+Your+Goals",
  "SCHOOL": "https://www.youtube.com/results?search_query=tips+for+school"
 }

//  [
//   {
//  "id":"prod",
//  "tag":"Productivity",
//  "description":"Subject area of journal is regarding productivity.",
//  "recommendation":{
//     "recommendation_id":"productivityYouTube",
//     "source":"https://www.youtube.com/results?search_query=how+to+be+more+productive"
//  }
// },

// {
//  "id":"goals",
//  "tag":"Goals",
//  "description":"Subject area of journal is regarding goals.",
//  "recommendation":{
//     "recommendation_id":"goalsYouTube",
//     "source":"https://www.youtube.com/results?search_query=Meeting+Your+Goals"
//  }
// },

// {
//  "id":"school",
//  "tag":"School",
//  "description":"Subject area of journal is regarding school.",
//  "recommendation":{
//     "recommendation_id":"schoolYouTube",
//     "source":"https://www.youtube.com/results?search_query=tips+for+school"
//  }
// }
// ]

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


////////////////////////////////////////////////////////////////////////// Here are some helper functions
//////////////////////////////////////////////////////////////////////////
function journalSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const value = data.get('journalTitle');

  console.log('test:',{ value });
}

////////////////////////////////////////////////////////////////////////// Here are some helper functions
//////////////////////////////////////////////////////////////////////////

const { Client } = require("pg")
// const dotenv = require("dotenv")
// dotenv.config()
 

        const client = new Client({
            user: "postgres",
            host: "localhost",
            database: "postgres",
            password: "cst498team1",
            port: "5432"
        })
// const insertDB = async () => {
//   try {
//       await client.connect()
//       const res = await client.query("insert into )
      
//       await client.end()
//       return await res.rows
//     }catch (error) {
//       console.log(error)
//     }
// }
 


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