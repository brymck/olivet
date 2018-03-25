const csv = require('csvtojson');
const request = require('request');

const url = 'https://gist.githubusercontent.com/chriddyp/5d1ea79569ed194d432e56108a04d188/raw/a9f9e8076b837d541398e999dcbac2b2826a81f8/gdp-life-exp-2007.csv';

exports.load = (res) => {
  const json = [];
  csv()
    .fromStream(request.get(url))
    .on('json', row => json.push(row))
    .on('done', () => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(json));
    });
};
