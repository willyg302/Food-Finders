// Our collection of restaurants
Restaurants = new Meteor.Collection("restaurants");

// Publish complete set of restaurants to all clients
Meteor.publish("restaurants", function () {
	return Restaurants.find({});
});