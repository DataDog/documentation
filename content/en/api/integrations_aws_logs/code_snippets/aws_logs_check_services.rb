require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

config = {
    "account_id": '<AWS_ACCOUNT_ID>',
    "services": ['s3', 'elb', 'elbv2', 'cloudfront', 'redshift', 'lambda']
  }

dog.aws_logs_check_services(config)