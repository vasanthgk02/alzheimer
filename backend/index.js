const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  try {
    let arr = [];
    fs.readFile("data.json", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading data file");
        return;
      }
      arr = JSON.parse(data);
      const { name, ph, email, address, lat, long } = req.body;
      const obj = { name, ph, email, address, lat, long };
      arr.push(obj);
      fs.writeFile("data.json", JSON.stringify(arr), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error writing data file");
          return;
        }
        res.send({ res: "User Registered" });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.get("/", (req, res) => {
  res.send(require("./data.json"));
});

app.post("/update-location", (req, res) => {
  const { email, lat, long } = req.body;
  try {
    fs.readFile("data.json", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading data file");
        return;
      }
      let arr = JSON.parse(data);
      const objIndex = arr.findIndex((obj) => obj.email === email);
      if (objIndex === -1) {
        res.status(404).send("Object not found");
        return;
      }
      arr[objIndex].lat = lat;
      arr[objIndex].long = long;
      fs.writeFile("data.json", JSON.stringify(arr), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error writing data file");
          return;
        }
        res.send({ res: "Location updated" });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
