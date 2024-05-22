const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('YIKES! 404 ERROR!.'));

module.exports = router;