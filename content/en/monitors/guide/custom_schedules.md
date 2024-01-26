---
title: Customize monitor evaluation frequencies
kind: Guide
disable_toc: false
further_reading:
- link: "https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#evaluation-frequency"
  tag: "Documentation"
  text: "Learn about monitor evaluation frequency"
- link: "/monitors/downtimes"
  tag: "Documentation"
  text: "Downtimes"
- link: "/monitors/configuration/?tab=thresholdalert#evaluation-window"
  tag: "Documentation"
  text: "Cumulative time windows"
---

## Overview 

Set a specific evaluation time and control the evaluation frequency for monitors to track the execution of critical jobs running in your environment. Monitor Custom Schedules enable you to alert on systems and processes that do not need to be continuously monitored, such as cron jobs.

Monitor Custom Schedules are supported on events, logs, and metrics monitors with daily, weekly, and monthly scheduling intervals.

## Configuration

{{< img src="/monitors/guide/custom_schedules/add_custom_schedule.png" alt="Button to add custom schedule in the monitor configuration" style="width:100%;" >}}

Click **Add Custom Schedule** to configure your evaluation frequency. 

<div class="alert alert-warning">After a custom schedule has been enabled on a monitor, the schedule cannot be disabled. Custom schedules can only be added or removed during monitor creation.
</div>

{{< tabs >}}
{{% tab "Day" %}}
Select the time of the day you want the monitor to evaluate at.

For example, the following monitor checks every day at 8:00PM that the daily backup job generated a success event for each database instance. 

{{< img src="monitors/guide/custom_schedules/custom_day.png" alt="Monitor configuration to check every day at 8pm that a success event has been generated for each database instance as a result of the daily backup job" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Week" %}}
Select the days of the week as well as the time of the day you want the monitor to evaluate at.

For example, the following monitor checks every week on Tuesday and Saturday at 6:00AM that marketing emails have been sent for each individual campaign. 

{{< img src="monitors/guide/custom_schedules/custom_week.png" alt="Monitor configuration to check every week on Tuesday and Saturday at 6am that marketing emails have been sent for each individual campaign" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Month" %}}
Select the day of the month as well as the time of the day you want the monitor to evaluate at.

For example, the following monitor checks on the first day of each month whether the cron job generating customer invoices has successfully run.

{{< img src="monitors/guide/custom_schedules/custom_month.png" alt="Monitor configuration to check on the first day of each month whether the cron job generating customer invoices has successfully run." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## RRULES

Recurrence rule (RRULE) is a property name from the [iCalendar RFC][1], which is the standard for defining recurring events. Use the [official RRULE generator][2] to generate recurring rules. Leverage RRULEs to cover more advanced scheduling use cases. 

To write a custom RRULE for your monitor, click **Use RRULE**.

**Notes**: 
- Attributes specifying the duration in RRULE are not supported (for example, DTSTART, DTEND, DURATION).
- Evaluation frequencies must be a day or longer. For shorter evaluation frequencies, use the default monitor schedules.

#### Example: Monitor evaluates on the last day of the month
```text
FREQ=MONTHLY;BYMONTHDAY=28,29,30,31;BYSETPOS=-1
```
{{< img src="monitors/guide/custom_schedules/RRULE_last_day_month.png" alt="RRULE syntax used in the UI to evaluate the last day of the month" style="width:90%;" >}}

#### Example: Monitor evaluates every other month on the first and last Sunday of the month:

```text
FREQ=MONTHLY;INTERVAL=2;BYDAY=1SU,-1SU
```

{{< img src="monitors/guide/custom_schedules/RRULE_month_last_sunday.png" alt="RRULE syntax used in the UI to evaluate every other month on the first and last Sunday of the month" style="width:90%;" >}}

## Alerting behavior of monitors with custom schedules

Monitors using default scheduling run the query with the default evaluation frequency and send alerts based on monitor status transitions (for example, when a monitor goes from WARN to OK or from OK to ALERT). 

The timeline below illustrates the behavior of a monitor with default scheduling. The monitor sends alerts corresponding to status changes.

{{< img src="monitors/guide/custom_schedules/alerting_behavior_regular.png" alt="Visual diagram showing a when a monitor sends an alert based on monitor state transitions for the default schedule with a thirty minute evaluation frequency" style="width:100%;" >}}

Monitors with custom schedules, on the other hand, evaluate on a daily, weekly, or monthly basis and send alerts based on the results of individual evaluations. Each evaluation is independent from the previous one and sends a notification when the result is not OK. 

The timeline below illustrates the behavior of a monitor running on a custom schedule. Unlike the default scheduled monitor, the custom scheduled monitor sends an alert during its evaluation time based on the monitor state.
{{< img src="monitors/guide/custom_schedules/alerting_behavior_custom.png" alt="Visual diagram showing a when a monitor sends an alert based on monitor state for the custom schedule with a daily evaluation frequency" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://icalendar.org/rrule-tool.html
[2]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
