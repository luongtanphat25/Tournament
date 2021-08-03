const router = require("express").Router();
const { convertToObject } = require("typescript");
let Tournament = require("../models/tournament.model");

//GET ALL TOURNAMENT
router.route("/").get((req, res) => {
  Tournament.find()
    .then((tournaments) => res.json(tournaments))
    .catch((err) => res.status(400).json("Error: " + err));
});

//CREATE TOURNAMENT
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const admin = req.body.admin;
  const isDone = false;
  const isWaiting = true;
  const players = [];
  const winner = "";

  const tournament = new Tournament({
    name,
    description,
    date,
    admin,
    isDone,
    isWaiting,
    players,
    players,
    players,
    winner,
  });

  tournament
    .save()
    .then((t) => res.json(t))
    .catch((err) => res.status(400).json("Error: " + err));
});

//GET TOURNAMENT DETAIL
router.route("/:id").get((req, res) => {
  Tournament.findById(req.params.id)
    .then((tournament) => res.json(tournament))
    .catch((err) => res.status(400).json("Error: " + err));
});

//DELETE TOURNAMENT
router.route("/:id").delete((req, res) => {
  Tournament.findByIdAndDelete(req.params.id)
    .then((tournament) => res.json("Tournament deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//UPDATE TOURNAMENT
router.route("/join/:id/:username").patch((req, res) => {
  const id = req.params.id;
  const username = req.params.username;

  Tournament.findById(id).then((t) => {
    if (t.isWaiting) {
      var p = t.players;
      p.push(username);
      var w = p.length === 8 ? false : true;

      Tournament.findByIdAndUpdate(
        id,
        { players: p, isWaiting: w },
        { new: true }
      ).then((updatedTournament) => {
        res.json(updatedTournament);
      });
    }
  });
});

router.route("/groups/:id/:a/:b/:c/:d").patch((req, res) => {
  const id = req.params.id;
  const sma = req.params.a;
  const smb = req.params.b;
  const smc = req.params.c;
  const smd = req.params.d;
  const semifinals = [sma, smb, smc, smd];

  Tournament.findById(id).then((t) => {
    Tournament.findByIdAndUpdate(
      id,
      { groups: semifinals },
      { new: true }
    ).then((updatedTournament) => {
      res.json(updatedTournament);
    });
  });
});

router.route("/finals/:id/:a/:b").patch((req, res) => {
  const id = req.params.id;
  const fna = req.params.a;
  const fnb = req.params.b;
  const finals = [fna, fnb];

  Tournament.findById(id).then((t) => {
    Tournament.findByIdAndUpdate(id, { finals: finals }, { new: true }).then(
      (updatedTournament) => {
        res.json(updatedTournament);
      }
    );
  });
});

router.route("/winner/:id/:a").patch((req, res) => {
  const id = req.params.id;
  const winner = req.params.a;

  Tournament.findById(id).then((t) => {
    Tournament.findByIdAndUpdate(
      id,
      { winner: winner, isDone: true },
      { new: true }
    ).then((updatedTournament) => {
      res.json(updatedTournament);
    });
  });
});

module.exports = router;
