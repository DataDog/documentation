---
title: Distributed Tracing
kind: documentation
further_reading:
    - link: 'tracing/serverless_functions'
      tag: 'Documentation'
      text: 'Installing AWS X-Ray'
---

{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Trace Serverless Functions"  style="width:100%;">}}

By connecting your serverless traces to metrics, Datadog provides a context-rich picture of your application’s performance, allowing you to better troubleshoot performance issues given the distributed nature of serverless applications.

## Choose your Tracing Library

{{< img src="integrations/amazon_lambda/lambda_tracing.png" alt="architecture diagram for tracing AWS Lambda with Datadog" >}}

Depending on your language and configuration, choose between setting up Datadog APM or AWS X-Ray for your tracing needs. [Read this page][1] to learn more about tracing with AWS X-Ray.

## Distributed Tracing with Datadog APM

Datadog APM sends trace data to Datadog in real-time, allowing you to monitor traces with little to no latency in the Live Search view. Datadog APM also uses tail-based sampling to make better sampling decisions.

The Datadog Python, Node.js, and Ruby tracing libraries support distributed tracing for AWS Lambda, with more runtimes coming soon. The easiest way to add tracing to your application is with the [Datadog Lambda Library][2], which includes the Datadog tracing library as a dependency.

Visualize your traces on the [Serverless Homepage][3], in [App Analytics][4], and on the [Service Map][5].

### Correlate Logs and Traces

The correlation between Datadog APM and Datadog Log Management is improved by the injection of trace IDs, span IDs, env, service, and version as attributes in your logs. With these fields, you can find the exact logs associated with a specific service and version or all logs correlated to an observed trace.

### Live Search

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

The APM Live Search gives you the ability to search all ingested spans using any tag in real-time for the past 15 minutes. It displays spans as soon as they are sent by the Datadog agent and before they are indexed by Datadog.

## Enable Datadog APM

The Datadog Python, Node.js, and Ruby tracing libraries support distributed tracing for AWS Lambda, with more runtimes coming soon. To enable tracing on your functions, follow [the installation instructions][6].

To enable Datadog APM without enabling logging for your functions, ensure the `DdForwarderLog` environment variable is set to `false` on your Datadog Forwarder.

[1]: /tracing/serverless_functions/
[2]: /serverless/datadog_lambda_library/
[3]: https://app.datadoghq.com/functions
[4]: https://app.datadoghq.com/apm/analytics
[5]: https://app.datadoghq.com/apm/map
[6]: https://docs.datadoghq.com/serverless/installation
