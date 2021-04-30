const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fs = require('fs');

// let config = {
//     user: process.env.SQL_USER,
//     database: process.env.SQL_DATABASE,
//     password: process.env.SQL_PASSWORD,
// }

// if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
//   config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
// }
// Database Connection for Development

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

// var db = mysql.createConnection(config);
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

// USERS
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
    console.log(email, pass);
    db_prom.query(sqlSelect, [email, pass]).then((res) => {
        id = res[0].UserID;
        console.log(id);
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

// RECIPES
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

// REVIEWS
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
});

// INGREDIENTS
app.get("/api/addIngredient", (require, response) => {
    const ingredientName = require.query.ingredientName;
    const userID = require.query.userID;
    console.log(userID)
  
    const sqlInsert = "CALL addIngredient(?, ?)";
    console.log("hey1");
    db_prom.query(sqlInsert, [ingredientName, userID], (err, result) => {
        console.log("hey2");
        if(err){
            console.log(err);
        } else{
            console.log(result);
        }
    }).then((res) => {
        let sqlSelect = "SELECT i.IngredientName, i.IngredientID FROM Ingredients i NATURAL JOIN Owns o NATURAL JOIN Users u WHERE u.UserID = ?";
        console.log("hey4");
        db.query(sqlSelect, userID, (err, result) => {
            ing = [];
            result.forEach((v) => {
                ing.push({ID: v.IngredientID, Name: v.IngredientName});
            });
            console.log(ing);
            response.send(ing);
        });
        
    })
});

app.get("/api/removeIngredient", (require, response) => {
    const ID = require.query.ingredientID;
    const userID = require.query.userID;

    const sqlDelete = "DELETE FROM `Owns` WHERE `IngredientID`= ? AND `UserID` = ?";
    db_prom.query(sqlDelete, [ID, userID], (err, result) => {
        if(err){
            console.log(err);
        } else{
            console.log(result);
        }
    }).then((res) => {
        let sqlSelect = "SELECT i.IngredientName, i.IngredientID FROM Ingredients i NATURAL JOIN Owns o NATURAL JOIN Users u WHERE u.UserID = ?";
        
        db.query(sqlSelect, userID, (err, result) => {
            ing = [];
            result.forEach((v) => {
                ing.push({ID: v.IngredientID, Name: v.IngredientName});
            });
            console.log(ing);
            response.send(ing);
        });
    })
});

app.get("/api/findRecipes", (require, response) => {
    const maxTime = require.query.time;
    const minScore = require.query.minScore;
    const userID = require.query.userID;

    //const sqlSelect = "SELECT rid, pTime FROM (SELECT AVG(r.Score) as ratings, rc.RecipeID AS rid, rc.PrepTime AS pTime FROM Recipes rc NATURAL JOIN Reviews r GROUP BY rc.RecipeID) AS avgRates WHERE pTime < ? ORDER BY pTime DESC LIMIT 5";
    const sqlSelect = "CALL FindRecipes(?,?,?)";

    db.query(sqlSelect, [maxTime, minScore, userID], (err, result) => {
        console.log(result);
        response.send(result);
    });
});

const port = process.env.PORT || 3002;
app.set('port', port);

app.listen(port, () => {
    console.log("running on port");
})
