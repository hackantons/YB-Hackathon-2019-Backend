'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

let enableCORS = { "x-custom-header" : "x-amzn-RequestId,x-amzn-ErrorType,x-amzn-ErrorMessage,Date",
                   "Access-Control-Allow-Origin": "*"
                 }

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain', ...enableCORS },
      body: 'Couldn\'t update the profile item.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      '#profile_data': 'data',
    },
    ExpressionAttributeValues: {
      ':data': data,
    },
    UpdateExpression: 'SET #profile_data = :data',
    ReturnValues: 'ALL_NEW',
  };

  dynamoDb.update(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain', ...enableCORS },
        body: 'Couldn\'t fetch the profile item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: enableCORS,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
