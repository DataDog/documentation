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

If you are new to Datadog, [sign up for a Datadog account][1], then follow the installation instructions for [AWS Lambda][2]. Completing the steps will configure your Lambda functions to send real-time metrics, logs, and traces to Datadog.

## Installation instructions

For more detailed installation instructions, select the Lambda runtime below:

{{< partial name="serverless/getting-started-languages.html" >}}

## Advanced Configurations

After the installation and collecting the telemetry, follow the [advanced configurations][3] to:

- connect your metrics, traces, and logs using tags
- collect metrics, traces, and logs from AWS API Gateway, SQS, etc.
- collect the request and response payloads for individual Lambda invocations
- link errors of your Lambda functions to your source code
- filter or scrub sensitive information from logs or traces

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[2]: https://app.datadoghq.com/signup/agent#lambda
[3]: /serverless/configuration/
