---
title: Getting Started with Serverless Monitoring
kind: documentation

further_reading:
    - link: '/agent/basic_agent_usage/'
      tag: 'Documentation'
      text: 'Basic Agent Usage'
---

## Overview

This guide makes use of a serverless [sample app][1] that you can launch with one click. This app has Datadog Serverless Monitoring preconfigured.

### Installation

1. [Launch Stack][9].
2. Enter your Datadog API key and Datadog site ({{< region-param key="dd_site" code="true" >}}). Then, acknowledge IAM capabilities and click **Create Stack**.
3. After the stack has been created, open the Outputs tab.
4. Invoke your stack a few times by visiting the `ApiGatewayInvokeURL`.

Then, visit your `DatadogFunctionLink` to see your functions in Serverless View.

## Serverless View
You can also access Serverless View through Datadog’s left nav: **Infrastructure > Serverless**.

{{< img src="getting_started/serverless/serverless_view.png" alt="Serverless Monitoring: Serverless View, an explorer page" style="width:80%;">}}

The Serverless View displays telemetry from all serverless resources in your AWS environment. You can use this page as a starting point for monitoring, debugging, and optimizing your applications.

If you have invoked your sample app at least once, you will see `datadog-sample-entry-function` and `datadog-sample-sqs-consumer-function`:

{{< img src="getting_started/serverless/functions_view.png" alt="Close-up of two functions" style="width:80%;">}}

### Tag your functions
The serverless sample app sets the environment variables `DD_ENV`, `DD_SERVICE`, and `DD_VERSION`. These variables set the following tags:

```yaml
env: dev
service: datadog-serverless-sample-app
version: 1.0.0
```

To add more tags, go to the AWS console function page for your function. Go to the Configuration tab and add a `DD_TAGS` environment variable. Set tags in `<key>:<value>` format, in a comma separated list:

{{< img src="getting_started/serverless/aws_console_tags.png" alt="Close-up of two functions" style="width:80%;">}}

See [Datadog Lambda Extension Tagging][2] for more information.

### Serverless Insights
In Serverless View, the rightmost column is titled **Insights**. Datadog automatically highlights potential issues in your serverless applications, such as [high errors][3] and [high duration][4]; these issues appear in the Insights column.

For your serverless sample application, Datadog has likely detected a [cold start][5]. Cold starts occur when your serverless application receives a sudden increase in traffic. This can happen if the function was previously receiving a relatively constant number of requests and abruptly started receiving more—or, as in this case, when the function was previously inactive and has been invoked for the first time.

## Function details
Click on your function to see more details regarding invocations and recent deployments.

{{< img src="getting_started/serverless/open_function.png" alt="Close-up of two functions" style="width:80%;">}}

### Invocations
The **Invocations** tab displays your function’s latest invocations. Each invocation is associated with a trace. Click on **Open Trace** to see the trace for each invocation:

{{< img src="getting_started/serverless/flame_graph.png" alt="Close-up of two functions" style="width:80%;">}}

The above flame graph shows exactly what happened during the duration of this invocation, including which services had the highest percentage of the total execution time. Underneath, you can also examine your Lambda request and response payloads. From here, you can also pivot to metrics and logs.

### Logs

The serverless sample app has logs enabled by default. You can see each function's logs under its **Logs** tab. 

{{< img src="getting_started/serverless/logs_view.png" alt="Close-up of two functions" style="width:80%;">}}

You can filter these logs to only see errors, or view them in the [Log Explorer][6].

### Metrics

The **Metrics** tab displays a number of graphs regarding cold starts, initial duration, timeouts, and out of memory errors. These graphs are powered by [enhanced Lambda metrics][7].

{{< img src="getting_started/serverless/logs_view.png" alt="Close-up of two functions" style="width:80%;">}}

Datadog generates enhanced Lambda metrics out-of-the-box with low latency, several second granularity, and detailed metadata for cold starts and custom tags. 

You can also view the default [enhanced Lambda metrics dashboard][8].

[1]: https://github.com/DataDog/serverless-sample-app
[2]: https://docs.datadoghq.com/serverless/libraries_integrations/extension/#tagging
[3]: https://docs.datadoghq.com/serverless/guide/insights/#high-errors
[4]: https://docs.datadoghq.com/serverless/guide/insights/#high-duration
[5]: https://docs.datadoghq.com/serverless/guide/insights/#cold-starts
[6]: https://docs.datadoghq.com/logs/explorer/
[7]: https://docs.datadoghq.com/serverless/enhanced_lambda_metrics
[8]: https://app.datadoghq.com/screen/integration/30306?_gl=1*19700i3*_ga*OTk0Mjg4Njg4LjE2NDIwOTM2OTY.*_ga_KN80RDFSQK*MTY0OTI3NzAyMC4xNTAuMS4xNjQ5MjgzMjI1LjA.
[9]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-serverless-sample-app&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-sample-app/latest.yaml