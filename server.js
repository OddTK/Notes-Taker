const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api/notes/', (req, res) => {
    res.json(notes);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
