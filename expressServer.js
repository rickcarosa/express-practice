const express = require("express");
// express() is a function from the express module
const app = express();

// all is a method that takes 2 args:
// 1. route
// 2. callback to run
app.all('*', (req, res) => {
    // Express handles the basic headers (status code, mime-type)
    res.send(`<h1>This is the home page</h1>`)
    // Express handles the end
});

app.listen(3000)
console.log('Server listening on port 3000...')