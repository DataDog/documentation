---
title: End-to-end Node.js Serverless Monitoring Guide
aliases:
  - /infrastructure/serverless/azure_app_services/nodejs
kind: guide
---

This startup guide will walk you through all the steps to power visibility across metrics, traces, and logs in your serverless ecosystem. First, set up **Datadog Lambda Enhanced Metrics** to illustrate how to graph cold starts across your Lambda infrastructure. Second, enable Lambda **logs ingestion** to gather Lambda error logs. Third, perform root cause analysis using Lambda **distributed tracing**. Last, monitor **custom metrics** and services across your serverless ecosystem.

# Section 1: Graph Lambda cold starts

## Ingest Lambda metrics

You need to enable the Amazon Web Services integration to begin collecting CloudWatch metrics from Lambda functions. To do this, [follow these steps][1].  
    
Install the AWS integration and enable these settings:  
- In the AWS integration tile, under metric collection, check Lambda.  
- Include the `lambda:List*` and `tag:GetResources` permissions in the Datadog IAM policy you set up during the installation.  

At this step, Datadog automatically starts collecting key Lambda metrics such as invocations, duration, and errors. You can visualize them in the [out-of-the-box Lambda dashboard][2], which you can find under Dashboards.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_1-compressed.mp4" video="true" alt="Lambda Default Dashboard"  style="width:90%;">}}

You can also view all of your Lambda functions in the Datadog Serverless view. Only CloudWatch metrics are available out of the box - this guide teaches expanding this view to to bring together enhanced metrics, traces, and logs from your AWS Lambda functions running serverless applications.

## Graph Lambda cold starts with enhanced metrics

Datadog built two tools that we refer to throughout this guide:  
- Datadog Forwarder (used for logs, enhanced metrics, custom metrics, and tracing)  
- Datadog Lambda Layer (used for enhanced metrics and tracing)  

The Lambda Layer generates data that is then sent to Datadog by the Forwarder. The Datadog Lambda Layer also packages Datadog’s tracing library, `dd-trace`, for your runtime.

Start by setting up these two tools to enable enhanced lambda metrics, which are required to ingest additional metrics and tags, such as cold starts.

What are enhanced lambda metrics?
- Real-time, second-level granularity serverless runtime metrics
- Include new tags, such as `cold_start`
- Include new metrics such as billed duration and estimated cost

### Installing the Datadog Forwarder

To install the Datadog Forwarder, follow the steps below. Make sure the Datadog Forwarder is in the same AWS region as the Lambda functions you are monitoring.  

1. Log into your admin AWS account/role and deploy this [CloudFormation Stack][3] by clicking on the link.  
2. Fill in DdApiKey and select the appropriate DdSite. All other parameters are optional. The value for DdApiKey can be found on your Datadog account, under the integrations section, on the API tab.  
3. Click **Create stack**, and wait for the creation to complete.  
4. Find the installed forwarder Lambda function under the stack's **Resources** tab with logical ID Forwarder.  
5. Navigate to the **Collect Logs** tab in the AWS Integration tile of the Datadog app.  
6. Select the AWS Account from where you want to collect logs, and enter the ARN of the Lambda created in the previous section.  
7. Select “Lambda Cloudwatch Logs” and any other services from which you’d like to collect logs and hit save.  

To install the Datadog Forwarder without the CloudFormation Stack, or to upgrade an existing Forwarder, [consult this documentation][4].

### Installing the Datadog Lambda Layer

{{< tabs >}}
{{% tab "Serverless Framework" %}}

The [Serverless Framework][1] helps you develop and deploy your AWS Lambda functions, and the AWS infrastructure resources they require. The framework packages and deploys serverless applications. Datadog has a plugin specifically designed to make it easy to monitor serverless applications built using the Serverless Framework.

The plugin automatically attaches the Datadog Lambda Layers for Node.js and Python to your functions. At deploy time, it generates new handler functions that wrap your existing functions and initializes the Lambda Layer.

To install the Datadog Lambda Layer, follow the steps below:  

1. Install the Serverless Plugin in your Node package: `npm install --save-dev serverless-plugin-datadog `.  

2. In your `serverless.yml`, add the following:  

```bash
plugins:
    		- serverless-plugin-datadog
```

3. In your serverless.yml, also add the following section:  

```bash
custom:
        datadog:
        	addLayers: true
            flushMetricsToLogs: true
            logLevel: 'INFO'
            enableDDTracing: true
```

4. Deploy your serverless application again.
  
If you prefer to include the Lambda Layer directly in your project, [follow the instructions linked from this GitHub repository][2] to complete the installation using the open-source Lambda Layer for Node.

Now, the Lambda Layer should be installed on all of your functions automatically. For more information on the different configuration fields of the Datadog Lambda Layer, [refer to this documentation][3].

[1]: https://www.serverless.com/framework/docs/providers/aws/guide/intro/
[2]: https://github.com/DataDog/datadog-lambda-layer-js
[3]: https://docs.datadoghq.com/integrations/amazon_lambda/?tab=serverlessframework#installing-and-using-the-datadog-lambda-layer

{{% /tab %}}
{{% tab "AWS Console" %}}

The Datadog Lambda Layer ARN includes a region, language runtime, and version. Construct yours in the following format:

```text
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

For example:

```text
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Node12:23
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
5. Navigate to the **Environment Variables** section of your function and click the **Edit** button.
6. Add a new `DD_FLUSH_TO_LOG` variable set to `true` and click **Save**.


Now, the Lambda Layer is installed on this function. Repeat these steps to install the Lambda Layer on each function. For more information on the different configuration fields of the Datadog Lambda Layer, [refer to this documentation][3].

[1]: https://github.com/DataDog/datadog-lambda-layer-python/releases
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://docs.datadoghq.com/integrations/amazon_lambda/?tab=serverlessframework#installing-and-using-the-datadog-lambda-layer

{{% /tab %}}
{{% /tabs %}}


## Graph Lambda cold starts

Once you configure both the Datadog Forwarder and the Datadog Lambda Layer, navigate to the out-of-the-box [Enhanced Lambda Metrics dashboard][8].

The dashboard shows “Cold Starts by Function”, which expands into an in-depth overview of the functions.For examples, these could be functions that need additional provisioned concurrency.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_2-compressed.mp4" video="true" alt="Enhanced Metrics Dashboard"  style="width:90%;">}}

Recognize any enhanced Lambda metric by the prefix `aws.lambda.enhanced.*`. For example, the above graph measures `aws.lambda.enhanced.invocations`, with the tag `cold_start:true`.

# Section 2: Navigate Lambda error logs

## Enable Lambda log ingestion

In the previous section, we set up the Datadog Forwarder to enable enhanced metrics. The Datadog Forwarder is also required to send logs from your Lambda function to Datadog.

{{< tabs >}}
{{% tab "Serverless Framework" %}}

At this point, the Datadog Forwarder is enabled, and lambda logs should already automatically be flowing through to Datadog. If logs aren’t yet appearing in Datadog, [refer to the Lambda logs troubleshooting steps][1].

If something is already subscribing to a log group that you want to monitor with the Datadog Lambda Function, you can add the ARN of the Forwarder to the ‘forwarder’ field in your serverless.yml file. When set, the plugin will try to subscribe the function’s CloudWatch log groups to the Forwarder. For example, your serverless.yml could now look like this:

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

At this point, the Datadog Forwarder is enabled, and Lambda logs should already automatically be flowing through to Datadog. If  logs aren’t yet appearing in Datadog, [refer to the Lambda logs troubleshooting steps][1].

If something is already subscribing to a Log Group that you want to monitor with the Datadog Lambda Function, you can remove it from the AWS console:  

1. Select the log source on your Lambda function.
2. Select Remove Subscription Filter in the Actions pulldown

[1]: https://docs.datadoghq.com/logs/guide/lambda-logs-collection-troubleshooting-guide/

{{% /tab %}}
{{% /tabs %}}

If your logs still aren’t appearing in Datadog, you can [follow the troubleshooting steps here][9].  

## Triage your Lambda errors in the log explorer

Visit the Datadog Serverless view to view all of the Lambda functions. Navigate to a specific function to see the logs being emitted from the function. Then navigate to the log explorer to learn more about the log.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_3-compressed.mp4" video="true" alt="Serverless Page Logs"  style="width:90%;">}}

You may be interested in knowing which errors are most frequently impacting your users. You can quickly filter through your logs to find the patterns of error logs surfacing from your Lambda functions in order of volume.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_4-compressed.mp4" video="true" alt="Log Patterns"  style="width:90%;">}}

# Section 3: Root cause analysis for Lambda functions

## Enable Lambda distributed tracing

In the first section, we set up the Datadog Forwarder and Lambda Layer to enable enhanced metrics. Both the Datadog Forwarder and Lambda Layer are also required to surface distributed traces from your functions in Datadog.

{{< tabs >}}
{{% tab "Serverless Framework" %}}

At this point, the Datadog Forwarder is and Lambda Layer are already enabled. With the Serverless Framework, traces are automatically flowing through to Datadog without any additional code instrumentation.

{{% /tab %}}
{{% tab "Code Instrumentation" %}}

Follow these steps to set up APM in Node:  

1. Manually add the tracing library to your project:

```bash
npm install datadog-lambda-js
npm install dd-trace

yarn add datadog-lambda-js
yarn add dd-trace
```

2. Instrument your code.

```js
const { datadog } = require('datadog-lambda-js');
const tracer = require('dd-trace').init(); // Any manual tracer config goes here.

// This function will be wrapped in a span
const longCalculation = tracer.wrap('calculation-long-number', () => {
        // An expensive calculation goes here
});

// This function will also be wrapped in a span
module.exports.hello = datadog((event, context, callback) => {
        longCalculation();

        callback(null, {
            statusCode: 200,
            body: 'Hello from serverless!'
        });
});
```

To instrument your Node libraries and customize your traces, consult the [Datadog Node APM documentation][1].

[1]: https://docs.datadoghq.com/tracing/setup/nodejs/

{{% /tab %}}
{{% /tabs %}}

## Root cause analysis using traces, metrics, and logs

View the Datadog Serverless page to see the Lambda functions. Navigate to a specific function to see the traces being emitted from the function. Expand each trace to view a flame graph of the duration of the total request across Lambda functions, and correlated logs and Lambda metrics at the time of the request.

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_5-compressed.mp4" video="true" alt="Flame Graph"  style="width:90%;">}}

Use the traces surfaced in the flame graph to identify that the current Lambda function has an error due to an error that surfaced from a subsequent function call. Navigate to that function in the request, and find the error trace and the corresponding error log, which in this example is a timeout. 

{{< img src="serverless/guides/end-to-end_serverless_monitoring_database/guide_video_6-compressed.mp4" video="true" alt="Root Cause Analysis"  style="width:90%;">}}

With logs, traces, and enhanced metrics all in one place, we are able to efficiently identify the root cause of an issue across our serverless requests.

# Section 4: Serverless integrations and custom metrics

## Datadog’s serverless integrations

As outlined in Datadog’s [State of Serverless report][10], monitoring health across your serverless ecosystem requires visibility over more than just your Lambda functions. Most notably, Lambda functions will often interact with SQS and DynamoDB in the same request. Datadog offers integrations and dashboards with all the services interacting with your Lambda functions.

For example, Datadog has a [DynamoDB integration][11] which collects DynamoDB table performance metrics and logs. Datadog also offers an Amazon SQS integration to ingest SQS metrics and to collect logs during SQS API calls. Both integrations are paired respectively with out-of-the-box dashboards for [DynamoDB tables][11] and [SQS][12].  Integrations for other common serverless services are listed below:  
  
**Data Stores:** RDS, Aurora, self-hosted, S3  
**Message Queues:** SNS, SQS, Kinesis  
**Lambda Features:** [AWS Step Functions][13]  

You can customize any of the default dashboards offered by the above integrations by pulling information from different services all into the same dashboard.

## Submit custom metrics

Custom metrics give additional insights into use cases that are unique to your application workflows, such as a user logging into your application, purchasing an item, or updating a user profile.

In the first section, we set up the Datadog Lambda Layer to enable enhanced metrics. The Datadog Lambda Layer is required to surface distributed traces from your functions in Datadog.

Once you have the Datadog Lambda Layer enabled, custom metrics are automatically created as distributions, so you can graph the `avg`, `sum`, `max`, `min`, and `count` out-of-the-box. You can also enable your own percentiles in the Distribution Metrics page.

{{< tabs >}}
{{% tab "Serverless Framework" %}}

To ingest a custom metric from your function:  

1. Ensure you have `flushMetricsToLogs: true` set in your `serverless.yml`.  
2. Instrument your code following this example (the metric value must be a number):  

```js
const { datadog, sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
        sendDistributionMetric(
            'coffee_house.order_value', // Metric name
            12.45, // Metric value
            'product:latte',
            'order:online' // Associated tags
        );
        return {
            statusCode: 200,
            body: 'hello, dog!'
        };
}
// You do not need to wrap your functions.
module.exports.myHandler = myHandler;
```

{{% /tab %}}
{{% tab "AWS Console" %}}

To ingest a custom metric from your function:  

1. Ensure you have the AWS Lambda environment variable `DD_FLUSH_TO_LOG` set to `true`.  
2. In your function code, you must import the necessary methods from the Lambda Layer and add a wrapper around your function handler:

```js
const { datadog, sendDistributionMetric } = require('datadog-lambda-js');

async function myHandler(event, context) {
        sendDistributionMetric(
            'coffee_house.order_value', // Metric name
            12.45, // Metric value
            'product:latte',
            'order:online' // Associated tags
        );
        return {
            statusCode: 200,
            body: 'hello, dog!'
        };
}
// You only need to wrap your function handler (Not helper functions).
module.exports.myHandler = datadog(myHandler);
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
