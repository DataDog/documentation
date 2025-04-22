---
title: Code Origins for Spans
description: "Learn how to use Code Origins to understand where your spans originate in your codebase"
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
Code Origins is currently in Preview. To join the preview, follow the instructions below. 

To submit questions, feedback, or requests related to Code Origins, fill out <a href="https://docs.google.com/forms/d/e/1FAIpQLScyeRsF2GJjYdf9bUyeDjt8_9id-gvqiBU1SHR3ioDGe5eF3g/viewform?usp=header">this form</a> with details. 

For time-sensitive issues, contact <a href="https://www.datadoghq.com/support/">Datadog support</a>.
{{< /beta-callout >}}

## Overview

Code Origins captures the exact locations in your codebase where APM spans are created. When enabled, it automatically adds file path, line number, and function name to each span, making it easier to:

- Debug performance issues
- Understand code execution flow
- Identify performance bottlenecks

In Trace Explorer, select a span to see Code Origin details on the Overview tab:
{{< img src="tracing/guide/code_origins/code_origin_details_spotlight.png" alt="Code Origin Details" style="width:100%;">}}


## Getting started

### Prerequisites
- [Datadog APM][6] is configured to capture spans.
- [Source Code Integration][7] is enabled (recommended for code previews).
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

## Using Code Origins

### In the Trace Explorer

1. Navigate to the [Trace Explorer][1].
2. Click on any trace to view its details.
3. In the span details panel, look for the "Code Origin" section.

    {{< img src="tracing/guide/code_origins/code_origin_details_spotlight.png" alt="Code Origin Details in Traces Explorer" style="width:100%;">}}

4. Optionally, click on source code variables to add them as attributes to future spans with [Dynamic Instrumentation][5].
  
    {{< img src="tracing/guide/code_origins/code_origin_add_span_tag_spotlight.png" alt="Code Origin - Add span tag with Dynamic Instrumentation" style="width:100%;">}}  

### In your IDE

1. Set up your [Datadog IDE Integration][4].
    - Supported IDEs: IntelliJ, VS Code
    - Supported Languages: Java, Python
2. View RED metrics (Requests, Errors, and Duration) as inline annotations above your endpoint methods.

    {{< img src="tracing/guide/code_origins/code_origin_ide_details.png" alt="Code Origin Details in IDE" style="width:100%;">}}

## Troubleshooting

If Code Origin information is missing:

1. Verify Code Origins is [enabled](#enable-code-origins) in your tracing library configuration.
1. Confirm that your service meets all [compatibility requirements](#compatibility-requirements).
    - In particular, check whether your service's language and framework support Code Origins.
1. Filter for spans that include Code Origins using the query `@_dd.code_origin.type:*` in the [Trace Explorer][1].
1. Enable [Source Code Integration][7] to see code previews in the APM Trace side panel.


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
