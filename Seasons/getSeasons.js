const cheer = require("cheerio");
const rp = require("request-promise");
const fs = require("fs");

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

const run = async () => {
  for (i = 1; i < 10; i++) {
    let episodes = await getSeason(i);
  }
};
