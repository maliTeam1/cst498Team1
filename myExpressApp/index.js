// index.js

/**
 * Required External Modules
 */

 const express = require("express");
 const path = require("path");

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

  app.get("/",async (req, res) => {
    
    
      // 1) read from database (get possible dropdown values)
  //   values = await queryDB()
  //   console.log(values)
  // }) 
  //   catch (err) {
  //   console.log(err)
  //   }
    let journalText = textbox.text;
    let selectedValue = user.tagCategory;
    console.log(journalText);

    function getSelectedValue() {
      
      console.log();
    }

    // 3) pass to frontend
    res.render("index", { title: "Home" });
    res.render("index", { myArray:  values});
  });
/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });