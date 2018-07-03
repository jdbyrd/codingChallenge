const express = require('express');
const bodyParser = require('body-parser');
var keyword_extractor = require("keyword-extractor");
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


let port = process.env.PORT || 3000;

let data = {checkout: 'Checkout time is 3:00', key: 'The key is in the lockbox on the door', beach: 'The beach is across the street'};

app.post('/input', (req, res) => {
  let input = req.body.input;
  let sentences = input.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
  let response = {};
  sentences.forEach((sentence, index) => {
    let words = keyword_extractor.extract(sentence,{
      language:"english",
      remove_digits: true,
      return_changed_case:true,
      remove_duplicates: false
    });
    response[sentence] = [words];
    words.forEach((word, index) => {
      word = word.replace(/[^\w\s]|_/g, "")
      if(data[word]){
        response[sentence][1] = data[word];
      }else if(words.length - 1 === index && response[sentence][1] === undefined){
        response[sentence][1] = 'unmatched'
      }
    });
  });
  res.json(response);
});

app.post('/update', (req, res) => {
  let updates = req.body;
  for(let key in updates){
    data[key] = updates[key];
  }
  res.end();
});


app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

