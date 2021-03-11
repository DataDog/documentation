---
title: RUM Error Tracking Explorer
kind: documentation
beta: true
---

{{< img src="real_user_monitoring/error_tracking/explorer.png" alt="Error Tracking Explorer"  >}}

## Explore your issues

The Error Tracking Explorer allows you to explore all your different issues. An issue is a group of similar errors related to the same bug. Datadog creates issues by computing a fingerprint for each error using some of its attributes such as the error type, the error message, or the stack trace. Errors with the same fingerprint are grouped together in the same issue.

Each item listed in the Explorer is an issue and contains high-level information about the error:

-   The error type and the error message
-   The path to the file in which underlying errors are fired
-   Important information about the issue’s lifetime:
    -   When it was first and last seen
    -   Graph of occurrences over time
    -   Number of occurrences in the selected time period

### Time range

{{< img src="real_user_monitoring/error_tracking/time_range.png" alt="Error Tracking Time Range"  >}}

The time range appears on the very top right of the Explorer as a timeline. This feature allows you to display issues having error occurrences within the selected time period. Quickly change the time range by selecting a preset range from the dropdown.

### Facets

{{< img src="real_user_monitoring/error_tracking/facet.png" alt="Error Tracking Facets"  >}}

Error Tracking automatically indexes a predefined list of attributes from your issues and creates facets out of it. A facet displays all the distinct members of an attribute for the selected time period and provides some basic analytics, such as the number of issues represented. Facets allow you to pivot or filter your issues based on the given attribute.

## Inspect an issue

Click on any issue to open the issue panel and see more information about it.

{{< img src="real_user_monitoring/error_tracking/issue_panel_upper_part.png" alt="Upper Part of the Error Tracking issue panel"  >}}

The high-level details you need when troubleshooting an issue can be found in the upper part of the panel. From here, you can understand its lifecycle: first and last occurrence dates, total count, as well as the count over time for the given issue.

{{< img src="real_user_monitoring/error_tracking/issue_panel_lower_part.png" alt="Lower Part of the Error Tracking Issue Panel"  >}}

The lower part of the issue panel gives you the ability to navigate error samples from the related issue. Each error sample gives you information while troubleshooting, for example:

-   The stack trace where each stack frame provides a code snippet centered on the line of code that fired the error.
-   Information about the RUM session in which the error occurred if actually collected by the RUM SDK.
-   Information about the user, such as their browser or their OS with the related versions that were used when the error occurred.

## Get alerted on new errors

Seeing a new issue as soon as it happens gives you the chance to proactively identify and fix it before it becomes critical. Error Tracking generates a [Datadog event][1] whenever an issue is first seen in a given service and environment and, as a result, gives you the ability to be alerted in such cases by configuring [Event Monitors][2].

Each event generated is tagged with the version, the service, and the environment so that you have a fine-grained control over issues you want to be alerted for. You can directly export your search query from the explorer to create an event monitor on the related scope:

{{< img src="real_user_monitoring/error_tracking/export_search_query_to_monitor.gif" alt="Export to monitor in Error Tracking"  >}}


[1]: /events
[2]: /monitors/monitor_types/event/
