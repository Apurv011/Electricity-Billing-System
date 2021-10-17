const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ZoneController = require('../controllers/zone');

router.get('/', ZoneController.getAllZones);

router.post('/', ZoneController.createOneZone);

router.patch('/:zoneId', ZoneController.updateOneZone);

router.delete('/:zoneId', ZoneController.deleteOneZOne);

module.exports = router;
