---
title: Code Origins for Spans
description: "Learn how to use Code Origins to understand where your spans originate from in your codebase"
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

## Overview

Code Origins captures the exact location in your codebase where APM spans are created. When enabled, it automatically adds file path, line number, and function name to each span, making it easier to:

- Debug performance issues
- Understand code execution flow
- Identify performance bottlenecks
- Onboard new team members

{{< img src="tracing/guide/code_origins/code_origin_details.png" alt="Code Origin Details" style="width:100%;">}}


## Getting started

### Prerequisites
- [Datadog APM][6] configured to capture spans
- Service meets the [Compatibility Requirements](#compatibility-requirements) below
- [Source Code Integration][7] enabled (recommended for code previews)

### Compatibility requirements

| Runtime Language | Tracing Library Version | Frameworks |
|---|---|---|
| Java | `1.47.0` or later | Spring Boot/Data, gRPC servers, Micronaut 4, Kafka consumers (entry spans only)|
| Python | `2.15.0` or later | Django, Flask, Starlette and derivatives (entry spans only)|
| Node.js | `4.49.0` or later | Fastify (supports both entry & exit spans), All other [APM-supported integrations][8] (support exit spans only)|

### Enable Code Origins

Enable Code Origins through environment variables or tracing library configuration:

{{< tabs >}}
{{% tab "Java" %}}

<div class="alert alert-info"><a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/">Java tracing library</a> version 1.47.0 or later is required. Spring Boot/Data, gRPC servers, Micronaut 4, and Kafka consumers are supported.</div>

```java
import datadog.trace.api.DDTrace;

// Enable/disable Code Origins
DDTrace.enableCodeOrigins();
```

{{% /tab %}}
{{% tab "Python" %}}

<div class="alert alert-info"><a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/">Python tracing library</a> version 2.15.0 or later is required. Django, Flask, and Starlette (and Starlette derivatives) are supported.</div>

```python
import ddtrace

# Enable/disable Code Origins
ddtrace.config.code_origins.enabled = True
```

{{% /tab %}}
{{% tab "Node.js" %}}

<div class="alert alert-info"><a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/">Node.js tracing library</a> version 4.49.0 or later is required. Both Entry and exit spans are supported on Fastify apps; Only exit spans are supported for all other apps.</div>

```javascript
const tracer = require('dd-trace').init();

// Enable/disable Code Origins
tracer.enableCodeOrigins();
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

```bash
# Enable/disable Code Origins
DD_TRACE_CODE_ORIGINS_ENABLED=true
```

{{% /tab %}}
{{< /tabs >}}


## Using Code Origins

### In the Trace Explorer

1. Navigate to the [Trace Explorer][1].
2. Click on any trace to view its details.
3. In the span details panel, look for the "Code Origin" section.
4. Optionally, click on variables referenced the source code to add them as attributes on future spans using [Dynamic Instrumentation][5].

{{< img src="tracing/guide/code_origins/code_origin_traces_explorer.png" alt="Code Origin in Traces Explorer" style="width:100%;">}}

### In your IDE

1. Set up your [Datadog IDE Integration][4].
2. See RED metrics as code annotations above your endpoint methods.
3. Quickly navigate to the code location of a given APM span visible from your IDE. 

<div class="alert alert-info">Supported IDEs: JetBrains, Visual Studio Code</div>

{{< img src="tracing/guide/code_origins/code_origin_ide_details.png" alt="Code Origin Details in IDE" style="width:100%;">}}

## How it works

Code Origins captures two types of spans:

**Entry spans**: Shows the first method in your application code that handles an incoming request. The APM integration identifies the source code location where requests enter your system.

**Exit spans**: Shows the exact line of code that makes an outgoing request to a downstream service. The tracer examines the call stack to identify the line where an exit span starts, skipping third-party code.

<div class="alert alert-info">Note: Some tracing libraries may have slightly different implementations to optimize for performance.</div>

## Impact on performance and billing

**Performance Impact**: Code Origins has negligible performance overhead that is virtually unnoticeable in production environments.

**Pricing Impact**: Code Origins will have no additional impact on billing.

## Troubleshooting

If you don't see Code Origin information:

1. Verify that Code Origins is enabled in your tracing library configuration.
2. Confirm all [Compatibility Requirements](#compatibility-requirements) are met.
3. Note that Code Origin information is only available on entry spans for most services.
4. Code Origins does not support third-party code.
5. Enable [Source Code Integration][7] to see the application code preview in the Code Origin section of the APM Trace details.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/
[2]: /tracing/services/service_page/
[3]: /tracing/services/resource_page/ 
[4]: /developers/ide_plugins/
[5]: /dynamic_instrumentation/
[6]: /tracing/trace_collection/
[7]: /integrations/guide/source-code-integration/
[8]: /tracing/trace_collection/compatibility/nodejs#web-framework-compatibility