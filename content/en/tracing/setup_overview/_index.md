---
title: Set up Datadog APM
kind: documentation
description: "Get Started with Datadog APM"
aliases:
    - /tracing/setup
    - /tracing/send_traces/
    - /tracing/setup/
    - /tracing/environments/
    - /tracing/setup/environment
    - /tracing/setup/first_class_dimensions
    - /tracing/getting_further/first_class_dimensions/
    - /agent/apm/
---

In most environments, configuring your application to send [traces][1] to Datadog involves two steps:

1. Configuring the Datadog Agent for APM.

2. Adding the Datadog Tracing Library to your code.

Traces are sent from your application instrumented with a Datadog Tracing Library to the Datadog Agent, and from the Datadog Agent to Datadog.

In containerized, serverless, or certain other environments, there may be APM-specific configurations required on both the Tracer and Agent to ensure that traces can be properly received, so ensure you have followed instructions for both components.

## For setup instructions, select your language:

{{< partial name="apm/apm-languages.html" >}}

<br>

To instrument an application written in a language that does not yet have official library support, see the list of [community tracing libraries][2].

After you set up tracing, you are [one step from accessing profiling data by enabling Continuous Profiler][3]. Profiler is available for Java, Python, Go, and (beta) Ruby.

[1]: /tracing/visualization/#trace
[2]: /developers/community/libraries/#apm-tracing-client-libraries
[3]: /tracing/profiler/enabling/
