// routes.js
const express = require('express');
const router = express.Router();
const loginDB = require('./loginDatabase');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

//Resume Database Routes
router.get('/login/users',  async (req, res) => {
    const result = loginDB.getUsers();

    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

router.post('/login/system', async (req, res) => {
    const { username, password } = req.body;
    try {
	    console.log(username, password);
        const result = await loginDB.logIntoSystem(username, password);
        res.send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
