---
title: Code Origins for Spans
description: "Learn how to use Code Origins to understand where your spans originate in your codebase"
aliases:
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
- link: "/dynamic_instrumentation/"
  tag: "Documentation"
  text: "Learn how to add custom spans with Dynamic Instrumentation"

---

{{< beta-callout url="#" btn_hidden="true" >}}
Code Origins is currently in Preview. To join the preview, follow the instructions below to enable the feature on your compatible services. 

To submit questions, feedback, or requests related to Code Origins, <a href="https://docs.google.com/forms/d/e/1FAIpQLScyeRsF2GJjYdf9bUyeDjt8_9id-gvqiBU1SHR3ioDGe5eF3g/viewform?usp=header">fill out this form</a> with details. 
{{< /beta-callout >}}

## Overview

Code Origins captures the exact locations in your codebase where APM spans are created. When enabled on a compatible service, it automatically adds file path, line number, and function name to each [service entry span][12], making it easier to:

- Debug performance issues
- Understand code execution flow
- Identify performance bottlenecks

In Trace Explorer, select a span from an enabled service to see Code Origin details on the Overview tab:
{{< img src="tracing/code_origins/code_origin_details_spotlight.png" alt="Code Origin Details" style="width:100%;">}}


## Getting started

### Prerequisites
- [Datadog APM][6] is configured to capture spans.
- [Source Code Integration][7] is enabled (required for code previews).
- Your service meets the [compatibility requirements](#compatibility-requirements).

### Compatibility requirements

| Runtime Language | Tracing Library Version | Frameworks |
|---|---|---|
| Java | 1.47.0+ | Spring Boot/Data, gRPC servers, Micronaut 4, Kafka consumers|
| Python | 2.15.0+ | Django, Flask, Starlette and derivatives|
| Node.js | 4.49.0+ | Fastify|
| .NET | 3.15.0+ | ASP.NET, ASP.NET Core| 

### Enable Code Origins

Run your service with the following environment variable:

```shell
export DD_CODE_ORIGIN_FOR_SPANS_ENABLED=true
```

<div class="alert alert-info">
  For transpiled Node.js applications (eg. Typescript), make sure to generate and publish source maps with the deployed application, and to run Node.js with the <a href="https://nodejs.org/dist/v12.22.12/docs/api/cli.html#cli_enable_source_maps"><code>--enable-source-maps</code></a> flag. Otherwise, code previews will not work. See the Node.js <a href="/integrations/guide/source-code-integration/?tab=nodejs#setup">Source Code Integration</a> documentation for more details.
</div>

## Using Code Origins

### In the Trace Explorer

1. Navigate to the [Trace Explorer][1].
1. Search for "Service Entry Spans" from your Code Origins-enabled services.

    {{< img src="tracing/code_origins/code_origin_service_entry_spans_filter.png" alt="Code Origins - Search for Service Entry Spans" style="width:100%;">}}

1. Click on a span to view its details.
1. In the trace details side panel, look for the "Code Origin" section.

    {{< img src="tracing/code_origins/code_origin_details_spotlight.png" alt="Code Origin Details in Traces Explorer" style="width:100%;">}}

1. From the Code Origin section:
    - Kick off a [Live Debugger][11] session on the running service by clicking "Start Debug Session" to capture logs at the Code Origin method location. Or select a breakpoint in the gutter of the code preview to capture logs at the selected line of code.
      
        {{< img src="tracing/code_origins/code_origin_start_debug_session.png" alt="Code Origin - Start Live Debugger Session" style="width:100%;">}}  

     - Click on source code variables to add them as attributes to future spans with [Dynamic Instrumentation][5].
        
        {{< img src="tracing/code_origins/code_origin_add_span_tag_spotlight.png" alt="Code Origin - Add span tag with Dynamic Instrumentation" style="width:100%;">}} 


### In your IDE

1. Set up your [Datadog IDE Integration][4].
    - Supported IDEs: IntelliJ, VS Code
    - Supported Languages: Java, Python
2. View RED metrics (Requests, Errors, and Duration) as inline annotations above your endpoint methods.

    {{< img src="tracing/code_origins/code_origin_ide_details.png" alt="Code Origin Details in IDE" style="width:100%;">}}

## Troubleshooting

### Code Origin section is missing ###

- Verify Code Origins is [enabled](#enable-code-origins) in your tracing library configuration.
- Confirm that your service meets all [compatibility requirements](#compatibility-requirements) (ie. service language, supported frameworks, and minimum tracer version).
- For most services, Code Origins data will be captured for [service entry spans][12] only. You can filter to "Service Entry Spans" in the [APM Trace Explorer][1].

    {{< img src="tracing/code_origins/code_origin_service_entry_spans_filter.png" alt="Code Origins - Search for Service Entry Spans" style="width:100%;">}}

- To search for all spans that include Code Origins, use the query `@_dd.code_origin.type:*` in the [APM Trace Explorer][1].

### Code preview is not visible ###
- Ensure that all [Source Code Integration][7] setup requirements are met.
- For transpiled Node.js applications (eg. Typescript), make sure to generate and publish source maps with the deployed application, and to run Node.js with the [`--enable-source-maps`][10] flag. Otherwise, code previews will not work. See the Node.js [Source Code Integration][9] documentation for more details. 



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
[10]: https://nodejs.org/dist/v12.22.12/docs/api/cli.html#cli_enable_source_maps
[11]: /tracing/live_debugger/
[12]: /glossary/#service-entry-span
