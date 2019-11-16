import boto3
import json

def lambda_handler(event, context):

    sns = boto3.client('sns')
    
    data = json.loads(event['body'])

    message = json.loads(event['body'])['message']

    if 'number' in data:
        sns.publish(    
            PhoneNumber=data['number'],
            Message=message,
        ) 
    # else:
    #     sns.publish(    
    #         TopicArn='arn:aws:sns:eu-west-1:829534015160:sns-topic',
    #         Message=message,
    #     )
    
    return {
        'statusCode':200
    }