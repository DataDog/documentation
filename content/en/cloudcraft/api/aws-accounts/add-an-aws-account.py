from cloudcraftco import Cloudcraft

cloudcraft = Cloudcraft()

data = {"name": "AWS Account.", "roleArn": 'your-role-arn'}
result = cloudcraft.create_aws_account(data)
