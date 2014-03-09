Meteor gathers any files under this subdirectory and makes the contents of these files available to server code via the [Assets](http://docs.meteor.com/#assets) API. This is the place for any files that should be accessible to server code but not served to the client, like private data files.

JSON Format

	name		name of restaurant		Bob's Burgers
	address		address					1234 Street St.
	zipcode		zip code				96817
	delivery	boolean					yes
	hours		hours of operation		9-5
	complete	percent complete		32%
	type		type of restaurant		American, Chinese, Thai
	keywords	keywords for search		Burgers, Fries, Ice Cream

	menu
			items
				name	Bob's All American
				type	burgers