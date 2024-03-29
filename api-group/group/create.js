'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

let enableCORS = { "x-custom-header" : "x-amzn-RequestId,x-amzn-ErrorType,x-amzn-ErrorMessage,Date",
                   "Access-Control-Allow-Origin": "*"
                 }

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.name !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain', ...enableCORS },
      body: 'Couldn\'t create the group item.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: data.name,
      data: data,
    },
    ConditionExpression: 'attribute_not_exists(id)'
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain', ...enableCORS },
        body: 'Couldn\'t create the group item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: enableCORS,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
