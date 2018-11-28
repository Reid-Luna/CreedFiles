const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const http = require("http");
const https = require("https");
const fs = require("fs");

const key = fs.readFileSync(`${__dirname}/ssl/creedfiles_com.key`);
const cert = fs.readFileSync(`${__dirname}/ssl/creedfiles_com.crt`);
const ca = fs.readFileSync(`${__dirname}/ssl/creedfiles_com.ca-bundle`);

const credentials = {
  key,
  cert,
  ca
};

const Seasons = require("./SeasonSchema");

const init = () => {
  app.use(express.static(`${__dirname}/frontend/build`));

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

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  httpServer.listen(80, () => {
    console.log("HTTP Server Running on Port 80");
  });

  httpsServer.listen(443, () => {
    console.log("HTTPS Server Running on Port 443");
  });
};

mongoose
  .connect(
    "mongodb://localhost/CreedFiles",
    { useNewUrlParser: true }
  )
  .then(() => init())
  .catch(e => console.log(e));
