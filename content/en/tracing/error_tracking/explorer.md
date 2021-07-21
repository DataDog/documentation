---
title: Error Tracking Explorer
kind: documentation
beta: false
---

{{< img src="tracing/error_tracking/error_tracking_explore_inspect.png" alt="Error Tracking Explorer"  >}}

## Explore your issues

The Error Tracking Explorer allows you to visualize the list of ongoing issues: an issue is a group of similar errors that share the same fingerprint and which might need to be fixed depending on its criticity. Each item listed in the explorer surfaces high-level information about the related issue:

-   The error type and the error message
-   The path to the file in which underlying errors are fired
-   Important information about the issue’s lifetime:
    -   When it was first and last seen
    -   Number of error occurrences in the selected time period
    -   Graph of error occurrences over time in the selected time period

### Time range

{{< img src="tracing/error_tracking/time_range.png" alt="Error Tracking Time Range"  >}}

The time range appears on the very top right of the Explorer as a timeline. It allows you to display issues having error occurrences within the selected time period. Quickly change the time range by selecting a preset range from the dropdown.

### Facets

{{< img src="tracing/error_tracking/facet.png" alt="Error Tracking Facets"  >}}

Error Tracking automatically indexes a predefined list of attributes from the underlying error occurrences and creates facets out of it. A facet displays all the distinct members of an attribute for the selected time period and provides some basic analytics, such as the number of corresponding issues. Facets allow you to pivot or filter your issues: the Explorer returns all issues having at least one error occurrence in the selected time period matching the set of facets.

## Inspect an issue

Click on any issue to open the issue panel and see more information about it.

### Get a high-level overview

{{< img src="tracing/error_tracking/issue_panel_upper_part.png" alt="Upper Part of the Error Tracking issue panel"  >}}

The high-level details you need when troubleshooting an issue can be found in the upper part of the panel. From here, you can understand the issue's lifecycle: first and last occurrence dates with the related code versions as well as the total count of error occurrences since inception. A graph of error occurrences is also available up to 14 days in the past to give you an overview of the trend of the given issue.

### Browse individual error occurrences

{{< img src="tracing/error_tracking/issue_panel_lower_part.png" alt="Lower Part of the Error Tracking Issue Panel"  >}}

In the lower part of the issue panel, navigate error samples that are grouped into the issue:

-   All ingested error spans for the past [15 minutes of live search][1]
-   Error spans from the past 15 days that are indexed by [custom retention filters][2]

Each error sample gives the information you need to understand why it happened and how to resolve it, for example:

- The error stack trace, which shows where the error happens in the source code.
- All the error span tags, such as the resource or operation name, with direct access to the related trace or to logs that are linked to it.
- Insights about the health of the underlying host or container when this particular error occurred.

[1]: /tracing/trace_search_and_analytics/#live-search-for-15-minutes
[2]: /tracing/trace_retention_and_ingestion/#retention-filters
