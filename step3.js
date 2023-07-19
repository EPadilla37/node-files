const fs = require('fs');
const axios = require('axios');

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
  axios.get(url)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(`Error fetching ${url}:`);
      console.error(error);
    });
}

function catWrite(path, filename) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:`);
      console.error(err);
    } else {
      fs.writeFile(filename, data, 'utf8', err => {
        if (err) {
          console.error(`Couldn't write ${filename}:`);
          console.error(err);
        } else {
          console.log(`Successfully wrote ${path} to ${filename}.`);
        }
      });
    }
  });
}

function webCatWrite(url, filename) {
  axios.get(url)
    .then(response => {
      fs.writeFile(filename, response.data, 'utf8', err => {
        if (err) {
          console.error(`Couldn't write ${filename}:`);
          console.error(err);
        } else {
          console.log(`Successfully wrote ${url} to ${filename}.`);
        }
      });
    })
    .catch(error => {
      console.error(`Error fetching ${url}:`);
      console.error(error);
    });
}

const args = process.argv.slice(2);

if (args[0] === '--out') {
  const filename = args[1];
  const arg = args[2];
  if (arg.startsWith('http://') || arg.startsWith('https://')) {
    webCatWrite(arg, filename);
  } else {
    catWrite(arg, filename);
  }
} else {
  const arg = args[0];
  if (arg.startsWith('http://') || arg.startsWith('https://')) {
    webCat(arg);
  } else {
    cat(arg);
  }
}
