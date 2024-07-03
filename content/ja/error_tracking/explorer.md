---
description: Learn about the Error Tracking Explorer.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentation
  text: Learn about Error Tracking Monitors
kind: documentation
title: Error Tracking Explorer
---

## Overview

{{< img src="error_tracking/error-tracking-overview.png" alt="The details of an issue in the Error Tracking Explorer" style="width:100%;" >}}

The Error Tracking Explorer allows you to view, filter, and investigate issues. An issue is a group of similar errors related to the same bug. Datadog creates issues by computing a fingerprint for each error using some of its attributes such as the error type, the error message, or the stack trace. Errors with the same fingerprint are grouped together in the same issue.

## Explore your issues

Each item listed in the Error Tracking Explorer is an issue that contains high-level information about the error, including the following:

-   The error type and the error message
-   The path to the file in which underlying errors are fired
-   Important information about the issue's lifetime:
    -   When it was first and last seen
    -   Graph of occurrences over time
    -   Number of occurrences in the selected time period

### Time range

{{< img src="real_user_monitoring/error_tracking/time_range.png" alt="Error Tracking Time Range" style="width:80%;" >}}

The time range appears on the top right of the Explorer as a timeline. This feature allows you to display issues having error occurrences within the selected time period. Change the time range by selecting a preset range from the dropdown.

### Facets

{{< img src="real_user_monitoring/error_tracking/facets_panel.png" alt="Error Tracking Facets" style="width:100%;" >}}

Error Tracking automatically indexes a predefined list of attributes from your issues and creates facets out of it. A facet displays all the distinct members of an attribute for the selected time period and provides some basic analytics, such as the number of issues represented. Facets allow you to pivot or filter your issues based on the given attribute.

## Inspect an issue

Click on any issue to open the issue panel and see more information about it.

{{< img src="real_user_monitoring/error_tracking/issue_summary.png" alt="Upper part of the Error Tracking issue panel offering a summarized view of the issue" style="width:80%;" >}}

The high-level details you need when troubleshooting an issue can be found in the upper part of the panel. From here, you can understand its lifecycle: first and last occurrence dates, total count, as well as the count over time for the given issue.

{{< img src="real_user_monitoring/error_tracking/error_sample.png" alt="Lower part of the Error Tracking issue panel offering error samples" style="width:80%;" >}}

The information shown in the issue panel varies depending on the error source. For example, an issue created from APM errors shows the error span tags, such as the resource or operation name, with direct access to the related trace or to logs that are linked to it.

The lower part of the issue panel gives you the ability to navigate error samples from the related issue. Each error sample gives you troubleshooting information such as the stack trace of the error, and the characteristics of impacted users.

## Get alerted on new errors

Seeing a new issue as soon as it happens gives you the chance to proactively identify and fix it before it becomes critical. Error Tracking generates a [Datadog event][1] whenever an issue is first seen in a given service and environment and, as a result, gives you the ability to be alerted in such cases by configuring [Event Monitors][2].

Each event generated is tagged with the version, the service, and the environment so that you have a fine-grained control over issues you want to be alerted for. You can directly export your search query from the explorer to create an event monitor on the related scope:

{{< img src="real_user_monitoring/error_tracking/export_to_monitor.mp4" alt="Export your search query to an Error Tracking monitor" video=true >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/events
[2]: /ja/monitors/types/event/