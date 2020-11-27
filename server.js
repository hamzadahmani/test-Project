const express = require("express");
const app = express();
const dataEN = require("./dataset_en.json");
const dataFR = require("./dataset_fr.json");

app.get("/:lang/:page", (req, res) => {
  var array = [];
  if (
    (req.params.lang == "en" && req.params.page <=dataEN.results.length/10 )||
    (req.params.lang == "fr" && req.params.page <=dataFR.results.length/10 )
  ) {
    for (
      let i = (req.params.page - 1) * 10;
      i <= req.params.page * 10 - 1;
      i++
    ) {
      if (req.params.lang == "en") {
        array.push(dataEN.results[i].headword.text);
      } else if (req.params.lang == "fr") {
        array.push(dataFR.results[i].headword.text);
      }
    }
    res.status(200).json({ success: true, array });
  } else {
    res.status(404).json({ success: false });
  }
});

app.listen(3000, (err) => {
  if (err) console.log("not running");
  else console.log("running");
});
