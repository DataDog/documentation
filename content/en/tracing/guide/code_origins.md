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

Code Origins is a feature that helps you understand where your APM spans originate from in your codebase. When enabled, it automatically captures the file path, line number, and function name where each span was created, giving you deeper visibility into your application's execution flow.

This information is particularly valuable when:
- Debugging performance issues
- Understanding which parts of your code are being executed
- Identifying hot spots in your application
- Onboarding new team members to your codebase

<div class="alert alert-info">Code Origin information is only available for entry spans on most services.</div>

{{< img src="tracing/guide/code_origins/code_origin_details.png" alt="Code Origin Details" style="width:100%;">}}

## Enable Code Origins

You can configure Code Origins behavior through environment variables or library configuration:

{{< tabs >}}
{{% tab "Environment Variables" %}}

```bash
# Enable/disable Code Origins
DD_TRACE_CODE_ORIGINS_ENABLED=true
```

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-info"><a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/">Java tracing library</a> version 1.47.0 or later is required. Spring Boot/Data, gRPC servers, Micronaut 4, and Kafka consumers are supported.</div>

```java
import datadog.trace.api.DDTrace;

// Enable/disable Code Origins
DDTrace.enableCodeOrigins();
```

{{% /tab %}}
{{% tab "Python" %}}

<div class="alert alert-info"><a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/">Python tracing library</a> version 2.15.0 or later is required. Django, Flask, Starlette and derivatives are supported.</div>

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
{{< /tabs >}}


## Using Code Origins

### In the Trace Explorer

1. Navigate to the [Trace Explorer][1].
2. Click on any trace to view its details.
3. In the span details panel, look for the "Code Origin" section.
4. Optionally, click on variables referenced the source code to quickly add them as attributes on future spans using [Dynamic Instrumentation][5].

{{< img src="tracing/guide/code_origins/code_origin_traces_explorer.png" alt="Code Origin in Traces Explorer" style="width:100%;">}}

### In your IDE

1. Set up your [Datadog IDE Integration][4].
2. See RED metrics as code annotations above your endpoint methods.
3. Quickly navigate to the code location of a given APM span visible from your IDE. 

<div class="alert alert-info">Supported IDEs: JetBrains, Visual Studio Code</div>

{{< img src="tracing/guide/code_origins/code_origin_ide_details.png" alt="Code Origin Details in IDE" style="width:100%;">}}

## Performance and Pricing Impact

**Performance Impact**: Code Origins has negligible performance overhead that is virtually unnoticeable in production environments.

**Pricing Impact**: Code Origins will have no additional impact on billing.

## Troubleshooting

If you don't see Code Origin information:

1. Verify that Code Origins is enabled in your tracing library configuration.
2. Ensure your tracing library version supports Code Origins.
3. Note that Code Origin information is only available on entry spans for most services.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/
[2]: /tracing/services/service_page/
[3]: /tracing/services/resource_page/ 
[4]: /developers/ide_plugins/
[5]: /dynamic_instrumentation/