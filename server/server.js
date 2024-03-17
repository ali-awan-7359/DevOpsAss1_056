import express from "express";
import mongoose from "mongoose";
import shortUrl from "./model/shortStore.js";
import cors from "cors";

const app = express();

mongoose
  .connect(
    "mongodb+srv://am6900955:NaUo6Smg6aPaj2bt@cluster0.yxnua8x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("COnntected");
  });

//use cors to allow cross origin resource sharing
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello There!");
  console.log("Hello JEEEEEEEEEEEEEE");
});

app.post("/short", async (req, res) => {
  const found = await shortUrl.find({ full: req.body.full });
  if (found.length > 0) {
    res.send(found);
  } else {
    await shortUrl.create({ full: req.body.full });
    const foundNow = await shortUrl.find({ full: req.body.full });
    res.send(foundNow);
  }
});

app.get("/:shortUrl", async (req, res) => {
  const short = await shortUrl.findOne({ short: req.params.shortUrl });
  if (short == null) return res.sendStatus(404);
  res.redirect(`${short.full}`);
});

let port = 5000;

app.listen(2003, function () {
  console.log("Server started successfully on port: ", port);
});
