---
title: Serverless Billing
---

## Managing usage

You can track the billable and total Serverless usage in your account by checking the Datadog Usage Page. You can see both the Month-To-Date summary, as well as usage over time.

Datadog Serverless monitoring is billed based on a combination of the invocations and active Lambda functions that are tracked and monitored within Datadog. The relevant metrics based on your plan are visible in the Plan and Usage page's Serverless tab under the [Billable filter][1]. For more information about your plan and usage, contact your [Customer Success][3] Manager.

Lambda functions can be monitored through the [Datadog AWS Integration][10] or by direct instrumentation with the [Lambda Extension][11] and [Forwarder][12] layers.

## Integration

To control which functions are being monitored through the integration, you can use the [Lambda integration's][13] Metric collection controls through the UI and API.

### UI

To use the UI to control which AWS Lambda functions Datadog is monitoring, navigate to the [AWS Integration page][5]. From the left sidebar, select the relevant AWS account, and navigate to the **Metric Collection tab**. Scroll down to the **Limit Metric Collection to Specific Resources** heading, and select Lambda from the **Select AWS Service** dropdown. You can then add tags as `key:value` sets to the field to the right.

See the [tags](#Tags) section below for more information about how to use tags in this field.

### API

To use the API to control which AWS Lambda functions Datadog is monitoring, reference the [API tag filter documentation][6].

### Tags

Datadog accepts a comma-separated list of tags in the form `key:value`. This list defines a filter that is used when collecting metrics from the associated AWS service. These `key:value` pairs can both allow and exclude tags. To indicate an exclusion, add a `!` before the tag key. Wildcards, such as `?` (for single characters) and `*` (for multiple characters), can also be used.

The filter only excludes resources where all allowed tags are missing—that is, where the list of allowed tags forms an "OR" statement.

For example: `datadog:monitored,env:production`

This filter only collects EC2 instances that contain the tag `datadog:monitored` OR the tag `env:production`.

If you add an exclusion tag to the list, it takes precedence—that is, adding an exclusion tag adds an "AND" statement.

For example: `datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1`

This filter only collects EC2 instances that contain the tag
`datadog:monitored` OR the tag `env:production` OR an instance-type tag with a `c1.*` value AND NOT a `region:us-east-1` tag.

## Instrumentation

Datadog provides a [Lambda Extension][14] and multiple different Lambda Layers to trace and monitor your functions based on your runtime. Active functions that are instrumented and monitored with these libraries incur billable usage, including when the AWS integration is disabled.

Datadog provides multiple tools to manage the installation and configuration of these libraries. These can be used to scale and automate installing or managing Datadog's lambda libraries. For more information, see [Install Serverless Monitoring for AWS Lambda][15].

## Active functions definition

Datadog bills based on the average number of functions per hour across the month for your accounts. Every hour, Datadog records the number of functions that were executed one or more times and monitored by your Datadog account. At the end of the month, Datadog charges by calculating the average of the hourly number of functions recorded. Pro and Enterprise plans include five custom metrics per billable function. A single billable function is defined by a unique function ARN. In the case of Lambda@Edge functions, each function in a different region is counted as a separate billable function.

Billing for serverless APM is based on the sum of AWS Lambda invocations connected to APM ingested spans in a given month. You are also billed for the total number of [indexed spans][4] submitted to the Datadog APM service exceeding the bundled quantity at the end of the month. There are no billable [APM Hosts][4] when using serverless.

## Troubleshooting

For technical questions, contact [Datadog support][7].
For more information about billing or your plan and usage contact, contact your [Customer Success][3] Manager.

[1]: https://app.datadoghq.com/billing/usage?category=serverless&data_source=billable
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://app.datadoghq.com/account/usage
[5]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[6]: /api/latest/aws-integration/#set-an-aws-tag-filter
[7]: /help/
[8]: https://app.datadoghq.com/functions
[9]: https://app.datadoghq.com/metric/explorer?exp_metric=aws.lambda.invocations&exp_group=functionname&exp_agg=sum
[10]: /integrations/amazon_billing/
[11]: /serverless/libraries_integrations/extension/
[12]: /logs/guide/forwarder/
[13]: /integrations/amazon_lambda/
[14]: /serverless/aws_lambda
[15]: /serverless/installation/

