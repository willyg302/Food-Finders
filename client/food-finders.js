// Define Minimongo collections to match server/publish.js
Restaurants = new Meteor.Collection("restaurants");

var restaurantsHandle = Meteor.subscribe("restaurants");


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
}