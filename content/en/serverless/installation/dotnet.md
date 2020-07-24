---
title: Installing Node JS Serverless Monitoring
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
    - link: 'serverless/installation/go'
      tag: 'Documentation'
      text: 'Installing Go Serverless Monitoring'
    - link: 'serverless/installation/java'
      tag: 'Documentation'
      text: 'Installing Java Serverless Monitoring'
---

After you have [installed the AWS integration][1], use .Net to instrument your application to send metrics, logs, and traces to Datadog. 

## Configuration

### Enable AWS X-Ray

Navigate to the Lambda function in the AWS console you want to instrument. In the **Debugging and error handling** section, check the box to **Enable AWS X-Ray**.

**Note**: If you’re using a Customer Master Key to encrypt traces, add the `kms:Decrypt` method to your IAM policy where the Resource is the Customer Master Key used for X-Ray.

### Install the AWS X-Ray Client Library

Install the [AWS X-Ray client library][2].

### Subscribe the Forwarder to Log Groups

You need the Datadog Forwarder to subscribe to each of your function’s log groups to send custom metrics and logs to Datadog.

You can quickly verify that you’ve installed the Datadog Forwarder in the [AWS console][3]. If you have not yet installed the Forwarder, you can follow the [installation instructions][4]. Make sure the Datadog Forwarder is in the same AWS region as the Lambda functions you are monitoring.

1. To start, navigate to your AWS Dashboard for the Datadog Forwarder. Then, manually add a function trigger.
2. Configure the trigger to be linked to your function’s CloudWatch Log Group, add a filter name (but feel free to leave the filter empty) and add the trigger.

The Datadog Forwarder sends logs and custom metrics from your function to Datadog.

## Results

Now you can view your metrics, logs, and traces on the [serverless home page][2].

[1]: /serverless/#1-install-the-cloud-integration
[2]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-dotnet.html
[3]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[4]: /serverless/troubleshooting/installing_the_forwarder
