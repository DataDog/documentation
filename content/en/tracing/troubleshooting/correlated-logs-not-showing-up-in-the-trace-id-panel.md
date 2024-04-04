---
title: Correlated Logs Are Not Showing Up In The Trace ID Panel
kind: documentation
aliases:
  - /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/
  - /tracing/troubleshooting/correlating-logs-not-showing-up-in-the-trace-id-panel/
further_reading:
- link: '/tracing/other_telemetry/connect_logs_and_traces/'
  tag: 'Documentation'
  text: 'Correlate Traces and Logs'
- link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
  tag: 'Documentation'
  text: 'Ease troubleshooting with cross product correlation'
---

## Overview

The [trace][1] panel contains information about the trace, host, and correlated logs. 

{{< img src="tracing/troubleshooting/tracing_no_logs_in_trace.png" alt="A trace page showing an empty log section" style="width:90%;">}}

There are four types of logs that appear in a [trace][1]:

- `trace_id`: Display logs that have the corresponding trace ID.
- `host`: Display logs from the trace's host within the trace's timeframe.
- `container_id`: Display logs from the trace's container within the trace's timeframe.
- `pod_name`: Display logs from the trace's pod within the trace's timeframe.

{{< img src="tracing/troubleshooting/tracing_logs_display_option.png" alt="A trace's log dropdown menu showing the trace ID and host options" style="width:80%;">}}

In some cases, the **Logs** section in the trace panel may appear empty. This guide walks you through how to fix this issue.

## Infrastructure options

If the **Log** section is empty for the `host`, `container_id`, or `pod_name` options, navigate to the [Log Explorer][2] and ensure the following conditions:

1. Logs are being sent from the host/container/pod that emitted the trace.
2. There are logs for that host within the trace's timeframe.
3. The logs' timestamp is properly set. For more information, see [Logs Not Showing Expected Timestamp][3].

## Trace ID option

If the **Log** section is empty for the `trace_id` option, ensure you have a standard `trace_id` attribute in your logs. If your logs do not contain `trace_id`, [correlate your traces and logs][4] in order to do the following:

1. Extract the trace ID in a log attribute.
2. Remap this attribute to the reserved `trace_id` attribute.

   {{< tabs >}}
   {{% tab "JSON logs" %}}

   For JSON logs, Step 1 and 2 are automatic. The tracer injects the [trace][1] and [span][2] IDs into the logs, which are automatically remapped by the [reserved attribute remappers][3].

   If this process is not working as expected, ensure the logs attribute's name containing the trace ID is `dd.trace_id` and verify that the attribute is correctly set in the [reserved attributes'][4] Trace ID section.

   {{< img src="tracing/troubleshooting/trace_id_reserved_attribute_mapping.png" alt="The preprocessing for JSON logs page with the Trace Id section highlighted" >}}

[1]: /tracing/glossary/#trace
[2]: /tracing/glossary/#spans
[3]: /logs/log_configuration/processors/#remapper
[4]: https://app.datadoghq.com/logs/pipelines/remapping
   {{% /tab %}}
   {{% tab "With Log integration" %}}

   For raw logs (where you are collecting the logs using a [log integration][1] for a specific language), set the `source` attribute to the language, such as `java`, `python`, `ruby`, and more. The integration automatically correlates traces and logs.

   This example demonstrates the Java integration pipeline:

   {{< img src="tracing/troubleshooting/tracing_java_traceid_remapping.png" alt="The Java log pipeline with the Trace Id remapper highlighted" style="width:90%;">}}

   It is possible that the log format is not recognized by the integration pipeline. In this case, clone the pipeline and follow the [parsing troubleshooting guide][2] to make sure the pipeline accepts the log format.

[1]: /logs/log_collection/?tab=application#setup
[2]: /logs/faq/how-to-investigate-a-log-parsing-issue/
   {{% /tab %}}
   {{% tab "Custom" %}}

   For raw logs where you aren't using an integration to collect the logs:

   1. Make sure that the custom parsing rule extracts the [trace][1] and [span][2] IDs as a string, like in the following example:

      {{< img src="tracing/troubleshooting/tracing_custom_parsing.png" alt="A custom parser with the trace Id highlighted in the sample log, parsing rule, and extraction sections" style="width:90%;">}}

   2. Then define a [Trace remapper][3] on the extracted attribute to remap it to the official trace ID of the logs.

[1]: /tracing/glossary/#trace
[2]: /tracing/glossary/#spans
[3]: /logs/log_configuration/processors/#trace-remapper
   {{% /tab %}}
   {{< /tabs >}}

Once the IDs are properly injected and remapped to your logs, you can see the logs correlated to the trace in the trace panel.

{{< img src="tracing/troubleshooting/trace_id_injection.png" alt="A trace page showing the logs section with correlated logs" style="width:90%;">}}

**Note**: Trace IDs and span IDs are not displayed in your logs or log attributes in the UI.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#trace
[2]: https://app.datadoghq.com/logs
[3]: /logs/guide/logs-not-showing-expected-timestamp/
[4]: /tracing/other_telemetry/connect_logs_and_traces/
