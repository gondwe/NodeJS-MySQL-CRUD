const express = require("express")
const mysql = require("mysql")

const app = express()

// create a database
app.get("/createDb", (req, res)=>{
    let sql = "create database nodesql";
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send("db created");
    })
})

// create table
app.get("/ctable", (req, res)=>{
    let sql = "create table posts (id int(9) primary key auto_increment, title varchar(255), body text)";
    db.query(sql, (err)=>{
        if(err) res.send(err);
        res.send("table created");
    })
});


//insert post
app.get("/add", (req, res)=>{
    let post = {title:"Music", body:"I like ROck and Roll"};
    let sql = "insert into posts (title, body) values('"+post.title+"','"+ post.body+"')";

    db.query(sql, (err, result)=>{
        if(err) res.send(err);
        res.send("post added");
    })
});


// get posts 
app.get("/allpost", (req, res)=>{
    let sql = "select * from posts";
    db.query(sql, (err, result)=>{
        if(err) res.send(err);
        res.send(result);
    });
})


// get one posts 
app.get("/allpost/:id", (req, res)=>{
    var id = req.params.id;
    let sql = `select * from posts where id = ${id}`;
    db.query(sql, (err, result)=>{
        if(err) res.send(err);
        res.send(result);
        console.log(result);
    });
})


// create connection
const db = mysql.createConnection({
    host        :   "localhost",
    user        :   "root",
    password    :   "toor",
    database    :   "nodesql"
});


// connect 
db.connect( (err)=>{
    if(err) throw err;
    console.log("db connected")
});





app.listen("3000", ()=>{
    console.log("server started on p:3000")
})