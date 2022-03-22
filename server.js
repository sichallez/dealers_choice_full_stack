// Require express module
const express = require('express');
const app = express();
// Require the database
const { models: { Club, League }, synAndSeed } = require('./db');

// Require path module
const path = require('path');

// Require static route to load webpack generated js script
app.use('/dist', express.static(path.join(__dirname, '/dist')));

// JSON required for parsing req.body?
app.use(express.json());

// Create the GET / route
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Create the GET /api route
app.get('/api/clubs', async(req, res, next) => {
    try {
        // This include is used for testing, but avoid using include in React application! 
        // const clubs = await Club.findAll({
        //     include: { model: League, as: 'league' }
        // });
        const clubs = await Club.findAll();
        res.send(clubs);
    }
    catch (err) {
        next(err);
    }
});

app.get('/api/clubs/:id', async(req, res, next) => {
    try {
        const club = await Club.findByPk(req.params.id);
        res.send(club);
    }
    catch (err) {
        next(err);
    }
});

// Delete route
app.delete('/api/clubs/:id', async(req, res, next) => {
    try {
        const club = await Club.findByPk(req.params.id);
        await club.destroy();
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});

// POST route
app.post('/api/clubs', async(req, res, next) => {
    try {
        console.log(req.body);        
        res.status(201).send(await Club.create({name: req.body.newClub}));
    }
    catch (err) {
        next(err);
    }
});

app.get('/api/leagues', async(req, res, next) => {
    try {
        const leagues = await League.findAll();
        res.send(leagues);
    }
    catch (err) {
        next(err);
    }
});

// Initiallization of the App
const init = async() => {
    try {
        await synAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listen on port ${port} ...`));
    }
    catch (err) {
        console.log(err);
    }
};

init();