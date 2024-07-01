---
"categories":
- cloud
- aws
- log collection
"custom_kind": "integration"
"dependencies": []
"description": "Track key AWS Step Functions metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_step_functions/"
"draft": false
"git_integration_title": "amazon_step_functions"
"has_logo": true
"integration_id": ""
"integration_title": "AWS Step Functions"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_step_functions"
"public_title": "Datadog-AWS Step Functions Integration"
"short_description": "Track key AWS Step Functions metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Step Functions enables you to coordinate the components of distributed applications and microservices using visual workflows.

Enable this integration to see all your Step Functions metrics in Datadog.

<div class="alert alert-warning">Native AWS Step Function monitoring in Datadog is available in public beta. To instrument your Step Functions with enhanced metrics and traces, visit the <a href="https://docs.datadoghq.com/serverless/step_functions">Serverless documentation<a></div>

## Setup

### Installation

If you haven't already, set up the [Amazon Web Services integration][1] first. Then, add the following permissions to the policy document for your AWS/Datadog Role:

```text
states:ListStateMachines,
states:DescribeStateMachine
```

### Metric collection

1. In the [AWS integration page][2], ensure that `States` is enabled under the `Metric Collection` tab. If your state machines use AWS Lambda, also ensure that `Lambda` is checked.
2. Install the [Datadog - AWS Step Functions integration][3].

#### Augmenting AWS Lambda metrics

If your Step Functions states are Lambda functions, installing this integration adds additional [tags][4] `statemachinename`, `statemachinearn`, and `stepname` to your Lambda metrics. This lets you see which state machines your Lambda functions belong to, and you can visualize this on the [Serverless page][5].

### Enhanced metric collection

Datadog can also generate metrics for your Step Functions to help you track the average or p99 of individual step durations. To collect [enhanced metrics for AWS Step Functions][6], you must use Datadog APM.

### Log collection

1. Configure AWS Step Functions to [send logs to CloudWatch][7]. **Note**: Use the default CloudWatch log group prefix `/aws/vendedlogs/states` for Datadog to identify the source of the logs and parse them automatically.
2. [Send the logs to Datadog][8].

### Trace collection

You can enable trace collection in two ways: through Datadog APM for Step Functions, or through AWS X-Ray. 

#### Enable tracing through Datadog APM for AWS Step Functions

<div class="alert alert-warning">
This feature is in public beta.
</div>
To enable distributed tracing for your AWS Step Functions, see the installation instructions in the [Serverless documentation][9].



#### Enable tracing through AWS X-Ray


<div class="alert alert-warning">This option does not collect <a href="https://docs.datadoghq.com/serverless/step_functions/enhanced-metrics">enhanced metrics for AWS Step Functions</a>. For these metrics, you must enable tracing through <a href="https://docs.datadoghq.com/serverless/step_functions">Datadog APM for AWS Step Functions</a>.</div>

To collect traces from your AWS Step Functions through AWS X-Ray:

1. Enable the [Datadog AWS X-Ray integration][10].
1. Log in to the AWS Console.
2. Browse to **Step Functions.**
3. Select one of your Step Functions and click **Edit.**
4. Scroll to the **Tracing** section at the bottom of the page and check the box to **Enable X-Ray tracing.**
5. Recommended: [Install the AWS X-Ray tracing library][11] in your functions for more detailed traces.

## Data Collected

### Metrics
{{< get-metrics-from-git "amazon_step_functions" >}}


### Events

The AWS Step Functions integration does not include any events.

### Service Checks

The AWS Step Functions integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][13].

[1]: /integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-step-functions
[4]: /tagging/
[5]: /serverless/
[6]: https://docs.datadoghq.com/serverless/step_functions/enhanced-metrics
[7]: https://docs.aws.amazon.com/step-functions/latest/dg/cw-logs.html
[8]: /integrations/amazon_web_services/?tab=roledelegation#log-collection
[9]: https://docs.datadoghq.com/serverless/step_functions
[10]: /tracing/serverless_functions/enable_aws_xray
[11]: /integrations/amazon_xray/#installing-the-x-ray-client-libraries
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_step_functions/amazon_step_functions_metadata.csv
[13]: /help/

