const Location = require('../../models/location');
const request = require('request-promise-cache');
const untappd = require('../../controllers/util/untappd');
const employment = require('../../controllers/api/employment');
const foodtec = require('../../controllers/util/foodtec');
const auth0 = require('../../controllers/util/auth0');
const server_error = {message: 'There was a problem...'};

///////////////////////////////////////
//  Admin Panel LocationControllers  //
///////////////////////////////////////

//Get all locations (card view)
exports.get_locations = (req, res) => {
    let model = 'location';
    
    Location.find().
    exec((err, docs) => {
        if (err) {
            res.send(err)
        }
            res.render('./admin/loaders/menu-cards', {items: docs, model: model})
    })
}

exports.get_location_by_id = (req, res) => {
    
    let payload = {};
    
    Location.findById(req.params.locId, (err, doc) => {
        if (err) {
            res.send(err);
        } else {
           
            payload.location = doc;
            let untappdId = doc.meta_data.untappd_id;
            let breezyId = doc.meta_data.breezy_id;
            let foodtecId = doc.meta_data.foodtec_id;
            
            let untappd_menus = untappd.getAllUntappdFullMenusByLocation(untappdId);
            let breezy_positions = employment.get_location_positions(breezyId);
            let delivery_area = foodtec.getDeliveryArea(foodtecId);
            
            Promise.all([untappd_menus, breezy_positions, delivery_area])
            .then(([untappd, breezy, delivery, user]) => {
                let untappdMenus = untappd
                payload.beer_menus = untappdMenus;
                payload.positions = breezy;
                payload.delivery_area = delivery;
                return payload;
            }).then((payload) => {
               //res.json(payload)
               console.log(payload.beer_menus)
               res.render('./admin/location/show', {untappd: payload.beer_menus, breezy: payload.breezy, delivery: payload.delivery, location: payload.location})
            }).catch((err) => {
                return err;
            })
        }
    })
}
