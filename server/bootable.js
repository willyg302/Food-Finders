// If the database is empty on server start, create some sample data
Meteor.startup(function () {
	if (Restaurants.find().count() === 0) {
		var data = JSON.parse(Assets.getText("default-data.json"));
		for (var i = 0; i < data.length; i++) {
			Restaurants.insert(data[i]);
		}
	}
});