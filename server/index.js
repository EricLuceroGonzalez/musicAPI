// creating the server
const express = require("express");
const app = express();
// check computer environment port number
const port = process.env.PORT || 3000;

// Require artist schema file to save it:
const ArtistSchema = require("../models/ArtistSchema");

// To parse a boydy to json
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// When some one calls .get() we catch the request data and send a response data
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// initi CRUD -------------

// C: create
app.post("/api/v1/artist", (req, res) => {
  // Receive artist from client
  const artistInfo = req.body;
  // console.log(`req.body = ${artistInfo}`);
  console.log(artistInfo);

  // Save artist to db
  const newArtist = new ArtistSchema(artistInfo);
  // Send response from db  -----> client
  newArtist.save(err => {
    return err
      ? res.status(400).send({ message: "Some mistake", res: err })
      : res.status(201).send({ message: "ok", 'res': newArtist });
  });
});

// R: read (All)
app.get("/api/v1/artist", (req, res) => {
  // find() all artist from db
  ArtistSchema.find()
    .exec()
    .then(newArtist => res.status(200).send(newArtist))
    .catch(err => res.status(400).send(err));
});

// R: read (One)
app.get("/api/v1/artist/:id", (req, res) => {
  const { id } = req.params;
  // find() artist from db
  ArtistSchema.findById(id)
    .exec()
    .then(newArtist => res.status(200).send(newArtist))
    .catch(err => res.status(400).send(err));
});

// U: update (one)
app.patch("/api/v1/artist/:id", (req, res) => {
  const { id } = req.params;
  // find() artist from db
  ArtistSchema.findByIdAndUpdate(id, req.body, { new: true })
    .exec()
    .then(newArtist => res.status(200).send(newArtist))
    .catch(err => res.status(400).send(err));
});

// D: delete
app.delete("/api/v1/artist/:id", (req, res) => {
  const { id } = req.params;
  // find() artist from db
  ArtistSchema.findByIdAndDelete(id, req.body, { new: true })
    .exec()
    .then(newArtist => res.status(204).send(newArtist))
    .catch(err => res.status(400).send(err));
});
// Send variable when this file is "require"
module.exports = { app, port };

// app.listen(port, () => console.log(`Example app listening on port ${port}!!`));
