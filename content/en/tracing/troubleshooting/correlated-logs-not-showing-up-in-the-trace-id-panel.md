---
title: Correlated Logs Not Showing Up in the Trace ID Panel
kind: documentation
aliases:
  - /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/
further_reading:
- link: "/tracing/other_telemetry/connect_logs_and_traces/"
  tag: "Documentation"
  text: "Correlate Traces and Logs"
- link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
  tag: 'Guide'
  text: 'Ease troubleshooting with cross product correlation.'
---

The [trace][1] panel contains information about the trace, including information about the host and correlated logs. However, in certain cases, the log panel might be empty. This guide walks through how to fix the issue.

{{< img src="tracing/troubleshooting/tracing_no_logs_in_trace.png" alt="A trace page showing an empty log section" style="width:90%;">}}

## Logs displayed in the trace panel

There are two types of logs that can be seen in a [trace][1]:

- `host`: Display logs from the trace's host within the trace timeframe.
- `trace_id`: Display logs that have the corresponding trace id.

{{< img src="tracing/troubleshooting/tracing_logs_display_option.png" alt="A trace's log dropdown menu showing the trace ID and host options"  style="width:35%;">}}

## Troubleshooting steps

### Host option

If the log section is empty for the `host` option, go into the log explorer and check if:

- Logs are being sent from the host that emitted the trace.
- There are logs for that host within the trace timeframe.
- The timestamp of the logs is properly set. See [Logs Not Showing Expected Timestamp][2] for more information about log timestamps.

### Trace_id option

If the log section is empty for the `trace_id` option, make sure you have a `trace_id` standard attribute in your logs. If your logs do not contain the `trace_id`, see the guide on [correlating traces and logs][3] to do the following:

1. Extract the trace id in a log attribute.
2. Remap this attribute to the reserved `trace_id` attribute.

{{< tabs >}}
{{% tab "JSON logs" %}}

For JSON logs, steps 1 and 2 are done automatically. The tracer injects the [trace][1] and [span][2] IDs into the logs, which is remapped automatically by the [reserved attribute remappers][3].

If that process is not working as expected, ensure the name of the logs attribute that contains the trace ID is `dd.trace_id` and verify that the attribute is correctly set in the [reserved attributes'][4] Trace Id section.

{{< img src="tracing/troubleshooting/trace_id_reserved_attribute_mapping.png" alt="The preprocessing for JSON logs page with the Trace Id section highlighted" >}}

[1]: /tracing/glossary/#trace
[2]: /tracing/glossary/#spans
[3]: /logs/log_configuration/processors/#remapper
[4]: https://app.datadoghq.com/logs/pipelines/remapping
{{% /tab %}}
{{% tab "With Log integration" %}}

For raw logs, where you are collecting the logs using a [log integration][1] for a specific language, set the `source` attribute to the language (for example `java`, `python`, `ruby`, and so). The integration automatically correlates the traces and logs.

Here is an example with the Java integration pipeline:

{{< img src="tracing/troubleshooting/tracing_java_traceid_remapping.png" alt="The Java log pipeline with the Trace Id remapper highlighted"  style="width:90%;">}}

However, it is possible that the log format is not recognized by the integration pipeline. In that case, clone the pipeline and follow the [parsing troubleshooting guide][2] to make sure the pipeline accepts the log format.

[1]: /logs/log_collection/?tab=application#setup
[2]: /logs/faq/how-to-investigate-a-log-parsing-issue/
{{% /tab %}}
{{% tab "Custom" %}}

For raw logs, where you aren't using an integration to collect the logs:

1. Make sure that the custom parsing rule extracts the [trace][1] and [span][2] IDs as a string, like in the following example:

{{< img src="tracing/troubleshooting/tracing_custom_parsing.png" alt="A custom parser with the trace Id highlighted in the sample log, parsing rule, and extraction sections"  style="width:90%;">}}

2. Then define a [Trace remapper][3] on the extracted attribute to remap it to the official trace ID of the logs.

[1]: /tracing/glossary/#trace
[2]: /tracing/glossary/#spans
[3]: /logs/log_configuration/processors/#trace-remapper
{{% /tab %}}
{{< /tabs >}}

Once the IDs are properly injected and remapped to your logs, you can see the trace to log correlation in the trace.

{{< img src="tracing/troubleshooting/trace_id_injection.png" alt="A trace page showing the the logs section with correlated logs"  style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#trace
[2]: /logs/guide/logs-not-showing-expected-timestamp/
[3]: /tracing/other_telemetry/connect_logs_and_traces/
