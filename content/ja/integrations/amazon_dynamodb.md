---
"aliases":
- "/integrations/awsdynamo/"
"categories":
- "cloud"
- "data stores"
- "aws"
- "log collection"
"custom_kind": "integration"
"dependencies": []
"description": "Track table size, read/write capacity, request latency, and more."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_dynamodb/"
"draft": false
"git_integration_title": "amazon_dynamodb"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon DynamoDB"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_dynamodb"
"public_title": "Datadog-Amazon DynamoDB Integration"
"short_description": "Track table size, read/write capacity, request latency, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_dynamodb/dynamodb.png" alt="DynamoDB default dashboard" popup="true">}}

## Overview

Amazon DynamoDB is a fully managed NoSQL database cloud service, part of the AWS portfolio. Fast and easily scalable, it is meant to serve applications which require very low latency, even when dealing with large amounts of data. It supports both document and key-value store models, and has properties of both a database and a distributed hash table.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `DynamoDB` is enabled under the `Metric Collection` tab.
2. Add these permissions to your [Datadog IAM policy][3] in order to collect Amazon DynamoDB metrics:

    - `dynamodb:ListTables`: Used to list available DynamoDB tables.
    - `dynamodb:DescribeTable`: Used to add metrics on a table size and item count.
    - `dynamodb:ListTagsOfResource`: Used to collect all tags on a DynamoDB resource.

    For more information, see the [DynamoDB policies][4] on the AWS website.

3. Install the [Datadog - Amazon DynamoDB integration][5].

### Log collection

#### Enable logging

In AWS CloudTrail, [create a Trail][6] and select an S3 bucket to write the logs in.

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog Forwarder Lambda function][7] in your AWS account. 
2. Once set up, go to the Datadog Forwarder Lambda function. In the Function Overview section, click **Add Trigger**. 
3. Select the **S3** trigger for the Trigger Configuration.
4. Select the S3 bucket that contains your Amazon DynamoDB logs.
5. Leave the event type as `All object create events`.
6. Click **Add** to add the trigger to your Lambda.

Go to the [Log Explorer][8] to start exploring your logs.

For more information on collecting AWS Services logs, see [Send AWS Services Logs with the Datadog Lambda Function][9].

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_dynamodb" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events

The Amazon DynamoDB integration does not include any events.

### Service Checks

The Amazon DynamoDB integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][11].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/authentication-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-dynamodb
[6]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[7]: https://docs.datadoghq.com/logs/guide/forwarder/
[8]: https://app.datadoghq.com/logs
[9]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_dynamodb/amazon_dynamodb_metadata.csv
[11]: https://docs.datadoghq.com/help/

