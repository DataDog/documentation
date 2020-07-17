---
title: Agent Span Modification
kind: documentation
description: "Configure the Datadog Tracer to modify or discard spans for security or fine-tuning purposes."
---

## Post-Processing Traces

The tracing libraries are designed to be extensible. Customers may consider writing a custom post-processor to intercept Spans then adjust or discard them accordingly (e.g. based on a regular expressions). For example, this could be achieved with the following constructs:

* Java: [TraceInterceptor interface][1]
* Ruby: [Processing Pipeline][2]
* Python: [Trace Filtering][3]



[1]: /tracing/custom_instrumentation/java/#extending-tracers
[2]: /tracing/custom_instrumentation/ruby?tab=activespan#post-processing-traces
[3]: https://github.com/DataDog/datadog-agent/blob/780caa2855a237fa731b78a1bb3ead5492f0e5c6/pkg/config/config_template.yaml#L472-L490
