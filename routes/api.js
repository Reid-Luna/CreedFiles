const router = require("express").Router();
const Seasons = require("../models/SeasonSchema");

const getLimit = async season => {
  return new Promise((resolve, reject) => {
    if (season) {
      Seasons.find(season)
        .then(sns => {
          let count = 0;
          sns.forEach(sn => {
            count += sn.episodes[sn.episodes.length - 1].number;
          });
          return resolve(count);
        })
        .catch(reject);
    } else {
      Seasons.find({})
        .then(seasons => {
          let count = 0;
          seasons.forEach(season => {
            count += season.episodes.length;
          });
          return resolve(count);
        })
        .catch(e => console.log(e));
    }
  });
};

router.get("/total", (req, res) => {
  getLimit()
    .then(count => {
      return res.status(200).json({ count });
    })
    .catch(e => {
      return res.status(400).json({ e });
    });
});

router.get("/id", (req, res) => {
  Seasons.find({})
    .then(seasons => {
      let ids = [];
      seasons.forEach(season => {
        season.episodes.forEach(e => {
          ids.push(e._id);
        });
      });
      res.status(200).json({ ids });
    })
    .catch(e => console.log(e));
});

router.get("/id/:id", (req, res) => {
  const { id } = req.params;
  Seasons.find({})
    .then(seasons => {
      seasons.forEach(season => {
        season.episodes.forEach(episode => {
          if (episode._id == id) {
            episode = episode.toJSON();
            episode.season = season.season;
            return res.status(200).json(episode);
          }
        });
      });
    })
    .catch(e => console.log(e));
});

router.get("/:season/limit", (req, res) => {
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

router.get("/:season", (req, res) => {
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

router.get("/:season/:episode", (req, res) => {
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
          return res.status(400).json({ error: "this episode does not exist" });
        }
        if (ep.number == episode) {
          console.log(`sent season ${season}, episode ${episode}`);
          return res.status(200).json(ep);
        }
      });
    })
    .catch(e => res.status(400).json({ e }));
});

module.exports = router;
