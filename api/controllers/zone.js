const mongoose = require('mongoose');
const Zone = require('../models/zone');

exports.getAllZones = (req, res, next) => {
	Zone
		.find()
		.exec()
		.then(zones => {
			const response = {
				count: zones.length,
				zones: zones.map(zone => {
					return {
						_id: zone._id,
						zoneName: zone.zoneName,
						zoneId: zone.zoneId,
						cost: zone.cost
					}
				})
			};
			res.status(200).json(response);
		})
		.catch(error => {
			next(error);
		})
};

exports.createOneZone = (req, res, next) => {
	const zone = createZone(req);

	zone
		.save()
		.then(zone => {
			res.status(200).json({
				message: 'Zone Created Successfully!',
				zone: {
					_id: zone._id,
					zoneName: zone.zoneName,
					zoneId: zone.zoneId,
					cost: zone.cost
				}
			});
		})
		.catch(error => {
			console.log(error);
			next(error);
		});
};

exports.updateOneZone = (req, res, next) => {
	const zoneId = req.params.zoneId;

	Zone
		.update({ _id: zoneId }, { $set: req.body })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Updated Zone Successfully!',
				result: result
			});
		})
		.catch(error => {
			next(error);
		})
};

exports.deleteOneZOne = (req, res, next) => {
	const zoneId = req.params.zoneId;

	Zone
		.remove({ _id: zoneId })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Deleted Zone Successfully!',
				result: result
			});
		})
		.catch(error => {
			next(error);
		});
};

function createZone(req) {
	return new Zone({
		_id: new mongoose.Types.ObjectId(),
		zoneName: req.body.zoneName,
		zoneId: req.body.zoneId,
		cost: req.body.cost
	});
}
