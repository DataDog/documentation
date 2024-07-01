---
"app_id": "amazon-api-gateway"
"app_uuid": "431bfc66-cc6e-40c5-b7f0-dbb2990322c8"
"assets":
  "dashboards":
    "Amazon API Gateway": "assets/dashboards/aws_api_gateway_dashboard.json"
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "aws.apigateway.latency"
      "metadata_path": "metadata.csv"
      "prefix": "aws.apigateway"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "166"
    "source_type_name": "Amazon Api Gateway"
  "monitors":
    "[AWS] API Gateway Elevated 4XX Error Rate for REST API {{apiname.name}}": "assets/monitors/rec_mon_4xx_errors.json"
    "[AWS] API Gateway Elevated 5XX Error Rate for REST API {{apiname.name}}": "assets/monitors/rec_mon_5xx_errors.json"
    "[AWS] API Gateway High Response Time (latency) on {{apiname.name}}": "assets/monitors/rec_mon_high_latency.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "aws"
- "metrics"
- "cloud"
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "amazon_api_gateway"
"integration_id": "amazon-api-gateway"
"integration_title": "Amazon Api Gateway"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_api_gateway"
"public_title": "Amazon Api Gateway Integration"
"short_description": "Amazon API Gateway is a managed service for APIs."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::AWS"
  - "Category::Metrics"
  - "Category::Cloud"
  "configuration": "README.md#Setup"
  "description": "Amazon API Gateway is a managed service for APIs."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Amazon Api Gateway Integration"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.

Enable this integration to see all of your API Gateway metrics in Datadog.

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1].

### Metric collection

1. On the [AWS integration page][2], ensure that `API Gateway` is enabled under the `Metric Collection` tab.

2. Add the following permissions to your [Datadog IAM policy][3] in order to get custom tags applied to API Gateway Stages:

    - `apigateway:GET`
    - `tag:GetResources`

3. Install the [Datadog - Amazon API Gateway integration][4].


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

**Note**: If you've enabled detailed CloudWatch metrics, you must enable them for all Resources or Routes within a Stage. Otherwise, aggregate values in Datadog will be incorrect.

### Log collection

To enable API Gateway logging:

1. Go to API Gateway in your AWS console.
2. Select the wanted API and go to the Stages section.
3. In the **Logs** tab, enable **Enable CloudWatch Logs** and **Enable Access Logging**.
4. Select the `INFO` level to make sure you have all the requests.
5. Make sure your **CloudWatch Group** name starts with `api-gateway`.
6. Select the JSON format (CLF and CSV are also supported) and add the following in the **Log format** box:

    ```text
    {
        "apiId": "$context.apiId",
        "stage": "$context.stage",
        "requestId":"$context.requestId",
        "ip":"$context.identity.sourceIp",
        "caller":"$context.identity.caller",
        "user":"$context.identity.user",
        "requestTime":$context.requestTimeEpoch,
        "httpMethod":"$context.httpMethod",
        "resourcePath":"$context.resourcePath",
        "status":$context.status,
        "protocol":"$context.protocol",
        "responseLength":$context.responseLength
    }
    ```

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][5].
2. Once the Lambda function is installed, manually add a trigger on the CloudWatch Log group that contains your API Gateway logs in the AWS console.
   Select the corresponding CloudWatch Log group, add a filter name (but feel free to leave the filter empty) and add the trigger.

Once completed, navigate to the [Logs page][6] to start exploring your logs!

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_api_gateway" >}}



### Events

The Amazon API Gateway integration does not include any events.

### Service Checks

The Amazon API Gateway integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][8].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-api-gateway
[5]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_api_gateway/amazon_api_gateway_metadata.csv
[8]: https://docs.datadoghq.com/help/

