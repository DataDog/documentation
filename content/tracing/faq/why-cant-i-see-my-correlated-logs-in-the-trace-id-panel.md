---
title: Why can't I see my correlated logs in the Trace ID panel?
kind: faq
further_reading:
- link: "/tracing/advanced_usage/#correlate-traces-and-logs"
  tag: "Documentation"
  text: "Correlate Traces and Logs"
---

Clicking on a trace opens a contextual panel that contains information about the trace, about the host and the correlated logs. However the log panel can be empty in some specific cases. Let's review how this can be fixed.

{{< img src="tracing/tracing_no_logs_in_trace.png" alt="Tracing missing logs" responsive="true" style="width:90%;">}}


## What logs are displayed in the trace panel?

When looking at a trace, there are two types of logs that can be seen:

* - `host`: Display logs from the trace's host within the trace timeframe
* - `trace_id`: Display logs that have the corresponding trace id

{{< img src="tracing/tracing_logs_display_option.png" alt="Tracing log display option" responsive="true" style="width:50%;">}}

## Troubleshooting steps

### Host option

If the log section is empty when the `host` option is set, go into the log explorer and check if:

- Logs are being sent from the host that emitted trace.
- There are logs for that host within the trace timeframe.
- The timestamp of the logs is properly set. Checkout [this specific guide][3] for more explanation about the log timestamp.

### Trace_id option

If your logs do not contain the trace id, follow the guide on [correlating traces and logs][2] to do it.
The idea is then on the log side to:

1. Extract the trace id in a log attribute
2. Remap this attribute to the reserved `trace_id` attribute.

{{< tabs >}}
{{% tab "JSON logs" %}}

For JSON logs, step 1 and 2 are done automatically. The tracer inject the trace and span id automatically in the logs and it is remapped automatically thanks to the [reserved attribute remappers][4].

In case of issue, double check in your logs the name of the attribute that contains the trace id (should be `dd.trace_id`) and double check in your [reserved attributes](https://app.datadoghq.com/logs/pipelines/remapping) that it is properly set.

{{% /tab %}}
{{% tab "With Log integration" %}}

For raw logs, using a log integration (setting the `source` attribute to: `java`, `python`, `ruby`, ...) should do all the work automatically as well.

Here is an example with the Java integration pipeline:

{{< img src="tracing/tracing_java_traceid_remapping.png" alt="Java log pipeline" responsive="true" style="width:90%;">}}

Now it is possible that the log format is not covered by the integration pipeline. In this case, clone the pipeline and [follow our parsing troubleshooting guide](https://docs.datadoghq.com/logs/faq/how-to-investigate-a-log-parsing-issue/#pagetitle) to make sure it fits your format.

{{% /tab %}}
{{% tab "Custom" %}}

For raw logs without any integration, make sure that the custom parsing rule is extracting the trace and span ids as a string as on the following example:

{{< img src="tracing/tracing_custom_parsing.png" alt="Custom parser" responsive="true" style="width:90%;">}}

Then define a [Trace remapper](https://docs.datadoghq.com/logs/processing/processors/#trace-remapper) on the extracted attribute to remap them to the official trace id of the logs.

{{% /tab %}}
{{< /tabs >}}

Once the IDs are properly injected and remapped into your logs, you can make a direct trace to log correlation:

{{< img src="tracing/trace_id_injection.png" alt="Tracing id injection" responsive="true" style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection
[2]: /tracing/advanced_usage/#correlate-traces-and-logs
[3]: https://docs.datadoghq.com/logs/faq/why-do-my-logs-not-have-the-expected-timestamp/#pagetitle
[4]: https://docs.datadoghq.com/logs/processing/#edit-reserved-attributes
