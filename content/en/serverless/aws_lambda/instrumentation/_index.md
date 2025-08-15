---
title: Instrument AWS Lambda applications
aliases:
    - /serverless/installation/installing_the_library/
    - /serverless/installation
    - /serverless/aws_lambda/installation
further_reading:
    - link: '/serverless/configuration/'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring'
    - link: "/integrations/amazon_lambda/"
      tag: "Documentation"
      text: "AWS Lambda Integration"
---

## Overview

Instrument your AWS Lambda applications with a Datadog Lambda Library to collect traces, enhanced metrics, and custom metrics.

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="A diagram that shows how Datadog receives telemetry from your instrumented AWS Lambda application. Your Lambda application, instrumented with a Datadog Lambda Library, sends logs, traces, enhanced metrics, and custom metrics to the Datadog Lambda Extension, which then pushes this data to Datadog." style="width:100%;" >}}

## Quick start

A sample application is [available on GitHub][6] with instructions on how to deploy with multiple runtimes and infrastructure-as-code tools.

The quick start process configures your Lambda functions on the fly. To instrument Lambda functions permanently, see the detailed instructions in the next section.

## Instrumentation instructions

For Node.js and Python runtimes, you can use [remote instrumentation][5] to add instrumentation to your AWS Lambda functions and keep them instrumented securely. See [Remote instrumentation for AWS Lambda][5].

For other Lambda runtimes (or to instrument your Node.js or Python functions without remote instrumentation) see detailed instrumentation instructions:

{{< partial name="serverless/getting-started-languages.html" >}}

## Advanced configurations

After you're done with instrumentation and you've set up telemetry collection, you can use [Configure Serverless Monitoring for AWS Lambda][3] to:

- connect your metrics, traces, and logs using tags
- collect telemetry from AWS resources such as API Gateway, AppSync, and Step Functions
- capture the request and response payloads for individual Lambda invocations
- link errors of your Lambda functions to your source code
- filter or scrub sensitive information from logs or traces

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[2]: https://app.datadoghq.com/signup/agent#lambda
[3]: /serverless/aws_lambda/configuration/
[4]: /serverless/aws_lambda/fips-compliance/
[5]: /serverless/aws_lambda/remote_instrumentation
[6]: https://github.com/DataDog/serverless-sample-app