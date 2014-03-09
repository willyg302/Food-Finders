Meteor gathers any files under this subdirectory and makes the contents of these files available to server code via the [Assets](http://docs.meteor.com/#assets) API. This is the place for any files that should be accessible to server code but not served to the client, like private data files.

**IMPORTANT**: If `default-data.json` has changed, call `meteor reset` first to flush your local DB before running again.

### JSON Format - Restaurant

	name		String				"Bob's Burgers"
	address		String				"1234 Street St."
	zipcode		int					96817
	delivery	boolean				true
	hours		String				"9-5"
	complete %	int					32
	type		array of String		["American", "Chinese", "Thai"]
	keywords	array of String		["burgers", "fries", "ice cream"]
	menu		array of object		[...see below...]

### JSON Format - Dish

	name		String				"Bob's All American"
	type		String 				"burgers"
	price		float				6.99