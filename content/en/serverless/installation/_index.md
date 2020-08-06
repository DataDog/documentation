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

Start by installing the [AWS Integration][1]. This allows Datadog to ingest Amazon CloudWatch metrics from AWS Lambda. The AWS integration installation also configures the [Datadog Forwarder][2], which is required for ingestion of AWS Lambda traces, enhanced metrics, custom metrics, and logs.

### 2. Instrument your application

In addition to setup for your language, these instructions walk you through installation of the [Datadog Forwarder][2] and the [Datadog Lambda Library][3], which you need regardless of language.

{{< partial name="serverless/getting-started-languages.html" >}}

[1]: /integrations/amazon_web_services/
[2]: /serverless/forwarder
[3]: /serverless/installation/installing_the_library
