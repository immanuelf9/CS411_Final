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
            console.log(result)
        }
    })
});

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM Users";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

app.post("/api/insert", (require, response) => {
    const movieName = require.body.movieName;
    const movieReview = require.body.movieReview;

    const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if(err){
            console.log(err);
        } else{
            console.log(result)
        }
    })
});

app.delete("/api/delete/:movieName", (require, response) => {
    const movieName = require.params.movieName;

    const sqlDelete = "DELETE FROM `movie_reviews` WHERE `movieName`= ?";
    db.query(sqlDelete, movieName, (err, result) => {
        if (err) 
        console.log(err);
    })
});

app.put("/api/update/", (require, response) => {
    const movieName = require.body.movieName;
    const movieReview = require.body.movieReview;

    const sqlUpdate = "UPDATE `movie_reviews` SET `movieReview` = ? WHERE `movieName`= ?";
    db.query(sqlUpdate, [movieReview,movieName ], (err, result) => {
        if (err) 
        console.log(err);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})

