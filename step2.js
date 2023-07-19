const axios = require('axios');
const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:`);
      console.error(err);
    } else {
      console.log(data);
    }
  });
}

function webCat(url) {
  axios
    .get(url)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(`Error fetching ${url}:`);
      console.error(error);
    });
}

const arg = process.argv[2];

if (arg.startsWith('http://') || arg.startsWith('https://')) {
  webCat(arg);
} else {
  cat(arg);
}

