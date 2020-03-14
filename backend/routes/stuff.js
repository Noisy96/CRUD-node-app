const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const mutler = require('../middleware/mutler-config');

router.post('/', auth, mutler, stuffCtrl.createThing);
router.get('/', auth, stuffCtrl.getAllThings);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, mutler, stuffCtrl.updateOneThing);
router.delete('/:id', auth, stuffCtrl.deleteOneThing);

module.exports = router;