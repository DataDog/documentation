To use Observability Pipelines's Amazon S3 source, you need to:
- Configure a SQS queue to receive your S3 bucket notifications, which is required to use the Amazon S3 source.
- Set up AWS authentication using `AWS_PROFILE` and `AWS_CONFIG FILE` environment variables. Observability Pipelines uses the credentials associated with those environment variables to collect logs from Amazon S3. See [AWS Authentication][10091] for more information.

[10091]: /observability_pipelines/sources/amazon_s3/#aws-authentication