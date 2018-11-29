const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");

const http = require("http");
const fs = require("fs");

const https = require("https");

const key = fs.readFileSync(`${__dirname}/ssl/creedfiles_com.key`);
const cert = fs.readFileSync(`${__dirname}/ssl/creedfiles_com.crt`);
const ca = fs.readFileSync(`${__dirname}/ssl/creedfiles_com.ca-bundle`);
const credentials = {
  key,
  cert,
  ca
};

const app = express();

const cors = require("cors");
const bp = require("body-parser");

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use(cors());

const apiRoutes = require("./routes/api");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const init = () => {
  app.use(express.static(`${__dirname}/frontend/build`));

  app.use("/api", apiRoutes);
  app.use("/users", userRoutes);
  app.use("/auth", authRoutes);

  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  app.use(passport.initialize());
  require("./config/passport")(passport);

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
