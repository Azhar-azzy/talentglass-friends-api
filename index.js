const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const Friend = require("./models/Friend.js");

app.use(cors());
app.use(express.json());

const friends = [
  {
    id: 0,
    name: "John",
  },
  {
    id: 1,
    name: "Jack",
  },
];

// Available End Points

// A. Endpoint : /friends , Method : GET
app.get("/friends", async (req, res) => {
  try {
    var friends = await Friend.find({}, "id name -_id "); // Remove extra columns
    return res.status(200).json(friends);
  } catch (error) {
    return res.status(500).send("Internal Server error!");
  }
});

// B. Endpoint : /friends/0 , Method : GET
app.get("/friends/:id", async (req, res) => {
  try {
    let id = req.params.id;
    var friend = await Friend.find({ id }, "id name -_id"); // Remove extra columns
    if (friend) return res.status(200).json(friend);
    else return res.status(404).json({ error: "User not found!!!" });
  } catch (error) {
    return res.status(500).send("Internal Server error!");
  }
});

// C. Endpoint : /friends , Method : POST (ADD FRIEND)
app.post("/friends", async (req, res) => {
  try {
    const { id, name } = req.body;
    if (id === undefined) return res.status(400).json({ error: "Enter id" });
    if (name === undefined)
      return res.status(400).json({ error: "Enter name" });

    const friend = new Friend({ id, name });
    const saveData = await friend.save();
    return res.status(200).json(req.body);
  } catch (error) {
    return res.status(500).send("Internal Server error!");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
