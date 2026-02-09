---
title: Search Logs
description: 'Filter logs to narrow down, broaden, or shift your focus on the subset of logs of current interest.'
aliases:
    - /logs/search
further_reading:
    - link: 'logs/explorer/analytics'
      tag: 'Documentation'
      text: 'Learn how to group logs'
    - link: 'logs/explorer/visualize'
      tag: 'Documentation'
      text: 'Create visualizations from logs'
    - link: '/logs/explorer/export'
      tag: 'Documentation'
      text: 'Export views from the Log Explorer'
---

## Overview

The [Logs Explorer][1] lets you search and view individual logs as a list. However, the most valuable insights often come from aggregating logs at scale. Using the search feature, you can filter logs and visualize them as timeseries charts, top lists, tree maps, pie charts, or tables to better understand trends, patterns, and outliers across your log data.

## Natural language queries

{{% site-region region="gov" %}}
<div class="alert alert-danger">
Natural Language Queries is not available in the <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

<div class="alert alert-info">Natural Language Queries (NLQ) for Logs is <strong>built with Llama</strong>.</div>

Use Natural Language Queries (NLQ) to describe what you're looking for in plain English. Datadog automatically translates your request into a structured log query, making it easier to explore logs without needing to write complex syntax. To access this feature, click **Ask** in the search field.

{{< img src="/logs/explorer/search/log_explorer_nlq.mp4" alt="Natural language query in Log Explorer showing how to search for logs using plain English phrases" video=true >}}

The system translates natural language input into Datadog queries and understands context such as services, attributes, tags, and time ranges. It also detects relevant fields automatically and enables users to create visualizations using simple descriptions—for example, "Top 20 services by errors" or "Show errors from service X in the past 24 hours."

To disable NLQ, you must have [`org_management` permissions][2]. Navigate to [Organization Settings > Preferences][3] and toggle off the Natural Language Queries feature.

## Search query

A Log Explorer search consists of a time range and a search query, combining `key:value` and [full-text search][4]. You can choose a time window for your search using the time range selector at the top right of the Log Explorer. For details on setting a custom time range, see the [Custom Time Frames documentation][5].

To filter on logs produced by a web store service, with an error status, over the past fifteen minutes, create a custom query like `service:payment status:error rejected` and set the time range to the `Past 15 minutes`:

{{< img src="logs/explorer/search_filter.png" alt="Create a search query in the Log Explorer that filters for error logs of rejected payments for a web store service" style="width:100%;" >}}

[Indexed Logs][6] support both [full-text search][4] and `key:value` search queries.

**Note**: `key:value` queries **do not** require that you [declare a facet][7] beforehand.

For complete query syntax reference, see the [Search Syntax documentation][8].

## Search bar features

The Log Explorer search bar includes several features to help you write queries more efficiently and accurately.

### Syntax highlighting and error validation

Syntax highlighting clearly differentiates input types: keys, values, free text, and control characters. For example, `service` and `status` are keys, `auth-dotnet` and `error` are values, `500` and `check-token` are free text, and parentheses are control characters. Status attributes are color-coded by status (red for `error`, blue for `info`).

{{< img src="logs/explorer/search/log_syntax_highlighting.png" alt="The logs search bar showing `service:auth-dotnet status:error 500 (check-token OR create-user)` as the query with differentiable syntax highlighting" style="width:100%;">}}

Error validation identifies syntax errors and suggests fixes, such as missing values in key:value pairs, incomplete range queries, or unclosed parentheses.

{{< img src="logs/explorer/search/log_error_states.png" alt="The logs search bar showing `service:(web-store OR auth-dotnet` as the query with the message `Missing closing parenthesis character`" style="width:50%;">}}

### Autocomplete

The search bar's autocomplete feature helps you complete queries using existing keys and values in your logs, recent searches, and saved views.

{{< img src="logs/explorer/search/log_search_bar_autocomplete.png" alt="The logs search bar showing service: as the query and emailer, balancer-checker, ad-server, and vpc as autocomplete options" style="width:80%;">}}

Autocomplete suggests facets and values based on your input, displayed in the order they appear in the [facet panel][7]. After selecting a facet and entering `:`, values appear in descending order by log count from the past 15 minutes.

{{< img src="logs/explorer/search/log_facet_autocomplete.png" alt="The logs search bar showing `network` as the query and the facets @network.bytes_written, @network.client.ip, and @network.interface as autocomplete options" style="width:80%;">}}

Your 100 most recent searches are retained and suggested as you type. Saved Views that match your query are also suggested, displayed in the same order as the Saved Views panel.

{{< img src="logs/explorer/search/log_recent_searches.png" alt="The logs search bar showing `service:web-store status:error` as the query and recent searches for different web-store service errors as autocomplete options" style="width:80%;">}}


## Disable styling and autocomplete for search bar

Toggle the button to the right of the search bar to search in raw mode, where syntax highlighting, search pills styling, and autocomplete are removed:

{{< img src="logs/explorer/search/log_raw_search_mode.png" alt="The logs search bar showing `service:auth-dotnet status:error 500 (check-token OR create-user)` as the query in raw search mode" style="width:100%;">}}

You can interact with the search bar with your mouse, as well as by using keyboard commands. For example, use `CMD-A` for selecting text, `CMD-C` for copying text, `CMD-X` for cutting text, and `CMD-V` for pasting text.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/
[2]: /account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/preferences
[4]: /logs/explorer/search_syntax/#full-text-search
[5]: /dashboards/guide/custom_time_frames
[6]: /logs/indexes
[7]: /logs/explorer/facets/
[8]: /logs/search-syntax