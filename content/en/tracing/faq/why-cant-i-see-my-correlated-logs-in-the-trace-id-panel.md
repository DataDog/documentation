---
title: Why can't I see my correlated logs in the Trace ID panel?
kind: faq
further_reading:
- link: "/tracing/enrich_tracing/connect_logs_and_traces"
  tag: "Documentation"
  text: "Correlate Traces and Logs"
---

Clicking on a trace opens a contextual panel that contains information about the trace, about the host and the correlated logs. However the log panel can be empty in some specific cases. Let's review how this can be fixed.

{{< img src="tracing/faq/tracing_no_logs_in_trace.png" alt="Tracing missing logs" responsive="true" style="width:90%;">}}


## What logs are displayed in the trace panel?

When looking at a trace, there are two types of logs that can be seen:

* - `host`: Display logs from the trace's host within the trace timeframe
* - `trace_id`: Display logs that have the corresponding trace id

{{< img src="tracing/faq/tracing_logs_display_option.png" alt="Tracing log display option" responsive="true" style="width:50%;">}}

## Troubleshooting steps

### Host option

If the log section is empty when the `host` option is set, go into the log explorer and check if:

- Logs are being sent from the host that emitted trace.
- There are logs for that host within the trace timeframe.
- The timestamp of the logs is properly set. Checkout [this specific guide][1] for more explanation about the log timestamp.

### Trace_id option

Make sure you have a `trace_id` standard attribute in your logs. You should see a trace icon next to the SERVICE name (black if trace is not sampled, grey if trace is sampled).

{{< img src="tracing/faq/trace_in_log_panel.png" alt="Trace icon in log panel" responsive="true" style="width:50%;">}}

If your logs do not contain the `trace_id`, follow the guide on [correlating traces and logs][2].
The idea is then on the log side to:

1. Extract the trace id in a log attribute
2. Remap this attribute to the reserved `trace_id` attribute.

{{< tabs >}}
{{% tab "JSON logs" %}}

For JSON logs, step 1 and 2 are done automatically. The tracer inject the trace and span id automatically in the logs and it is remapped automatically thanks to the [reserved attribute remappers][1].

If this isn't working as expected, ensure the name of the logs attribute that contains the trace id is `dd.trace_id` and verify it is properly set in [reserved attributes][2].


[1]: /logs/processing/#edit-reserved-attributes
[2]: https://app.datadoghq.com/logs/pipelines/remapping
{{% /tab %}}
{{% tab "With Log integration" %}}

For raw logs, using a log integration (setting the `source` attribute to: `java`, `python`, `ruby`, ...) should do all the work automatically as well.

Here is an example with the Java integration pipeline:

{{< img src="tracing/faq/tracing_java_traceid_remapping.png" alt="Java log pipeline" responsive="true" style="width:90%;">}}

Now it is possible that the log format is not covered by the integration pipeline. In this case, clone the pipeline and [follow our parsing troubleshooting guide][1] to make sure it fits your format.

[1]: /logs/faq/how-to-investigate-a-log-parsing-issue/#pagetitle
{{% /tab %}}
{{% tab "Custom" %}}

For raw logs without any integration, make sure that the custom parsing rule is extracting the trace and span ids as a string as on the following example:

{{< img src="tracing/faq/tracing_custom_parsing.png" alt="Custom parser" responsive="true" style="width:90%;">}}

* Then define a [Trace remapper][1] on the extracted attribute to remap them to the official trace id of the logs.

[1]: /logs/processing/processors/#trace-remapper
{{% /tab %}}
{{< /tabs >}}

Once the IDs are properly injected and remapped into your logs, you can make a direct trace to log correlation:

{{< img src="tracing/faq/trace_id_injection.png" alt="Tracing id injection" responsive="true" style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/faq/why-do-my-logs-not-have-the-expected-timestamp/#pagetitle
[2]: /tracing/enrich_tracing/connect_logs_and_traces
