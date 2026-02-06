---
title: Code Origin for Spans
description: "Learn how to use Code Origin to understand where your spans originate in your codebase"
aliases:
  - /tracing/code_origins/
  - /tracing/guide/code_origins/
further_reading:
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Learn about APM terms and concepts"
- link: "/tracing/trace_collection/"
  tag: "Documentation"
  text: "Learn how to set up APM tracing with your application"
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "/tracing/services/resource_page/"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "/tracing/live_debugger/"
  tag: "Documentation"
  text: "Learn how to debug production services with Live Debugger"
- link: "/dynamic_instrumentation/"
  tag: "Documentation"
  text: "Learn how to add custom spans with Dynamic Instrumentation"
---

## Overview

Code Origin captures the exact locations in your codebase where APM spans are created. When enabled on a compatible service, it automatically adds file path, line number, and function name to each [service entry span][12], making it easier to:

- Debug performance issues
- Understand code execution flow
- Identify performance bottlenecks

In Trace Explorer, select a span from an enabled service to see Code Origin details on the Overview tab:
{{< img src="tracing/code_origin/code_origin_details_spotlight.png" alt="Code Origin Details" style="width:100%;">}}


## Getting started

### Prerequisites
- [Datadog APM][6] is configured to capture spans.
- [Source Code Integration][7] is enabled (required for code previews).
- Your service meets the [compatibility requirements](#compatibility-requirements).

### Compatibility requirements

{{% tabs %}}

{{% tab "Java" %}}

| Tracing Library Version | Frameworks |
|---|---|
| 1.47.0+ | Spring Boot/Data, gRPC servers, Micronaut 4, Kafka consumers |

{{% /tab %}}

{{% tab "Python" %}}

| Tracing Library Version | Frameworks |
|---|---|
| 2.15.0+ | Django, Flask, Starlette, and derivatives |

{{% /tab %}}

{{% tab "Node.js" %}}

| Tracing Library Version | Frameworks |
|---|---|
| 4.49.0+ | Fastify |
| 5.54.0+ | Express |

**Note:** NestJS is not supported, even though the underlying framework is either Express or Fastify.

{{% /tab %}}

{{% tab ".NET" %}}

| Tracing Library Version | Frameworks |
|---|---|
| 3.15.0+ | ASP.NET, ASP.NET Core |

{{% /tab %}}

{{% /tabs %}}

### Enable Code Origin

Run your service with the following environment variable:

```shell
export DD_CODE_ORIGIN_FOR_SPANS_ENABLED=true
```

<div class="alert alert-info">
  For transpiled Node.js applications (for example, TypeScript), make sure to generate and publish source maps with the deployed application, run Node.js with the <a href="https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps"><code>--enable-source-maps</code></a> flag, and use v5.59.0 or newer of the Node.js tracer. Otherwise, code previews do not work. See the Node.js <a href="/integrations/guide/source-code-integration/?tab=nodejs#setup">Source Code Integration</a> documentation for more details.
</div>

## Using Code Origin

### In the Trace Explorer

1. Navigate to the [Trace Explorer][1].
1. Search for "Service Entry Spans" from your Code Origin-enabled services.

    {{< img src="tracing/code_origin/code_origin_service_entry_spans_filter.png" alt="Code Origin - Search for Service Entry Spans" style="width:100%;">}}

1. Click on a span to view its details.
1. In the trace details side panel, look for the "Code Origin" section.

    {{< img src="tracing/code_origin/code_origin_details_spotlight.png" alt="Code Origin Details in Traces Explorer" style="width:100%;">}}

1. From the Code Origin section:
    - Kick off a [Live Debugger][11] session on the running service by clicking "Start Debug Session" to capture logs at the Code Origin method location. Or, select a breakpoint in the gutter of the code preview to capture logs at the selected line of code.

        {{< img src="tracing/code_origin/code_origin_start_debug_session.png" alt="Code Origin - Start Live Debugger Session" style="width:100%;">}}

     - Click on source code variables to add them as attributes to future spans with [Dynamic Instrumentation][5].

        {{< img src="tracing/code_origin/code_origin_add_span_tag_spotlight.png" alt="Code Origin - Add span tag with Dynamic Instrumentation" style="width:100%;">}}


### In your IDE

1. Set up your [Datadog IDE Integration][4].
    - Supported IDEs: IntelliJ, VS Code
    - Supported Languages: Java, Python
2. View RED metrics (Requests, Errors, and Duration) as inline annotations above your endpoint methods.

    {{< img src="tracing/code_origin/code_origin_ide_details.png" alt="Code Origin Details in IDE" style="width:100%;">}}

## Troubleshooting

### Code Origin section is missing

- Verify Code Origin is [enabled](#enable-code-origin) in your tracing library configuration.
- Confirm that your service meets all [compatibility requirements](#compatibility-requirements) (that is, service language, supported frameworks, and minimum tracer version).
- For most services, Code Origin data is captured for [service entry spans][12] only. You can filter to "Service Entry Spans" in the [APM Trace Explorer][1].

    {{< img src="tracing/code_origin/code_origin_service_entry_spans_filter.png" alt="Code Origin - Search for Service Entry Spans" style="width:100%;">}}

### Code preview is not visible or the file is not found

- Ensure all [Source Code Integration][7] setup requirements are met, including your `DD_GIT_*` environment variables are configured with the correct values.
- For transpiled Node.js applications (for example, TypeScript), make sure to generate and publish source maps with the deployed application, run Node.js with the [`--enable-source-maps`][10] flag, and use v5.59.0 or newer of the Node.js tracer. Otherwise, code previews will not work. See the Node.js [Source Code Integration][9] documentation for more details.
- Code Origin is designed to reference user code only, but in some cases, third-party code references may slip through. You can report these cases to [Datadog support][13] and help improve these references.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/traces
[2]: /tracing/services/service_page/
[3]: /tracing/services/resource_page/
[4]: /developers/ide_plugins/
[5]: /dynamic_instrumentation/
[6]: /tracing/trace_collection/
[7]: /integrations/guide/source-code-integration/
[8]: /tracing/trace_collection/compatibility/nodejs#web-framework-compatibility
[9]: /integrations/guide/source-code-integration/?tab=nodejs#setup
[10]: https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps
[11]: /tracing/live_debugger/
[12]: /glossary/#service-entry-span
[13]: https://www.datadoghq.com/support/
