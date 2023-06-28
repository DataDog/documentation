---
title: Customize monitor evaluation frequencies with custom schedules
kind: Guide
disable_toc: false
further_reading:
- link: "https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#evaluation-frequency"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/monitors/downtimes"
  tag: "Documentation"
  text: "Downtimes"
- link: "/monitors/configuration/?tab=thresholdalert#evaluation-window"
  tag: "Documentation"
  text: "Cumulative time windows"
---

## Overview 

<div class="alert alert-warning">This feature is not supported on composite, SLO, or service check monitors.</div>

Set a specific evaluation time for monitors and control the evaluation frequency to track the execution of critical running jobs in your environment. Custom monitor schedule enables you to reduce alerting fatigue for data that does not require constant monitoring. 

## Configuration

{{< img src="/monitors/guide/custom_schedules/add_custom_schedule.png" alt="Button to add custom schedule in the monitor configuration" style="width:100%;" >}}

Click **+ Add Custom Schedule** to configure your evaluation frequency. Custom schedule monitors are not interchangeable with default monitors. You cannot switch between evaluation frequencies once this is configured. 

Use [recurrence rules (RRULEs)][3] to define custom schedules. Use the [official RRULE generator][4] as a tool to generate recurring rules. 

**Note**: Attributes specifying the duration in RRULE are not supported (for example, DTSTART, DTEND, DURATION).

## Custom schedules vs. default monitor schedules

Monitors that use the default evaluation frequency send alerts based on the state transitions of the monitor. For example, when a monitor transitions from a WARN to OK, or from OK to ALERT. Monitors with custom schedules send alerts based on individual evaluation results. Custom schedule monitors only evaluate based on the scheduled frequency (Daily, Weekly, Monthly) and no additional notifications are sent. 

As an example use case, you want to monitor a daily cron job and send an alert when this job fails. With the default evaluation frequency, the first notification is sent when the cron job fails, but the next alert is based on when the monitor transitions between OK and ALERT. This means that even though you are monitoring a 24 hour frequency, it's a shifting 24 hours. 

With custom schedules, you can set the evaluation to Daily. The monitor evaluates once a day to track if a job fails and sends an alert accordingly. Every alert is based on the same fixed conditions as the first alert and does not factor in the state of the previous alert. This is an effective way to monitor metrics and events that:
- Occur on a set schedule
- Are sparse and not as frequent
- Do not need constant evaluation

## Other example use cases

- Fixed evaluation time frames, such as looking for a log event between 5:00PM-5:30PM every day.
- Monitor sparse metrics or metrics that only report every few weeks.
- Monitor missing data at a specific time of the day.
- Trigger an alert if an event has not occurred by a specific time (for example, every day at 7AM), so you have time to resolve it before it sets off a chain of failing events.

{{< whatsnext desc="For use cases where you want constant monitor evaluations for specific timeframes, see the following alternative options:">}}
    {{< nextlink href="monitors/downtimes" >}}<strong>Downtimes</strong>: configure a notification schedule to suppress alerts at specific times. {{< /nextlink >}}
    {{< nextlink href="monitors/configuration/?tab=thresholdalert#evaluation-window" >}}<strong>Cumulative time window</strong>: configure monitor queries over a fixed time window (hourly, daily).{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/configuration/?tab=thresholdalert#evaluation-window
[2]: /monitors/downtimes/
[3]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[4]: https://icalendar.org/rrule-tool.html