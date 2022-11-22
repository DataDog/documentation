---
title: Error Tracking Explorer
kind: documentation
description: Learn about the Error Tracking Explorer.
is_beta: true
further_reading:
  - link: 'https://www.datadoghq.com/blog/error-tracking/'
    tag: 'Blog'
    text: 'Make sense of application issues with Datadog Error Tracking'
  - link: '/logs/error_tracking/'
    tag: 'Documentation'
    text: 'Learn about Error Tracking for Logs'
---

## Overview

The [Error Tracking for Logs Explorer][1] intelligently groups error logs into issues that help you understand and triage the root cause of errors by cutting through the noise and reducing thousands to millions of raw data points to a couple of issues consisting of diagnostic data such as stack traces, error distributions, and code snippets.

Datadog creates issues by computing a fingerprint for each error using some of its attributes such as the error type, the error message, or the stack trace. Errors with the same fingerprint are grouped together in the same issue. Each item listed in the Explorer is an issue and contains high-level information about the error:

-   The error type and the error message
-   The path to the file in which underlying errors are fired
-   Important information about the issue’s lifetime:
    -   When it was first and last seen
    -   Graph of occurrences over time
    -   Number of occurrences in the selected time period

### Time range

{{< img src="real_user_monitoring/error_tracking/time_range.png" alt="Error Tracking Time Range" style="width:70%" >}}

The time range appears on the top right of the Error Tracking Explorer as a timeline. This feature allows you to display issues having error occurrences within the selected time period. Change the time range by selecting a preset range from the dropdown.

### Facets

Error Tracking automatically indexes a predefined list of attributes from your issues and creates facets out of it. A facet displays all the distinct members of an attribute for the selected time period and provides some basic analytics, such as the number of issues represented. Facets allow you to pivot or filter your issues based on the given attribute.

## Inspect an issue

Click on any issue to open the issue panel which contains information about seasonality patterns, stack traces, and the error's distribution across environments and sources. The **What Happened** section displays the first and last versions are impacted with timestamps. This metadata exists beyond your standard log retention. 

If the errors grouped into an issue have different stack traces, click **Group Into Patterns**. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/error-tracking/