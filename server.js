const express = require('express');
const sources = require('./example/sources');

const app = express();
const port = process.env.PORT || 5000;

app.get('/sources/:name', (req, res) => {
    sources[req.params.name].load(res);
})

app.listen(port, () => console.log(`Listening on port ${port}`));