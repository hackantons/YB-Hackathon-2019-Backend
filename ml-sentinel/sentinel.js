var AWS = require("aws-sdk");
var comprehend = new AWS.Comprehend({ apiVersion: "2017-11-27" });

exports.handler = (event, context, callback) => {
  let text = JSON.parse(event.body);

  let textInput = JSON.stringify(text.text);

  var params = {
    LanguageCode: "de" /* required */,
    Text: textInput /* required */
  };

  comprehend.detectSentiment(params, function(err, data) {
    if (err) console.log(err, err.stack);
    //    an error occurred
    else {
      console.log(data); // successful response
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data)
      });
    }
  });
};
