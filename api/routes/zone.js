const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ZoneController = require('../controllers/zone');

router.get('/', ZoneController.getAllZones);

router.get('/:zoonId', ZoneController.getOneZone);

router.get('/name/:zoneName', ZoneController.getZoneByName);

router.post('/', ZoneController.createOneZone);

router.patch('/:zoneId', ZoneController.updateOneZone);

router.delete('/:zoneId', ZoneController.deleteOneZOne);

module.exports = router;
