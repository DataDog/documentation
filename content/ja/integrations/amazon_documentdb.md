---
"categories":
- cloud
- data stores
- aws
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Monitor Amazon DocumentDB metrics and logs."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_documentdb/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-documentdb-with-datadog/"
  "tag": Blog
  "text": Collect Amazon DocumentDB metrics and logs with Datadog
"git_integration_title": "amazon_documentdb"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon DocumentDB"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_documentdb"
"public_title": "Datadog-Amazon DocumentDB Integration"
"short_description": "Monitor Amazon DocumentDB metrics and logs."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Amazon DocumentDB is a fast, scalable, highly available, and fully managed document database service that supports MongoDB workloads.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `DocumentDB` is enabled under the `Metric Collection` tab.
2. Install the [Datadog - Amazon DocumentDB integration][3].

### Log collection

#### Enable logging

Configure Amazon DocumentDB to send logs either to a S3 bucket or to CloudWatch.

**Note**: If you log to a S3 bucket, make sure that `amazon_documentdb` is set as _Target prefix_.

#### Send logs to Datadog

1. If you haven’t already, set up the [Datadog Forwarder Lambda function][4].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket or CloudWatch log group that contains your Amazon DocumentDB logs in the AWS console:

    - [Add a manual trigger on the S3 bucket][5]
    - [Add a manual trigger on the CloudWatch Log Group][6]

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_documentdb" >}}


Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to dbinstanceidentifier, dbclusteridentifier, and more.

### Events

The Amazon DocumentDB integration does not include any events.

### Service Checks

The Amazon DocumentDB integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-documentdb
[4]: https://docs.datadoghq.com/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_documentdb/amazon_documentdb_metadata.csv
[8]: https://docs.datadoghq.com/help/

