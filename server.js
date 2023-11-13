const express = require('express');
const cors = require('cors');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const bodyParser = require("body-parser")

const CLIENT_ID = "b88b3e32ca5bc94ac5b2";
const CLIENT_SECRET = "0b759dbe50b2d05ef9ecaf9b38b17515d0082b08"
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;

    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    })
});

app.get('/getUserData', async function (req, res) {
    req.get("Authorization");
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.json(data);
    });
});

app.listen(port, function () {
    console.log('CORS server running on port 3000')
})

// const server = http.createServer(app);
// server.listen(port, () => {
//   console.log(`Proxy server listening on port ${port}`);
// });
