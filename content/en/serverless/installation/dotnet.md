---
title: Instrumenting .NET Serverless Applications
kind: documentation
further_reading:
    - link: '/serverless/configuration'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring'
    - link: '/serverless/guide/troubleshoot_serverless_monitoring'
      tag: 'Documentation'
      text: 'Troubleshoot Serverless Monitoring'
    - link: 'serverless/custom_metrics/'
      tag: 'Documentation'
      text: 'Submitting Custom Metrics from Serverless Applications'
---

<div class="alert alert-warning">If your Lambda functions are deployed in VPC without access to the public internet, you can send data either <a href="/agent/guide/private-link/">using AWS PrivateLink</a> for the <code>datadoghq.com</code> <a href="/getting_started/site/">Datadog site</a>, or <a href="/agent/proxy/">using a proxy</a> for all other sites.</div>

## Installation

Datadog offers many different ways to enable instrumentation for your serverless applications. Choose a method below that best suits your needs. Datadog generally recommends using the Datadog CLI.

{{< tabs >}}
{{< tab "Datadog CLI" >}}
{{< /tab >}}
{{< tab "Serverless Framework" >}}
{{< /tab >}}
{{< tab "Container image" >}}
{{< /tab >}}
{{< tab "Custom" >}}
{{< /tab >}}
{{< /tabs >}}

## What's next?

- You can now view metrics, logs, and traces on the [Serverless Homepage][1].
- Submit a [custom metric][2] or [APM span][3] to monitor your business logic.
- See the [troubleshooting guide][4] if you have trouble collecting the telemetry
- See the [advanced configurations][5] to
    - connect your telemetry using tags
    - collect telemetry for AWS API Gateway, SQS, etc.
    - capture the Lambda request and response payloads
    - link errors of your Lambda functions to your source code
    - filter or scrub sensitive information from logs or traces

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/metrics/dogstatsd_metrics_submission/
[3]: /tracing/custom_instrumentation/dotnet/
[4]: /serverless/guide/troubleshoot_serverless_monitoring/
[5]: /serverless/configuration/
