const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const apiRoutes = require("./routes/api");
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

const init = () => {
  app.use(express.static(`${__dirname}/frontend/build`));

  app.use("/api", apiRoutes);

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
