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

The Error Tracking Explorer shows you a list of ongoing issues. An _issue_ is a group of similar errors that have the same _fingerprint_ and which might need to be fixed depending on the severity of the issue. 

{{< img src="tracing/error_tracking/explorer_with_backend_issues.png" alt="Error Tracking Explorer" style="width:100%" >}}

## Explore your issues

Each item listed in the [Error Tracking Explorer][3] surfaces high-level information about the issue, including the following:

-   The error type and the error message.
-   The path to the file in which underlying errors occurred.
-  Information about the issue's lifetime:
    -   When it was first and last seen.
    -   The number of error occurrences in the selected time period.
    -   A graph of error occurrences over time in the selected time period.

### Time range

Adjust the time range selector to display issues that have error occurrences within the selected time period. 

{{< img src="tracing/error_tracking/time_range.png" alt="Error Tracking Time Range" style="width:60%;" >}}

You can specify a specific range or select a preset range from the dropdown menu.

### Facets

Error Tracking automatically indexes a predefined list of attributes from underlying error occurrences and creates facets for them. Use facets to pivot or filter your issues. The facet list displays the members of an attribute for the selected time period and provides basic analytics such as the number of corresponding issues.

{{< img src="tracing/error_tracking/facets_panel.png" alt="Error Tracking Facets" style="width:100%;" >}}

The Error Tracking Explorer returns all issues with at least one error occurrence in the selected time period that match the set of selected facets.

## Inspect an issue

Click on any issue in the issue list to open the issue panel and access additional error information about your backend service.

{{< img src="tracing/error_tracking/issue_panel.png" alt="Error Tracking Time Range" style="width:100%;" >}}

### Get a high-level overview

The issue panel contains high-level information you need when troubleshooting an issue. 

You can learn about the issue's lifecycle such as its first and last occurrence dates, related code versions, and total error occurrences since its inception. The graph of error occurrences shows up to 14 days in the past to give you an overview of the trend of the issue.

### Browse individual error occurrences

Explore error samples that are grouped into the issue such as the following:

-   All ingested error spans for the past [15 minutes of live search][1].
-   Error spans from the past 15 days that are indexed by [custom retention filters][2].

{{< img src="tracing/error_tracking/error_sample.png" alt="Lower Part of the Error Tracking Issue Panel" style="width:80%;" >}}

Each error sample displays the information needed to understand why an error happened and how to resolve it, for example:

- The error stack trace, which shows where the error happens in the source code.
- All the error span tags, such as the resource or operation name, with direct access to the related trace or to logs that are linked to it.
- Insights about the health of the underlying host or container when this particular error occurred.

## Connect your repository to enable code snippets

Set up the [GitHub integration][4] to see code snippets in your stack traces.

{{< img src="tracing/error_tracking/inline_code_snippet.png" alt="An inline code snippet in a stack trace" style="width:70%;" >}}

To get started with configuring your repository, see the [Source Code Integration documentation][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/#live-search-for-15-minutes
[2]: /tracing/trace_pipeline/trace_retention/#retention-filters
[3]: https://app.datadoghq.com/apm/error-tracking
[4]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[5]: /integrations/guide/source-code-integration