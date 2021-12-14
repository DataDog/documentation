---
title: Why do my logs not have the expected timestamp?
kind: faq
further_reading:
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/faq/how-to-investigate-a-log-parsing-issue/"
  tag: "FAQ"
  text: "How to investigate a log parsing issue?"
---

By default, Datadog generates a timestamp and appends it in a date attribute when logs are received on the intake API.

However, this default timestamp does not always reflect the actual value that might be contained in the log itself. This article describes how to override the default timestamp.

{{< img src="logs/faq/log_timestamp_1.png" alt="Example of log with timestamp" style="width:75%;">}}

1. **Displayed timestamp**.
    The first thing to understand is how the log timestamp (visible from the Log Explorer and at the top section of the contextual panel) is generated.

    Timestamps are stored in UTC and displayed in the user local timezone.
    On the above screenshot, the local profile is set to `UTC+1`, therefore the reception time of the log is `11:06:16.807 UTC`.

    Check your [user settings][1] to understand if this could be linked to a bad timezone on your profile:
    {{< img src="logs/faq/log_timestamp_2.png" alt="User setting" style="width:75%;">}}
    But you can extract the timestamp from the message to override the actual log date for both raw and JSON logs.

2. **Raw logs**.

    2.1 **Extract the timestamp value with a parser**.
        While writing a parsing rule for your logs, you need to extract the timestamp in a specific attribute. [See specific date parsing examples][2].
        For the above log, you would use the following rule with the `date()` [matcher][3] to extract the date and pass it into a custom date attribute:
        {{< img src="logs/faq/log_timestamp_3.png" alt="Parsing date" style="width:75%;">}}

    2.2 **Define a Log Date Remapper**.
        A `date` attribute stores the timestamp value. [Add a Log Date remapper][4] to make sure the value in the `date` attribute overrides the official log timestamp.
        {{< img src="logs/faq/log_timestamp_4.png" alt="Log date remapper" style="width:75%;" >}}
        **Note**: Any modification on a Pipeline only impacts new logs as all the processing is done at ingestion.
        The following log generated at `06:01:03 EST`, which correspond to `11:01:03 UTC`, is correctly displayed as 12:01:03 (display timezone is UTC+1 in this case).
        {{< img src="logs/faq/log_timestamp_5.png" alt="Log post processing with new timestamp" style="width:70%;" >}}

3. **JSON logs**.

    3.1 **Supported Date formats**.
        JSON logs are automatically parsed in Datadog.
        The log `date` attribute is one of the [reserved attributes][5] in Datadog which means JSON logs that use those attributes have their values treated specially - in this case to derive the log's date. Change the default remapping for these attributes at the top of your [Pipeline][6].
        Imagine that the actual timestamp of the log is contained in the attribute mytimestamp.
        {{< img src="logs/faq/log_timestamp_6.png" alt="log with mytimestamp attribute" style="width:75%;">}}
        To make sure this attribute value is taken to override the log date, you must add it in the list of Date attributes.
        The date remapper looks for each of the reserved attributes in the order in which they are configured in the reserved attribute mapping. To ensure the date comes from the `mytimestamp` attribute, place it first in the list.
        **Note**: Any modification on the Pipeline only impacts new logs as all the processing is done at ingestion.
        There are specific date formats to respect for the remapping to work. The recognized date formats are: [ISO8601][7], [UNIX (the milliseconds EPOCH format)][8] and [RFC3164][9].
        If the format is different from one of the above (so if your logs still do not have the right timestamp), there is a solution.

    3.2 **Custom Date format**.
        If the format is not supported by the remapper by default, parse this format and convert it to a supported format. To do this use a [parser Processor][4] that applies only on the attribute.
        If you do not have a Pipeline filtered on those logs yet, create a new one and add a Processor.
        **Note**: Set this Processor only to apply to the custom `mytimestamp` attribute under the **advanced** settings.
        {{< img src="logs/faq/log_timestamp_7.png" alt="Advanced settings date Processor" style="width:75%;">}}
        Then define the right parsing rule depending on your date format. See the [parsing dates examples][2].
        Add a Log Date Remapper and to have the correct timestamp on new logs.
        {{< img src="logs/faq/log_timestamp_8.png" alt="Pipeline example" style="width:75%;">}}
        {{< img src="logs/faq/log_timestamp_9.png" alt="Log post processing after previous pipeline" style="width:75%;">}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/preferences
[2]: /logs/log_configuration/parsing/#parsing-dates
[3]: /logs/log_configuration/parsing
[4]: /logs/log_configuration/processors/#log-date-remapper
[5]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
[6]: /logs/log_configuration/pipelines/?tab=date#preprocessing
[7]: https://www.iso.org/iso-8601-date-and-time-format.html
[8]: https://en.wikipedia.org/wiki/Unix_time
[9]: https://www.ietf.org/rfc/rfc3164.txt
