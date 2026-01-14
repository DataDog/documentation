---
title: Understanding Synthetic Monitor Alerting
description: Understand how alerting rules, retries, and location thresholds determine when a Synthetic monitor alerts or recovers.

further_reading:
    - link: '/synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Learn about Browser Tests'
---

Synthetic Monitoring monitors evaluate test results **over time**, not individual test executions.  
This page explains how Datadog determines when a Synthetic Monitoring notification triggers an alert or recovers, and why alerts may behave differently than expected.

Use this page to understand:

- Why a monitor alerted later than expected
- Why a monitor recovered even though failures are still visible
- Why a test failure did not trigger an alert

## Monitor evaluation criteria

A Synthetic monitor does not alert based on a single failed run by default. Instead, it continuously evaluates test results using your configured alert conditions.

When determining whether to trigger an alert, Datadog evaluates:

- **Test schedule**: How often the test runs
- **Test results**: Pass or fail outcomes (after retries)
- **Locations**: Which locations are failing and when
- **Alerting rules**: Minimum duration and location requirements

A monitor transitions to **alert** only when *all alerting rules are satisfied*.

## How alert evaluation works

When a Synthetic Monitoring test runs, Datadog evaluates alerting in the following order:

1. The test runs based on its configured schedule.
2. Fast retries are applied, if configured.
3. Test results are aggregated across locations.
4. Failures are evaluated over time using the alerting rules.
5. The monitor transitions between **OK**, **Alert**, or **No Data** as conditions are met or no longer met.

Alerts are always the result of **aggregated evaluation**, not a single datapoint.

## Alerting rules

Alerting rules define when a monitor is allowed to change state based on test failures over time.
An alert is triggered only when **all alerting rules are satisfied continuously** for the configured duration.

Alerting rules typically include:

- **Minimum duration (alerting delay)**  
  How long failures must persist before triggering an alert.

- **Location scope**  
  For example, *any 1 of N locations* or *all locations*.

- **Failure aggregation rules**  
  For example, whether failures must overlap in time (such as *at one moment, all locations were failing*).

<div class="alert alert-info">If any part of the alerting rule stops being true during the evaluation window, the alert timer resets.</div>

## Test frequency and minimum duration

Two commonly confused settings are:

- **Test frequency**: How often the test runs
- **Minimum duration**: How long the test must continuously fail before alerting

Datadog cannot evaluate failures more frequently than the test runs.

### Example

- Test frequency: 15 minutes  
- Minimum duration: 5 minutes  

Because the test only runs every 15 minutes, Datadog can only evaluate failures at that interval. If the minimum duration is shorter than the test frequency, alerts may be delayed.

### Best practices

- Set the minimum duration to `0` to alert as soon as a failure occurs.
- Use a longer minimum duration to reduce noise from transient issues.
- Align minimum duration with test frequency to avoid unexpected delays.

## Fast retries

Fast retries are designed to efficiently re-run a failed request or step **within the same test execution**.

Characteristics:

- Executed immediately after a failure
- Do not count as separate test runs
- Used to reduce noise from transient issues

A test run is only considered failed if **all fast retries fail**.

Fast retries affect whether a single run is marked as failed, but they do **not** extend the alert evaluation timeline.


Fast retries occur **after a failed test run**, with a configurable wait period between attempts.

Characteristics:

- Count as separate test executions
- Extend the overall evaluation time
- Can delay alerting when combined with longer schedules or minimum durations

## How retries affect alerting

Retries are applied **before** alert conditions are evaluated.

If retries are configured:

- A test run is only marked as failed after all retries fail
- Temporary issues may be filtered out before alerting
- Alerting may be delayed depending on retry count and wait time

Retries help reduce noise but do not replace alerting rules.

## Location-based evaluation

Location rules determine **how many locations must fail, and when**, for an alert to trigger.

Common patterns include:

- Fail from any 1 of _N_ locations
- Fail from all locations
- At one moment, all locations were failing

A monitor can recover even if **some locations are still failing**, as long as the configured alerting rules are no longer satisfied during the evaluation window.

## Alert and recovery behavior

Alert and recovery notifications are evaluated independently.

- **Alert** notifications are sent when alerting rules are met.
- **Recovery** notifications are sent when alerting rules are no longer met.

A recovery does not require all test runs to pass, only that the alerting conditions are no longer true.

## Global uptime and alert state

**Global uptime** represents the percentage of time your monitor was healthy (`OK` status) during the selected time period. 

It is calculated based on how long the monitor remained healthy compared to the total monitoring period. Any time spent in an `ALERT` state reduces the global uptime accordingly. Since this metric is based on the duration of the monitor's status, it can be approximated by the ratio of successful test results to the total number of test executions over the same period.

The formula for calculating global uptime is:

```
Global Uptime = ((Total Period - Time in Alert) / Total Period) × 100
```

### Example calculation

The following example demonstrates how a 95.83% global uptime is calculated.

**Step 1:** Identify the monitoring period.

The monitor is scoped to `Jan 12, 10:56 AM-Jan 12, 4:56 PM`, a 360-minute window.

{{< img src="synthetics/guide/monitors_trigger_alerts/global_uptime.png" alt="A synthetics test run showing global uptime of 95.83%" style="width:100%;" >}}

**Step 2:** Determine the time spent in alert status.

Zoom into the time range to identify when the monitor was in an alert state:

{{< img src="synthetics/guide/monitors_trigger_alerts/global_uptime_video.mp4" alt="Video of a Synthetics test run, scoping into the datetime period of the alert" video=true >}}

The alert period is `Jan 12, 3:46 PM–Jan 12, 4:01 PM`, approximately 15 minutes.

**Step 3:** Apply the formula.

```
Total Period = 360 minutes
Time in Alert = 15 minutes
Global Uptime = ((360 - 15) / 360) × 100 = 95.83%
```

To understand alert timing across locations, use **Show all locations** instead of relying only on global uptime.

### Status descriptions

OK
: Some text

ALERT
: Some text

NO DATA
: some text

## Test runs that generate alerts

| Test run type | Evaluated for alerting |
|--------------|------------------------|
| Scheduled runs | Yes |
| CI/CD-triggered runs | No |
| Manually triggered runs (unpaused test) | Yes, if state changes |
| Manually triggered runs (paused test) | No |

<div class="alert alert-info">Manually triggered runs on paused tests do not generate alerts.</div>

## Why alerts may behave unexpectedly

If a monitor does not alert or recovers unexpectedly, check for the following:

- Minimum duration and test frequency alignment
- Retry configuration
- Location rules and overlap requirements
- Passing runs within the evaluation window
- Whether the test was paused
- Interpretation of global uptime

## Next steps

- [Understand test retries and monitor status][1]
- [Monitor website uptime with SLOs][2]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/guide/synthetic-test-retries-monitor-status/
[2]: /synthetics/guide/uptime-percentage-widget/
