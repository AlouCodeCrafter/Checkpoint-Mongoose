const express = require("express");
const router = express.Router();
const Person = require("./personne");

// Créer et sauvegarder une personne
router.post("/add-person", (req, res) => {
  const { name, age, favoriteFoods } = req.body;

  const newPerson = new Person({
    name,
    age,
    favoriteFoods,
  });

  newPerson.save((err, data) => {
    if (err) {
      return res.status(500).send("Server Error");
    }
    res.json(data);
  });
});

// Créer plusieurs personnes
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

// Trouver toutes les personnes avec un nom donné
router.get("/find-person/:name", (req, res) => {
  Person.find({ name: req.params.name }, (err, data) => {
    if (err) {
      return res.status(500).send("Server Error");
    }
    res.json(data);
  });
});

// Trouver une personne avec un aliment préféré
router.get("/find-person-by-food/:food", (req, res) => {
  Person.findOne({ favoriteFoods: req.params.food }, (err, data) => {
    if (err) {
      return res.status(500).send("Server Error");
    }
    res.json(data);
  });
});

// Trouver une personne par _id
router.get("/find-person-by-id/:id", (req, res) => {
  Person.findById(req.params.id, (err, data) => {
    if (err) {
      return res.status(500).send("Server Error");
    }
    res.json(data);
  });
});

// Ajouter un aliment préféré
router.put("/add-food/:id", (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) {
      return res.status(500).send("Server Error");
    }
    person.favoriteFoods.push("hamburger");
    person.markModified("favoriteFoods");
    person.save((err, updatedPerson) => {
      if (err) {
        return res.status(500).send("Server Error");
      }
      res.json(updatedPerson);
    });
  });
});

// Mettre à jour l'âge d'une personne
router.put("/update-age/:name", (req, res) => {
  Person.findOneAndUpdate(
    { name: req.params.name },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) {
        return res.status(500).send("Server Error");
      }
      res.json(updatedPerson);
    }
  );
});

// Supprimer une personne par _id
router.delete("/delete-person/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id, (err, deletedPerson) => {
    if (err) {
      return res.status(500).send("Server Error");
    }
    res.json(deletedPerson);
  });
});

// Supprimer toutes les personnes avec le nom "Mary"
router.delete("/remove-persons-by-name/:name", (req, res) => {
  Person.remove({ name: req.params.name }, (err, result) => {
    if (err) {
      return res.status(500).send("Server Error");
    }
    res.json(result);
  });
});

// Enchaîner des aides à la recherche
router.get("/find-burrito-lovers", (req, res) => {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) {
        return res.status(500).send("Server Error");
      }
      res.json(data);
    });
});

module.exports = router;
