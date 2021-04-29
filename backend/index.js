const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fs = require('fs');


var db = mysql.createConnection({
    host:'127.0.0.1',
    user: 'root',
    password:'mypassword',
    database:'discoveat',
})

let config = {
    host:'127.0.0.1',
    user: 'root',
    password:'mypassword',
    database:'discoveat',
};

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

let db_prom = new Database(config);

// host: '35.202.192.135',
//     user: 'root',
//     password: 'group99',
//     database : 'discoveat'

// var db = mysql.createConnection({
//     host: '35.202.192.135',
//     port: '3306',
//     user: 'root',
//     password: 'group99',
//     database: 'discoveat',
//     ssl: {
//         ca: fs.readFileSync('./server-ca.pem'),
//         key: fs.readFileSync('./client-key.pem'),
//         cert: fs.readFileSync('./client-cert.pem')
//     }
// })

// const sqlSelect = "SELECT * FROM Users LIMIT 3";
// db.query(sqlSelect, (err, result) => {
//     console.log(result);
//     console.log(err);
// });

// db.connect(function(err) {
//     if (err) throw err;
//     var sql = "INSERT INTO `movie_reviews` (`id`,`movieName`, `movieReview`) VALUES (5,'inception', 'good movie');";
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });

// app.get('/', (require, response) => {
//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES ('Spider2', 'good movie');";
//     db.query(sqlInsert, (err, result) => {
//         response.send("Hello world!!!");
//     })
// })

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/createUser", (require, response) => {
    const ID = Math.floor((Math.random() * 100000000) + 1);
    const pass = require.body.pass;
    const Email = require.body.ID;

    const sqlInsert = "INSERT INTO `Users` (`UserID`, `Password`, `Email`) VALUES (?,?,?)";
    db.query(sqlInsert, [ID, pass, Email], (err, result) => {
        if(err){
            console.log(err);
        } else{
            console.log(result);
        }
    })
});

app.get("/api/getUser", (require, response) => {
    const email = require.query.Email;
    const pass = require.query.Pass;
    let id = null;
    let sqlSelect = "SELECT u.UserID FROM Users u WHERE u.Email = ? AND u.Password = ?";

    db_prom.query(sqlSelect, [email, pass]).then((res) => {
        id = res[0].UserID;
        let sqlSelect = "SELECT i.IngredientName, i.IngredientID FROM Ingredients i NATURAL JOIN Owns o NATURAL JOIN Users u WHERE u.UserID = ?";
        if(id != null){
            console.log("hi")
            db.query(sqlSelect, id, (err, result) => {
                ing = [];
                result.forEach((v) => {
                    ing.push({ID: v.IngredientID, Name: v.IngredientName});
                });
                ret = {
                    ID: id,
                    Email: email,
                    Pass: pass,
                    ing: ing
                };
                console.log(ret);
                response.send(ret);
            });
        }
    });   
});

app.put("/api/updateUser/", (require, response) => {
    const email = require.body.email;
    const ID = require.body.ID;
    const pass = require.body.pass;

    const sqlUpdate = "UPDATE `Users` SET `Email` = ? WHERE `UserID`= ?";
    db.query(sqlUpdate, [email, ID], (err, result) => {
        if(err){
            console.log(err);
        } else{
            console.log(result);
        }
    })
    const sqlUpdatePass = "UPDATE `Users` SET `Password` = ? WHERE `UserID`= ?";
    db.query(sqlUpdatePass, [pass, ID], (err, result) => {
        if(err){
            console.log(err);
        } else{
            console.log(result);
        }
    })
});

app.delete("/api/deleteUser/:ID", (require, response) => {
    const ID = require.params.ID;

    const sqlDelete = "DELETE FROM `Users` WHERE `UserID`= ?";
    db.query(sqlDelete, ID, (err, result) => {
        if(err){
            console.log(err);
        } else{
            console.log(result);
        }
    })
});

// app.get("/api/get", (require, response) => {
//     const sqlSelect = "SELECT * FROM Users";
//     db.query(sqlSelect, (err, result) => {
//         response.send(result);
//     });
// });

// RECIPE

app.post("/api/addRecipe", (require, response) => {
  const ID = Math.floor((Math.random() * 100000000) + 1);
  const prepTime = require.body.prepTime;
  const instructions = require.body.instructions;

  const sqlInsert = "INSERT INTO `Recipes` (`RecipeID`, `PrepTime`, `Ratings`, `Instructions`) VALUES (?,?,?,?)";
  db.query(sqlInsert, [ID, prepTime, 0, instructions], (err, result) => {
      if(err){
          console.log(err);
      } else{
          console.log(result);
      }
  })
});

app.post("/api/addReview", (require, response) => {
    const userID = require.body.userID;
    const recipeID = require.body.recipeID;
    const score = require.body.score;
    const review = require.body.review;
 
    const sqlInsert = "INSERT INTO `Reviews` (`UserID`, `RecipeID`, `SCORE`, `Review`) VALUES (?,?,?,?)";
    db.query(sqlInsert, [userID, recipeID, score, review], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
 
    const sqlUpdate = "CALL calculateRatings(?)"
    db.query(sqlInsert, [recipeID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
});


app.put("/api/updateRecipe/", (require, response) => {
  const ID = require.body.ID;
  const prepTime = require.body.prepTime;
  const instructions = require.body.instructions;

  const sqlUpdate = "UPDATE `Recipes` SET `PrepTime` = ? WHERE `RecipeID`= ?";
  db.query(sqlUpdate, [prepTime, ID], (err, result) => {
      if(err){
          console.log(err);
      } else{
          console.log(result);
      }
  })
  const sqlUpdatePass = "UPDATE `Recipes` SET `Instructions` = ? WHERE `RecipeID`= ?";
  db.query(sqlUpdatePass, [instructions, ID], (err, result) => {
      if(err){
          console.log(err);
      } else{
          console.log(result);
      }
  })
});

app.delete("/api/deleteRecipe/:ID", (require, response) => {
  const ID = require.params.ID;

  const sqlDelete = "DELETE FROM `Recipes` WHERE `RecipeID`= ?";
  db.query(sqlDelete, ID, (err, result) => {
      if(err){
          console.log(err);
      } else{
          console.log(result);
      }
  })
});

//INGREDIENTS
app.post("/api/addIngredient", (require, response) => {
    const ID = Math.floor((Math.random() * 100000000) + 1);
    const ingredientName = require.body.ingredientName;
  
    const sqlInsert = "INSERT INTO `ingredients` (`IngredientID`, `IngredientName`) VALUES (?,?)";
    db.query(sqlInsert, [ID, ingredientName], (err, result) => {
        if(err){
            console.log(err);
        } else{
            console.log(result);
        }
    })
  });
  
  app.put("/api/updateIngredient/", (require, response) => {
    const ID = require.body.ID;
    const ingredientName = require.body.ingredientName;
    //const instructions = require.body.instructions;
  
    const sqlUpdate = "UPDATE `ingredients` SET `IngredientName` = ? WHERE `IngredientID`= ?";
    db.query(sqlUpdate, [ingredientName, ID], (err, result) => {
        if(err){
            console.log(err);
        } else{
            console.log(result);
        }
    })
    // const sqlUpdatePass = "UPDATE `Recipes` SET `Instructions` = ? WHERE `RecipeID`= ?";
    // db.query(sqlUpdatePass, [instructions, ID], (err, result) => {
    //     if(err){
    //         console.log(err);
    //     } else{
    //         console.log(result);
    //     }
    // })
  });
  
app.delete("/api/deleteIngredients/:ID", (require, response) => {
    const ID = require.params.ID;
  
    const sqlDelete = "DELETE FROM `ingredients` WHERE `IngredientID`= ?";
    db.query(sqlDelete, ID, (err, result) => {
        if(err){
            console.log(err);
        } else{
            console.log(result);
        }
    })
  });

// Advanced Queries
app.get("/api/findUserReviews/", (require, response) => {
    const sqlQuery = "SELECT DISTINCT u.UserID, c.RecipeID, c.Ratings FROM Users u NATURAL JOIN Reviews rs LEFT JOIN Recipes c ON rs.RecipeID = c.RecipeID GROUP BY c.RecipeID, u.UserID, HAVING AVG(c.Ratings) > 4 LIMIT 15";
    db.query(sqlSelect, (err, result) => {
             response.send(result);
    });
});

app.get("/api/findUserReviews/", (require, response) => {
  const sqlQuery = "SELECT uid, ratings FROM (SELECT AVG(r.Score) AS ratings, u.UserID as uid FROM Users u NATURAL JOIN Reviews r GROUP BY u.UserID) as avgRates WHERE ratings > 5 ORDER BY ratings DESC LIMIT 15";
  db.query(sqlSelect, (err, result) => {
           response.send(result);
  });
})

app.get("/api/findLowPrepRecipes/", (require, response) => {
  const sqlQuery = "SELECT rid, pTime FROM (SELECT AVG(r.Score) AS ratings, rc.recipeID AS rid, rc.PrepTime AS pTime FROM Recipes rc NATURAL JOIN Reviews r GROUPY BY rc.RecipeID) as avgRates WHERE pTime < 40 ORDER BY pTime DESC LIMIT 15";
  db.query(sqlSelect, (err, result) => {
           response.send(result);
  });
})



app.listen(3002, () => {
    console.log("running on port 3002");
})

