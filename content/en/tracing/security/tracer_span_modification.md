---
title: Tracer Span Modification
kind: documentation
description: "Configure the Datadog Tracer to modify or discard spans for security or fine-tuning purposes."
---

## Post-Processing Traces

The tracing libraries are extensible. You can write a custom post-processor to intercept spans and adjust or discard them accordingly (fore example, based on a regular expression match). See the following examples:

* Java: [TraceInterceptor interface][1]
* Ruby: [Processing Pipeline][2]
* Python: [Trace Filtering][3]



[1]: /tracing/custom_instrumentation/java/#extending-tracers
[2]: /tracing/custom_instrumentation/ruby?tab=activespan#post-processing-traces
[3]: https://github.com/DataDog/datadog-agent/blob/780caa2855a237fa731b78a1bb3ead5492f0e5c6/pkg/config/config_template.yaml#L472-L490
