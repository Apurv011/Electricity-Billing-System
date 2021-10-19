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

exports.getOneZone = (req, res, next) => {
    const zoneId = req.params.zoneId;
    Zone
        .findById(zoneId)
        .select('_id zoneName zoneId cost')
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({
                    error: 'User not found',
                });
            }
            return res.status(200).json({
                user: result,
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err,
            });
        });
}

exports.getZoneByName = (req, res, next) => {
    const zoneName = req.params.zoneName;
    Zone
        .find({zoneName: zoneName})
        .select('_id zoneName zoneId cost')
        .exec()
        .then(zone => {
            return res.status(201).json({
              zone: zone
            });
        })
        .catch(error => {
            next(error);
        });
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
