const express = require("express"); 
const axios = require("axios"); 
var bodyParser = require('body-parser'); 
const path = require("path");
const app = express(); 

// Base URL for the API 
//const base_url = "https://api.example.com"; 
const base_url = "http://10.104.9.15"; 
//const base_url = "http://localhost:3000";

// Set the template engine 
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs"); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));