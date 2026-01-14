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
2. [Fast retries](#fast-retries) are applied, if configured.
3. Test results are aggregated across locations.
4. Failures are evaluated over time using the alerting rules.
5. The monitor transitions between **OK**, **Alert**, or **No Data** [status](#status-descriptions) as conditions are met or no longer met.

Alerts are always the result of **aggregated evaluation**, not a single datapoint.

## Test runs that generate alerts
| Test run type                           | Evaluated for alerting |
|-----------------------------------------|------------------------|
| Scheduled runs                          | Yes                    |
| CI/CD-triggered runs                    | No                     |
| Manually triggered runs (unpaused test) | Yes, if state changes  |
| Manually triggered runs (paused test)   | No                     |

## Fast retries

Fast retries automatically re-run a failed request or step **within the same test execution**. They continue until either a run succeeds or the configured retry count is reached.

{{< img src="synthetics/guide/monitors_trigger_alerts/fast_retry.png" alt="Retry conditions step of a synthetics test" style="width:80%;" >}}

**Key behaviors:**

- A test configured with *n* retries can execute up to *n + 1* times per scheduled run (including the original attempt).
- A test run is only considered failed if **all fast retries fail**.
- Only the final result counts toward alerting conditions and uptime calculations.
- Fast retry runs appear in test results with a `(fast retry)` label in the **Run Type** column. <br></br>

   {{< img src="synthetics/guide/monitors_trigger_alerts/fast_retry_test_runs.png" alt="Test runs screen of a Synthetics test, highlighting the Scheduled (fast retry) run type" style="width:100%;" >}}

- Fast retries do **not** extend the alert evaluation timeline; they only affect whether a single run is marked as failed.

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

When minimum duration (13 minutes) is shorter than test frequency (15 minutes), alerts trigger efficiently:

| Time | Event | Result |
|------|-------|--------|
| t0 | Test passes | — |
| t15 | Test fails | Minimum duration timer starts |
| t28 | 13 minutes elapsed | Alert triggers |

With aligned settings, only one failed test run is needed before alerting.

### Example: Fast retries causing delays

When fast retries overlap with scheduled test runs, alerting can behave unexpectedly:

| Time | Event | Result |
|------|-------|--------|
| t0 | Test passes | — |
| t15 | Test fails | Timer does **not** start (waiting for retries) |
| t25 | First fast retry fails | — |
| t30 | Test passes | — |
| t35 | Second fast retry fails | Minimum duration timer starts |
| t45 | Test passes | Timer resets (only 10 min elapsed) |

In this scenario, the fast retries overlap with scheduled runs, causing confusion about which failure triggered the timer.

### Best practices

- Set the minimum duration to `0` to alert as soon as a failure occurs.
- Enable fast retries to handle transient issues like network blips. For frequently running tests, pair this with a longer minimum duration to reduce alert noise.
- Align minimum duration with test frequency to avoid unexpected delays.
- Avoid [overlapping fast retries with scheduled test runs][3], which can cause unexpected alerting behavior.

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

1. Identify the monitoring period.

   The monitor is scoped to `Jan 12, 10:56 AM - Jan 12, 4:56 PM`, a 360-minute period:

   {{< img src="synthetics/guide/monitors_trigger_alerts/global_uptime.png" alt="A synthetics test run showing global uptime of 95.83%" style="width:100%;" >}}

2. Determine the time spent in alert status.

   Zoom into the time range to identify when the monitor was in an alert state:

   {{< img src="synthetics/guide/monitors_trigger_alerts/global_uptime_video.mp4" alt="Video of a Synthetics test run, scoping into the datetime period of the alert" video=true >}}

   The alert period is `Jan 12, 3:46 PM – Jan 12, 4:01 PM`, approximately 15 minutes.

3. Apply the formula.

   ```
   Total Period = 360 minutes
   Time in Alert = 15 minutes
   Global Uptime = ((360 - 15) / 360) × 100 = 95.83%
   ```

<div class="alert alert-info">To understand alert timing across locations, use the <strong>Show all locations</strong> toggle instead of relying only on global uptime.</div>

## Status descriptions

OK
: The monitor is healthy. Either all test runs are passing, or failures have not met the alerting conditions (minimum duration and location requirements).

ALERT
: The alerting conditions have been met. The test has been failing continuously for the configured minimum duration across the required number of locations.

NO DATA
: The monitor has not received any test results. This can occur if the test is paused, has not yet run, or there is an issue with data collection.

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
[3]: /synthetics/guide/synthetic-test-retries-monitor-status/#retries-that-overlap-with-other-test-runs
