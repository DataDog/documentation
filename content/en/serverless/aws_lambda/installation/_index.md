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

{{< callout url="https://www.datadoghq.com/product-preview/lambda-remote-instrumentation/" >}}
  Interested in bulk-instrumenting AWS Lambdas directly from the Datadog UI? To participate, request access to the upcoming remote Lambda instrumentation Preview.
{{< /callout >}} 

<div class="alert alert-info">A sample application is <a href="https://github.com/DataDog/serverless-sample-app">available on GitHub</a> with instructions on how to deploy with multiple runtimes and infrastructure as code tools.</div>

The quick start process configures your Lambda functions on the fly. To instrument Lambda functions permanently, see the detailed installation instructions in the next section.

## Installation instructions

For the detailed installation instructions, select the Lambda runtime below:

{{< partial name="serverless/getting-started-languages.html" >}}

## FIPS Compliance Support

Datadog provides FIPS-compliant monitoring for AWS Lambda functions through dedicated FIPS-compliant Lambda extension layers and runtime-specific configurations. The FIPS-compliant components implement FIPS-certified cryptography and work with any Datadog site, but end-to-end FIPS compliance requires using the US1-FED site. If you need to maintain FIPS compliance while monitoring your Lambda functions, see the [AWS Lambda FIPS Compliance][4] documentation page for details.

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
