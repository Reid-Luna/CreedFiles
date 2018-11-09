const cheer = require("cheerio");
const rp = require("request-promise");
const fs = require("fs");

const getPhotos = async season => {
  return new Promise(async resolve => {
    let photos = {};
    let html = await rp(
      `https://www.imdb.com/title/tt0386676/episodes?season=${season}`
    );
    let $ = cheer.load(html);
    let children = $("div.list.detail.eplist").children();
    for (i = 0; i < children.length; i++) {
      let parentDiv = children[i];
      let imageDiv = $(parentDiv)
        .children(".image")
        .children("a")
        .children("div.hover-over-image.zero-z-index ")
        .children("img")[0];
      let name = imageDiv.attribs.alt;
      let url = imageDiv.attribs.src;
      photos[name] = url;
    }
    return resolve(photos);
    /*
    fs.writeFile(
      `./season${season}.json`,
      JSON.stringify(episodes, null, 2),
      () => {
        console.log(`wrote season ${season}`);
        return resolve(true);
      }
    );
    */
  });
};

const getSeason = async season => {
  return new Promise(async resolve => {
    let html = await rp(
      `https://en.wikipedia.org/wiki/The_Office_(U.S._season_${season})`
    );
    let $ = cheer.load(html);
    let children = $("table.wikiepisodetable")
      .children()
      .children();
    children.splice(0, 1);
    let done = [];
    let ogepisodes = [];
    for (let i = 0; i < children.length; i++) {
      if (done.indexOf(i) == -1 && done.indexOf(i + 1) == -1) {
        ogepisodes.push([children[i], children[i + 1]]);
        done.push(i);
        done.push(i + 1);
      }
    }
    let episodes = [];
    await ogepisodes.forEach(async i => {
      let number, title, description;
      await i.forEach(async (j, index) => {
        if (index == 0) {
          number = j.children[1].children[0].data;
          title = j.children[2].children[1].children[0].data;
        }
        if (index == 1) {
          let string = "";
          await j.children[0].children.forEach(k => {
            if (k.name == "a") {
              string += k.children[0].data;
              //console.log(k.children[0]);
            } else {
              string += k.data;
              //console.log(k);
            }
          });
          string = string.replace(/(?:\r\n|\r|\n)/g, "");
          description = string;
        }
      });
      let obj = {
        number,
        title,
        description
      };
      episodes.push(obj);
    });
    console.log(`writing season ${season}`);
    return resolve(episodes);
    /*
    fs.writeFile(
      `./season${season}.json`,
      JSON.stringify(episodes, null, 2),
      () => {
        console.log(`wrote season ${season}`);
        return resolve(true);
      }
    );
    */
  });
};

const mongoose = require("mongoose");
const Season = require("../SeasonSchema");

const run = async () => {
  mongoose
    .connect(
      "mongodb://127.0.0.1:27017/CreedFiles",
      { useNewUrlParser: true }
    )
    .then(async () => {
      let loopArr = [];
      for (i = 1; i < 10; i++) {
        loopArr.push(i);
      }
      loopArr.forEach(async thing => {
        getPhotos(thing).then(photos => {
          getSeason(thing).then(episodes => {
            for (episode of episodes) {
              if (photos[episode.title]) {
                episode.image = photos[episode.title];
              } else if (episode.title == "Email Surveillance") {
                episode.image =
                  "https://m.media-amazon.com/images/M/MV5BMTQyMDQ2NTg4OF5BMl5BanBnXkFtZTgwMzY4MjU1MjE@._V1_UX200_CR0,0,200,112_AL_.jpg";
              } else if (episode.title == "Niagara") {
                episode.image =
                  "https://m.media-amazon.com/images/M/MV5BZGY5YjhlOWMtYjVkYi00Njc0LTk2OTEtNTZjNTExMzI4NmM4XkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_UX200_CR0,0,200,112_AL_.jpg";
              } else if (episode.title == "The Manager and the Salesman") {
                episode.image =
                  "https://m.media-amazon.com/images/M/MV5BMTg1NDA5MDk3NF5BMl5BanBnXkFtZTgwNTczMzU1MjE@._V1_UX200_CR0,0,200,112_AL_.jpg";
              } else if (episode.title == "The Delivery") {
                episode.image =
                  "https://m.media-amazon.com/images/M/MV5BMTM4MDIzOTE0NV5BMl5BanBnXkFtZTcwMDgyODIyMw@@._V1_UX200_CR0,0,200,112_AL_.jpg";
              } else {
                console.log(`${episode.title} does not have an image`);
              }
            }
            new Season({
              season: thing,
              episodes
            })
              .save()
              .then(() => console.log(`saved season ${thing}`))
              .catch(e => console.log(e));
          });
        });
      });
    })
    .catch(e => console.log(e));
};

run();
