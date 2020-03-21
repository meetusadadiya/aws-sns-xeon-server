const fs = require('fs');
require('dotenv').config();
let arr = require('./list').arr;
var AWS = require('aws-sdk');

let i = 0,
	j = arr.length;
// req.query.message
let bodymsg = `As per Govt. of Gujarat's notification regarding COVID-19, SPECTRUM 2020 & H2O RUN have been postponed until further announcement. Stay Tuned!\n\nHealth is above everything!\n\nContact: +919879212015 for any queries.\n\nRegards,\nTeam SPECTRUM 2020, ADIT`;

setInterval(() => {
	if (i == j) {
		console.log('Completed');

		process.exit(1);
	}
	var params = {
		Message: bodymsg,
		PhoneNumber: '+91' + arr[i]
	};
	var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
		.publish(params)
		.promise();
	publishTextPromise
		.then(function(data) {
			console.log({
				mobile: params.PhoneNumber,
				MessageID: data.MessageId
			});
		})
		.catch(function(err) {
			err = err.toString();
			fs.appendFileSync(
				'./failed.txt',
				JSON.stringify({
					err: err,
					mob: params.PhoneNumber
				})
			);
			console.log({ mobile: params.PhoneNumber, Error: err });
		});
	i++;
}, 8000);

// new AWS.SNS().setSMSAttributes({});
