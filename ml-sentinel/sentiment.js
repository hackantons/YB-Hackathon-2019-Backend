var AWS = require('aws-sdk');
var comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});

exports.handler = (event, context, callback) => {
    
    console.log(event);

    let text = JSON.parse(event.body)
    
    let textInput = JSON.stringify(text.Text)
    let languageCode = JSON.stringify(text.LanguageCode)
    
    var params = {
        LanguageCode: 'de', /* required */
        Text: textInput /* required */
    };
    
    comprehend.detectSentiment(params, function(err, data) {
        if (err) console.log(err, err.stack); //    an error occurred
        else {
            console.log(data);           // successful response
            callback(null, {
                statusCode: 200,
                body: JSON.stringify( data )
            });
        }
    });
};