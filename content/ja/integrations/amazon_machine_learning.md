---
"aliases":
- "/integrations/awsml/"
"categories":
- "cloud"
- "aws"
- "log collection"
- "ai/ml"
"custom_kind": "integration"
"dependencies": []
"description": "Track prediction counts and failures from AWS Machine Learning."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_machine_learning/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/"
  "tag": "Blog"
  "text": "Best practices for monitoring ML models in production"
"git_integration_title": "amazon_machine_learning"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon Machine Learning"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_machine_learning"
"public_title": "Datadog-Amazon Machine Learning Integration"
"short_description": "Track prediction counts and failures from AWS Machine Learning."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Machine Learning is a service that makes it easy for developers of all skill levels to use machine learning technology.

Enable this integration to see in Datadog all your Machine Learning metrics.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration first][1].

### Metric collection

1. In the [AWS integration page][2], ensure that `ML` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - AWS Machine Learning integration][3].

### Log collection

#### Enable logging

Configure AWS Machine Learning to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_machine_learning` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your AWS Machine Learning logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_machine_learning" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events

The AWS Machine Learning integration does not include any events.

### Service Checks

The AWS Machine Learning integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-machine-learning
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_machine_learning/amazon_machine_learning_metadata.csv
[8]: https://docs.datadoghq.com/help/

