---
title: Understanding Synthetic Monitor Alerting
description: Understand how alerting rules, retries, and location thresholds determine when a Synthetic monitor alerts or recovers.

further_reading:
    - link: '/synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Learn about Browser Tests'
    - link: '/synthetics/guide/synthetic-test-retries-monitor-status/'
      tag: 'Guide'
      text: 'Understand test retries and monitor status'
    - link: '/synthetics/guide/uptime-percentage-widget/'
      tag: 'Guide'
      text: 'Monitor website uptime with SLOs'
---

Synthetic Monitoring evaluates test results **over time**, not individual test executions.  
This page explains how Datadog determines when a Synthetic Monitoring notification triggers an alert or recovers, and why alerts may behave differently than expected.

Use this page to understand:

- Why a monitor alerted later than expected
- Why a monitor recovered even though failures are still visible
- Why a test failure did not trigger an alert

## How alert evaluation works

Synthetic Monitoring does not trigger alerts based on a single failed run. Instead, it continuously evaluates test results in the following order:

1. The test runs based on its configured schedule.
2. [Fast retries](#fast-retries) are applied, if configured.
3. Test results are aggregated across locations.
4. Failures are evaluated over time using the alerting rules.
5. The monitor transitions between **OK**, **Alert**, or **No Data** [status](#status-descriptions) as conditions are met or no longer met.

A monitor transitions to **Alert** only when all alerting rules are satisfied.
## Test runs that generate alerts
| Test run type                           | Evaluated for alerting |
|-----------------------------------------|------------------------|
| Scheduled runs                          | Yes                    |
| CI/CD-triggered runs                    | No                     |
| Manually triggered runs (unpaused test) | Yes, if state changes  |
| Manually triggered runs (paused test)   | No                     |

## Fast retries

Fast retries automatically re-run failed test executions. 

{{< img src="synthetics/guide/monitors_trigger_alerts/fast_retry_2.png" alt="Retry conditions step of a synthetics test" style="width:80%;" >}}

**Example behaviors of fast retries:**

- A test configured with *n* retries can execute up to *n + 1* times per scheduled run (including the original attempt).
- If you have a [minimum duration](#alerting-rules) configured as an alerting rule, the timer starts when the final fast retry execution fails. 
- Fast retry runs appear in test results with a `(fast retry)` label in the **Run Type** column. <br></br>

   {{< img src="synthetics/guide/monitors_trigger_alerts/fast_retry_test_runs_2.png" alt="Test runs screen of a Synthetics test, highlighting the Scheduled (fast retry) run type" style="width:100%;" >}}

## Alerting rules

Alerting rules define when a monitor is allowed to change state based on test failures over time. When fast retries are enabled, the monitor waits until all retry attempts are finished before it marks a test run as failed or triggers alert evaluations. An alert triggers only when all alerting conditions are met continuously for the configured duration.

Alerting rules typically include:

- **Minimum duration (alerting delay)**  
  How long failures must persist before triggering an alert.

- **Location scope**  
  For example, *any 1 of N locations* or *all locations*. <br></br>

  {{< img src="synthetics/guide/monitors_trigger_alerts/schedule_and_alert_2.png" alt="Test runs screen of a Synthetics test, highlighting the Scheduled (fast retry) run type" style="width:80%;" >}}

<div class="alert alert-info">If any part of the alerting rule stops being true during the evaluation window, the minimum duration timer resets.</div>

## Test frequency and minimum duration

Two commonly confused settings are:

- **Test frequency**: How often the test runs
- **Minimum duration**: How long the test must continuously fail before alerting 
  <br>**Note**: If you have [fast retries](#fast-retries) enabled, the minimum duration timer starts when the final fast retry test execution fails.

### Example: Alerts triggered immediately

- Fast retries (not configured)
- Test frequency: 15 minutes
- Minimum duration: 13 minutes
- Location scope: 1 of 1 

With the above settings, the alert triggers 13 minutes after the scheduled test runs have failed:

| Time | Event | Result | Monitor status |
|------|-------|--------|----------------|
| t0 | Scheduled test runs | Pass | OK |
| t15 | Scheduled test runs | Fail | OK (Minimum duration timer starts)|
| t28 | N/A |Fail | ALERT (13 minutes elapsed)|

**Note**: This configuration is not recommended because it lacks fast retries and alerts on a single failure, which can lead to false positives from transient issues. Instead, consider shortening the test frequency to 5 minutes and/or enabling fast retries. This approach allows additional test executions to run during transient issues, reducing false positives while still ensuring timely alerts for real, persistent problems. 

### Example: Fast retries

- Fast retries: 2 retries, with 1 minutes between retries
- Test frequency: 30 minutes
- Minimum duration: 5 minutes
- Location scope: 1 of 1

With the above settings, the minimum duration timer starts when the second fast retry fails:
| Time | Event | Result | Monitor status |
|------|-------|--------|----------------|
| t0 | Scheduled test runs | Pass | OK |
| t30 | Scheduled test runs | Fail | OK |
| t31 | First fast retry for scheduled test run at t30  | Fail | OK |
| t32 | Second fast retry for scheduled test run at t30 | Fail | OK (Minimum duration timer starts)|
| t37 | N/A | Fail | ALERT (5 minutes elapsed) |
| t60 | Scheduled test runs| Pass | OK |

**Note**: Because fast retries were configured, the alert triggered at t37 instead of t35, adding a 2-minute delay.

### Best practices

- If you want immediate alerting, set the minimum duration to `0` to alert as soon as a failure occurs.
- Enable fast retries to handle transient issues like network blips. For frequently running tests, pair this with a longer minimum duration to reduce alert noise.
- Avoid [overlapping fast retries with scheduled test runs][3] to help you determine which fast retries are associated with its related scheduled test runs.

## Location-based evaluation

Location rules determine **how many locations must fail** for an alert to trigger.

Common patterns include:

- Fail from any 1 of _N_ locations
- Fail from all locations
- At one moment, all locations were failing

A monitor can recover even if **some locations are still failing**, as long as the configured alerting rules are no longer satisfied during the evaluation window.

## Alert and recovery behavior

A recovery does not require all test runs to pass, only that the alerting conditions are no longer true.

- **Alert** notifications are sent when alerting rules are met.
- **Recovery** notifications are sent when alerting rules are no longer met.

## Global uptime and alert state

**Global uptime** represents the percentage of time your monitor was healthy (`OK` status) during the selected time period. 

It is based on how long the monitor stayed in an `OK` state compared to the total monitoring period. Any time the monitor spends in an `ALERT` state lowers the global uptime.

Because this metric is based on the duration of the monitor's status and not on the status of a test execution, it cannot be reliably calculated based on the ratio of successful test results to the total number of test executions over the same period. 

Depending on the test frequency, there may be times when the ratio can be used to "approximate" the global uptime. In some basic alerting configurations, such as a test that runs every minute with a minimum duration of 0, the ratio might roughly approximate the global uptime.

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

   ```text {hl_lines=[3]}
   Total Period = 360 minutes
   Time in Alert = 15 minutes
   Global Uptime = ((360 - 15) / 360) × 100 = 95.83%
   ```

## Status descriptions

OK
: The monitor is healthy. Either all test runs are passing, or failures have not met the alerting conditions (minimum duration and location requirements).

ALERT
: The alerting conditions have been met. The test has been failing continuously for the configured minimum duration across the required number of locations.

NO DATA
: The monitor has not received any test results from any location (managed, private, or Datadog Agent) during the queried time period. Common causes include: <br></br>

  - **The test is paused**: Paused tests do not execute and produce no data.
  - **Advanced schedule configuration**: The queried time period falls outside the test's configured schedule windows.
  - **Delay in test execution**: The test has not yet run during the selected time period. This typically occurs with overloaded private locations, which may cause intermittent timeouts, missed runs, gaps in the test schedule, or the private location stopped reporting. 
      When these symptoms are present, too many tests are assigned to the private location for it to handle. You can resolve this by adding workers, increasing concurrency, or adding compute resources. See [Dimensioning Private Locations][4] for more information.
  - **Delay in data ingestion**: Test results have not yet been processed and are not available for the queried time period.

## Why alerts may behave unexpectedly

If a monitor does not alert or recovers unexpectedly, check for the following:

- Minimum duration and test frequency alignment
- Fast retry configuration
- Location scope
- Test execution results within the evaluation window
- Whether the test was paused

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /synthetics/guide/synthetic-test-retries-monitor-status/#retries-that-overlap-with-other-test-runs
[4]: /synthetics/platform/private_locations/dimensioning
