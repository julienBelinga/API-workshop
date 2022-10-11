const express = require('express');
const app = express();
require('dotenv').config();

const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'Kw3rkSR2kAL5J77cUrkpxWFDmYc2vwvf8KPSH6EPmU-dBHeU1o7FZRme_W11Vk2W',
    baseURL: 'http://localhost:3000',
    clientID: 'Z2v9xZ62xUnIHpliujAgCzFL6vKGh1Zq',
    issuerBaseURL: 'https://dev-p1gexlri.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});