<div class="alert alert-warning">The Amazon Security Lake destination is in Preview. Complete the <a href="https://www.datadoghq.com/product-preview/route-logs-to-amazon-security-lake/">form</a> to request access.
</div>

1. Follow the [Getting Started with Amazon Security Lake][10071] to set up Amazon Security Lake, and make sure to:
    - Enable Amazon Security Lake for the AWS account.
    - Select the AWS regions where S3 buckets will be created for OCSF data.
    - Take note of the Amazon Security Lake S3 bucket name. The bucket name is used when you set up the Amazon Security Lake destination in Observability Pipelines.
1. Follow [Collecting data from custom sources in Security Lake][10072] to create a custom source in Amazon Security Lake.
    - When you [configure a custom log source in Security Lake in the AWS console][10073]:
        - Enter a source name.
        - Select the OCSF event class for the log source and type.
        - Enter the account details for the AWS account that will write logs to Amazon Security Lake:
            - AWS account ID
            - External ID
     - Select **Create and use a new service** for service access.
1. Set up AWS authentication using `AWS_PROFILE` and `AWS_CONFIG FILE` environment variables. Observability Pipelines uses credentials associated with those environment variables to send logs to Amazon Security Lake. See [AWS Authentication][10074] for more information.

[10071]: https://docs.aws.amazon.com/security-lake/latest/userguide/getting-started.html
[10072]: https://docs.aws.amazon.com/security-lake/latest/userguide/custom-sources.html
[10073]: https://docs.aws.amazon.com/security-lake/latest/userguide/get-started-console.html
[10074]: /observability_pipelines/destinations/amazon_security_lake/#aws-authentication