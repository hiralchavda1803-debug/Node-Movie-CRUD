import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/movie").then(() => {
    console.log("Sucess"); 

}).catch(() => {
    console.log("Error");

});

const movieSchema = mongoose.Schema({
    title: String,
    author: String,
    genre: String
});

const Movie = mongoose.model("movie", movieSchema);

app.get("/", (req, res) => {
    res.json({
        msg: "Home Page",
        data: Movie
    });
});


//  Add Movie

app.post("/addmovie", async (req, res) => {
    const addMovie = await Movie.create(req.body);

    res.json({
        msg: "movie add",
        data: addMovie
    });
});

// Get All Data

app.get("/getmovie", async (req, res) => {
    const getdata = await Movie.find();

    res.json({
        msg: "movie find",
        data: getdata
    });

});

// Get specific data

app.get("/specificmovie", async (req, res) => {
    const onemovie = await Movie.findOne({ title: req.body.title });

    if (!onemovie) {
        res.json({
            msg: "Movie not found"
        });
    }

    res.json({
        msg: "movie find",
        data: onemovie
    });
});

//  update specific movie

app.put("/updatemovie", async (req, res) => {
    const updatemovie = await Movie.findByIdAndUpdate(req.body.id, req.body.newdata);

    if (!updatemovie) {
        res.json({
            msg: "Movie not found"
        });
    }
    
    res.json({
        msg: "movie update",
        data: updatemovie
    });

});

// delet movie

app.delete("/deletemovie" , async (req , res)=>{
    const delet = await Movie.findByIdAndDelete(req.body.id);

     if (!delet) {
        res.json({
            msg: "Movie not found"
        });
    }
    res.json({
        msg: "movie delete",
        data: delet
    });

})

app.listen(3000);