---
title: Search
kind: documentation
description: "Search through all of your logs."
aliases:
    - /logs/search
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/explorer/patterns"
  tag: "Documentation"
  text: "Detect patterns inside your logs"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/explorer/saved_views"
  tag: "Documentation"
  text: "Automatically configure your Log Explorer"
---

All of the search parameters are contained within the URL. You can share your view by sharing the URL.

{{< img src="logs/explorer/search_your_logs.mp4" alt="Search your logs" video="true"  >}}

## Search syntax

A query is composed of terms and operators.

There are two types of terms:

* A **single term** is a single word such as `test` or `hello`.

* A **sequence** is a group of words surrounded by double quotes, such as `"hello dolly"`.

To combine multiple terms into a complex query, you can use any of the following Boolean operators:

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **Operator** | **Description**                                                                                        | **Example**                  |
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure   |
| `OR`         | **Union**: either term is contained in the selected events                                             | authentication OR password   |
| `-`          | **Exclusion**: the following term is NOT in the event                                                  | authentication AND -password |

### Autocomplete

Use the search bar's autocomplete feature to complete your query using existing values:

{{< img src="logs/explorer/search/search_bar_autocomplete.png" alt="search bar autocomplete "  style="width:80%;">}}

### Escaping of special characters

The following characters are considered special: `+` `-` `=` `&&` `||` `>` `<` `!` `(` `)` `{` `}` `[` `]` `^` `"` `“` `”` `~` `*` `?` `:` `\`, and `/` require escaping with the `\` character.

### Attributes search

#### Message attribute search

To search for logs that contain `user=JaneDoe` in the message attribute use the following search:

`user\=JaneDoe`

#### Facets search

To search on a specific attribute, first [add it as a facet][1] and then add `@` to specify you are searching on a facet.

For instance, if your facet name is **url** and you want to filter on the **url** value *www.datadoghq.com*, enter:

`@url:www.datadoghq.com`

**Note**: Searching on a facet value that contains special characters requires escaping or double quotes. The same logic is applied to spaces within log facet names. Log facets should not contain spaces, but if they do, spaces must be escaped. If a facet is named `user.first name`, perform a facet search by escaping the space: `@user.first\ name:myvalue`

Examples:

| Search query                                                         | Description                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | Searches all logs matching `/api/v1/test` in the attribute `http.url_details.path`.                                                                               |
| `@http.url:\/api\/v1\/*`                                             | Searches all logs containing a value in `http.url` attribute that start with `/api/v1/`                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:\/api\/v1\/*` | Searches all logs containing a `http.status_code` value between 200 and 299, and containing a value in `http.url_details.path` attribute that start with `/api/v1/` |

### Wildcards

To perform a multi-character wildcard search, use the `*` symbol as follows:

* `service:web*` matches every log message that has a service starting with `web`.
* `web*` matches all log messages starting with `web`
* `*web` matches all log messages that end with `web`

Wildcard searches work within facets with this syntax. This query returns all the services that end with the string `mongo`:

`service:*mongo`

Wildcard searches can also be used to search in the plain text of a log that is not part of a facet. This query returns all the logs that contain the string `NETWORK`:

`*NETWORK*`

However, this search term does not return logs that contain the string `NETWORK` if it is in a facet and not part of the log message.

### Numerical values

Use `<`,`>`, `<=`, or `>=` to perform a search on numerical attributes. For instance, retrieve all logs that have a response time over 100ms with:

`@http.response_time:>100`

You can search for numerical attribute within a specific range. For instance, retrieve all your 4xx errors with:

`@http.status_code:[400 TO 499]`

### Tags

Your logs inherit tags from [hosts][2] and [integrations][3] that generate them. They can be used in the search and as facets as well:

* `test` is searching for the string "test".
* `("env:prod" OR test)` matches all logs with the tag `#env:prod` or the tag `#test`
* `(service:srvA OR service:srvB)` or `(service:(srvA OR srvB))` matches all logs that contain tags `#service:srvA` or `#service:srvB`.
* `("env:prod" AND -"version:beta")` matches all logs that contain `#env:prod` and that do not contain `#version:beta`

If your tags don't follow [tags best practices][4] and don't use the `key:value` syntax, use this search query:

* `tags:<MY_TAG>`

### Arrays

You can add facets on arrays of strings or numbers. All values included in the array become listed in the facet and can be used to search the logs.

In the below example, clicking on the `Peter` value in the facet returns all the logs that contains a `users.names` attribute, whose value is either `Peter` or an array that contains `Peter`:

{{< img src="logs/explorer/search/array_search.png" alt="Array and Facets"  style="width:80%;">}}

## Saved Searches

[Saved Views][5] contain your search query, columns, time horizon, and facet.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/facets
[2]: /infrastructure
[3]: /integrations/#cat-log-collection
[4]: /tagging/#tags-best-practices
[5]: /logs/explorer/saved_views
