from __future__ import print_function

import json
import boto3

def lambda_handler(event, context):
    
    sns = boto3.client('sns')
    
    data = json.loads(event['body'])
    phonenumber = data['number']

    response = sns.subscribe(
        TopicArn='arn:aws:sns:eu-west-1:829534015160:sns-topic',
        Protocol='sms',
        Endpoint=phonenumber,
        ReturnSubscriptionArn=True
    )

    print("Registered complete")
    
    return {
        'statusCode': 200
    }


