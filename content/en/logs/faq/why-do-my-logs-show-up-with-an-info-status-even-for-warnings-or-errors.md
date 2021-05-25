---
title: Why do my logs show up with an Info status even for Warnings or Errors?
kind: faq
further_reading:
- link: "/logs/faq/how-to-remap-custom-severity-values-to-the-official-log-status/"
  tag: "FAQ"
  text: "Learn how to remap custom severity values to the official log status"
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/processing/parsing/"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/faq/how-to-investigate-a-log-parsing-issue/"
  tag: "FAQ"
  text: "How to investigate a log parsing issue?"
---

By default, Datadog generates a status (*Info*) and appends it in the `status` attribute when logs are received on Datadog's intake API.
However, this default `status` does not always reflect the actual value that might be contained in the log itself; this article describes how to override this default value.

{{< img src="logs/faq/original_log.png" alt="Original log"  style="width:50%;">}}

## Raw logs

### Extract the status value with a parser

While writing a parsing rule for your logs, extract the `status` in a specific attribute.

For the log above, use the following rule with the `word()` [matcher][1] to extract the status and pass it into a custom `log_status` attribute:

{{< img src="logs/faq/processor.png" alt="Processor"  style="width:50%;">}}

### Define a log status remapper

The value is now stored in a `log_status` attribute. [Add a Log Status remapper][2] to make sure the official log status is overridden with the value in the `log_status` attribute.

{{< img src="logs/faq/source_attribute.png" alt="Source attribute"  style="width:50%;">}}

All new logs processed by this Pipeline should now have the correct status.

**Note**: Any modification on a Pipeline only impacts new logs as all the processing is done during the intake process.

{{< img src="logs/faq/log_post_processing.png" alt="log post processing"  style="width:50%;">}}

## JSON logs

**JSON logs are automatically parsed in Datadog.**
The log `status` attribute is one of the [reserved attributes][3] in Datadog which means JSON logs that use those attributes have their values treated specially - in this case to derive the log's status. Change the default remapping for those attributes at the top of your Pipeline as explained [in the edit reserved attributes documentation][4].
So let's imagine that the actual status of the log is contained in the attribute `logger_severity`.

{{< img src="logs/faq/new_log.png" alt="new log"  style="width:50%;">}}

To make sure this attribute value is taken to override the log status, add it in the list of Status attributes.

The status remapper looks for each of the reserved attributes in the order in which they are configured in the reserved attribute mapping, so to be 100% sure that our `logger_severity` attribute is used to derive the status, place it first in the list.

{{< img src="logs/faq/reserved_attribute.png" alt="reserved attribute"  style="width:50%;">}}

**Note**: Any modification on the Pipeline only impacts new logs as all the processing is done at ingestion.

There are specific status formats that must be adhered to for the remapping to work. The recognized status formats are explained in the [status remapper description][2]. In this specific case, by adding some host and service remapping new logs are correctly configured:

{{< img src="logs/faq/new_log_remapped.png" alt="New log remapped"  style="width:50%;">}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/parsing/?tab=matcher
[2]: /logs/processing/processors/#log-status-remapper
[3]: /logs/processing/attributes_naming_convention/#reserved-attributes
[4]: /logs/processing/#edit-reserved-attributes
