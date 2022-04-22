---
title: Installing Serverless Monitoring
kind: documentation
aliases:
    - /serverless/installation/installing_the_library/
further_reading:
    - link: '/serverless/configuration/'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring'
    - link: "/integrations/amazon_lambda/"
      tag: "Documentation"
      text: "AWS Lambda Integration"
---

## Quick start

If you are new to Datadog, [sign up for a Datadog account][1], then follow the Datadog Agent installation instructions for [AWS Lambda][2] to instrument your Lambda function for a quick start with Datadog. Completing the steps will configure your Lambda functions to send real-time metrics, logs, and traces to Datadog.

The quick start process configures your Lambda functions on the fly. To instrument Lambda functions permanently, see the detailed installation instructions in the next section.

## Installation instructions

For the detailed installation instructions, select the Lambda runtime below:

{{< partial name="serverless/getting-started-languages.html" >}}

## Advanced Configurations

After the installation and collecting the telemetry, follow the [advanced configurations][3] to:

- connect your metrics, traces, and logs using tags
- collect telemetry from AWS resources such as API Gateway, AppSync, and Step Functions
- capture the request and response payloads for individual Lambda invocations
- link errors of your Lambda functions to your source code
- filter or scrub sensitive information from logs or traces

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[2]: https://app.datadoghq.com/signup/agent#lambda
[3]: /serverless/configuration/
