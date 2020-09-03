const Twitter = require('twitter');
const Sheet = require('./sheet');
const dotenv = require('dotenv');

//load in the env variables from .env file
dotenv.config();

(async function() {
	//twitter api access config
	const client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	//load google sheets doc and get quotes from first column
	const sheet = new Sheet();
	await sheet.load();
	const quotes = await sheet.getRows();

	//try to post tweet in first row, throw error if db empty
	try {
		const status = quotes[0].quote;
		client.post('statuses/update', { status }, function(error, tweet, response) {
			if (error) throw error;
			console.log(tweet); // Tweet body.
			console.log(response); // Raw response object.
		});

		//delete quote from db after posting it
		await quotes[0].delete();
	} catch (err) {
		console.log(err);
		console.log('There are no quotes left in DB');
	}
})();
