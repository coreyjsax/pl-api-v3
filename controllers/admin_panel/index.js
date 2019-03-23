// API Index Controllers
const tools = require('../../controllers/util/tools');
const ft = require('../../controllers/util/foodtec');
const breezy = require('../../controllers/util/breezyHr');
const request = require('request-promise-cache');
const untappd = require('../../controllers/util/untappd');
//Location Models
const Location = require('../../models/location');
//Menu Models
const Menu = require('../../models/menu');
const Category = require('../../models/category');
const Menu_Item = require('../../models/menu_item');
const Item = require('../../models/item');
const Ingredient = require('../../models/ingredient');
const auth0 = require('../../controllers/util/auth0');

const server_error = {message: 'There was a problem...'};

const error = `
    <div>
        <h2>Sorry! There was an error!</h2>
    </div>
`;

exports.get_admin_index_page = (req, res, next) => {
    let menuReq = Menu.find()
                 .populate('categories', 'name id')
                 .populate('locations', 'name id nickname').exec();
    let locationReq = Location.find().exec();
    let itemsReq = Item.find().exec();
    let ingredientsReq = Ingredient.find().exec();
    
    let id = req.user.id;
    let query = `q=user_id=${id}`;
    let fullProfile = auth0.getUserProfile2(id, query)
    
    Promise.all([menuReq, locationReq, itemsReq, ingredientsReq, fullProfile])
    .then(([menus, locations, items, ingredients, user]) => {
        let data = {};
        data.menu = menus;
        data.locations = locations;
        data.items = items;
        data.ingredients = ingredients;
        data.user = user[0]
        
        let store = user[0].organizations[0].department;
        let title = user[0].organizations[0].title;
        
        req.session.passport.user.title = title;
        req.session.passport.user.location = store;
        
        return data;
    }).then((data) => {
        res.render('admin/index', {menus: data.menu, locations: data.locations, 
        items: data.items, ingredients: data.ingredients});
    }).catch((err) => {
        res.render(error)
    });
}

//res.render('admin/index', {menus: docs});

exports.get_menu_gallery = (req, res) => {
    
} 

