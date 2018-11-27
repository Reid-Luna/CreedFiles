const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const Seasons = require("./SeasonSchema");

const init = () => {
  app.use(express.static(`${__dirname}/frontend/build`));

  app.get("/.well-known/pki-validation/", (req, res) => {
    res.sendFile(`${__dirname}/DA7AD91CFBC3405C0AE35CC8CBC6EEB6.txt`);
  });

  const getLimit = async season => {
    season = season ? { season } : {};
    return new Promise((resolve, reject) => {
      Seasons.find(season)
        .then(sns => {
          let count = 0;
          sns.forEach(sn => {
            count += sn.episodes[sn.episodes.length - 1].number;
          });
          console.log(count);
          return resolve(count);
        })
        .catch(reject);
    });
  };

  app.get("/total", (req, res) => {
    getLimit()
      .then(count => {
        return res.status(200).json({ count });
      })
      .catch(e => {
        return res.status(400).json({ e });
      });
  });

  app.get("/:season/limit", (req, res) => {
    const { season } = req.params;
    if (season > 9)
      return res
        .status(400)
        .json({ error: "the office only goes to season 9 :(" });
    console.log(`finding limit for season ${season}`);
    getLimit(season)
      .then(limit => {
        return res.status(200).json({ limit });
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

  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
  app.listen(80, () => {
    console.log("app running on 80");
  });
};

mongoose
  .connect(
    "mongodb://localhost/CreedFiles",
    { useNewUrlParser: true }
  )
  .then(() => init())
  .catch(e => console.log(e));
