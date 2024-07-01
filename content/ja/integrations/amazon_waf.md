---
"aliases":
- "/integrations/awswaf/"
"categories":
- "cloud"
- "security"
- "aws"
- "log collection"
"custom_kind": "integration"
"dependencies": []
"description": "Track allowed versus blocked requests."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_waf/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/aws-waf-metrics/"
  "tag": "Blog"
  "text": "Key metrics for monitoring AWS WAF"
- "link": "https://www.datadoghq.com/blog/aws-waf-monitoring-tools/"
  "tag": "Blog"
  "text": "Tools for collecting AWS WAF data"
- "link": "https://www.datadoghq.com/blog/aws-waf-datadog/"
  "tag": "Blog"
  "text": "Monitor AWS WAF activity with Datadog"
"git_integration_title": "amazon_waf"
"has_logo": true
"integration_id": ""
"integration_title": "AWS WAF"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_waf"
"public_title": "Datadog-AWS WAF Integration"
"short_description": "Track allowed versus blocked requests."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS WAF is a web application firewall that helps protect your web applications from common web exploits.

Enable this integration to see your WAF metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration page][2], ensure that `WAF` or `WAFV2` is enabled under the `Metric Collection` tab, depending on which endpoint you are using.

2. Install the [Datadog - AWS WAF integration][3].

### Log collection

#### Audit logs

Enable Web Application Firewall audit logs to get detailed information about your web ACL analyzed traffic:

1. Create an `Amazon Data Firehose` with a name starting with `aws-waf-logs-`.
2. In the `Amazon Data Firehose` destination, pick `Amazon S3` and make sure you add `waf` as prefix.
3. Select the wanted web ACL and send its logs to the newly created Firehose ([detailed steps][4]).

The WAF logs are collected and sent to a S3 bucket.

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog Forwarder Lambda function][5].
2. Once the Lambda function is installed, manually add a trigger on the S3 bucket that contains your WAF logs in the AWS console, in your Lambda, click on S3 in the trigger list:
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 trigger configuration" popup="true" style="width:70%;">}}
   Configure your trigger by choosing the S3 bucket that contains your WAF logs and change the event type to `Object Created (All)` then click on the add button.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda trigger configuration" popup="true" style="width:70%;">}}

**Note**: The Datadog Lambda forwarder automatically transforms arrays of nested object in WAF logs into a `key:value` format for ease of use.

## Data collected

### Metrics
{{< get-metrics-from-git "amazon_waf" >}}


**Note**: Both `aws.waf.*` and `waf.*` metrics are reported due to the historic format of the CloudWatch metric APIs for WAF.

Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events

The AWS WAF integration does not include any events.

### Service Checks

The AWS WAF integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][7].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-waf
[4]: https://docs.aws.amazon.com/waf/latest/developerguide/logging.html
[5]: https://docs.datadoghq.com/logs/guide/forwarder/
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_waf/amazon_waf_metadata.csv
[7]: https://docs.datadoghq.com/help/

