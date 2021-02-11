---
title: End-to-end Python Serverless Monitoring Guide
aliases:
  - /infrastructure/serverless/azure_app_services/python
kind: guide
---

This guide walks you through all the steps to achieving visibility across metrics, traces, and logs in your serverless ecosystem. First, you'll set up **Datadog Lambda Enhanced Metrics** to illustrate how to graph cold starts across your Lambda infrastructure. Second, you'll enable Lambda **logs ingestion** and learn how to navigate Lambda error logs. Third, learn about some tools for fast root cause analysis by enabling Lambda **distributed tracing**. Finally, begin monitoring **custom metrics** and services across your serverless ecosystem.

## Graph Lambda cold starts

### Ingest Lambda metrics

You need to enable the Amazon Web Services integration to begin collecting CloudWatch metrics from Lambda functions. To do this, [follow the steps on the Amazon Web Services documentation][1].
    
If you set up the AWS integration prior to reading this guide, ensure that:  
- In the AWS integration tile, Lambda is checked under metric collection.  
- The `lambda:List*` and `tag:GetResources` permissions are included in the Datadog IAM policy you set up during the installation.  

At this step, Datadog automatically starts collecting key Lambda metrics such as invocations, duration, and errors. You can visualize them in the [out-of-the-box Lambda dashboard][2], which you can find under Dashboards.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_1-compressed.mp4" video="true" alt="Lambda Default Dashboard"  style="width:90%;">}}

You can also view all of your Lambda functions in the Datadog Serverless view. For now, you only see CloudWatch metrics. This guide will outline how to bring together enhanced metrics, traces, and logs from your AWS Lambda functions running serverless applications into one view.

### Graph Lambda cold starts with enhanced metrics

Datadog built two tools that referred to throughout this guide:  
- Datadog Forwarder (used for logs, enhanced metrics, custom metrics, and tracing)  
- Datadog Lambda Layer (used for enhanced metrics and tracing)  

The Lambda Layer generates data that is then sent to Datadog by the Forwarder. The Datadog Lambda Layer also packages Datadog’s tracing library, `dd-trace`, for your runtime.

You’ll be setting up these two tools now to enable enhanced Lambda metrics, which are required to ingest additional metrics and tags, such as cold starts.

What are enhanced Lambda metrics?
- Real-time, second-level granularity serverless runtime metrics
- Include new tags, such as `cold_start`
- Include new metrics such as billed duration and estimated cost

#### Installing the Datadog Forwarder

To install the Datadog Forwarder, follow the steps below. Make sure the Datadog Forwarder is in the same AWS region as the Lambda functions you are monitoring.  

1. Log into your admin AWS account/role and deploy this [CloudFormation Stack][3] by clicking on the link.  
2. Fill in `DdApiKey` with your Datadog API key and select the appropriate `DdSite`. All other parameters are optional. The value for `DdApiKey` can be found on your Datadog account, under the integrations section, on the API tab.  
3. Click **Create stack**, and wait for the creation to complete.  
4. Find the installed forwarder Lambda function under the stack's **Resources** tab with logical ID Forwarder.  
5. Navigate to the **Collect Logs** tab in the AWS Integration tile in Datadog.  
6. Select the AWS Account from where you want to collect logs, and enter the ARN of the Lambda created in the previous section.  
7. Select “Lambda Cloudwatch Logs” and any other services from which you’d like to collect logs and hit save.  

To install the Datadog Forwarder without the CloudFormation Stack, or to upgrade an existing Forwarder, [consult this documentation][4].

#### Installing the Datadog Lambda Layer

{{< tabs >}}
{{% tab "Serverless Framework" %}}

The [Serverless Framework][1] helps you develop and deploy your AWS Lambda functions, along with the AWS infrastructure resources they require. It is very commonly used to package and deploy serverless applications, and Datadog has a plugin specifically designed to make it easy to monitor serverless applications built using the Serverless Framework.

The plugin automatically attaches the Datadog Lambda Layers for Node.js and Python to your functions. At deploy time, it generates new handler functions that wrap your existing functions and initializes the Lambda Layer.

To install the Datadog Lambda Layer, follow the steps below:  

1. Install the Serverless Plugin in your Python package: `yarn add --dev serverless-plugin-datadog`.  

2. In your `serverless.yml`, add the following:  

```bash
plugins:
    		- serverless-plugin-datadog
```

3. In your `serverless.yml`, also add the following section:  

```bash
custom:
        datadog:
        	addLayers: true
            flushMetricsToLogs: true
            logLevel: 'INFO'
            enableDDTracing: true
```

4. Deploy your serverless application again.
  
If you prefer to include the Lambda Layer directly in your project, [follow the instructions linked from this GitHub repository][2] to complete the installation using the open-source Lambda Layer for Python.

Now, the Lambda Layer should be installed on all of your functions automatically. For more information on the different configuration fields of the Datadog Lambda Layer, [refer to this documentation][3].

[1]: https://www.serverless.com/framework/docs/providers/aws/guide/intro/
[2]: https://github.com/DataDog/datadog-lambda-layer-python
[3]: https://docs.datadoghq.com/integrations/amazon_lambda/?tab=serverlessframework#installing-and-using-the-datadog-lambda-layer

{{% /tab %}}
{{% tab "AWS Console" %}}

The Datadog Lambda Layer ARN includes a region, language runtime, and version. Construct yours in the following format:

```text
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

For example:

```text
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:11
```

| Language | Runtime                                        | Releases             |
| -------- | ---------------------------------------------- | -------------------- |
| Python   | `Python27`, `Python36`, `Python37`, `Python38` | [Latest release][1]  |
| Node.js  | `Node8-10`, `Node10-x`, `Node12-x`             | [Latest release][2]  |

1. Navigate to the Lambda function to which you want to add the Layer in your AWS console.
2. Click on **Layers** on the main page of your function.
3. Scroll down, and click on **Add a Layer**.
3. Select the option to **Provide a layer version ARN**.
4. Enter the Datadog Lambda Layer ARN from the table above.
5. Navigate to the **Environment Variables** section of your function and click the Edit button.
6. Add a new `DD_FLUSH_TO_LOG` variable set to `true` and click save.


Now, the Lambda Layer should be installed on this function. You need to repeat these steps to install the Lambda Layer on each function. For more information on the different configuration fields of the Datadog Lambda Layer, [refer to Datadog's Amazon Lambda documentation][3].

[1]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://docs.datadoghq.com/integrations/amazon_lambda/?tab=serverlessframework#installing-and-using-the-datadog-lambda-layer

{{% /tab %}}
{{% /tabs %}}


### Graph Lambda cold starts

With both the Datadog Forwarder and Datadog Lambda Layer properly configured, you can navigate to the out-of-the-box [Enhanced Lambda Metrics dashboard][8].

From here, you will immediately see a graph named “Cold Starts by Function”, which you can expand to get an in-depth overview of which functions you may, for example, want to provide additional provisioned concurrency to.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_2-compressed.mp4" video="true" alt="Enhanced Metrics Dashboard"  style="width:90%;">}}

You can easily recognize any enhanced Lambda metric as they are all named with the prefix `aws.lambda.enhanced.*`. For example, the above graph measures `aws.lambda.enhanced.invocations`, with the tag `cold_start:true`.

## Navigate Lambda error logs

### Enable Lambda log ingestion

In the previous section, you set up the Datadog Forwarder to enable enhanced metrics. The Datadog Forwarder is also required to send logs from your Lambda function to Datadog.

{{< tabs >}}
{{% tab "Serverless Framework" %}}

If you’ve been following along, the Datadog Forwarder is already enabled, and Lambda logs should already automatically be flowing through to Datadog. If you have been following step-by-step but logs aren’t appearing in Datadog, [refer to the Lambda logs troubleshooting steps][1].

If something is already subscribing to a Log Group that you want to monitor with the Datadog Lambda Function, you can add the ARN of the Forwarder to the ‘forwarder’ field in your serverless.yml file. When set, the plugin will try to subscribe the function’s CloudWatch log groups to the Forwarder. For example, your `serverless.yml` could now look like this:

```bash
custom:
    datadog:
        addLayers: true
        flushMetricsToLogs: true
        logLevel: 'INFO'
        enableDDTracing: true
        # Add the ARN of your Forwarder.
        forwarder:
```

[1]: https://docs.datadoghq.com/logs/guide/lambda-logs-collection-troubleshooting-guide/

{{% /tab %}}
{{% tab "AWS Console" %}}

If you’ve been following along, the Datadog Forwarder is already enabled, and Lambda logs should already automatically be flowing through to Datadog. If you have been following step-by-step but logs aren’t appearing in Datadog, [refer to the Lambda logs troubleshooting steps][1].

If something is already subscribing to a Log Group that you want to monitor with the Datadog Lambda Function, you can remove it from the AWS console:  

1. Select the log source on your Lambda function.
2. Select Remove Subscription Filter in the Actions pulldown

[1]: https://docs.datadoghq.com/logs/guide/lambda-logs-collection-troubleshooting-guide/

{{% /tab %}}
{{% /tabs %}}

If your logs still aren’t appearing in Datadog, you can [follow the troubleshooting steps here][9].  

### Triage your Lambda errors in the log explorer

You can visit the Datadog Serverless view again to view all of your Lambda functions. Now, if you navigate to a specific function, you are able to see the logs being emitted from the function. From here, you can navigate to the Log Explorer to learn more about the log.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_3-compressed.mp4" video="true" alt="Serverless Page Logs"  style="width:90%;">}}

You may be interested in knowing which errors are most frequently impacting your users. You can quickly filter through your logs to find the patterns of error logs surfacing from your Lambda functions in order of volume.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_4-compressed.mp4" video="true" alt="Log Patterns"  style="width:90%;">}}

## Root cause analysis for Lambda functions

### Enable Lambda distributed tracing

In the first section, you set up the Datadog Forwarder and Lambda Layer to enable enhanced metrics. Both the Datadog Forwarder and Lambda Layer are also required to surface distributed traces from your functions in Datadog.

{{< tabs >}}
{{% tab "Serverless Framework" %}}

If you’ve been following along, the Datadog Forwarder and Lambda Layer are already enabled. With the Serverless Framework, traces are automatically flowing through to Datadog without any additional code instrumentation.

{{% /tab %}}
{{% tab "Code Instrumentation" %}}

If you’ve been following along, the Datadog Forwarder is enabled and the Lambda Layer has been installed on your function. Follow these steps to set up APM in Python:  

1. Manually add the tracing library to your project, or add `datadog-lambda` to your project's `requirements.txt`.

```bash
pip install datadog-lambda
```

2. Instrument your code.

```python
from datadog_lambda.metric import lambda_metric
from datadog_lambda.wrapper import datadog_lambda_wrapper

from ddtrace import tracer

@datadog_lambda_wrapper
def hello(event, context):
    return {
        "statusCode": 200,
        "body": get_message()
    }

@tracer.wrap()
def get_message():
    return "Hello from serverless!"
```

To instrument your Python libraries and customize your traces, consult the [Datadog Python APM documentation][1].

[1]: https://docs.datadoghq.com/tracing/setup/python/

{{% /tab %}}
{{% /tabs %}}

### Root cause analysis using traces, metrics, and logs

You can visit the Datadog Serverless page one more time to view all of your Lambda functions. If you navigate to a specific function, you are able to see the traces being emitted from the function. You can expand each trace to view a flame graph of the duration of the total request across Lambda functions, as well as correlated logs and Lambda metrics at the time of the request.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_5-compressed.mp4" video="true" alt="Flame Graph"  style="width:90%;">}}

You can use the traces surfaced in the flame graph to identify that the current Lambda function has an error due to an error that surfaced from a subsequent function call. You can quickly navigate to that function in the request, and find the error trace and the corresponding error log, which you can identify to be a timeout. 

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_6-compressed.mp4" video="true" alt="Root Cause Analysis"  style="width:90%;">}}

With logs, traces and enhanced metrics all in one place, you can efficiently identify the root cause of an issue across your serverless requests.

## Serverless integrations and custom metrics

### Datadog’s serverless integrations

As outlined in Datadog’s [State of Serverless report][10], monitoring health across your serverless ecosystem requires visibility over more than just your Lambda functions. Most notably, Lambda functions will often interact with SQS and DynamoDB in the same request. Datadog offers integrations and dashboards with all the services interacting with your Lambda functions.

For example, Datadog has a [DynamoDB integration][11] which collects DynamoDB table performance metrics and logs. Datadog also offers an Amazon SQS integration to ingest SQS metrics and to collect logs during SQS API calls. Both integrations are paired respectively with out-of-the-box dashboards for [DynamoDB tables][11] and [SQS][12]. Integrations for other common serverless services are listed below:  
  
**Data Stores:** RDS, Aurora, self-hosted, S3  
**Message Queues:** SNS, SQS, Kinesis  
**Lambda Features:** [AWS Step Functions][13]  

You can customize any of the default dashboards offered by the above integrations by pulling information from different services all into the same dashboard.

### Submit custom metrics

Custom metrics give additional insights into use cases that are unique to your application workflows, such as a user logging into your application, purchasing an item, or updating a user profile.

In the first section, you set up the Datadog Lambda Layer to enable enhanced metrics. The Datadog Lambda Layer is required to surface distributed traces from your functions in Datadog.

If you’ve been following along, the Datadog Lambda Layer is already enabled. Custom metrics sent from the Datadog Lambda Layer are automatically created as distributions, so you can graph the avg, sum, max, min, and count out-of-the-box. You can also enable your own percentiles in the Distribution Metrics page.

{{< tabs >}}
{{% tab "Serverless Framework" %}}

To ingest a custom metric from your function:  

1. Ensure you have `flushMetricsToLogs: true` set in your `serverless.yml`.  
2. Instrument your code following this example (the metric value must be a number):  

```python
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
        lambda_metric(
            "coffee_house.order_value",             # Metric name
            12.45,                                  # Metric value
            tags=['product:latte', 'order:online']  # Associated tags
        )
```

{{% /tab %}}
{{% tab "AWS Console" %}}

To ingest a custom metric from your function:  

1. Ensure you have the AWS Lambda environment variable `DD_FLUSH_TO_LOG` set to `true`.  
2. In your function code, you must import the necessary methods from the Lambda Layer and add a wrapper around your function handler:

```python
from datadog_lambda.metric import lambda_metric
from datadog_lambda.wrapper import datadog_lambda_wrapper

# You only need to wrap your function handler (Not helper functions). 
@datadog_lambda_wrapper
def lambda_handler(event, context):
    lambda_metric(
        "coffee_house.order_value",             # Metric stackName
        12.45,                                  # Metric value
        tags=['product:latte', 'order:online']  # Associated tags
    )
```

{{% /tab %}}
{{% /tabs %}}

Creating a monitor for a metric enables you to get notified about key issues in your serverless applications. You could then determine root cause as illustrated earlier in this guide by combining metrics, traces, and logs across your Lambda functions, data stores, and message queues.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_7-compressed.mp4" video="true" alt="Custom Metrics"  style="width:90%;">}}

If you are looking to learn more about setting up Lambda for your use case, you can refer to the AWS Lambda documentation [here][14].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/#setup
[2]: https://app.datadoghq.com/screen/integration/98/aws-lambda
[3]: https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml
[4]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#installation
[7]: https://docs.datadoghq.com/integrations/amazon_lambda/?tab=serverlessframework#installing-and-using-the-datadog-lambda-layer
[8]: https://app.datadoghq.com/screen/integration/30306/aws-lambda-enhanced-metrics
[9]: https://docs.datadoghq.com/logs/guide/lambda-logs-collection-troubleshooting-guide/
[10]: https://www.datadoghq.com/state-of-serverless/
[11]: https://docs.datadoghq.com/integrations/amazon_dynamodb/#overview
[12]: https://docs.datadoghq.com/integrations/amazon_sqs/#overview
[13]: https://docs.datadoghq.com/integrations/amazon_step_functions/#overview
[14]: https://docs.datadoghq.com/integrations/amazon_lambda/
