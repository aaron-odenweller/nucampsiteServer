const express = require("express");
const bodyParser = require("body-parser");

const partnerRouter = express.Router();

partnerRouter.use(bodyParser.json()); //additional middleware which parses the body of the request according to how it's formatted.  Here it's expecting json, but it could be urlencoded, or text, or something else: https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions

partnerRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next(); //this next function passes control of app routing to the next relevent routing method after this one (if it was a POST request, it will then route to POST endpoint); otherwise it'll stop here and not go any further
  })
  .get((req, res) => {
    res.end("Will send all the partners to you");
  })
  .post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })
  .delete((req, res) => {
    res.end("Deleting all partners");
  });

partnerRouter
  .route("/:partnerId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next(); //this next function passes control of app routing to the next relevent routing method after this one (if it was a POST request, it will then route to POST endpoint); otherwise it'll stop here and not go any further
  })
  .get((req, res) => {
    res.end(`Will send details of the partner: ${req.params.partnerId} to you`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
  })
  .put((req, res) => {
    res.write(`Updating the partner: ${req.params.partnerId}\n`);
    res.end(`Will update the partner: ${req.body.name}
        with description: ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end(`Deleting partner: ${req.params.partnerId}`);
  });

module.exports = partnerRouter;
