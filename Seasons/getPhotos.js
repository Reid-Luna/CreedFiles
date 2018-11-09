const cheer = require("cheerio");
const rp = require("request-promise");
const fs = require("fs");

const getSeason = async season => {
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

const run = async () => {
  /*
  for (i = 1; i < 10; i++) {
    let episodes = await getSeason(i);
  }
  */
  let one = await getSeason(1);
  console.log(one);
};

run();
