---
title: Install Serverless Monitoring for AWS Lambda
aliases:
    - /serverless/installation/installing_the_library/
    - /serverless/installation
further_reading:
    - link: '/serverless/configuration/'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring'
    - link: "/integrations/amazon_lambda/"
      tag: "Documentation"
      text: "AWS Lambda Integration"
---

## Quick start

If you are new to Datadog, [sign up for a Datadog account][1], then follow the Datadog Agent installation instructions for [AWS Lambda][2] to instrument your Lambda function for a quick start with Datadog. Completing the steps configures your Lambda functions to send real-time metrics, logs, and traces to Datadog.

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-sample-app">available on GitHub</a> with instructions on how to deploy with multiple runtimes and infrastructure as code tools.</div>

The quick start process configures your Lambda functions on the fly. To instrument Lambda functions permanently, see the detailed installation instructions in the next section.

## Installation instructions

For Node.js and Python runtimes, you can use [remote instrumentation][5] to add instrumentation to your AWS Lambda functions and keep them instrumented securely. See [Remote instrumentation for AWS Lambda][5].

For other Lambda runtimes (or to instrument your Node.js or Python functions without remote instrumentation) see detailed installation instructions:

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
[3]: /serverless/configuration/
[4]: /serverless/aws_lambda/fips-compliance/
[5]: /serverless/aws_lambda/remote_instrumentation