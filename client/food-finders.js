// Define Minimongo collections to match server/publish.js
Restaurants = new Meteor.Collection("restaurants");

var restaurantsHandle = Meteor.subscribe("restaurants");

// ID of currently selected restaurant
Session.setDefault('restaurant_id', null);


Template.mainPanel.mainview = function() {
	return !Session.get('restaurant_id');
};


Template.restaurantList.restaurants = function() {
	all = Restaurants.find({}).fetch();
	chunks = [];
	size = 3;
	while (all.length > size) {
		chunks.push({row: all.slice(0, size)});
		all = all.slice(size);
	}
	chunks.push({row: all});
	return chunks;
};

Template.restaurant.progress = function(complete) {
	if (complete < 50) {
		return 'danger';
	}
	if (complete < 80) {
		return 'warning';
	}
	return 'success';
};

Template.restaurant.events({
	'mousedown .media': function(evt) {
		Router.setRestaurant(this._id);
	}
});


/** BACKBONE **/

var MainRouter = Backbone.Router.extend({
	routes: {
		':restaurant_id': 'main'
	},
	main: function(restaurant_id) {
		var oldRestaurant = Session.get('restaurant_id');
		if (oldRestaurant !== restaurant_id) {
			Session.set('restaurant_id', restaurant_id);
		}
	},
	setRestaurant: function(restaurant_id) {
		this.navigate(restaurant_id, true);
	}
});

Router = new MainRouter;

Meteor.startup(function() {
	Backbone.history.start({pushState: true});
});