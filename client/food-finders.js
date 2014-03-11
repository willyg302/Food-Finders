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

/*
Template.restaurant.events({
	'mousedown .media': function(evt) {
		Router.setRestaurant(this._id);
	}
});*/

Template.menu.restaurant = function() {
	return Restaurants.findOne({_id: Session.get('restaurant_id')});
};


/** BACKBONE **/

var MainRouter = Backbone.Router.extend({
	routes: {
		'': 'main',
		':restaurant_id': 'restaurant',
		'*path': 'main'  // For any other path, go home
	},
	main: function() {
		Session.set('restaurant_id', null);
	},
	restaurant: function(restaurant_id) {
		if (Session.get('restaurant_id') !== restaurant_id) {
			Session.set('restaurant_id', restaurant_id);
		}
	},
	setRestaurant: function(restaurant_id) {
		this.navigate(restaurant_id, true);
	}
});

Router = new MainRouter();

Meteor.startup(function() {
	Backbone.history.start({pushState: true});
});


/**
 * This is odd. So, we basically capture all a-href links and route them
 * through Backbone instead because that retains the reactivity. This also means
 * all href's must start with a slash.
 *
 * IF YOU TAKE THIS OUT LINKS WILL BE MEGA SLOW.
 */
$(document).on('click', 'a[href^="/"]', function(event) {
	var href = $(event.currentTarget).attr('href');
	if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
		event.preventDefault();
		var url = href.replace(/^\//,'').replace('\#\!\/','');
		Router.navigate(url, {trigger: true});
		return false;
	}
});