const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer"); // v1.0.5
const lib = require("./lib");
const adminlib = require("./lib/admin");
const logger = require("./lib/helpers").logger;
const morganConfig = require("./config/morgan");
const upload = multer(); // for parsing multipart/form-data

const app = express();

const PORT = process.env.PORT || 8081;
const serverURLsuffix = (process.env.NODE_ENV === "dev" ? ':' + PORT : '/api');
const checkIfAuthenticated = require('./constants/jwt');
const errorHandler = require('./constants/error-handler');
app.use(cors());
app.use(bodyParser.json());
morganConfig(app);

app.use('/static', express.static('../Projects'));
app.use('/script', express.static('../Scripts'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.post("/getUserData/:uid", checkIfAuthenticated, async function(req, res) {
  let result = await lib.getUserData(req.params.uid);

  return res.status(200).send({
    ...result,
  });
});
app.post("/getUserDataByName/:username", async function(req, res) {
  let result = await lib.getUserDataByName(req.params.username);

  return res.status(200).send({
    ...result,
  });
});
app.post("/setUserData/:uid", checkIfAuthenticated, async function(req, res) {
  let result = await lib.setUserData(req.params.uid, req.body.name, req.body.email, req.body.phoneNumber, req.body.photoURL);

  return res.status(200).send({
    ...result,
  });
});
app.post("/setProjectPublic/:pid", checkIfAuthenticated, async function(req, res) {
  let result = await lib.setProjectPublic(req.params.pid, req.body.isPublic);

  return res.status(200).send({
    ...result,
  });
});
app.post("/setCertainUserData", checkIfAuthenticated, async function(req, res) {
  let result = await adminlib.setCertainUserData(req.body.userData);

  return res.status(200).send({
    ...result,
  });
});
app.post("/createProject/:uid", checkIfAuthenticated, upload.array(), async function(req, res) {
  let result = await lib.createProject(req.params.uid, req.hostname + serverURLsuffix);

  return res.status(200).send({
    ...result,
  });
});
app.post("/saveTempProject/:uid", checkIfAuthenticated, upload.array(), async function(req, res) {
  let result = await lib.saveTempProject(req.params.uid, req.body.files, req.body.codes, req.body.langs, req.hostname + serverURLsuffix);

  return res.status(200).send({
    ...result,
  });
});
app.post("/saveHistory/:uid", checkIfAuthenticated, upload.array(), async function(req, res) {
  let result = await lib.saveHistory(req.params.uid, req.body.projectID, req.body.name, req.body.files, req.body.codes, req.body.langs, req.body.isPublic, req.hostname + serverURLsuffix);

  return res.status(200).send({
    ...result,
  });
});
app.post("/getHistoryList", checkIfAuthenticated, upload.array(), async function(req, res) {
  let result = await lib.getHistoryList(req.body.projectID);

  return res.status(200).send({
    ...result,
  });
});
app.post("/getHistoryData", checkIfAuthenticated, upload.array(), async function(req, res) {
  let result = await lib.getHistoryData(req.body.projectID,req.body.version);

  return res.status(200).send({
    ...result,
  });
});
app.post("/loadProject", upload.array(), async function(req, res) {
  let result = await lib.loadProject(req.body.projectID);

  return res.status(200).send({
    ...result,
  });
});
app.post("/getUsersList", checkIfAuthenticated, upload.array(), async function(req, res) {
  let result = await lib.getUsersList();

  return res.status(200).send({
    ...result,
  });
});

app.use(errorHandler);
// Start the server

app.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}`);
});
