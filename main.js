const express = require('express');

const app = express();
const port = 3001;

app.use('/', express.static('public'));

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    }

    console.log(`The app is running on port ${ port }`);
});