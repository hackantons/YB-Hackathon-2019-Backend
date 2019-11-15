'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

let enableCORS = { "x-custom-header" : "x-amzn-RequestId,x-amzn-ErrorType,x-amzn-ErrorMessage,Date",
                   "Access-Control-Allow-Origin": "*"
                 }

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.get(params, (error, result) => {
    
    if (typeof result.Item === 'undefined') {
      callback(null, {
        statusCode: 404,
        headers: enableCORS,
        body: "Group does exist."
        });
        return
    }
    
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain', ...enableCORS},
        body: 'Couldn\'t fetch the group item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: enableCORS,
      body: JSON.stringify(result.Item),
    };
    
    callback(null, response);
  });
}
