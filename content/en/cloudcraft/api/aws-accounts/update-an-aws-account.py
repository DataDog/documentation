from cloudcraftco import Cloudcraft

cloudcraft = Cloudcraft()

account_id = 'your account id'
data = {"name": "Updated AWS Account.", "roleArn": 'your-role-arn'}
result = cloudcraft.update_aws_account(account_id, data)
