---
title: Why can't I see my correlated logs in the Trace ID panel?
kind: faq
further_reading:
- link: "/tracing/advanced_usage/#correlate-traces-and-logs"
  tag: "Documentation"
  text: "Correlate Traces and Logs"
---

When injecting trace identifiers into your logs, if you are using a [Log Integration][1] in Datadog, follow the guide on [correlating traces and logs][2]. Datadog log integrations include automatic log parsing rules to ensure that your attributes (`trace_id` and `span_id`) are parsed correctly and you are able to view correlated traces with their logs.

If you are building custom log parsing rules instead, verify the `trace_id` and `span_id` values are parsed as a string in your rules, for example: 

```
dd.trace_id=%{word:dd.trace_id} dd.span_id=%{word:dd.span_id}
```

If these attributes are not parsed as a string due to a custom parsing rule, this prevents logs from being displayed in the trace view (see below). Once these values are being parsed correctly, you can make a direct trace to log correlation:

{{< img src="tracing/trace_id_injection.png" alt="Tracing id injection" responsive="true" style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection
[2]: /tracing/advanced_usage/#correlate-traces-and-logs
