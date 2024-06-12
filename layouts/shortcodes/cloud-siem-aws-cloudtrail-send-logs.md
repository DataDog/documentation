Set up a trigger on your Datadog Forwarder Lambda function to send CloudTrail logs stored in the S3 bucket to Datadog for monitoring.

1. Go to the [Datadog Forwarder Lambda][104] that was created during the AWS integration set up.
2. Click **Add trigger**.
3. Select **S3** for the trigger.
4. Select the S3 bucket you are using to collect AWS CloudTrail logs. 
5. For Event type, select **All object create events**.
6. Click **Add**.
7. See CloudTrail logs in Datadog's [Log Explorer][105].

See [Log Explorer][106] for more information on how to search and filter, group, and visualize your logs. 

[104]: https://console.aws.amazon.com/lambda/home
[105]: https://app.datadoghq.com/logs?query=service%3Acloudtrail
[106]: https://docs.datadoghq.com/logs/explorer/