---
title: Search Syntax
kind: documentation
description: "Search through all of your logs."
aliases:
    - /logs/search
    - /logs/search-syntax
    - /logs/explorer/search/
further_reading:
- link: "/logs/explorer/#visualize"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "/logs/explorer/#patterns"
  tag: "Documentation"
  text: "Detect patterns inside your logs"
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/explorer/saved_views/"
  tag: "Documentation"
  text: "Automatically configure your Log Explorer"
---

A query filter is composed of terms and operators.

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

## Autocomplete

Use the search bar's autocomplete feature to complete your query using existing values:

{{< img src="logs/explorer/search/search_bar_autocomplete.png" alt="search bar autocomplete "  style="width:80%;">}}

## Escaping of special characters

The following characters are considered special: `+` `-` `=` `&&` `||` `>` `<` `!` `(` `)` `{` `}` `[` `]` `^` `"` `“` `”` `~` `*` `?` `:` `\`, and `/` require escaping with the `\` character.

**Note**: These characters can be escaped, but are not searchable in logs search. To search for special characters, parse them into an attribute with the [grok parser][1], and then search for logs that contain the attribute.

## Attributes search

### Message attribute search

To search for logs that contain `user=JaneDoe` in the message attribute use the following search:

`user\=JaneDoe`

### Facets search

To search on a specific attribute, first [add it as a facet][2] and then add `@` to specify you are searching on a facet.

For instance, if your facet name is **url** and you want to filter on the **url** value *www.datadoghq.com*, enter:

`@url:www.datadoghq.com`


**Notes**:

1. Facet searches are case sensitive. Use free text search to get case insensitive results. Another option is to use the `lowercase` filter with your Grok parser while parsing to get case insensitive results during search.

2. Searching for a facet value that contains special characters requires escaping or double quotes.
For example, for a facet `my_facet` with the value `hello:world`, search using: `@my_facet:hello\:world` or `@my_facet:"hello:world"`.
To match a single special character or space, use the `?` wildcard. For example, for a facet `my_facet` with the value `hello world`, search using: `@my_facet:hello?world`.

Examples:

| Search query                                                         | Description                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | Searches all logs matching `/api/v1/test` in the attribute `http.url_details.path`.                                                                               |
| `@http.url:\/api\/v1\/*`                                             | Searches all logs containing a value in `http.url` attribute that start with `/api/v1/`                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:\/api\/v1\/*` | Searches all logs containing a `http.status_code` value between 200 and 299, and containing a value in `http.url_details.path` attribute that start with `/api/v1/` |

## Wildcards

### Multi-character wildcard

To perform a multi-character wildcard search, use the `*` symbol as follows:

* `service:web*` matches every log message that has a service starting with `web`.
* `web*` matches all log messages starting with `web`
* `*web` matches all log messages that end with `web`

Wildcard searches work within facets with this syntax. This query returns all the services that end with the string `mongo`:

`service:*mongo`

Wildcard searches can also be used to search in the plain text of a log that is not part of a facet. This query returns all the logs that contain the string `NETWORK`:

`*NETWORK*`

However, this search term does not return logs that contain the string `NETWORK` if it is in a facet and not part of the log message.

### Search wildcard

When searching for a facet value that contains special characters or requires escaping or double quotes, use the `?` wildcard to match a single special character or space. For example, to search for a facet `my_facet` with the value `hello world`: `@my_facet:hello?world`.

## Numerical values

Use `<`,`>`, `<=`, or `>=` to perform a search on numerical attributes. For instance, retrieve all logs that have a response time over 100ms with:

`@http.response_time:>100`

You can search for numerical attribute within a specific range. For instance, retrieve all your 4xx errors with:

`@http.status_code:[400 TO 499]`

## Tags

Your logs inherit tags from [hosts][3] and [integrations][4] that generate them. They can be used in the search and as facets as well:

* `test` is searching for the string "test".
* `env:(prod OR test)` matches all logs with the tag `env:prod` or the tag `env:test`
* `(env:prod AND -version:beta)` matches all logs that contain tag `env:prod` and that do not contain tag `version:beta`

If your tags don't follow [tags best practices][5] and don't use the `key:value` syntax, use this search query:

* `tags:<MY_TAG>`

## Arrays

You can add facets on arrays of strings or numbers. All values included in the array become listed in the facet and can be used to search the logs.

In the below example, clicking on the `Peter` value in the facet returns all the logs that contains a `users.names` attribute, whose value is either `Peter` or an array that contains `Peter`:

{{< img src="logs/explorer/search/array_search.png" alt="Array and Facets"  style="width:80%;">}}

## Saved searches

[Saved Views][6] contain your search query, columns, time horizon, and facet.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/parsing/?tab=matcher
[2]: /logs/explorer/facets/
[3]: /infrastructure/
[4]: /integrations/#cat-log-collection
[5]: /getting_started/tagging/#tags-best-practices
[6]: /logs/explorer/saved_views/
