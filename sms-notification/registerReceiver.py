from __future__ import print_function

import json
import boto3

def lambda_handler(event, context):
    
    sns = boto3.client('sns')

    phonenumber = event['body'][0]['number']
    print(phonenumber)


    response = sns.subscribe(
        TopicArn='sms',
        Protocol='sms',
        Endpoint=event.phonenumber,
        Attributes={
            'string': 'string'
        }
    )

    print("Registered complete")
    
    return response


