const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');

const uuid = require('./helper/uuid');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

const checkBodyForText = (req, res, next) => {
    if (req.body?.text.length === 0) {
        return res.status(401).json({ error: 'You must create a new note'});
    } else {
        next();
    }
};

app.post('/api/notes', checkBodyForText, (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid,
    };
    notes.push(newNote);
    res.json(newNote);
});

// const readFileAsync = util.promisify(fs.readfile);
// const writeFileAsync = util.promisify(fs.write);



app.listen(PORT, () => console.log(`On port: ${PORT}`));
