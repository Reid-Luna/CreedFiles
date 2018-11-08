const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const Seasons = require("./SeasonSchema");

const init = () => {
  app.get("/:season/limit", (req, res) => {
    const { season } = req.params;
    if (season > 9)
      return res
        .status(400)
        .json({ error: "the office only goes to season 9 :(" });
    console.log(`finding limit for season ${season}`);
    Seasons.find({ season })
      .then(sn => {
        return res
          .status(200)
          .json({ limit: sn[0].episodes[sn[0].episodes.length - 1].number });
      })
      .catch(e => {
        return res.status(400).json({ error: e });
      });
  });

  app.get("/:season", (req, res) => {
    const { season } = req.params;
    if (season > 9)
      return res
        .status(400)
        .json({ error: "the office only goes to season 9 :(" });
    console.log(`finding season ${season}`);
    Seasons.find({ season })
      .then(sn => {
        return res.status(200).json(sn);
      })
      .catch(e => {
        return res.status(400).json({ error: e });
      });
  });

  app.get("/:season/:episode", (req, res) => {
    const { season, episode } = req.params;
    if (season > 9)
      return res
        .status(400)
        .json({ error: "the office only goes to season 9 :(" });
    console.log(`finding season ${season}, episode ${episode}`);
    Seasons.find({ season })
      .then(seasonArr => {
        seasonArr[0].episodes.forEach(ep => {
          if (
            episode >
            seasonArr[0].episodes[seasonArr[0].episodes.length - 1].number
          ) {
            return res
              .status(400)
              .json({ error: "this episode does not exist" });
          }
          if (ep.number == episode) {
            console.log(`sent season ${season}, episode ${episode}`);
            return res.status(200).json(ep);
          }
        });
      })
      .catch(e => res.status(400).json({ e }));
  });

  app.listen(3001, () => {
    console.log("app running on 3001");
  });
};

mongoose
  .connect(
    "mongodb://localhost/CreedFiles",
    { useNewUrlParser: true }
  )
  .then(() => init())
  .catch(e => console.log(e));
