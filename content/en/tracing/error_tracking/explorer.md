---
title: Error Tracking Explorer
kind: documentation
description: Learn about the Error Tracking Explorer.
further_reading:
- link: '/monitors/types/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking Monitors'
- link: '/tracing/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking for Backend Services'
---

## Overview

The Error Tracking Explorer shows you a list of ongoing issues. An _issue_ is a group of similar errors that have the same _fingerprint_ and which might need to be fixed depending on how critical they are. 

{{< img src="tracing/error_tracking/error_tracking_explore_inspect.png" alt="Error Tracking Explorer" style="width:100%;" >}}

## Explore your issues

Each item listed in the [Error Tracking Explorer][3] surfaces high-level information about the issue, including the following:

-   The error type and the error message
-   The path to the file in which underlying errors occurred
-  Information about the issue’s lifetime:
    -   When it was first and last seen
    -   Number of error occurrences in the selected time period
    -   Graph of error occurrences over time in the selected time period

### Time range

{{< img src="tracing/error_tracking/time_range.png" alt="Error Tracking Time Range" style="width:80%;" >}}

Adjust the time range selector in the top right corner of the Explorer to show issues that have error occurrences within the selected time period. You can specify a specific range or select a preset range from the dropdown.

### Facets

{{< img src="tracing/error_tracking/facet.png" alt="Error Tracking Facets" style="width:80%;" >}}

Error Tracking automatically indexes a predefined list of attributes from the underlying error occurrences and creates facets for them. The facet list displays the members of an attribute for the selected time period and provides basic analytics, such as the number of corresponding issues. Use facets to pivot or filter your issues. The Explorer returns all issues having at least one error occurrence in the selected time period matching the set of selected facets.

## Inspect an issue

Click on any issue to open the issue panel and see more information about it.

### Get a high-level overview

{{< img src="tracing/error_tracking/issue_panel_upper_part.png" alt="Upper Part of the Error Tracking issue panel" style="width:80%;" >}}

The high-level details you need when troubleshooting an issue can be found in the upper part of the panel. From here, you can learn about the issue's lifecycle, such as its first and last occurrence dates, related code versions, and total error occurrences since inception. The graph of error occurrences shows up to 14 days in the past to give you an overview of the trend of the issue.

### Browse individual error occurrences

{{< img src="tracing/error_tracking/issue_panel_lower_part.png" alt="Lower Part of the Error Tracking Issue Panel" style="width:80%;" >}}

In the lower part of the issue panel, navigate error samples that are grouped into the issue:

-   All ingested error spans for the past [15 minutes of live search][1]
-   Error spans from the past 15 days that are indexed by [custom retention filters][2]

Each error sample gives the information you need to understand why it happened and how to resolve it, for example:

- The error stack trace, which shows where the error happens in the source code.
- All the error span tags, such as the resource or operation name, with direct access to the related trace or to logs that are linked to it.
- Insights about the health of the underlying host or container when this particular error occurred.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/#live-search-for-15-minutes
[2]: /tracing/trace_pipeline/trace_retention/#retention-filters
[3]: https://app.datadoghq.com/apm/error-tracking