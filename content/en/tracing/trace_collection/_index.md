---
title: Set Up APM
description: "Set up Datadog APM to collect traces from your applications. Choose Single Step Instrumentation for automatic setup on Kubernetes, Linux, Docker, or Windows, or use manually managed SDKs for full configuration control."
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
    - /tracing/trace_collection/library_injection_remote
    - /tracing/trace_collection/automatic_instrumentation
further_reading:
- link: "tracing/trace_collection/compatibility"
  tag: "Documentation"
  text: "Compatibility requirements"
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "APM Terms and Concepts"
- link: "https://www.datadoghq.com/blog/rum-apm-single-step"
  tag: "Blog"
  text: "Enable end-to-end visibility into your Java apps with a single command"
- link: "https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/"
  tag: "Architecture Center"
  text: "Instrument your app using the Datadog Operator and Admission Controller"
algolia:
  tags: ['apm automatic instrumentation']
---

## Overview

Set up Datadog APM to collect traces from your applications. [Single Step Instrumentation][1] (SSI) is the recommended approach for most users. It automatically installs and configures Datadog SDKs with no code changes required.

## Get APM running

<div class="alert alert-info">
<strong>Prefer vendor-neutral instrumentation?</strong> See the <a href="/opentelemetry/">OpenTelemetry documentation</a> for using OpenTelemetry with Datadog.
</div>

SSI automatically installs and loads Datadog SDKs into your application processes at runtime with a single command. Pick your platform to get started:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/single-step-apm/kubernetes" >}}Kubernetes{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/single-step-apm/linux" >}}Linux{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/single-step-apm/docker" >}}Docker{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/single-step-apm/windows" >}}Windows IIS{{< /nextlink >}}
{{< /whatsnext >}}

## Need more control?

If you need full control over SDK configuration and installation, use [manually managed Datadog SDKs][2]. This approach requires adding the SDK to your application code or build process.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/dd_libraries/" >}}Set up manually managed SDKs{{< /nextlink >}}
{{< /whatsnext >}}

## Add custom spans

After you have APM running, you can add custom spans for visibility into application-specific code paths:

- **Without code changes**: Use [Dynamic Instrumentation][4] to create custom spans from the Datadog UI without redeploying your application.
- **In code**: Add [code-based custom instrumentation][3] to instrument custom business logic or add application-specific metadata to spans.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_collection/dynamic_instrumentation/" >}}Add custom spans with Dynamic Instrumentation{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/" >}}Add custom spans with code-based instrumentation{{< /nextlink >}}
{{< /whatsnext >}}

{{< agent-only >}}
If a user asks to set up APM, tracing, or distributed tracing, start with Single Step Instrumentation (SSI) unless they specifically request manual SDK control.

Ask what platform they're running on:
- Kubernetes → /tracing/trace_collection/single-step-apm/kubernetes
- Linux host or VM → /tracing/trace_collection/single-step-apm/linux
- Docker → /tracing/trace_collection/single-step-apm/docker
- Windows IIS → /tracing/trace_collection/single-step-apm/windows

If their language is Go, C++, or Rust, SSI is not available — direct them to manually managed SDKs at /tracing/trace_collection/dd_libraries/.
{{< /agent-only >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/single-step-apm/
[2]: /tracing/trace_collection/dd_libraries/
[3]: /tracing/trace_collection/custom_instrumentation/
[4]: /tracing/trace_collection/dynamic_instrumentation/
