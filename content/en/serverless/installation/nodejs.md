---
title: Installing Node.js Serverless Monitoring
kind: documentation
further_reading:
    - link: 'serverless/installation/node'
      tag: 'Documentation'
      text: 'Installing Node.js Serverless Monitoring'
    - link: 'serverless/installation/ruby'
      tag: 'Documentation'
      text: 'Installing Ruby Serverless Monitoring'
---

After you have [installed the AWS integration][1], use Node.js to instrument your application to send metrics, logs, and traces to Datadog. 

## Configuration

{{< tabs >}}
{{% tab "Serverless Framework" %}}

### Install the Datadog Lambda Library

Use the [Datadog Serverless Plugin][1] to ingest traces from your application without any code instrumentation. The plugin automatically attaches the Datadog Lambda Library for Node.js to your functions using layers. At deploy time, it generates new handler functions that wrap your existing functions and initializes the Lambda Library.

To install the Datadog Lambda Library with the Serverless Framework plugin, follow these steps:

1. Install the Serverless Plugin in your application package: 
	`yarn add --dev serverless-plugin-datadog`
2. In your `serverless.yml`, add the following:
    ```
    plugins:
		    - serverless-plugin-datadog
    ```
3. In your `serverless.yml`, also add the following section:
    ```
    custom:
        datadog:
            enableDDTracing: true
            flushMetricsToLogs: true
            # The Datadog Forwarder ARN goes here.
            forwarder:
    ```
    For more information on the Forwarder ARN, or to install the forwarder see the [official CloudFormation documentation][1].
4. Redeploy your serverless application.

[1]:https://github.com/DataDog/serverless-plugin-datadog
[1]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
{{% /tab %}}
<!--- {{% tab "SAM" %}}

### Install the Datadog Lambda Library

Use the Datadog SAM macro to ingest traces from your application without any code instrumentation. The macro automatically attaches the Datadog Lambda Library for Node.js and Python to your functions using layers. At deploy time, it generates new handler functions that wrap your existing functions and initializes the Lambda Library.

To install the Datadog Lambda Library with the SAM macro, follow these steps:

1. In your `template.yml`, add the following:
  ```
  Transform:
	  DD::Serverless
  ```
2. In your `template.yml`, also add the following section:
  ```   
  Mappings:
	  Custom:
		  Datadog:
        enableDDTracing: true
			  flushMetricsToLogs: true
			  # The Datadog Forwarder ARN goes here.
			  forwarder:
  ```
  For more information on the Forwarder ARN, or to install the forwarder see the [official CloudFormation documentation][1].
4. Redeploy your serverless application.


[1]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
{{% /tab %}} --->
{{% tab "AWS Console" %}}

### Install the Datadog Lambda Library

The Datadog Lambda Library can be imported as a layer. Its ARN includes a region, language runtime, and version. Construct yours in the following format:

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

For example:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Python37:11
```

The Python Datadog Lambda Library supports Node8-10, Node10-x, Node12-x. For more information, see the [latest release][1].

To install the Datadog Lambda Library:

1. Navigate to the Lambda function to which you want to add the layer in your AWS console.
2. Click on **Layers** on the main page of your function.
3. Scroll down, and click on **Add a Layer**.
4. Select the option to *Provide a layer version ARN*.
5. Enter the Datadog Lambda Library ARN from the example above.
6. Navigate to the Environment Variables section of your function and add a new `“DD_FLUSH_TO_LOG”` variable set to `“true”`.

These steps need to be repeated for every function you wish to trace.

### Instrument your code

Instrument your functions to ingest traces into Datadog:

```
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

### Subscribe the Forwarder to log groups

You need the Datadog Forwarder to subscribe to each of your function’s log groups to send traces and enhanced metrics to Datadog.

For more information on the Forwarder ARN, or to install the forwarder see the [documentation][1]. Make sure the Datadog Forwarder is in the same AWS region as the Lambda functions you are monitoring.

1. To start, navigate to your AWS Dashboard for the Datadog Forwarder. Then, manually add a function trigger.
2. Configure the trigger to be linked to your function’s CloudWatch Log Group, add a filter name (but feel free to leave the filter empty) and add the trigger.

The Datadog Forwarder will now send enhanced metrics and traces from your function to Datadog.


[1]: https://github.com/DataDog/datadog-lambda-layer-js/releases
{{% /tab %}}
{{% tab "Other" %}}

### Install the Datadog Lambda Library

The Datadog Lambda Library can be installed using NPM or Yarn by running one the following commands:

**NPM**:

```
npm install datadog-lambda-js
```

**Yarn**:

```
yarn add datadog-lambda-js
```

Then, using the AWS Console or the AWS CLI, add a new `“DD_FLUSH_TO_LOG”` environment variable set to `“true”`. This step needs to be repeated for every function you wish to trace.

### Instrument your code

Instrument your functions to ingest traces into Datadog:

```
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

### Subscribe the Forwarder to log groups

You need the Datadog Forwarder to subscribe to each of your function’s log groups to send traces and enhanced metrics to Datadog.

You can quickly verify that you’ve installed the Datadog Forwarder on the [AWS Forwarder page][1] For more information on the Forwarder ARN, or to install the forwarder see the [official CloudFormation documentation][1]. Make sure the Datadog Forwarder is in the same AWS region as the Lambda functions you are monitoring.


[1]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
{{% /tab %}}
{{< /tabs >}}

## Results

Now you can view your metrics, logs, and traces on the [serverless home page][2].


[1]: /serverless/#1-install-the-cloud-integration
[2]: https://app.datadoghq.com/functions
