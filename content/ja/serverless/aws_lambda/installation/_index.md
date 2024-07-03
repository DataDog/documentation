---
aliases:
- /ja/serverless/installation/installing_the_library/
- /ja/serverless/installation
further_reading:
- link: /serverless/configuration/
  tag: Documentation
  text: Configure Serverless Monitoring
- link: /integrations/amazon_lambda/
  tag: Documentation
  text: AWS Lambda Integration
kind: documentation
title: Install Serverless Monitoring for AWS Lambda
---

## Quick start

If you are new to Datadog, [sign up for a Datadog account][1], then follow the Datadog Agent installation instructions for [AWS Lambda][2] to instrument your Lambda function for a quick start with Datadog. Completing the steps configures your Lambda functions to send real-time metrics, logs, and traces to Datadog.

{{< beta-callout-private url="https://docs.google.com/forms/d/e/1FAIpQLScw8XBxCyN_wjBVU2tWm-zX5oPIGF7BwUKcLSHY6MJsem259g/viewform?usp=sf_link" >}}
Interested in bulk-instrumenting AWS Lambdas directly from the Datadog UI? To participate, request access to the upcoming remote Lambda instrumentation private beta.
{{< /beta-callout-private >}}

The quick start process configures your Lambda functions on the fly. To instrument Lambda functions permanently, see the detailed installation instructions in the next section.

## Installation instructions

For the detailed installation instructions, select the Lambda runtime below:

{{< partial name="serverless/getting-started-languages.html" >}}

## Advanced Configurations

After you're done with installation and you've set up telemetry collection, you can use [advanced configurations][3] to:

- connect your metrics, traces, and logs using tags
- collect telemetry from AWS resources such as API Gateway, AppSync, and Step Functions
- capture the request and response payloads for individual Lambda invocations
- link errors of your Lambda functions to your source code
- filter or scrub sensitive information from logs or traces

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[2]: https://app.datadoghq.com/signup/agent#lambda
[3]: /ja/serverless/configuration/