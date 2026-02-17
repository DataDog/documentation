---
title: Getting Started with OpenTelemetry at Datadog
disable_toc: false
further_reading:
- link: "/opentelemetry/instrument/"
  tag: "Documentation"
  text: "Instrument Your Applications"
- link: "/opentelemetry/setup/"
  tag: "Documentation"
  text: "Send Data to Datadog"
- link: "/opentelemetry/guide"
  tag: "Documentation"
  text: "OpenTelemetry Guides"
---

{{< learning-center-callout header="Try \"Understanding OpenTelemetry\" in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/understanding-opentelemetry" hide_image="false" >}}
  Learn the fundamentals of OpenTelemetry, including its capabilities and benefits, key components, and how OTel and Datadog work together.
{{< /learning-center-callout >}}

## Overview

OpenTelemetry is an open source framework that provides standardized tools for collecting observability data from your applications. Datadog fully supports OpenTelemetry, allowing you to send your metrics, traces, and logs for powerful analysis and monitoring.

These guides provide two hands-on ways to learn how to send OpenTelemetry data to Datadog. Choose the tutorial that best fits your learning goal.

## Getting started tutorials

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/getting_started/datadog_example" >}}
    <h3>Explore OTel with a Datadog Example</h3>
    Follow a step-by-step guide using a simple, Datadog-provided Java application. This is the quickest way to see how the OTLP receiver and Datadog Exporter work together.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/getting_started/otel_demo_to_datadog" >}}
    <h3>Set up the Official OpenTelemetry Demo</h3>
    Deploy the community-maintained microservices demo application. This is a more comprehensive example that showcases a realistic, multi-service environment with traces, metrics, and logs.
    {{< /nextlink >}}
{{< /whatsnext >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
