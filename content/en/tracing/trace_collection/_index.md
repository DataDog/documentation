---
title: Sending Traces to Datadog
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
    - /tracing/setup_overview/
---

In most environments, configuring your application to send [traces][1] to Datadog involves two steps:

1. Configuring the Datadog Agent for APM.

2. Adding the Datadog Tracing Library to your code.

Traces are sent from your application instrumented with a Datadog Tracing Library to the Datadog Agent, and from the Datadog Agent to the Datadog backend to be shown in the UI.

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="The APM pipeline">}}

In containerized, serverless, or certain other environments, there may be APM-specific configurations required on both the Tracer and Agent to ensure that traces can be properly received, so ensure you have followed instructions for both components.

## For setup instructions, select your language:

{{< partial name="apm/apm-languages.html" >}}

<br>

To instrument an application written in a language that does not yet have official library support, see the list of [community tracing libraries][2].

After you set up tracing, you are [one step from accessing profiling data by enabling Continuous Profiler][3]. Profiler is available for Java, Python, Go, Ruby, Node.js, (beta) PHP, (beta) .NET, and (beta) Linux.

## APM Setup Tutorials

The following tutorials provide a walk-through of setting up distributed tracing on a sample Python application on various infrastructure scenarios, with both automatic and custom instrumentation:

{{< whatsnext desc="Tutorials: Enabling Tracing" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}Enabling Tracing on a Python Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}Enabling Tracing on a Python Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}Enabling Tracing for a Python Application in a Container and an Agent on a Host{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /tracing/glossary/#trace
[2]: /developers/community/libraries/#apm-tracing-client-libraries
[3]: /profiler/enabling/
