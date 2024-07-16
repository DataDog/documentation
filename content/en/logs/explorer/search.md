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

While information from individual logs can be useful visualized as a list, sometimes valuable information can be accessed through aggregation. To access this information, search for logs in the [Log Explorer][5] and display them as timeseries, top lists, tree maps, pie charts, or tables.

Log Explorer search consists of a time range and a search query, mixing `key:value` and [full-text search][6]. 

## Search query

For example, to filter on logs produced by a web store service, with an error status, over the past fifteen minutes, create a custom query like `service:payment status:error rejected` and set the time range to the `Past 15 minutes`:

{{< img src="logs/explorer/search_filter.png" alt="Create a search query in the Log Explorer that filters for error logs of rejected payments for a web store service" style="width:100%;" >}}

[Indexed Logs][1] support both [full-text search][6] and `key:value` search queries.

**Note**: `key:value` queries **do not** require that you [declare a facet][2] beforehand.

## Autocomplete

Use the search bar's autocomplete feature to complete your query using:
- Existing keys and values in your logs
- Your recent searches (recent searches from other users are not displayed)
- Saved views

{{< img src="logs/explorer/search/log_search_bar_autocomplete.png" alt="The logs search bar showing service: as the query and emailer, balancer-checker, ad-server, and vpc as autocomplete options" style="width:80%;">}}

### Autocomplete facets and values

The search bar autosuggests facets based on your input in the search bar. These facets are displayed in the same order in which they are positioned in the [facet panel][5]. If a facet has a defined display name, it is displayed on the right-hand side of the dropdown menu. Facets that are not configured to be displayed in the facet panel are not autosuggested for a search.

{{< img src="logs/explorer/search/log_facet_autocomplete.png" alt="The logs search bar showing `network` as the query and the facets @network.bytes_written, @network.client.ip, and @network.interface as autocomplete options" style="width:80%;">}}

After you select a facet and input the `:` character, the search bar autosuggests values. These values are displayed in descending order of how many logs contain that `facet:value` pair in the past 15 minutes. The estimated number of logs containing that value is displayed on the right-hand side of the dropdown menu. For example, the `balance-checker` service is positioned first in the autosuggested list of values for the `service` facet, indicated by the `2.66M`, representing the highest log count:

{{< img src="logs/explorer/search/log_value_autocomplete.png" alt="The logs search bar showing `service:` as the query and the values balance-checker, ad-server, fraud-detector, and trade-executor as autocomplete options" style="width:80%;">}}

### Autocomplete recent searches

Your 100 most recent searches in the Log Explorer are retained. Recent searches from other users are not retained or displayed. The search bar autosuggests the four most recent searches that match your input in the search bar, with the most recent search displayed first. The search bar also shows how long ago each recent search was run. For example, if you input `service:web-store status:error` in the search bar, the four most recent searches containing these terms are displayed in order of recency, each one specifying a different error:

{{< img src="logs/explorer/search/log_recent_searches.png" alt="The logs search bar showing `service:web-store status:error` as the query and recent searches for different web-store service errors as autocomplete options" style="width:80%;">}}

### Autocomplete Saved Views

You can create Saved Views in the Log Explorer to save queries and additional context for the future and for centralized access. The search bar autosuggests Saved Views that match your input in the search bar. Saved Views are displayed in the same order in which they are positioned in the Saved Views panel, with starred Saved Views displayed first. The Saved View name, saved query, and profile picture of the user who last updated it are displayed in the dropdown menu. If a Saved View query is too long to be displayed in the dropdown, the full query is displayed in a tooltip on hover. The email of the user who last updated a Saved View is also displayed in a tooltip on hover over their profile picture.

{{< img src="logs/explorer/search/log_autocomplete_saved_views.png" alt="The logs search bar showing `service:web-store status:error` as the query and Saved Views for different web-store service errors as autocomplete options" style="width:80%;">}}

## Search syntax

Syntax highlighting clearly differentiates input types, such as keys (for example, an attribute such as `@merchant_name`), values (for example, the name of a particular merchant), free text (for example, keywords in a log messages such as `responded 500`), and control characters (for example, parentheses and colons). Status attributes are also highlighted in colors representing the status, such as red for `error` and blue for `info`.

{{< img src="logs/explorer/search/log_syntax_highlighting.png" alt="The logs search bar showing `service:auth-dotnet status:error 500 (check-token OR create-user)` as the query with differentiable syntax highlighting" style="width:100%;">}}

Clear error states inform you which part of the query contains syntax errors and how to remediate them. For example,
- If you input the query `service:` with no value, the message "Missing value in key:value pair" is displayed when you hover over the query.
- If you input brackets for a range query, but do not fill in the high and low values, the message "Expected term but end of input found" is displayed.
- If you input multiple values for a log field but miss the closing parenthesis character, such as  `service:(web-store OR auth-dotnet`, the message `Missing closing parenthesis character` is displayed.

{{< img src="logs/explorer/search/log_error_states.png" alt="The logs search bar showing `service:(web-store OR auth-dotnet` as the query with the message `Missing closing parenthesis character`" style="width:50%;">}}

To start searching for logs and customizing the time frame in the Log Explorer, read the [Search Syntax documentation][3] and the [Custom Time Frames documentation][4].

## Disable styling and autocomplete for search bar

Toggle the button to the right of the search bar to search in raw mode, where syntax highlighting, search pills styling, and autocomplete are removed:

{{< img src="logs/explorer/search/log_raw_search_mode.png" alt="The logs search bar showing `service:auth-dotnet status:error 500 (check-token OR create-user)` as the query in raw search mode" style="width:100%;">}}

You can interact with the search bar with your mouse, as well as by using keyboard commands. For example, use `CMD-A` for selecting text, `CMD-C` for copying text, `CMD-X` for cutting text, and `CMD-V` for pasting text.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/indexes
[2]: /logs/explorer/facets/
[3]: /logs/search-syntax
[4]: /dashboards/guide/custom_time_frames
[5]: /logs/explorer/
[6]: https://en.wikipedia.org/wiki/Full-text_search
