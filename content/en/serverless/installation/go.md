---
title: Installing Go Serverless Monitoring
kind: documentation
further_reading:
    - link: 'serverless/installation/node'
      tag: 'Documentation'
      text: 'Installing Node JS Serverless Monitoring'
    - link: 'serverless/installation/ruby'
      tag: 'Documentation'
      text: 'Installing Ruby Serverless Monitoring'
    - link: 'serverless/installation/python'
      tag: 'Documentation'
      text: 'Installing Python Serverless Monitoring'
    - link: 'serverless/installation/dotnet'
      tag: 'Documentation'
      text: 'Installing .NET Serverless Monitoring'
    - link: 'serverless/installation/java'
      tag: 'Documentation'
      text: 'Installing Java Serverless Monitoring'
---

After you have [installed the AWS integration][1], use Go to instrument your application to send metrics, logs, and traces to Datadog. 

## Configuration

### Install the Datadog Lambda Library

You can install the [Datadog Lambda package][2] locally by running the following command:

```
go get github.com/DataDog/datadog-lambda-go
```

Then, using the AWS Console or the AWS CLI, add a new `“DD_FLUSH_TO_LOG”` environment variable set to `“true”`. This step needs to be repeated for every function you wish to trace.

### Instrument your Code

Datadog needs to be able to read headers from the incoming Lambda event. Instrument each of your Lambda handler functions that you wish to trace as outlined below:

```
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
)

func main() {
  // Wrap your lambda handler like this
  lambda.Start(ddlambda.WrapHandler(myHandler, nil))
  /* OR with manual configuration options
  lambda.Start(ddlambda.WrapHandler(myHandler, &ddlambda.Config{
    BatchInterval: time.Second * 15
    APIKey: "my-api-key",
  }))
  */
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  // ...
}
```

### Subscribe the Forwarder to Log Groups

You need the Datadog Forwarder to subscribe to each of your function’s log groups to send traces and enhanced metrics to Datadog.

You can quickly verify that you’ve installed the Datadog Forwarder [Using the AWS console][3]. If you have not yet installed the Forwarder, you can follow the [installation instructions][4]. Make sure the Datadog Forwarder is in the same AWS region as the Lambda functions you are monitoring.

1. To start, navigate to your AWS Dashboard for the Datadog Forwarder. Then, manually add a function trigger.
2. Configure the trigger to be linked to your function’s CloudWatch Log Group, add a filter name (but feel free to leave the filter empty) and add the trigger.

The Datadog Forwarder now sends enhanced metrics and traces from your function to Datadog.

## Results

Now you can view your metrics, logs, and traces on the [serverless home page][5].

[1]: /serverless/#1-install-the-cloud-integration
[2]: https://github.com/DataDog/datadog-lambda-go
[3]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[4]: /serverless/troubleshooting/installing_the_forwarder
[5]: https://app.datadoghq.com/functions
