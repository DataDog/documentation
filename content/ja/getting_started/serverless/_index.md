---
further_reading:
- link: /agent/basic_agent_usage/
  tag: Documentation
  text: Basic Agent Usage
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Join an interactive session to learn more about serverless monitoring
kind: documentation
title: Getting Started with AWS Lambda Serverless Monitoring
---

## Overview

_Serverless_ is a model where developers build and run applications and services using a cloud provider, rather than managing infrastructure themselves. Datadog [Serverless Monitoring][1] collects metrics, logs, and traces from your serverless infrastructure, enabling you to monitor your application's health and performance.

This guide makes use of a serverless [sample app][2] that you can launch with one click. This app has Serverless Monitoring preconfigured. Follow this guide to see how you might troubleshoot a problem in your sample app, and what kinds of visibility Serverless Monitoring can provide.

### Install the sample app

1. [Launch the CloudFormation Stack][3]. This link brings you to a **Create stack** page in CloudFormation.
2. Enter your [Datadog API key][4] and [Datadog site][5] ({{< region-param key="dd_site" code="true" >}}). 

  {{< img src="getting_started/serverless/aws_create_stack.png" alt="Close-up of two functions" style="width:80%;">}}

   Then, acknowledge IAM capabilities and click **Create Stack**.

3. After the stack has been created, open the Outputs tab.

  {{< img src="getting_started/serverless/aws_outputs.png" alt="Close-up of two functions" style="width:80%;">}}

  Invoke your sample app a few times by visiting the `ApiGatewayInvokeURL`. This returns a "Sent message to SNS" success message.

Each invocation executes the following:

```python
import boto3, os

def handler(event, context):
    sns = boto3.client('sns')

    sns.publish(
        TopicArn=os.environ.get("SNS_TOPIC_ARN"),
        Message='Message sent to SNS'
        )

    return {
        "body": "Sent message to SNS",
        "statusCode": 200
    }
```

You can [see your sample app functions in Serverless View][6].

{{< img src="getting_started/serverless/serverless_view_2024.png" alt="Serverless Monitoring: Serverless View, an explorer page" style="width:80%;">}}

## Serverless View

The Serverless View displays telemetry from all serverless resources in your AWS environment. You can use this page as a starting point for monitoring, debugging, and optimizing your applications.

If you have invoked your sample app at least once, you will see `datadog-sample-entry-function` and `datadog-sample-sqs-consumer-function`:

{{< img src="getting_started/serverless/functions_view.png" alt="Close-up of two functions" style="width:80%;">}}

### Serverless Insights
In Serverless View, the rightmost column is titled **Insights**. Datadog automatically highlights potential issues in your serverless applications, such as [high errors][7] and [high duration][8]; these issues appear in the Insights column.

For your serverless sample application, Datadog has likely detected a [cold start][9]. Cold starts occur when your serverless application receives a sudden increase in traffic. This can happen if the function was previously receiving a relatively constant number of requests and abruptly started receiving more—or, as in this case, when the function was previously inactive and has been invoked for the first time.

## Create an error to investigate

You can intentionally cause an error by editing the `datadog-sample-entry-function` in the sample app stack.

```python
  # Entry Lambda Function Code
  def handler(event, context):

    raise Exception('Throw an error.')
```

{{< img src="getting_started/serverless/aws_error.png" alt="Close-up of two functions" style="width:80%;">}}


Deploy this change and invoke your sample app again to see how you can investigate this error in Datadog.

{{< img src="getting_started/serverless/dd_serverless_view_error.png" alt="Close-up of two functions" style="width:80%;">}}

Notice that `datadog-sample-entry-function` has five errors.

## Function details
Click on your function to see more details regarding invocations and recent deployments.

{{< img src="getting_started/serverless/details_error.png" alt="Close-up of two functions" style="width:80%;">}}

The detailed view, as shown above, contains three graphs. You can set these to display any available metric; by default, they show three [enhanced Lambda metrics][10]: invocations, errors, and duration. 

Datadog generates enhanced Lambda metrics out-of-the-box with low latency, several second granularity, and detailed metadata for cold starts and custom tags. You can also view the default [enhanced Lambda metrics dashboard][11].


### Invocations
The **Invocations** tab displays your function's latest invocations. 

Each invocation is associated with a trace. Click on **Open Trace** to see the trace for each invocation:

{{< img src="getting_started/serverless/dd_flame_graph.png" alt="Close-up of two functions" style="width:80%;">}}

The **Flame Graph** tab shows exactly what happened during the duration of this invocation, including which services had the highest percentage of the total execution time. The flame graph displays the request as it travels from APIGateway, through your `datadog-sample-entry-function`, through SNS, SQS, and finally your `datadog-sample-sqs-function`.

{{< img src="getting_started/serverless/trace_map.png" alt="Close-up of two functions" style="width:80%;">}}

The **Trace Map** tab visualizes the flow of your services and how they connect to each other.

The lower half of the detailed trace view displays a stack trace, which reveals the line of code responsible for throwing the error:

```
Traceback (most recent call last):
  File /opt/python/lib/python3.9/site-packages/datadog_lambda/wrapper.py, line 142, in __call__
    self.response = self.func(event, context, **kwargs)
File /var/task/index.py, line 17, in handler
    raise Exception('Throw an error.')
Exception: Throw an error.
```

Underneath, you can also examine your Lambda request and response payloads. Datadog collects event payloads for every Lambda invocation.

### Logs

The serverless sample app has logs enabled by default. You can see each function's logs under its **Logs** tab. 

{{< img src="getting_started/serverless/dd_logs_view.png" alt="Close-up of two functions" style="width:80%;">}}

You can filter these logs to only see errors, or view them in the [Log Explorer][12].


[1]: /ja/serverless
[2]: https://github.com/DataDog/serverless-sample-app
[3]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-serverless-sample-app&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-sample-app/latest.yaml
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/ja/getting_started/site
[6]: https://app.datadoghq.com/functions?cloud=aws&text_search=datadog-serverless-sample-app
[7]: https://docs.datadoghq.com/ja/serverless/guide/insights/#high-errors
[8]: https://docs.datadoghq.com/ja/serverless/guide/insights/#high-duration
[9]: https://docs.datadoghq.com/ja/serverless/guide/insights/#cold-starts
[10]: https://docs.datadoghq.com/ja/serverless/enhanced_lambda_metrics
[11]: https://app.datadoghq.com/screen/integration/30306?_gl=1*19700i3*_ga*OTk0Mjg4Njg4LjE2NDIwOTM2OTY.*_ga_KN80RDFSQK*MTY0OTI3NzAyMC4xNTAuMS4xNjQ5MjgzMjI1LjA.
[12]: https://docs.datadoghq.com/ja/logs/explorer/