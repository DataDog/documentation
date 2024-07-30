Enable AWS CloudTrail logging so that logs are sent to a S3 bucket. If you already have this setup, skip to [Send AWS CloudTrail logs to Datadog](#send-aws-cloudtrail-logs-to-datadog).

1. Click **Create trail** on the [CloudTrail dashboard][100].
2. Enter in the name for your trail.
3. Create a new S3 bucket or use an existing S3 bucket to store the CloudTrail logs. 
4. Create a new AWS KMS key or use an existing AWS KMS key. Click **Next**.
5. Leave the event type with the default management read and write events, or choose additional event types you want to send to Datadog. Click **Next**.
6. Review and click **Create trail**.

[100]: https://console.aws.amazon.com/cloudtrail/home