---
title: Why can't I see my correlated logs in the Trace ID panel?
kind: faq
---

When injecting trace identifiers into your logs, if you are using a [Log Integration][1] in Datadog, you can correlate traces and logs by following our guide [here][2]. Our Log Integrations include automatic log parsing rules to ensure that your attributes including `trace_id` and `span_id` are parsed correctly and you are able to view correlated traces with their logs.

If you are not using a Log Integration and are building custom log parsing rules instead, please ensure that the `trace_id` and `span_id` values are being parsed as a string in the rules you have written, similar to the below: 

```
dd.trace_id=%{word:dd.trace_id} dd.span_id=%{word:dd.span_id}
```

If these attributes are not being parsed out of a string due to a custom parsing rule outside of our Log Integration, this would prevent logs from being displayed in the trace view similar to the below. Once these values are being parsed correctly, you can make a direct correlation similar to the below:

{{< img src="tracing/trace_id_injection.png" alt="Tracing id injection" responsive="true" style="width:90%;">}}

[1]: logs/log_collection
[2]: tracing/advanced_usage/#correlate-traces-and-logs
