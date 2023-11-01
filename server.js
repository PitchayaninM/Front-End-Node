const express = require('express');
const axios = require('axios');
const app = express();
var bodyOarser = require('body-parser');
const path = require('path');
const bodyParser = require('body-parser');

// Base URL for the API
// const base_url = "https://api.example.com";
// const base_url = "http://localhost:3000";
const base_url = "http://node50266-pitchayanin.proen.app.ruk-com.cloud";

// Set the template engine
app.set('view engine' , 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Server static files
app.use(express.static(__dirname+'/public'));


app.get("/",async (req,res) => {
    try{
        res.render("index");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/book",async (req,res) => {
    try{
        const response = await axios.get(base_url + '/book');
        res.render("book/books",{books:response.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/book/:id", async(req,res) => {
    try{
        const response = await axios.get(base_url + '/book/' + req.params.id);
        
        res.render("book/Book",{Book:response.data});
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/books/create", (req, res) => {
    res.render("book/create");
});

app.post("/book/create",async (req,res) =>{
    try{
        const data = {book_name: req.body.book_name };
        await axios.post(base_url + '/book',data);
        res.redirect("/book");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

// app.get("/book/update/:id" , async (req,res) => {
//     try {
//         const response = await axios.get(base_url + '/book/' + req.params.id);
//         res.render("book/update", {book: response.data});
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });

// app.post ("/book/update/:id" , async (req,res) => {
//     try {
//         const data = { name: req.body.name, number: req.body.number };
//         await axios.put(base_url + '/book/' + req.params.id, data);
//         res.redirect("/book/");
//     }catch (err) {
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });


// GET เส้นทางสำหรับแสดงแบบฟอร์มแก้ไขหนังสือ
app.get("/book/update/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/book/' + req.params.id);
        res.render("book/update", { book: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

// POST เส้นทางสำหรับการอัปเดตข้อมูลหนังสือ
app.post("/book/update/:id", async (req, res) => {
    try {
        const data = { book_name: req.body.book_name };
        await axios.put(base_url + '/book/' + req.params.id, data);
        res.redirect("/book/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


app.get("/book/delete/:id" , async (req,res) => {
    try {
        await axios.delete(base_url + '/book/' + req.params.id);
            res.redirect("/book/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});






app.get("/user",async (req,res) => {
    try{
        const response = await axios.get(base_url + '/user');
        res.render("user/books",{books:response.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/user/:id", async(req,res) => {
    try{
        const response = await axios.get(base_url + '/user/' + req.params.id);
        
        res.render("user/book",{book:response.data});
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

 app.get("/users/create", (req, res) => {
    res.render("user/create"); });

app.post("/user/create",async (req,res) =>{
    try{
        const data = {user_name: req.body.user_name, borrowdate: req.body.borrowdate, returndate: req.body.returndate};
        await axios.post(base_url + '/user',data);
        res.redirect("/user/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/user/update/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url + '/user/' + req.params.id);
        res.render("user/update", {book: response.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post ("/user/update/:id" , async (req,res) => {
    try {
        const data = { user_name: req.body.user_name};
        await axios.put(base_url + '/user/' + req.params.id, data);
        res.redirect("/user");
    }catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/user/delete/:id" , async (req,res) => {
    try {
        await axios.delete(base_url + '/user/' + req.params.id);
            res.redirect("/user/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});




app.get("/data",async (req,res) => {
    try{
        const response = await axios.get(base_url + '/data');
        const response2 = await axios.get(base_url + '/book');
        const response3 = await axios.get(base_url + '/user');
        res.render("data/books",{books1:response.data ,books2:response2.data , books3:response3.data  });
        //dsdsd

    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


app.get("/data/:id", async(req,res) => {
    try{
        const response = await axios.get(base_url + '/data/' + req.params.id);
        const response2 = await axios.get(base_url + '/book');
        const response3 = await axios.get(base_url + '/user');
        res.render("data/Book",{Book:response.data  ,Book2:response2.data , Book3:response3.data});
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


// app.get("/dataa/create", (req, res) => {
//     const response = await axios.get(base_url + '/data/' );
//     const response2 = await axios.get(base_url + '/book/');
//     const response3 = await axios.get(base_url + '/user/');
//     res.render("data/create", {Book: response.data , alldata_book : response2.data , alldata_user : response3.data});
// });

app.get("/dataa/create", async (req, res) => {
    res.render("data/create");
});

    
app.post("/data/create",async (req,res) =>{
    try{
        const data = {book_id: req.body.book_id, user_id: req.body.user_id, borrowdate: req.body.borrowdate, returndate: req.body.returndate};
        
        await axios.post(base_url + '/data',data);
        res.redirect("/data/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


app.get("/data/update/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url + '/data/' + req.params.id);
        const response2 = await axios.get(base_url + '/book/');
        const response3 = await axios.get(base_url + '/user/');
        res.render("data/update", {book: response.data , alldata_book : response2.data , alldata_user : response3.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post ("/data/update/:id" , async (req,res) => {
    try {
        const data = { book_id: req.body.book_id,user_id: req.body.user_id, borrowdate: req.body.borrowdate, returndate: req.body.returndate};

        console.log( req.body.province_id)
        await axios.put(base_url + '/data/' + req.params.id, data);
        res.redirect("/data");
    }catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


app.get("/data/delete/:id" , async (req,res) => {
    try {
        await axios.delete(base_url + '/data/' + req.params.id);
            res.redirect("/data/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});
// app.listen(3900, ()=> {
//     console.log('Server started on port 3900');
// });

app.listen(8080, ()=> {
    console.log('Server started on port 8080');
});
