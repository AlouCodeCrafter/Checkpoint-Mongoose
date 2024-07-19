const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.post("/add-multiple-people", (req, res) => {
  const arrayOfPeople = [
    { name: "John", age: 25, favoriteFoods: ["Pizza", "Burger"] },
    { name: "Jane", age: 30, favoriteFoods: ["Pasta", "Salad"] },
  ];

  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return res.status(500).send("Server Error");
    }
    res.json(data);
  });
});

module.exports = router;
