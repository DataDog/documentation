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

Configuring your application to send [traces][1] to Datadog involves two main steps: Configuring the Datadog Agent for APM and adding the Datadog Tracing Library to your code.  These steps are both required, as for all non- AWS Lambda environments, in order to receive traces, they must be sent from an application instrumented with a Datadog Tracing Library, to the Datadog Agent, and then to Datadog itself.

Depending on your environment, there may be configurations required on both the Tracer and Agent to ensure that traces can be received.

#### For setup instructions, please choose your language below

{{< partial name="apm/apm-languages.html" >}}

To instrument an application written in a language that does not yet have official library support, visit the list of [community tracing libraries][2].

[1]: /tracing/visualization/#trace
[2]: /developers/libraries/#apm-tracing-client-libraries
