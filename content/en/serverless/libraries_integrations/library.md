---
title: Datadog Lambda Library
kind: documentation
further_reading:
- link: "/serverless/libraries_integrations/extension/"
  tag: "Documentation"
  text: "Datadog Lambda Extension"
- link: "https://github.com/DataDog/datadog-lambda-python/blob/master/README.md"
  tag: "Github"
  text: "Datadog Lambda Library for Python"
- link: "https://github.com/DataDog/datadog-lambda-js/blob/master/README.md"
  tag: "Github"
  text: "Datadog Lambda Library for Node.js"
- link: "https://github.com/DataDog/datadog-lambda-rb/blob/master/README.md"
  tag: "Github"
  text: "Datadog Lambda Library for Ruby"
- link: "https://github.com/DataDog/datadog-lambda-go/blob/master/README.md"
  tag: "Github"
  text: "Datadog Lambda Library for Go"
- link: "https://github.com/DataDog/datadog-lambda-java/blob/master/README.md"
  tag: "Github"
  text: "Datadog Lambda Library for Java"
aliases:
    - /serverless/datadog_lambda_library/
---

{{< img src="serverless/datadog_lambda_library.png" alt="Datadog Lambda Library"  style="width:100%;">}}

The Datadog Lambda Library is responsible for:

- Generating real-time [enhanced Lambda metrics][1] for invocations, errors, cold starts, estimated costs, etc.
- Submitting [custom metrics][2] (synchronously and asynchronously).
- Enabling [Datadog APM and Distributed Tracing][3] for Node.js, Python, and Ruby.

If you are using the Datadog Lambda library for **Ruby**, you **must** also install and configure the Datadog Forwarder to ingest traces, enhanced Lambda metrics, or custom metrics (asynchronously) from your Lambda functions.
If you are using the Datadog Lambda library for **Python**, **Node**, **Go**, or **Java** you may use the [Datadog Lambda Extension][4] to ingest traces, enhanced Lambda metrics, or custom metrics; or you may continue to use the Datadog Forwarder.

The Datadog Lambda Library is **NOT** responsible for collecting:

- Lambda metrics from CloudWatch (see [AWS Lambda Integration][5])
- Lambda traces from X-Ray (see [AWS X-Ray integration][6])
- Lambda logs from CloudWatch (see [Datadog Forwarder][7])

Datadog distributes the Lambda library as a package for Python, Node.js, Ruby, Go, and Java. Packages are installed through the common package managers, such as pip, npm, gem, maven, etc.

The Datadog Lambda library is also available as a [Lambda layer][8] for Python, Node.js, and Ruby.

To install the Datadog Lambda library and instrument your serverless applications, see the [installation instructions][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /serverless/enhanced_lambda_metrics/
[2]: /serverless/custom_metrics/
[3]: /tracing/
[4]: /serverless/libraries_integrations/extension/
[5]: /integrations/amazon_lambda/
[6]: /integrations/amazon_xray/
[7]: /serverless/forwarder/
[8]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[9]: /serverless/installation/
