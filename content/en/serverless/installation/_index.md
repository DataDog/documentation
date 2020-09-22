---
title: Installing Serverless Monitoring
kind: documentation
further_reading:
    - link: 'serverless/installation/node'
      tag: 'Documentation'
      text: 'Installing Node.js Serverless Monitoring'
    - link: 'serverless/installation/ruby'
      tag: 'Documentation'
      text: 'Installing Ruby Serverless Monitoring'
---

### 1. Install the AWS Integration

Install the [AWS integration][1]. This allows Datadog to ingest Lambda metrics from AWS CloudWatch. 

### 2. Install the Datadog Forwarder

Install the [Datadog Forwarder Lambda function][2], which is required for ingestion of AWS Lambda traces, enhanced metrics, custom metrics, and logs. 

**Note**: Skip this step if you already have the Forwarder function installed as part of the [AWS integration][1] CloudFormation stack.

### 3. Instrument Your Application

Select the Lambda runtime below for instructions to instrument your serverless application.

{{< partial name="serverless/getting-started-languages.html" >}}

[1]: /integrations/amazon_web_services/#setup
[2]: /serverless/forwarder
